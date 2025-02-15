
export interface FileOrFolder {
  id: string;
  name: string;
  type?: string;
  size?: number;
  path: string;
  subtitle?: string | null;
  hashtags?: string[] | null;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  folder_path: string;
  created_at: string;
  updated_at: string;
}

export interface FileManagerProps {
  currentPath: string;
  onPathChange: (path: string) => void;
}

