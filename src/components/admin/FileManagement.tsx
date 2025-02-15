
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import FileUploader from './FileUploader';
import FileManager from './FileManager';
import FolderTreeComponent from './FolderTree';

const FileManagement = () => {
  const { toast } = useToast();
  const [newFolderName, setNewFolderName] = useState('');
  const [currentPath, setCurrentPath] = useState('/');

  const createFolder = async () => {
    if (!newFolderName.trim()) {
      toast({
        title: "Ошибка",
        description: "Введите название папки",
        variant: "destructive",
      });
      return;
    }

    const folderPath = currentPath === '/' 
      ? `/${newFolderName}` 
      : `${currentPath}/${newFolderName}`;

    const { error } = await supabase
      .from('folders')
      .insert({
        name: newFolderName,
        path: folderPath,
        parent_path: currentPath === '/' ? null : currentPath
      });

    if (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось создать папку",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Успех",
      description: "Папка создана",
    });
    setNewFolderName('');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">File Management</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Folder
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Folder</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Input
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="Enter folder name"
              />
              <Button onClick={createFolder} className="w-full">
                Create Folder
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-[250px,1fr] gap-6">
        <FolderTreeComponent 
          currentPath={currentPath}
          onSelect={setCurrentPath}
        />
        <div className="space-y-6">
          <FileUploader currentPath={currentPath} onUploadComplete={() => {}} />
          <FileManager 
            currentPath={currentPath} 
            onPathChange={setCurrentPath} 
          />
        </div>
      </div>
    </div>
  );
};

export default FileManagement;
