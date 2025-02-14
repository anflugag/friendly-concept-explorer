
import { useState, useEffect } from 'react';
import { Folder, File, Trash2, Edit, Hash, Plus, X, ChevronLeft } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface FileOrFolder {
  id: string;
  name: string;
  type?: string;
  size?: number;
  path: string;
  subtitle?: string | null;
  hashtags?: string[] | null;
}

interface FileManagerProps {
  currentPath: string;
  onPathChange: (path: string) => void;
}

const FileManager: React.FC<FileManagerProps> = ({ currentPath, onPathChange }) => {
  const [items, setItems] = useState<FileOrFolder[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newName, setNewName] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newHashtag, setNewHashtag] = useState('');
  const [editingHashtags, setEditingHashtags] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchItems();
  }, [currentPath]);

  const fetchItems = async () => {
    // Fetch folders
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

    // Fetch files
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
    setEditingId(item.id);
    setNewName(item.name);
    setNewSubtitle(item.subtitle || '');
    setEditingHashtags(item.hashtags || []);
  };

  const handleSave = async (id: string, isFolder: boolean) => {
    if (!newName.trim()) return;

    const table = isFolder ? 'folders' : 'files';
    const { error } = await supabase
      .from(table)
      .update({
        name: newName,
        subtitle: newSubtitle || null,
        hashtags: editingHashtags,
      })
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: `Failed to update ${isFolder ? 'folder' : 'file'}`,
        variant: "destructive",
      });
      return;
    }

    setEditingId(null);
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

  const handleFolderClick = (path: string) => {
    onPathChange(path);
  };

  const handleBackClick = () => {
    if (currentPath === '/') return;
    const parentPath = currentPath.substring(0, currentPath.lastIndexOf('/'));
    onPathChange(parentPath || '/');
  };

  const addHashtag = () => {
    if (newHashtag && !editingHashtags.includes(newHashtag)) {
      setEditingHashtags([...editingHashtags, newHashtag]);
      setNewHashtag('');
    }
  };

  const removeHashtag = (tag: string) => {
    setEditingHashtags(editingHashtags.filter(t => t !== tag));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handleBackClick}
          disabled={currentPath === '/'}
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </Button>
        <span className="text-sm text-gray-500">Current path: {currentPath}</span>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name & Metadata</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="space-y-2">
                    <div 
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => item.type ? null : handleFolderClick(item.path)}
                    >
                      {item.type ? (
                        <File className="w-4 h-4" />
                      ) : (
                        <Folder className="w-4 h-4" />
                      )}
                      <span className="font-medium">{item.name}</span>
                    </div>
                    {item.subtitle && (
                      <p className="text-sm text-gray-500">{item.subtitle}</p>
                    )}
                    {item.hashtags && item.hashtags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {item.hashtags.map(tag => (
                          <Badge key={tag} variant="secondary">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>{item.size ? `${Math.round(item.size / 1024)} KB` : '-'}</TableCell>
                <TableCell>{item.type || 'Folder'}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleMetadataEdit(item)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit {item.type ? 'File' : 'Folder'} Details</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Name</label>
                            <Input
                              value={newName}
                              onChange={(e) => setNewName(e.target.value)}
                              placeholder="Enter name"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Subtitle</label>
                            <Input
                              value={newSubtitle}
                              onChange={(e) => setNewSubtitle(e.target.value)}
                              placeholder="Enter subtitle"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Hashtags</label>
                            <div className="flex flex-wrap gap-1 mb-2">
                              {editingHashtags.map(tag => (
                                <Badge key={tag} variant="secondary">
                                  #{tag}
                                  <button
                                    onClick={() => removeHashtag(tag)}
                                    className="ml-1 hover:text-destructive"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </Badge>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              <Input
                                value={newHashtag}
                                onChange={(e) => setNewHashtag(e.target.value)}
                                placeholder="Add hashtag"
                              />
                              <Button size="sm" onClick={addHashtag}>
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex justify-end gap-2 mt-4">
                            <Button
                              onClick={() => handleSave(item.id, !item.type)}
                            >
                              Save Changes
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(item.id, item.path, !item.type)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default FileManager;
