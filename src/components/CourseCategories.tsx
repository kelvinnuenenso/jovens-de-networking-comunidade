
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useCourseCategories } from '@/hooks/useCourseCategories';

interface CourseCategoriesProps {
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
}

export const CourseCategories: React.FC<CourseCategoriesProps> = ({
  selectedCategory,
  onCategorySelect
}) => {
  const { categories, loading } = useCourseCategories();

  if (loading) {
    return <div className="text-center py-4">Carregando categorias...</div>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Categorias de Cursos</h3>
      
      {/* Opção para ver todos */}
      <Card 
        className={`cursor-pointer transition-all hover:shadow-md ${
          selectedCategory === null ? 'border-primary bg-primary/10' : ''
        }`}
        onClick={() => onCategorySelect(null)}
      >
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">📚</div>
            <div>
              <h4 className="font-medium">Todos os Cursos</h4>
              <p className="text-sm text-muted-foreground">Ver todas as aulas disponíveis</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categorias específicas */}
      {categories.map((category) => (
        <Card 
          key={category.id}
          className={`cursor-pointer transition-all hover:shadow-md ${
            selectedCategory === category.id ? 'border-primary bg-primary/10' : ''
          }`}
          onClick={() => onCategorySelect(category.id)}
        >
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg"
                style={{ backgroundColor: category.color || '#3B82F6' }}
              >
                {category.icon || '📁'}
              </div>
              <div>
                <h4 className="font-medium">{category.name}</h4>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
