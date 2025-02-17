
import { useState } from 'react';
import { FileText, Heart } from 'lucide-react';
import { formatFileSize } from '@/utils/fileUtils';
import FileViewer from '../fileViewer/FileViewer';

interface FileItemProps {
  id: string;
  name: string;
  size: number;
  path: string;
  type: string;
  subtitle: string | null;
  is_favorite?: boolean;
  description?: string | null;
}

const FileItem = ({ 
  id,
  name, 
  size, 
  path,
  type,
  subtitle,
  is_favorite = false,
  description 
}: FileItemProps) => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  return (
    <>
      <div 
        className="flex items-center p-4 bg-white/90 rounded-lg shadow hover:shadow-md transition-all cursor-pointer group"
        onClick={() => setIsViewerOpen(true)}
      >
        <FileText className="w-5 h-5 text-gray-500 mr-3" />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-gray-900">{name}</h3>
            {is_favorite && (
              <Heart className="w-4 h-4 fill-red-500 text-red-500" />
            )}
          </div>
          {subtitle && (
            <p className="text-sm text-gray-500">{subtitle}</p>
          )}
          <p className="text-xs text-gray-400">
            {formatFileSize(size)}
          </p>
        </div>
      </div>

      <FileViewer
        fileId={id}
        fileName={name}
        filePath={path}
        fileType={type}
        isFavorite={is_favorite}
        description={description}
        open={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
      />
    </>
  );
};

export default FileItem;
