
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useSearch } from '@/hooks/useSearch';

interface SearchComponentProps {
  onClose?: () => void;
}

export const SearchComponent: React.FC<SearchComponentProps> = ({ onClose }) => {
  const { query, setQuery, results, loading } = useSearch();
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setQuery('');
    setIsOpen(false);
    onClose?.();
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'course': return 'Aula';
      case 'script': return 'Roteiro';
      case 'event': return 'Evento';
      case 'challenge': return 'Desafio';
      default: return '';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'course': return 'bg-blue-500/20 text-blue-700';
      case 'script': return 'bg-green-500/20 text-green-700';
      case 'event': return 'bg-purple-500/20 text-purple-700';
      case 'challenge': return 'bg-orange-500/20 text-orange-700';
      default: return 'bg-gray-500/20 text-gray-700';
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Pesquisar aulas, roteiros, eventos..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="pl-10 pr-10"
        />
        {query && (
          <button
            onClick={handleClose}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {isOpen && query.length >= 2 && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 max-h-96 overflow-y-auto">
          <CardContent className="p-2">
            {loading ? (
              <div className="p-4 text-center text-muted-foreground">
                Pesquisando...
              </div>
            ) : results.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                Nenhum resultado encontrado
              </div>
            ) : (
              <div className="space-y-2">
                {results.map((result) => (
                  <div
                    key={`${result.type}-${result.id}`}
                    className="p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                    onClick={handleClose}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{result.title}</h4>
                        {result.description && (
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {result.description}
                          </p>
                        )}
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(result.type)}`}>
                        {getTypeLabel(result.type)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
