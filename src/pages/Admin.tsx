
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import LoginForm from '@/components/admin/LoginForm';
import AdminTabs from '@/components/admin/AdminTabs';

const Admin = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <LoginForm onSuccess={() => setIsAuthenticated(true)} />;
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
              navigate('/');
            }}
          >
            Выйти
          </Button>
        </div>

        <AdminTabs />
      </div>
    </div>
  );
};

export default Admin;
