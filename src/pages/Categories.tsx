
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import BottomNav from '../components/navigation/BottomNav';

const Categories = () => {
  const { t } = useTranslation();

  const categories = [
    { 
      id: 'nss', 
      description: 'Нейростимуляция и нейромодуляция',
      tags: ['#нейрохирургия', '#SCS', '#DBS']
    },
    { 
      id: 'cardiosurgery', 
      description: 'Кардиохирургические решения',
      tags: ['#кардиохирургия', '#стенты', '#клапаны']
    },
    { 
      id: 'diabetes', 
      description: 'Инновационные решения для диабета',
      tags: ['#диабет', '#инсулин', '#помпы']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfcfb] to-[#e2d1c3] text-foreground pb-16">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-[#151120] mb-2">
            {t('sections.productLibrary')}
          </h1>
          <p className="text-gray-600 text-lg">
            Изучите нашу библиотеку продуктов по категориям. Здесь вы найдете подробную информацию о каждом направлении.
          </p>
        </div>

        <div className="grid gap-6 animate-fade-in">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="p-6 bg-white/80 backdrop-blur-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              style={{
                background: 'linear-gradient(109.6deg, rgba(223,234,247,1) 11.2%, rgba(244,248,252,1) 91.1%)',
              }}
            >
              <div className="space-y-3">
                <h2 className="text-2xl font-bold mb-2 text-[#151120]">
                  {t(`categories.${category.id}`)}
                </h2>
                <p className="text-gray-600">
                  {category.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {category.tags.map((tag, index) => (
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

export default Categories;
