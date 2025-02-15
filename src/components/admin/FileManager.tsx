
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { FileOrFolder, FileManagerProps } from './types';
import FileManagerHeader from './FileManagerHeader';
import FileManagerList from './FileManagerList';
import EditItemDialog from './EditItemDialog';

const FileManager: React.FC<FileManagerProps> = ({ currentPath, onPathChange }) => {
  const [items, setItems] = useState<FileOrFolder[]>([]);
  const [editingItem, setEditingItem] = useState<FileOrFolder | null>(null);
  const [newName, setNewName] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newHashtag, setNewHashtag] = useState('');
  const [editingHashtags, setEditingHashtags] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchItems();
  }, [currentPath]);

  const fetchItems = async () => {
    const { data: folders, error: foldersError } = await supabase
      .from('folders')
      .select('*')
      .eq('parent_path', currentPath)
      .order('created_at', { ascending: false });

    if (foldersError) {
      toast({
        title: "Error",
        description: "Failed to fetch folders",
        variant: "destructive",
      });
      return;
    }

    const { data: files, error: filesError } = await supabase
      .from('files')
      .select('*')
      .eq('folder_path', currentPath)
      .order('created_at', { ascending: false });

    if (filesError) {
      toast({
        title: "Error",
        description: "Failed to fetch files",
        variant: "destructive",
      });
      return;
    }

    const allItems = [...(folders || []), ...(files || [])];
    setItems(allItems);
  };

  const handleMetadataEdit = (item: FileOrFolder) => {
    setEditingItem(item);
    setNewName(item.name);
    setNewSubtitle(item.subtitle || '');
    setEditingHashtags(item.hashtags || []);
  };

  const handleSave = async () => {
    if (!editingItem || !newName.trim()) return;

    const isFolder = !editingItem.type;
    const table = isFolder ? 'folders' : 'files';
    const { error } = await supabase
      .from(table)
      .update({
        name: newName,
        subtitle: newSubtitle || null,
        hashtags: editingHashtags,
      })
      .eq('id', editingItem.id);

    if (error) {
      toast({
        title: "Error",
        description: `Failed to update ${isFolder ? 'folder' : 'file'}`,
        variant: "destructive",
      });
      return;
    }

    setEditingItem(null);
    setNewName('');
    setNewSubtitle('');
    setEditingHashtags([]);
    fetchItems();
    
    toast({
      title: "Success",
      description: "Item updated successfully",
    });
  };

  const handleDelete = async (id: string, path: string, isFolder: boolean) => {
    if (!isFolder) {
      const { error: storageError } = await supabase.storage
        .from('admin-files')
        .remove([path]);

      if (storageError) {
        toast({
          title: "Error",
          description: "Failed to delete file from storage",
          variant: "destructive",
        });
        return;
      }
    }

    const table = isFolder ? 'folders' : 'files';
    const { error: dbError } = await supabase
      .from(table)
      .delete()
      .eq('id', id);

    if (dbError) {
      toast({
        title: "Error",
        description: "Failed to delete item",
        variant: "destructive",
      });
      return;
    }

    fetchItems();
    toast({
      title: "Success",
      description: "Item deleted successfully",
    });
  };

  const handleBackClick = () => {
    if (currentPath === '/') return;
    const parentPath = currentPath.substring(0, currentPath.lastIndexOf('/'));
    onPathChange(parentPath || '/');
  };

  return (
    <div className="space-y-4">
      <FileManagerHeader 
        currentPath={currentPath}
        onBackClick={handleBackClick}
      />
      <FileManagerList
        items={items}
        onFolderClick={onPathChange}
        onEditClick={handleMetadataEdit}
        onDeleteClick={handleDelete}
      />
      {editingItem && (
        <EditItemDialog
          item={editingItem}
          newName={newName}
          setNewName={setNewName}
          newSubtitle={newSubtitle}
          setNewSubtitle={setNewSubtitle}
          newHashtag={newHashtag}
          setNewHashtag={setNewHashtag}
          editingHashtags={editingHashtags}
          setEditingHashtags={setEditingHashtags}
          onSave={handleSave}
          open={!!editingItem}
          onOpenChange={(open) => !open && setEditingItem(null)}
        />
      )}
    </div>
  );
};

export default FileManager;
