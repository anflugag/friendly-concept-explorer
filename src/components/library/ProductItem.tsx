
import { Package, ChevronRight } from 'lucide-react';

interface ProductItemProps {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  onClick: () => void;
}

const ProductItem = ({ name, description, image_url, onClick }: ProductItemProps) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center p-4 bg-white/90 rounded-lg shadow hover:shadow-md transition-all cursor-pointer"
    >
      {image_url ? (
        <img 
          src={image_url} 
          alt={name}
          className="w-12 h-12 object-cover rounded-md mr-3"
        />
      ) : (
        <Package className="w-5 h-5 text-purple-500 mr-3" />
      )}
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{name}</h3>
        {description && (
          <p className="text-sm text-gray-500">{description}</p>
        )}
      </div>
      <ChevronRight className="w-4 h-4 text-gray-400" />
    </div>
  );
};

export default ProductItem;
