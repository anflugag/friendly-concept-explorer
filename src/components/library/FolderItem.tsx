
import { Folder, ChevronRight } from 'lucide-react';

interface FolderItemProps {
  id: string;
  name: string;
  path: string;
  subtitle: string | null;
  onClick: () => void;
}

const FolderItem = ({ name, subtitle, onClick }: FolderItemProps) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center p-4 bg-white/90 rounded-lg shadow hover:shadow-md transition-all cursor-pointer"
    >
      <Folder className="w-5 h-5 text-blue-500 mr-3" />
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{name}</h3>
        {subtitle && (
          <p className="text-sm text-gray-500">{subtitle}</p>
        )}
      </div>
      <ChevronRight className="w-4 h-4 text-gray-400" />
    </div>
  );
};

export default FolderItem;
