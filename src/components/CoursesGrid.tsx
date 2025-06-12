
import React from 'react';
import { Button } from '@/components/ui/button';
import { Course } from '@/hooks/useCourses';
import { CourseCard } from '@/components/CourseCard';

interface CoursesGridProps {
  courses: Course[];
  isAdmin: boolean;
  onEditCourse: (course: Course) => void;
  onDeleteCourse: (course: Course) => void;
  searchTerm: string;
  selectedCategory: string;
  onClearFilters: () => void;
}

export const CoursesGrid: React.FC<CoursesGridProps> = ({
  courses,
  isAdmin,
  onEditCourse,
  onDeleteCourse,
  searchTerm,
  selectedCategory,
  onClearFilters,
}) => {
  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground mb-4">
          {searchTerm || selectedCategory ? 
            'Nenhuma aula encontrada com os filtros aplicados.' : 
            'Nenhuma aula disponível no momento.'
          }
        </div>
        {(searchTerm || selectedCategory) && (
          <Button variant="outline" onClick={onClearFilters}>
            Limpar Filtros
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          isAdmin={isAdmin}
          onEdit={onEditCourse}
          onDelete={onDeleteCourse}
        />
      ))}
    </div>
  );
};
