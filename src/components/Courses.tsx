
import React, { useState } from 'react';
import { useCourses } from '@/hooks/useCourses';
import { useCourseCategories } from '@/hooks/useCourseCategories';
import { useAuth } from '@/contexts/AuthContext';
import { CourseEditDialog } from '@/components/CourseEditDialog';
import { CourseFilters } from '@/components/CourseFilters';
import { CoursesGrid } from '@/components/CoursesGrid';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export const Courses = () => {
  const { courses, loading, updateCourse, deleteCourse } = useCourses();
  const { categories } = useCourseCategories();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [editingCourse, setEditingCourse] = useState(null);
  const [deletingCourse, setDeletingCourse] = useState(null);

  const isAdmin = user?.user_metadata?.role === 'admin';

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEditCourse = async (courseData) => {
    if (!editingCourse) return;
    
    const { error } = await updateCourse(editingCourse.id, courseData);
    if (!error) {
      setEditingCourse(null);
    }
  };

  const handleDeleteCourse = async () => {
    if (!deletingCourse) return;
    
    const { error } = await deleteCourse(deletingCourse.id);
    if (!error) {
      toast({
        title: 'Sucesso',
        description: 'Curso excluído com sucesso!',
      });
    } else {
      toast({
        title: 'Erro',
        description: 'Erro ao excluir curso. Tente novamente.',
        variant: 'destructive',
      });
    }
    setDeletingCourse(null);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Carregando aulas...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Central de Aulas</h1>
          <p className="text-muted-foreground">
            Acesse todo o conteúdo exclusivo da Fábrica de Views
          </p>
        </div>
      </div>

      <CourseFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
      />

      <CoursesGrid
        courses={filteredCourses}
        isAdmin={isAdmin}
        onEditCourse={setEditingCourse}
        onDeleteCourse={setDeletingCourse}
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        onClearFilters={handleClearFilters}
      />

      {/* Dialog de Edição */}
      <CourseEditDialog
        course={editingCourse}
        open={!!editingCourse}
        onOpenChange={(open) => !open && setEditingCourse(null)}
        onSave={handleEditCourse}
      />

      {/* Dialog de Confirmação de Exclusão */}
      <AlertDialog open={!!deletingCourse} onOpenChange={(open) => !open && setDeletingCourse(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o curso "{deletingCourse?.title}"? 
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteCourse} className="bg-red-600 hover:bg-red-700">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
