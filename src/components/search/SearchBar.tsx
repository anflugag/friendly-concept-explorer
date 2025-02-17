
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import SearchResults from './SearchResults';
import { useDebounce } from '@/hooks/useDebounce';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [products, setProducts] = useState([]);
  
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const searchContent = async () => {
      if (!debouncedQuery.trim()) {
        setFolders([]);
        setFiles([]);
        setProducts([]);
        return;
      }

      setIsSearching(true);
      try {
        const searchTerm = `%${debouncedQuery.toLowerCase()}%`;

        // Search in folders
        const { data: foldersData } = await supabase
          .from('folders')
          .select('*')
          .or(`name.ilike.${searchTerm},subtitle.ilike.${searchTerm}`);

        // Search in files
        const { data: filesData } = await supabase
          .from('files')
          .select('*')
          .or(`name.ilike.${searchTerm},subtitle.ilike.${searchTerm}`);

        // Search in products
        const { data: productsData } = await supabase
          .from('products')
          .select('*')
          .or(`name.ilike.${searchTerm},description.ilike.${searchTerm}`);

        setFolders(foldersData || []);
        setFiles(filesData || []);
        setProducts(productsData || []);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsSearching(false);
      }
    };

    searchContent();
  }, [debouncedQuery]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="search"
          placeholder="Поиск по всему контенту..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {(query || isSearching) && (
        <div className="mt-6">
          {isSearching ? (
            <div className="text-center py-8 text-gray-500">
              Поиск...
            </div>
          ) : (
            <SearchResults 
              folders={folders}
              files={files}
              products={products}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
