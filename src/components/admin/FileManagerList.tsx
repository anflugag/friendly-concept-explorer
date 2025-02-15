
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Folder, File, Edit, Trash2 } from 'lucide-react';
import { FileOrFolder } from './types';

interface FileManagerListProps {
  items: FileOrFolder[];
  onFolderClick: (path: string) => void;
  onEditClick: (item: FileOrFolder) => void;
  onDeleteClick: (id: string, path: string, isFolder: boolean) => void;
}

const FileManagerList = ({
  items,
  onFolderClick,
  onEditClick,
  onDeleteClick
}: FileManagerListProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name & Metadata</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <div className="space-y-2">
                  <div 
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => item.type ? null : onFolderClick(item.path)}
                  >
                    {item.type ? (
                      <File className="w-4 h-4" />
                    ) : (
                      <Folder className="w-4 h-4" />
                    )}
                    <span className="font-medium">{item.name}</span>
                  </div>
                  {item.subtitle && (
                    <p className="text-sm text-gray-500">{item.subtitle}</p>
                  )}
                  {item.hashtags && item.hashtags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {item.hashtags.map(tag => (
                        <Badge key={tag} variant="secondary">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>{item.size ? `${Math.round(item.size / 1024)} KB` : '-'}</TableCell>
              <TableCell>{item.type || 'Folder'}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEditClick(item)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onDeleteClick(item.id, item.path, !item.type)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default FileManagerList;

