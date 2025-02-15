
export interface FileOrFolder {
  id: string;
  name: string;
  type?: string;
  size?: number;
  path: string;
  subtitle?: string | null;
  hashtags?: string[] | null;
}

export interface FileManagerProps {
  currentPath: string;
  onPathChange: (path: string) => void;
}
