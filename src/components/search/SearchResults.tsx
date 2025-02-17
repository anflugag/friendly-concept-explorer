
import { FC } from 'react';
import { FileText, Folder, Box } from 'lucide-react';
import FileItem from '../library/FileItem';
import FolderItem from '../library/FolderItem';
import ProductItem from '../library/ProductItem';

interface SearchResultsProps {
  folders: any[];
  files: any[];
  products: any[];
}

const SearchResults: FC<SearchResultsProps> = ({ folders, files, products }) => {
  if (!folders.length && !files.length && !products.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        Ничего не найдено
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {folders.length > 0 && (
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
            <Folder className="w-5 h-5" />
            Папки ({folders.length})
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {folders.map((folder) => (
              <FolderItem key={folder.id} {...folder} />
            ))}
          </div>
        </div>
      )}

      {files.length > 0 && (
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
            <FileText className="w-5 h-5" />
            Файлы ({files.length})
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {files.map((file) => (
              <FileItem key={file.id} {...file} />
            ))}
          </div>
        </div>
      )}

      {products.length > 0 && (
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
            <Box className="w-5 h-5" />
            Продукты ({products.length})
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductItem key={product.id} {...product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
