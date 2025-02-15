
import { Settings, Users, MessageSquare, Database, BarChart2, FolderTree } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardStats from './DashboardStats';
import FileManagement from './FileManagement';

const AdminTabs = () => {
  return (
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
        <FileManagement />
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
  );
};

export default AdminTabs;
