
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const FileUploader = () => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setUploading(true);
    
    for (const file of acceptedFiles) {
      const fileExt = file.name.split('.').pop();
      const filePath = `${crypto.randomUUID()}.${fileExt}`;

      try {
        const { error: uploadError } = await supabase.storage
          .from('admin-files')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { error: dbError } = await supabase
          .from('files')
          .insert({
            name: file.name,
            path: filePath,
            size: file.size,
            type: file.type,
          });

        if (dbError) throw dbError;

        toast({
          title: "Success",
          description: `Uploaded ${file.name} successfully`,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: `Error uploading ${file.name}`,
          variant: "destructive",
        });
        console.error('Error:', error);
      }
    }
    
    setUploading(false);
  }, [toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-primary'}`}
    >
      <input {...getInputProps()} />
      <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
      <p className="text-sm text-gray-600">
        {isDragActive
          ? "Drop the files here..."
          : "Drag 'n' drop files here, or click to select files"}
      </p>
      {uploading && (
        <Button disabled className="mt-4">
          Uploading...
        </Button>
      )}
    </div>
  );
};

export default FileUploader;
