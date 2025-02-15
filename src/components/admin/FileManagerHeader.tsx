
import { Button } from "@/components/ui/button";
import { ChevronLeft } from 'lucide-react';

interface FileManagerHeaderProps {
  currentPath: string;
  onBackClick: () => void;
}

const FileManagerHeader = ({ currentPath, onBackClick }: FileManagerHeaderProps) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Button
        variant="outline"
        size="sm"
        onClick={onBackClick}
        disabled={currentPath === '/'}
      >
        <ChevronLeft className="w-4 h-4" />
        Back
      </Button>
      <span className="text-sm text-gray-500">Current path: {currentPath}</span>
    </div>
  );
};

export default FileManagerHeader;
