
import { Home, ArrowLeft, Search, ArrowRight, Bookmark } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const BottomNav = () => {
  const { t } = useTranslation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 animate-fade-in">
      <div className="flex justify-around items-center h-16 px-4">
        <button className="flex flex-col items-center justify-center w-12 h-12 text-[#151120] hover:text-primary transition-all duration-300 transform hover:scale-110">
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">{t('navigation.home')}</span>
        </button>
        <button className="flex flex-col items-center justify-center w-12 h-12 text-[#151120] hover:text-primary transition-all duration-300 transform hover:scale-110">
          <ArrowLeft className="w-6 h-6" />
          <span className="text-xs mt-1">{t('navigation.back')}</span>
        </button>
        <button className="flex flex-col items-center justify-center w-12 h-12 text-[#151120] hover:text-primary transition-all duration-300 transform hover:scale-110">
          <Search className="w-6 h-6" />
          <span className="text-xs mt-1">{t('navigation.search')}</span>
        </button>
        <button className="flex flex-col items-center justify-center w-12 h-12 text-[#151120] hover:text-primary transition-all duration-300 transform hover:scale-110">
          <ArrowRight className="w-6 h-6" />
          <span className="text-xs mt-1">{t('navigation.forward')}</span>
        </button>
        <button className="flex flex-col items-center justify-center w-12 h-12 text-[#151120] hover:text-primary transition-all duration-300 transform hover:scale-110">
          <Bookmark className="w-6 h-6" />
          <span className="text-xs mt-1">{t('navigation.favorites')}</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;
