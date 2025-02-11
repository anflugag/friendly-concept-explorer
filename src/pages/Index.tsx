
import { useTranslation } from 'react-i18next';
import BottomNav from '../components/navigation/BottomNav';
import LanguageSwitcher from '../components/language/LanguageSwitcher';
import '../i18n/config';

const Index = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background text-foreground pb-16">
      <LanguageSwitcher />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6">
          <section className="p-6 bg-white/80 backdrop-blur-lg rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold mb-4">{t('sections.productLibrary')}</h2>
          </section>

          <section className="p-6 bg-white/80 backdrop-blur-lg rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold mb-4">{t('sections.distributorAssistance')}</h2>
          </section>

          <section className="p-6 bg-white/80 backdrop-blur-lg rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold mb-4">{t('sections.feedback')}</h2>
          </section>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Index;
