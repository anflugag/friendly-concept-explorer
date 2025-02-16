
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface LibraryBreadcrumbsProps {
  path: string;
  breadcrumbs: { name: string; path: string }[];
  onNavigate: (path: string) => void;
  onBack: () => void;
}

const LibraryBreadcrumbs = ({ path, breadcrumbs, onNavigate, onBack }: LibraryBreadcrumbsProps) => {
  return (
    <div className="mb-6 flex items-center gap-4">
      {path !== '/' && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
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
                onClick={() => onNavigate(`/library${crumb.path}`)}
              >
                <span>{crumb.name}</span>
              </BreadcrumbLink>
              {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default LibraryBreadcrumbs;
