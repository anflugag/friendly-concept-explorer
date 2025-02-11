
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import BottomNav from '../components/navigation/BottomNav';

const Therapy = () => {
  const { category, business } = useParams();
  const { t } = useTranslation();

  const therapies = ['scs', 'dbs', 'tdd']; // This will be dynamic based on business

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfcfb] to-[#e2d1c3] text-foreground pb-16">
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 animate-fade-in">
          {therapies.map((therapy) => (
            <Link
              key={therapy}
              to={`/category/${category}/business/${business}/therapy/${therapy}`}
              className="p-6 bg-white/80 backdrop-blur-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              style={{
                background: 'linear-gradient(to top, #d299c2 0%, #fef9d7 100%)',
              }}
            >
              <h2 className="text-2xl font-bold mb-4 text-[#151120]">
                {t(`therapies.${therapy}`)}
              </h2>
            </Link>
          ))}
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default Therapy;
