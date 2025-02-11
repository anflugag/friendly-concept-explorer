
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import BottomNav from '../components/navigation/BottomNav';

const Categories = () => {
  const { t } = useTranslation();

  const categories = ['nss', 'cardiosurgery', 'diabetes'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfcfb] to-[#e2d1c3] text-foreground pb-16">
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 animate-fade-in">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/category/${category}`}
              className="p-6 bg-white/80 backdrop-blur-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              style={{
                background: 'linear-gradient(109.6deg, rgba(223,234,247,1) 11.2%, rgba(244,248,252,1) 91.1%)',
              }}
            >
              <h2 className="text-2xl font-bold mb-4 text-[#151120]">
                {t(`categories.${category}`)}
              </h2>
            </Link>
          ))}
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default Categories;
