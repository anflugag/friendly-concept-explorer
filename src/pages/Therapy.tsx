
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import BottomNav from '../components/navigation/BottomNav';

const Therapy = () => {
  const { category, business } = useParams();
  const { t } = useTranslation();

  // Определяем терапии только для нейромодуляции
  const therapiesByBusiness = {
    neuromodulation: ['scs', 'dbs', 'tdd'],
    // Для остальных бизнесов терапии будут добавлены позже
  };

  const therapies = business === 'neuromodulation' ? therapiesByBusiness.neuromodulation : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfcfb] to-[#e2d1c3] text-foreground pb-16">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-[#151120] mb-2">
            {t(`businesses.${business}`)}
          </h1>
          <p className="text-gray-600 text-lg">
            Выберите тип терапии
          </p>
        </div>

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
              <div className="space-y-3">
                <h2 className="text-2xl font-bold mb-2 text-[#151120]">
                  {t(`therapies.${therapy}`)}
                </h2>
                <p className="text-gray-600">
                  {getTherapyDescription(therapy)}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {getTherapyTags(therapy).map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs rounded-full bg-blue-500/10 text-blue-700 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

// Вспомогательные функции для описаний и тегов терапий
const getTherapyDescription = (therapy: string): string => {
  const descriptions: Record<string, string> = {
    scs: "Стимуляция спинного мозга для лечения хронической боли",
    dbs: "Глубокая стимуляция мозга при двигательных расстройствах",
    tdd: "Целевая доставка лекарственных препаратов",
  };
  return descriptions[therapy] || "";
};

const getTherapyTags = (therapy: string): string[] => {
  const tags: Record<string, string[]> = {
    scs: ["#SCS", "#pain", "#neuromodulation"],
    dbs: ["#DBS", "#movement", "#neuromodulation"],
    tdd: ["#TDD", "#drug", "#delivery"],
  };
  return tags[therapy] || [];
};

export default Therapy;
