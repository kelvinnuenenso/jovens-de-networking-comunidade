
import React from 'react';
import { Search, Filter, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';

interface CourseFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategories: string[];
  onCategoriesChange: (categories: string[]) => void;
  availableCategories: string[];
  showFavoritesOnly: boolean;
  onFavoritesToggle: () => void;
  showCompletedOnly: boolean;
  onCompletedToggle: () => void;
}

export const CourseFilters: React.FC<CourseFiltersProps> = ({
  searchTerm,
  onSearchChange,
  selectedCategories,
  onCategoriesChange,
  availableCategories,
  showFavoritesOnly,
  onFavoritesToggle,
  showCompletedOnly,
  onCompletedToggle
}) => {
  const handleCategoryToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoriesChange(selectedCategories.filter(c => c !== category));
    } else {
      onCategoriesChange([...selectedCategories, category]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Barra de pesquisa */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Pesquisar aulas..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2 items-center">
        {/* Filtro de categorias */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Categorias
              {selectedCategories.length > 0 && (
                <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                  {selectedCategories.length}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {availableCategories.map((category) => (
              <DropdownMenuCheckboxItem
                key={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => handleCategoryToggle(category)}
              >
                {category}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Filtro de favoritos */}
        <Button
          variant={showFavoritesOnly ? "default" : "outline"}
          size="sm"
          onClick={onFavoritesToggle}
        >
          <Star className={`w-4 h-4 mr-2 ${showFavoritesOnly ? 'fill-current' : ''}`} />
          Favoritas
        </Button>

        {/* Filtro de concluídas */}
        <Button
          variant={showCompletedOnly ? "default" : "outline"}
          size="sm"
          onClick={onCompletedToggle}
        >
          Concluídas
        </Button>

        {/* Limpar filtros */}
        {(selectedCategories.length > 0 || showFavoritesOnly || showCompletedOnly || searchTerm) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              onSearchChange('');
              onCategoriesChange([]);
              onFavoritesToggle();
              onCompletedToggle();
            }}
          >
            Limpar filtros
          </Button>
        )}
      </div>

      {/* Tags dos filtros ativos */}
      {selectedCategories.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {selectedCategories.map((category) => (
            <Badge
              key={category}
              variant="secondary"
              className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
              onClick={() => handleCategoryToggle(category)}
            >
              {category} ×
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};
