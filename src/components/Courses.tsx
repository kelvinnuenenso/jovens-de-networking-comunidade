
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Play, 
  Clock, 
  Star, 
  Users, 
  Search, 
  Filter,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';
import { useCourses } from '@/hooks/useCourses';
import { useCourseCategories } from '@/hooks/useCourseCategories';
import { useAuth } from '@/contexts/AuthContext';
import { CourseEditDialog } from '@/components/CourseEditDialog';
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

      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Buscar aulas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-[200px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Todas as categorias" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todas as categorias</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.name}>
                {category.icon} {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Lista de Cursos */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              {course.thumbnail_url ? (
                <img
                  src={course.thumbnail_url}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <Play className="w-12 h-12 text-primary" />
                </div>
              )}
              <div className="absolute top-2 right-2">
                <Badge variant="secondary" className="bg-black/50 text-white">
                  {course.category}
                </Badge>
              </div>
              {isAdmin && (
                <div className="absolute top-2 left-2 flex gap-1">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-8 w-8 p-0 bg-black/50 hover:bg-black/70"
                    onClick={() => setEditingCourse(course)}
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="h-8 w-8 p-0 bg-red-500/80 hover:bg-red-500"
                    onClick={() => setDeletingCourse(course)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>
            
            <CardHeader className="pb-2">
              <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
              <p className="text-sm text-muted-foreground">por {course.instructor}</p>
            </CardHeader>
            
            <CardContent>
              {course.description && (
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {course.description}
                </p>
              )}
              
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <div className="flex items-center space-x-4">
                  {course.duration && (
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                  )}
                  {course.rating && (
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-current text-yellow-500" />
                      <span>{course.rating}</span>
                    </div>
                  )}
                  {course.students_count && (
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{course.students_count}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <Button className="w-full" size="sm">
                <Play className="w-4 h-4 mr-2" />
                Assistir Agora
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            {searchTerm || selectedCategory ? 
              'Nenhuma aula encontrada com os filtros aplicados.' : 
              'Nenhuma aula disponível no momento.'
            }
          </div>
          {(searchTerm || selectedCategory) && (
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
              }}
            >
              Limpar Filtros
            </Button>
          )}
        </div>
      )}

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
