
import { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown, Folder, FolderOpen } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

interface FolderNode {
  id: string;
  name: string;
  path: string;
  children?: FolderNode[];
}

interface FolderTreeProps {
  currentPath: string;
  onSelect: (path: string) => void;
}

const FolderTreeNode = ({ 
  node, 
  level, 
  currentPath,
  onSelect 
}: { 
  node: FolderNode; 
  level: number;
  currentPath: string;
  onSelect: (path: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(currentPath.startsWith(node.path));
  const [children, setChildren] = useState<FolderNode[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const isSelected = currentPath === node.path;

  useEffect(() => {
    if (isOpen) {
      loadChildren();
    }
  }, [isOpen]);

  const loadChildren = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('folders')
      .select('*')
      .eq('parent_path', node.path)
      .order('name');

    if (!error && data) {
      setChildren(data.map(folder => ({
        id: folder.id,
        name: folder.name,
        path: folder.path
      })));
    }
    setIsLoading(false);
  };

  return (
    <div>
      <div 
        className={cn(
          "flex items-center gap-1 py-1 px-2 rounded-md transition-colors hover:bg-accent",
          isSelected && "bg-accent"
        )}
        style={{ marginLeft: `${level * 12}px` }}
      >
        <Button
          variant="ghost"
          size="sm"
          className="h-4 w-4 p-0"
          onClick={() => setIsOpen(!isOpen)}
        >
          {children.length > 0 ? (
            isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
          ) : null}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "flex items-center gap-2 h-6",
            isSelected && "font-semibold"
          )}
          onClick={() => onSelect(node.path)}
        >
          {isOpen ? (
            <FolderOpen className="h-4 w-4" />
          ) : (
            <Folder className="h-4 w-4" />
          )}
          {node.name}
        </Button>
      </div>
      {isOpen && (
        <div>
          {isLoading ? (
            <div className="ml-8 py-2 text-sm text-muted-foreground">
              Loading...
            </div>
          ) : children.map(child => (
            <FolderTreeNode
              key={child.id}
              node={child}
              level={level + 1}
              currentPath={currentPath}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const FolderTree = ({ currentPath, onSelect }: FolderTreeProps) => {
  const [rootFolders, setRootFolders] = useState<FolderNode[]>([]);

  useEffect(() => {
    loadRootFolders();
  }, []);

  const loadRootFolders = async () => {
    const { data, error } = await supabase
      .from('folders')
      .select('*')
      .is('parent_path', null)
      .order('name');

    if (!error && data) {
      setRootFolders(data.map(folder => ({
        id: folder.id,
        name: folder.name,
        path: folder.path
      })));
    }
  };

  return (
    <div className="border rounded-md p-2 bg-background">
      <div className="text-sm font-medium mb-2">Folder Structure</div>
      <div>
        <div 
          className={cn(
            "flex items-center gap-1 py-1 px-2 rounded-md transition-colors hover:bg-accent",
            currentPath === '/' && "bg-accent"
          )}
        >
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 h-6"
            onClick={() => onSelect('/')}
          >
            <Folder className="h-4 w-4" />
            Root
          </Button>
        </div>
        {rootFolders.map(folder => (
          <FolderTreeNode
            key={folder.id}
            node={folder}
            level={1}
            currentPath={currentPath}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default FolderTree;
