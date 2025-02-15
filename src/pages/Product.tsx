
import { useEffect, useState } from 'react';
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
import { supabase } from "@/integrations/supabase/client";
import BottomNav from '../components/navigation/BottomNav';
import { Folder } from 'lucide-react';
import { Product } from '../components/admin/types';

const ProductPage = () => {
  const { category, business, therapy } = useParams();
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);

  const fileCategories = [
    'instructions',
    'registration',
    'photos',
    'videos',
    'specs',
    'training',
    'components'
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      const currentPath = `/${category}${business ? `/${business}` : ''}${therapy ? `/${therapy}` : ''}`;
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('folder_path', currentPath);

      if (!error && data) {
        setProducts(data);
      }
    };

    fetchProducts();
  }, [category, business, therapy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfcfb] to-[#e2d1c3] text-foreground pb-16">
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 animate-fade-in">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              {product.image_url && (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                {product.description && (
                  <p className="text-sm text-gray-600">{product.description}</p>
                )}
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {fileCategories.map((category) => (
                    <Sheet key={category}>
                      <SheetTrigger className="w-full">
                        <Card className="w-full hover:shadow-lg transition-shadow duration-300">
                          <CardHeader className="flex flex-row items-center space-x-4">
                            <Folder className="w-6 h-6" />
                            <CardTitle>{t(`fileCategories.${category}`)}</CardTitle>
                          </CardHeader>
                        </Card>
                      </SheetTrigger>
                      <SheetContent side="bottom" className="h-[80vh]">
                        <SheetHeader>
                          <SheetTitle>{t(`fileCategories.${category}`)}</SheetTitle>
                          <SheetDescription>
                            View and download files from this category
                          </SheetDescription>
                        </SheetHeader>
                        {/* Files list will be implemented in the next iteration */}
                      </SheetContent>
                    </Sheet>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default ProductPage;
