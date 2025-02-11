
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ru' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-4 right-4 px-4 py-2 bg-white/80 backdrop-blur-lg text-[#151120] rounded-md hover:bg-white/90 transition-all duration-300 transform hover:scale-105 shadow-lg animate-fade-in"
    >
      {i18n.language === 'en' ? 'RU' : 'EN'}
    </button>
  );
};

export default LanguageSwitcher;
