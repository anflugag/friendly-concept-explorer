
import { Home, ArrowLeft, Search, ArrowRight, Bookmark } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import { Sheet, SheetContent } from "@/components/ui/sheet";
import SearchBar from '../search/SearchBar';

const BottomNav = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleNavigation = (action: 'back' | 'forward' | 'home' | 'search' | 'favorites') => {
    switch (action) {
      case 'back':
        navigate(-1);
        break;
      case 'forward':
        navigate(1);
        break;
      case 'home':
        navigate('/');
        break;
      case 'search':
        setIsSearchOpen(true);
        break;
      case 'favorites':
        // Implement favorites functionality
        break;
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 animate-fade-in z-50">
        <div className="flex justify-around items-center h-16 px-4 max-w-md mx-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleNavigation('home')}
            className={`flex flex-col items-center justify-center w-12 h-12 ${
              isActive('/') ? 'text-primary' : 'text-[#151120]'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs mt-1">{t('navigation.home')}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleNavigation('back')}
            className="flex flex-col items-center justify-center w-12 h-12 text-[#151120]"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-xs mt-1">{t('navigation.back')}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleNavigation('search')}
            className="flex flex-col items-center justify-center w-12 h-12 text-[#151120]"
          >
            <Search className="w-5 h-5" />
            <span className="text-xs mt-1">{t('navigation.search')}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleNavigation('forward')}
            className="flex flex-col items-center justify-center w-12 h-12 text-[#151120]"
          >
            <ArrowRight className="w-5 h-5" />
            <span className="text-xs mt-1">{t('navigation.forward')}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleNavigation('favorites')}
            className="flex flex-col items-center justify-center w-12 h-12 text-[#151120]"
          >
            <Bookmark className="w-5 h-5" />
            <span className="text-xs mt-1">{t('navigation.favorites')}</span>
          </Button>
        </div>
      </nav>

      <Sheet open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <SheetContent side="bottom" className="h-[90vh]">
          <div className="h-full overflow-auto py-6">
            <SearchBar />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default BottomNav;
