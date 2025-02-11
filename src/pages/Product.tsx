
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import BottomNav from '../components/navigation/BottomNav';
import { Folder } from 'lucide-react';

const Product = () => {
  const { category, business, therapy } = useParams();
  const { t } = useTranslation();

  const fileCategories = [
    'instructions',
    'registration',
    'photos',
    'videos',
    'specs',
    'training',
    'components'
  ];

  // This would come from an API in a real app
  const mockFiles = {
    instructions: [
      { id: 1, name: 'User Manual', description: 'Complete user guide' },
      { id: 2, name: 'Quick Start Guide', description: 'Basic setup instructions' }
    ],
    registration: [
      { id: 3, name: 'CE Certificate', description: 'European certification' },
      { id: 4, name: 'FDA Approval', description: 'US market approval' }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfcfb] to-[#e2d1c3] text-foreground pb-16">
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 animate-fade-in">
          {fileCategories.map((category) => (
            <Sheet key={category}>
              <SheetTrigger className="w-full">
                <Card className="w-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="flex flex-row items-center space-x-4">
                    <Folder className="w-6 h-6" />
                    <CardTitle>{t(`fileCategories.${category}`)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">
                      {mockFiles[category]?.length || 0} files
                    </p>
                  </CardContent>
                </Card>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[80vh]">
                <SheetHeader>
                  <SheetTitle>{t(`fileCategories.${category}`)}</SheetTitle>
                  <SheetDescription>
                    View and download files from this category
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {mockFiles[category]?.map((file) => (
                    <Card key={file.id} className="cursor-pointer hover:bg-accent transition-colors">
                      <CardHeader>
                        <CardTitle className="text-lg">{file.name}</CardTitle>
                        <p className="text-sm text-gray-500">{file.description}</p>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          ))}
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default Product;
