
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, Folder, FileText, ArrowLeft } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import BottomNav from '../components/navigation/BottomNav';
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface FolderItem {
  id: string;
  name: string;
  path: string;
  subtitle: string | null;
}

interface FileItem {
  id: string;
  name: string;
  path: string;
  type: string;
  size: number;
  subtitle: string | null;
}

const Library = () => {
  const { "*": currentPath } = useParams();
  const navigate = useNavigate();
  const [folders, setFolders] = useState<FolderItem[]>([]);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [breadcrumbs, setBreadcrumbs] = useState<{ name: string; path: string }[]>([]);
  const path = `/${currentPath || ''}`;

  useEffect(() => {
    const loadContent = async () => {
      // Загрузка папок
      const { data: foldersData } = await supabase
        .from('folders')
        .select('*')
        .eq('parent_path', path)
        .order('name');

      if (foldersData) {
        setFolders(foldersData);
      }

      // Загрузка файлов
      const { data: filesData } = await supabase
        .from('files')
        .select('*')
        .eq('folder_path', path)
        .order('name');

      if (filesData) {
        setFiles(filesData);
      }

      // Формирование хлебных крошек
      const pathParts = path.split('/').filter(Boolean);
      const breadcrumbsData = await Promise.all(
        pathParts.map(async (_, index) => {
          const currentPathSegment = '/' + pathParts.slice(0, index + 1).join('/');
          const { data } = await supabase
            .from('folders')
            .select('name')
            .eq('path', currentPathSegment)
            .single();
          
          return {
            name: data?.name || pathParts[index],
            path: currentPathSegment
          };
        })
      );

      setBreadcrumbs([{ name: 'Root', path: '/' }, ...breadcrumbsData]);
    };

    loadContent();
  }, [path]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfcfb] to-[#e2d1c3] text-foreground pb-16">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center gap-4">
          {path !== '/' && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="mr-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((crumb, index) => (
                <BreadcrumbItem key={crumb.path}>
                  <BreadcrumbLink 
                    asChild 
                    className="hover:text-blue-500 cursor-pointer"
                    onClick={() => navigate(crumb.path)}
                  >
                    <span>{crumb.name}</span>
                  </BreadcrumbLink>
                  {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                </BreadcrumbItem>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="grid gap-4 animate-fade-in">
          {folders.map((folder) => (
            <div
              key={folder.id}
              onClick={() => navigate(folder.path)}
              className="flex items-center p-4 bg-white/90 rounded-lg shadow hover:shadow-md transition-all cursor-pointer"
            >
              <Folder className="w-5 h-5 text-blue-500 mr-3" />
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{folder.name}</h3>
                {folder.subtitle && (
                  <p className="text-sm text-gray-500">{folder.subtitle}</p>
                )}
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          ))}

          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center p-4 bg-white/90 rounded-lg shadow"
            >
              <FileText className="w-5 h-5 text-gray-500 mr-3" />
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{file.name}</h3>
                {file.subtitle && (
                  <p className="text-sm text-gray-500">{file.subtitle}</p>
                )}
                <p className="text-xs text-gray-400">
                  {formatFileSize(file.size)}
                </p>
              </div>
            </div>
          ))}

          {folders.length === 0 && files.length === 0 && (
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
