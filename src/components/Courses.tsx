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
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export const Courses = () => {
  const { courses, loading, updateCourse, deleteCourse, addCourse, refetch } = useCourses();
  const { categories } = useCourseCategories();
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editingCourse, setEditingCourse] = useState(null);
  const [deletingCourse, setDeletingCourse] = useState(null);
  const [creatingCourse, setCreatingCourse] = useState(false);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEditCourse = async (courseData) => {
    if (!editingCourse) return;
    
    const { error } = await updateCourse(editingCourse.id, courseData);
    if (!error) {
      setEditingCourse(null);
      refetch();
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
      refetch();
    } else {
      toast({
        title: 'Erro',
        description: 'Erro ao excluir curso. Tente novamente.',
        variant: 'destructive',
      });
    }
    setDeletingCourse(null);
  };

  const handleCreateCourse = async (courseData) => {
    const { error } = await addCourse(courseData);
    if (!error) {
      toast({
        title: 'Sucesso',
        description: 'Curso criado com sucesso!',
      });
      setCreatingCourse(false);
      refetch();
    } else {
      toast({
        title: 'Erro',
        description: 'Erro ao criar curso. Tente novamente.',
        variant: 'destructive',
      });
    }
    setCreatingCourse(false);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
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
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-3">
        <div>
          <h1 className="text-3xl font-extrabold mb-2 text-center sm:text-left">Central de Aulas</h1>
          <p className="text-muted-foreground text-center sm:text-left">
            Acesse todo o conteúdo exclusivo da Fábrica de Views
          </p>
        </div>
        {/* Sempre mostrar o botão para debug */}
        <div className="flex flex-col gap-2">
          <Button
            className="flex gap-2 items-center bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg text-lg px-5 py-2 rounded transition"
            onClick={() => setCreatingCourse(true)}
          >
            <Plus className="w-4 h-4" />
            Adicionar Aula {!isAdmin && '(Debug)'}
          </Button>
          <small className="text-xs text-muted-foreground text-center">
            Email: {user?.email} | Admin: {isAdmin ? 'Sim' : 'Não'}
          </small>
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

      {/* Dialog de Criação */}
      <CourseEditDialog
        course={null}
        open={creatingCourse}
        onOpenChange={(open) => !open && setCreatingCourse(false)}
        onSave={handleCreateCourse}
        actionLabel="Adicionar Aula"
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
