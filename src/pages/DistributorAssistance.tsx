
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import BottomNav from '../components/navigation/BottomNav';
import { FileText, CheckSquare, ArrowRight, Activity, Calendar, FileCheck, Users } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

const DistributorAssistance = () => {
  const { t } = useTranslation();
  
  const visitSteps = [
    {
      id: 'preparation',
      icon: <Calendar className="w-6 h-6 text-blue-500" />,
      progress: 100,
      tasks: ['Согласовать дату', 'Подготовить материалы', 'Уведомить участников']
    },
    {
      id: 'execution',
      icon: <Activity className="w-6 h-6 text-green-500" />,
      progress: 75,
      tasks: ['Презентация', 'Демонстрация', 'Обсуждение условий']
    },
    {
      id: 'reporting',
      icon: <FileCheck className="w-6 h-6 text-purple-500" />,
      progress: 50,
      tasks: ['Заполнить отчет', 'Загрузить документы', 'Отправить результаты']
    }
  ];

  const documents = [
    { id: 'contract', icon: <FileText />, color: 'from-blue-500 to-blue-700' },
    { id: 'certificate', icon: <CheckSquare />, color: 'from-green-500 to-green-700' },
    { id: 'pricing', icon: <Activity />, color: 'from-orange-500 to-orange-700' },
    { id: 'marketing', icon: <Users />, color: 'from-purple-500 to-purple-700' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfcfb] to-[#e2d1c3] text-foreground pb-16">
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 animate-fade-in">
          <Card className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-white rounded-lg shadow-md">
                  <CheckSquare className="w-6 h-6 text-blue-500" />
                </div>
                <CardTitle>{t('distributor.visitTitle')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                {visitSteps.map((step, index) => (
                  <div key={step.id} className="relative">
                    {index !== visitSteps.length - 1 && (
                      <div className="absolute left-[27px] top-[48px] bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
                    )}
                    <AccordionItem value={step.id} className="border-none">
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-white rounded-lg shadow-md">
                            {step.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold">
                              {t(`distributor.steps.${step.id}`)}
                            </h3>
                            <Progress value={step.progress} className="h-2 mt-2" />
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pl-16">
                        <div className="space-y-4 py-4">
                          {step.tasks.map((task, i) => (
                            <div key={i} className="flex items-center gap-3 text-gray-600">
                              <ArrowRight className="w-4 h-4 text-blue-500" />
                              <span>{task}</span>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </div>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documents.map((doc) => (
              <Card 
                key={doc.id}
                className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
              >
                <div className={`h-2 bg-gradient-to-r ${doc.color}`} />
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white rounded-xl shadow-md group-hover:shadow-lg transition-shadow">
                      {doc.icon}
                    </div>
                    <CardTitle className="text-lg">
                      {t(`distributor.documents.${doc.id}`)}
                    </CardTitle>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default DistributorAssistance;
