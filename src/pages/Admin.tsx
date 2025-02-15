
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Settings, Users, MessageSquare, Database, BarChart2, FolderTree, Folder, Plus } from 'lucide-react';
import DashboardStats from '@/components/admin/DashboardStats';
import FileUploader from '@/components/admin/FileUploader';
import FileManager from '@/components/admin/FileManager';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import FolderTreeComponent from '@/components/admin/FolderTree';

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newFolderName, setNewFolderName] = useState('');
  const [currentPath, setCurrentPath] = useState('/');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes, using simple credentials
    if (email === 'admin@example.com' && password === 'admin123') {
      setIsAuthenticated(true);
      toast({
        title: "Успешный вход",
        description: "Добро пожаловать в админ-панель",
      });
    } else {
      toast({
        title: "Ошибка входа",
        description: "Неверные учетные данные",
        variant: "destructive",
      });
    }
  };

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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#fdfcfb] to-[#e2d1c3] flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6 bg-white rounded-lg shadow-xl p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Вход в админ-панель</h1>
            <p className="text-gray-600 mt-2">Введите учетные данные для доступа</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Введите email"
                className="w-full"
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль"
                className="w-full"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Войти
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfcfb] to-[#e2d1c3]">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Админ-панель</h1>
          <Button 
            variant="outline"
            onClick={() => {
              setIsAuthenticated(false);
              setEmail('');
              setPassword('');
              navigate('/');
            }}
          >
            Выйти
          </Button>
        </div>

        <Tabs defaultValue="files" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="files" className="flex items-center gap-2">
              <FolderTree className="w-4 h-4" />
              Files
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="feedback" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Feedback
            </TabsTrigger>
            <TabsTrigger value="data" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              Data
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="files" className="bg-white rounded-lg shadow-lg p-6">
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
          </TabsContent>

          <TabsContent value="dashboard" className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
            <div className="space-y-6">
              <DashboardStats />
            </div>
          </TabsContent>

          <TabsContent value="users" className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">User Management</h2>
            <div className="space-y-4">
              <p className="text-gray-600">User management functionality coming soon...</p>
            </div>
          </TabsContent>

          <TabsContent value="feedback" className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Feedback Management</h2>
            <div className="space-y-4">
              <p className="text-gray-600">Feedback management functionality coming soon...</p>
            </div>
          </TabsContent>

          <TabsContent value="data" className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Data Management</h2>
            <div className="space-y-4">
              <p className="text-gray-600">Data management functionality coming soon...</p>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">System Settings</h2>
            <div className="space-y-4">
              <p className="text-gray-600">Settings functionality coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
