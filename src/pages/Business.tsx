
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import BottomNav from '../components/navigation/BottomNav';

const Business = () => {
  const { category } = useParams();
  const { t } = useTranslation();

  // Определяем бизнесы для каждой категории
  const businessesByCategory = {
    nss: ['neuromodulation', 'spinalSurgery', 'neuroendoscopy', 'radiosurgery', 'peripheralStimulation', 'intrathecalTherapy'],
    cardiosurgery: ['cardiacSurgery', 'interventionalCardiology', 'electrophysiology', 'structuralHeart', 'vascularSurgery', 'cardiacMonitoring'],
    diabetes: ['insulinPumps', 'glucoseMonitoring', 'diabetesManagement', 'insulinDelivery', 'diabetesEducation', 'metabolicSurgery'],
    orthopedics: ['jointReplacement', 'spineOrtho', 'traumaSurgery', 'sportsOrtho', 'pediatricOrtho', 'arthroscopy'],
    oncology: ['radiotherapy', 'chemotherapy', 'immunotherapy', 'targetedTherapy', 'surgicalOncology', 'nuclearMedicine']
  };

  // Добавляем безопасную проверку и значение по умолчанию
  const businesses = category ? businessesByCategory[category as keyof typeof businessesByCategory] || [] : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfcfb] to-[#e2d1c3] text-foreground pb-16">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-[#151120] mb-2">
            {category ? t(`categories.${category}`) : 'Категория не найдена'}
          </h1>
          <p className="text-gray-600 text-lg">
            Выберите направление терапии
          </p>
        </div>

        <div className="grid gap-6 animate-fade-in">
          {businesses.map((business) => (
            <Link
              key={business}
              to={`/category/${category}/business/${business}`}
              className="p-6 bg-white/80 backdrop-blur-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              style={{
                background: 'linear-gradient(to right, #c1c161 0%, #c1c161 0%, #d4d4b1 100%)',
              }}
            >
              <div className="space-y-3">
                <h2 className="text-2xl font-bold mb-2 text-[#151120]">
                  {t(`businesses.${business}`)}
                </h2>
                <p className="text-gray-600">
                  {getBusinessDescription(business)}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {getBusinessTags(business).map((tag, index) => (
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
          {businesses.length === 0 && (
            <div className="text-center py-8 text-gray-600">
              Направления для данной категории не найдены
            </div>
          )}
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

// Вспомогательные функции для описаний и тегов
const getBusinessDescription = (business: string): string => {
  const descriptions: Record<string, string> = {
    neuromodulation: "Современные методы нейромодуляции и нейростимуляции",
    spinalSurgery: "Хирургическое лечение заболеваний позвоночника",
    neuroendoscopy: "Малоинвазивные эндоскопические вмешательства",
    radiosurgery: "Радиохирургическое лечение заболеваний мозга",
    peripheralStimulation: "Стимуляция периферических нервов",
    intrathecalTherapy: "Интратекальная терапия хронической боли",
    // ... можно добавить описания для остальных направлений
  };
  return descriptions[business] || "";
};

const getBusinessTags = (business: string): string[] => {
  const tags: Record<string, string[]> = {
    neuromodulation: ["#SCS", "#DBS", "#нейростимуляция"],
    spinalSurgery: ["#spine", "#surgery", "#vertebrology"],
    neuroendoscopy: ["#endoscopy", "#neurosurgery"],
    radiosurgery: ["#radiosurgery", "#stereotaxis"],
    peripheralStimulation: ["#PNS", "#stimulation"],
    intrathecalTherapy: ["#pain", "#pump", "#therapy"],
    // ... можно добавить теги для остальных направлений
  };
  return tags[business] || [];
};

export default Business;
