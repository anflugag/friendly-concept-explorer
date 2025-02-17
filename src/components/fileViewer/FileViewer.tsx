
import { useState } from 'react';
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Heart, Share2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface FileViewerProps {
  fileId: string;
  fileName: string;
  filePath: string;
  fileType: string;
  isFavorite: boolean;
  description?: string | null;
  onClose: () => void;
  open: boolean;
}

const FileViewer = ({ 
  fileId,
  fileName, 
  filePath, 
  fileType, 
  isFavorite: initialIsFavorite,
  description,
  onClose, 
  open 
}: FileViewerProps) => {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const { toast } = useToast();

  const handleToggleFavorite = async () => {
    try {
      const { error } = await supabase
        .from('product_files')
        .update({ is_favorite: !isFavorite })
        .eq('id', fileId);

      if (error) throw error;

      setIsFavorite(!isFavorite);
      toast({
        title: !isFavorite ? "Добавлено в избранное" : "Удалено из избранного",
        description: fileName,
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить статус избранного",
        variant: "destructive",
      });
    }
  };

  const handleShare = async () => {
    try {
      const { data: { publicUrl } } = supabase
        .storage
        .from('admin-files')
        .getPublicUrl(filePath);

      await navigator.clipboard.writeText(publicUrl);
      toast({
        title: "Ссылка скопирована",
        description: "Теперь вы можете поделиться файлом",
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось создать ссылку для шеринга",
        variant: "destructive",
      });
    }
  };

  const renderFilePreview = () => {
    const publicUrl = supabase.storage
      .from('admin-files')
      .getPublicUrl(filePath)
      .data.publicUrl;

    if (fileType.startsWith('image/')) {
      return (
        <img 
          src={publicUrl}
          alt={fileName}
          className="max-h-[80vh] max-w-full object-contain mx-auto"
        />
      );
    }

    if (fileType === 'application/pdf') {
      return (
        <iframe
          src={publicUrl}
          className="w-full h-[80vh]"
          title={fileName}
        />
      );
    }

    // Add more preview types as needed
    return (
      <div className="text-center py-8">
        <p>Предпросмотр для данного типа файла не поддерживается</p>
        <Button className="mt-4" onClick={handleShare}>
          <Share2 className="mr-2" />
          Скачать файл
        </Button>
      </div>
    );
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-[90vw] p-0">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold truncate flex-1">{fileName}</h2>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleToggleFavorite}
              >
                <Heart 
                  className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} 
                />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleShare}
              >
                <Share2 className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-4">
            {renderFilePreview()}
            {description && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">{description}</p>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FileViewer;
