
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BottomNav from '../components/navigation/BottomNav';
import LanguageSwitcher from '../components/language/LanguageSwitcher';
import { Library, Users, MessageSquare, Folder } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import '../i18n/config';

interface FolderItem {
  id: string;
  name: string;
  path: string;
  subtitle: string | null;
}

const Index = () => {
  const { t } = useTranslation();
  const [rootFolders, setRootFolders] = useState<FolderItem[]>([]);

  useEffect(() => {
    const fetchRootFolders = async () => {
      const { data, error } = await supabase
        .from('folders')
        .select('*')
        .is('parent_path', null)
        .order('name');

      if (!error && data) {
        setRootFolders(data);
      }
    };

    fetchRootFolders();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfcfb] to-[#e2d1c3] text-foreground pb-16">
      <LanguageSwitcher />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 animate-fade-in">
          <div 
            className="p-6 bg-white/80 backdrop-blur-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            style={{
              background: 'linear-gradient(109.6deg, rgba(223,234,247,1) 11.2%, rgba(244,248,252,1) 91.1%)',
            }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-white rounded-xl shadow-md">
                <Library className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#151120]">{t('sections.productLibrary')}</h2>
                <p className="text-sm text-gray-600 mt-1">{t('sections.productLibraryDescription')}</p>
              </div>
            </div>

            <div className="grid gap-4 mt-4">
              {rootFolders.map((folder) => (
                <Link 
                  key={folder.id}
                  to={folder.path}
                  className="flex items-center p-4 bg-white/90 rounded-lg shadow hover:shadow-md transition-all"
                >
                  <Folder className="w-5 h-5 text-blue-500 mr-3" />
                  <div>
                    <h3 className="font-medium text-gray-900">{folder.name}</h3>
                    {folder.subtitle && (
                      <p className="text-sm text-gray-500">{folder.subtitle}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <Link 
            to="/distributor-assistance"
            className="p-6 bg-white/80 backdrop-blur-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
            style={{
              background: 'linear-gradient(to right, #ee9ca7, #ffdde1)',
            }}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-xl shadow-md">
                <Users className="w-6 h-6 text-pink-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#151120]">{t('sections.distributorAssistance')}</h2>
                <p className="text-sm text-gray-600 mt-1">{t('sections.distributorAssistanceDescription')}</p>
              </div>
            </div>
          </Link>

          <Link 
            to="/feedback"
            className="p-6 bg-white/80 backdrop-blur-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
            style={{
              background: 'linear-gradient(to top, #accbee 0%, #e7f0fd 100%)',
            }}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-xl shadow-md">
                <MessageSquare className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#151120]">{t('sections.feedback')}</h2>
                <p className="text-sm text-gray-600 mt-1">{t('sections.feedbackDescription')}</p>
              </div>
            </div>
          </Link>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Index;
