
import { useState, useEffect } from 'react';
import { Folder, File, Trash2, Edit } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const FileManager = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newName, setNewName] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    const { data, error } = await supabase
      .from('files')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch files",
        variant: "destructive",
      });
      return;
    }

    setFiles(data || []);
  };

  const handleRename = async (id: string) => {
    if (!newName.trim()) return;

    const { error } = await supabase
      .from('files')
      .update({ name: newName })
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to rename file",
        variant: "destructive",
      });
      return;
    }

    setEditingId(null);
    setNewName('');
    fetchFiles();
    
    toast({
      title: "Success",
      description: "File renamed successfully",
    });
  };

  const handleDelete = async (id: string, path: string) => {
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

    const { error: dbError } = await supabase
      .from('files')
      .delete()
      .eq('id', id);

    if (dbError) {
      toast({
        title: "Error",
        description: "Failed to delete file record",
        variant: "destructive",
      });
      return;
    }

    fetchFiles();
    toast({
      title: "Success",
      description: "File deleted successfully",
    });
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.map((file) => (
            <TableRow key={file.id}>
              <TableCell className="flex items-center gap-2">
                {file.type.startsWith('folder') ? (
                  <Folder className="w-4 h-4" />
                ) : (
                  <File className="w-4 h-4" />
                )}
                {editingId === file.id ? (
                  <div className="flex gap-2">
                    <Input
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="w-48"
                    />
                    <Button size="sm" onClick={() => handleRename(file.id)}>Save</Button>
                    <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>Cancel</Button>
                  </div>
                ) : (
                  file.name
                )}
              </TableCell>
              <TableCell>{Math.round(file.size / 1024)} KB</TableCell>
              <TableCell>{file.type}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingId(file.id);
                      setNewName(file.name);
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(file.id, file.path)}
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
  );
};

export default FileManager;
