
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

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

interface ProductItem {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
}

export const useLibraryContent = (path: string) => {
  const [folders, setFolders] = useState<FolderItem[]>([]);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [breadcrumbs, setBreadcrumbs] = useState<{ name: string; path: string }[]>([]);

  useEffect(() => {
    const loadContent = async () => {
      const { data: foldersData } = await supabase
        .from('folders')
        .select('*')
        .eq('parent_path', path)
        .order('name');

      if (foldersData) {
        setFolders(foldersData);
      }

      const { data: filesData } = await supabase
        .from('files')
        .select('*')
        .eq('folder_path', path)
        .order('name');

      if (filesData) {
        setFiles(filesData);
      }

      const { data: productsData } = await supabase
        .from('products')
        .select('*')
        .eq('folder_path', path)
        .order('name');

      if (productsData) {
        setProducts(productsData);
      }

      const pathParts = path.split('/').filter(Boolean);
      const breadcrumbsData = await Promise.all(
        pathParts.map(async (_, index) => {
          const currentPathSegment = '/' + pathParts.slice(0, index + 1).join('/');
          const { data } = await supabase
            .from('folders')
            .select('name')
            .eq('path', currentPathSegment)
            .maybeSingle();
          
          return {
            name: data?.name || pathParts[index],
            path: currentPathSegment
          };
        })
      );

      setBreadcrumbs([{ name: 'Root', path: '/' }, ...breadcrumbsData.filter(crumb => crumb.name)]);
    };

    loadContent();
  }, [path]);

  return { folders, files, products, breadcrumbs };
};
