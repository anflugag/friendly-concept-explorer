
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Settings, Users, MessageSquare, Database, BarChart2, FolderTree } from 'lucide-react';
import DashboardStats from '@/components/admin/DashboardStats';
import FileUploader from '@/components/admin/FileUploader';
import FileManager from '@/components/admin/FileManager';

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      toast({
        title: "Успешный вход",
        description: "Добро пожаловать в админ-панель",
      });
    } else {
      toast({
        title: "Ошибка входа",
        description: "Неверный пароль",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#fdfcfb] to-[#e2d1c3] flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6 bg-white rounded-lg shadow-xl p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Вход в админ-панель</h1>
            <p className="text-gray-600 mt-2">Введите пароль для доступа</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
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
              setPassword('');
              navigate('/');
            }}
          >
            Выйти
          </Button>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
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

          <TabsContent value="dashboard" className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
            <div className="space-y-6">
              <DashboardStats />
            </div>
          </TabsContent>

          <TabsContent value="files" className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">File Management</h2>
            <div className="space-y-6">
              <FileUploader />
              <FileManager />
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
