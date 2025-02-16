
import { useParams, useNavigate } from 'react-router-dom';
import { useLibraryContent } from '@/hooks/useLibraryContent';
import BottomNav from '../components/navigation/BottomNav';
import FolderItem from '@/components/library/FolderItem';
import FileItem from '@/components/library/FileItem';
import ProductItem from '@/components/library/ProductItem';
import LibraryBreadcrumbs from '@/components/library/LibraryBreadcrumbs';

const Library = () => {
  const { "*": currentPath } = useParams();
  const navigate = useNavigate();
  const path = `/${currentPath || ''}`;
  const { folders, files, products, breadcrumbs } = useLibraryContent(path);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfcfb] to-[#e2d1c3] text-foreground pb-16">
      <main className="container mx-auto px-4 py-8">
        <LibraryBreadcrumbs 
          path={path}
          breadcrumbs={breadcrumbs}
          onNavigate={navigate}
          onBack={() => navigate(-1)}
        />

        <div className="grid gap-4 animate-fade-in">
          {folders.map((folder) => (
            <FolderItem
              key={folder.id}
              {...folder}
              onClick={() => navigate(`/library${folder.path}`)}
            />
          ))}

          {products.map((product) => (
            <ProductItem
              key={product.id}
              {...product}
              onClick={() => navigate(`/product${path}`)}
            />
          ))}

          {files.map((file) => (
            <FileItem
              key={file.id}
              {...file}
            />
          ))}

          {folders.length === 0 && files.length === 0 && products.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Эта папка пуста
            </div>
          )}
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default Library;
