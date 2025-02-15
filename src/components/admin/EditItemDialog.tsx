
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, X } from 'lucide-react';
import { FileOrFolder } from './types';

interface EditItemDialogProps {
  item: FileOrFolder;
  newName: string;
  setNewName: (name: string) => void;
  newSubtitle: string;
  setNewSubtitle: (subtitle: string) => void;
  newHashtag: string;
  setNewHashtag: (hashtag: string) => void;
  editingHashtags: string[];
  setEditingHashtags: (hashtags: string[]) => void;
  onSave: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EditItemDialog = ({
  item,
  newName,
  setNewName,
  newSubtitle,
  setNewSubtitle,
  newHashtag,
  setNewHashtag,
  editingHashtags,
  setEditingHashtags,
  onSave,
  open,
  onOpenChange
}: EditItemDialogProps) => {
  const addHashtag = () => {
    if (newHashtag && !editingHashtags.includes(newHashtag)) {
      setEditingHashtags([...editingHashtags, newHashtag]);
      setNewHashtag('');
    }
  };

  const removeHashtag = (tag: string) => {
    setEditingHashtags(editingHashtags.filter(t => t !== tag));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {item.type ? 'File' : 'Folder'} Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Enter name"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Subtitle</label>
            <Input
              value={newSubtitle}
              onChange={(e) => setNewSubtitle(e.target.value)}
              placeholder="Enter subtitle"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Hashtags</label>
            <div className="flex flex-wrap gap-1 mb-2">
              {editingHashtags.map(tag => (
                <Badge key={tag} variant="secondary">
                  #{tag}
                  <button
                    onClick={() => removeHashtag(tag)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newHashtag}
                onChange={(e) => setNewHashtag(e.target.value)}
                placeholder="Add hashtag"
              />
              <Button size="sm" onClick={addHashtag}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button onClick={onSave}>
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditItemDialog;
