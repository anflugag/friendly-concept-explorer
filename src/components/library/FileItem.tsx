
import { FileText } from 'lucide-react';
import { formatFileSize } from '@/utils/fileUtils';

interface FileItemProps {
  id: string;
  name: string;
  size: number;
  subtitle: string | null;
}

const FileItem = ({ name, size, subtitle }: FileItemProps) => {
  return (
    <div className="flex items-center p-4 bg-white/90 rounded-lg shadow">
      <FileText className="w-5 h-5 text-gray-500 mr-3" />
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{name}</h3>
        {subtitle && (
          <p className="text-sm text-gray-500">{subtitle}</p>
        )}
        <p className="text-xs text-gray-400">
          {formatFileSize(size)}
        </p>
      </div>
    </div>
  );
};

export default FileItem;
