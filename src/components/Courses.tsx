import React, { useState, useMemo } from 'react';
import { Play, Clock, Users, Star, Plus, BookOpen, Heart, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useCourses } from '@/hooks/useCourses';
import { useUserProgress } from '@/hooks/useUserProgress';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { VideoPlayer } from '@/components/VideoPlayer';
import { CourseFilters } from '@/components/CourseFilters';

export const Courses = () => {
  const { courses, loading, addCourse } = useCourses();
  const { userProgress, markAsCompleted, toggleFavorite, rateCourse } = useUserProgress();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  
  // Estados dos filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [showCompletedOnly, setShowCompletedOnly] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructor: '',
    duration: '',
    category: '',
    thumbnail_url: '',
    video_url: ''
  });

  // Check if user is admin
  React.useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();
        
        setIsAdmin(data?.role === 'admin');
      }
    };
    checkAdminStatus();
  }, [user]);

  // Categorias disponíveis
  const availableCategories = useMemo(() => {
    return Array.from(new Set(courses.map(course => course.category)));
  }, [courses]);

  // Filtrar aulas
  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      // Filtro de busca
      if (searchTerm && !course.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !course.instructor.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Filtro de categoria
      if (selectedCategories.length > 0 && !selectedCategories.includes(course.category)) {
        return false;
      }

      const progress = userProgress.find(p => p.course_id === course.id);

      // Filtro de favoritos
      if (showFavoritesOnly && !progress?.is_favorite) {
        return false;
      }

      // Filtro de concluídas
      if (showCompletedOnly && !progress?.is_completed) {
        return false;
      }

      return true;
    });
  }, [courses, userProgress, searchTerm, selectedCategories, showFavoritesOnly, showCompletedOnly]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await addCourse({
      ...formData,
      rating: 0,
      students_count: 0
    });

    if (error) {
      toast({
        title: 'Erro ao adicionar aula',
        description: 'Tente novamente mais tarde.',
        variant: 'destructive'
      });
    } else {
      toast({
        title: 'Aula adicionada com sucesso!',
        description: 'A nova aula está disponível para os alunos.'
      });
      setFormData({
        title: '',
        description: '',
        instructor: '',
        duration: '',
        category: '',
        thumbnail_url: '',
        video_url: ''
      });
      setShowAddForm(false);
    }
  };

  const handleWatchCourse = (course: any) => {
    setSelectedCourse(course);
  };

  const handleMarkCompleted = async () => {
    if (selectedCourse) {
      await markAsCompleted(selectedCourse.id);
      toast({
        title: 'Aula concluída!',
        description: 'Parabéns por completar esta aula.'
      });
    }
  };

  const handleToggleFavorite = async (courseId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await toggleFavorite(courseId);
  };

  const handleRating = async (courseId: string, rating: number) => {
    await rateCourse(courseId, rating);
    toast({
      title: 'Avaliação enviada!',
      description: 'Obrigado pelo seu feedback.'
    });
  };

  const getCourseProgress = (courseId: string) => {
    return userProgress.find(p => p.course_id === courseId);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando aulas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Central de Aulas</h2>
          <p className="text-muted-foreground">
            Aprenda com especialistas e domine o TikTok
          </p>
        </div>
        
        {isAdmin && (
          <Button onClick={() => setShowAddForm(!showAddForm)}>
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Aula
          </Button>
        )}
      </div>

      {/* Filtros */}
      <CourseFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategories={selectedCategories}
        onCategoriesChange={setSelectedCategories}
        availableCategories={availableCategories}
        showFavoritesOnly={showFavoritesOnly}
        onFavoritesToggle={() => setShowFavoritesOnly(!showFavoritesOnly)}
        showCompletedOnly={showCompletedOnly}
        onCompletedToggle={() => setShowCompletedOnly(!showCompletedOnly)}
      />

      {/* Add Course Form */}
      {showAddForm && isAdmin && (
        <Card>
          <CardHeader>
            <CardTitle>Adicionar Nova Aula</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Título da aula"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  required
                />
                <Input
                  placeholder="Instrutor"
                  value={formData.instructor}
                  onChange={(e) => setFormData(prev => ({ ...prev, instructor: e.target.value }))}
                  required
                />
                <Input
                  placeholder="Duração (ex: 45min)"
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                />
                <Input
                  placeholder="Categoria"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  required
                />
                <Input
                  placeholder="URL da thumbnail"
                  value={formData.thumbnail_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, thumbnail_url: e.target.value }))}
                />
                <Input
                  placeholder="URL do vídeo"
                  value={formData.video_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, video_url: e.target.value }))}
                />
              </div>
              <Textarea
                placeholder="Descrição da aula"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
              />
              <div className="flex space-x-2">
                <Button type="submit">Adicionar Aula</Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Courses Grid */}
      {filteredCourses.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {courses.length === 0 ? 'Nenhuma aula disponível' : 'Nenhuma aula encontrada'}
            </h3>
            <p className="text-muted-foreground">
              {courses.length === 0 
                ? (isAdmin ? 'Adicione a primeira aula clicando no botão acima.' : 'As aulas serão adicionadas em breve.')
                : 'Tente ajustar os filtros para encontrar mais aulas.'
              }
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => {
            const progress = getCourseProgress(course.id);
            return (
              <Card 
                key={course.id} 
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer relative"
                onClick={() => handleWatchCourse(course)}
              >
                {/* Status badges */}
                <div className="absolute top-2 right-2 z-10 flex gap-1">
                  {progress?.is_completed && (
                    <div className="bg-green-500 text-white p-1 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-8 w-8 ${progress?.is_favorite ? 'text-red-500' : 'text-white'} hover:text-red-500`}
                    onClick={(e) => handleToggleFavorite(course.id, e)}
                  >
                    <Heart className={`w-4 h-4 ${progress?.is_favorite ? 'fill-current' : ''}`} />
                  </Button>
                </div>

                <div className="aspect-video bg-muted rounded-t-lg relative overflow-hidden">
                  {course.thumbnail_url ? (
                    <img 
                      src={course.thumbnail_url} 
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Play className="w-12 h-12 text-muted-foreground" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                    <Button size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Play className="w-4 h-4 mr-2" />
                      Assistir
                    </Button>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                      {course.category}
                    </span>
                    {course.rating && course.rating > 0 && (
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-muted-foreground">{course.rating}</span>
                      </div>
                    )}
                  </div>
                  
                  <h3 className="font-semibold text-sm mb-2 line-clamp-2">{course.title}</h3>
                  
                  {course.description && (
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-3">
                      {course.description}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {course.duration || 'N/A'}
                    </span>
                    <span className="flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      {course.students_count || 0}
                    </span>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mt-2">
                    Instrutor: {course.instructor}
                  </p>
                  
                  {/* Rating */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3 h-3 cursor-pointer ${
                            (progress?.rating || 0) >= star
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRating(course.id, star);
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {progress?.rating ? `${progress.rating}/5` : 'Não avaliado'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Video Player Dialog */}
      <Dialog open={!!selectedCourse} onOpenChange={() => setSelectedCourse(null)}>
        <DialogContent className="max-w-4xl w-full">
          <DialogHeader>
            <DialogTitle>{selectedCourse?.title}</DialogTitle>
          </DialogHeader>
          {selectedCourse?.video_url && (
            <VideoPlayer
              videoUrl={selectedCourse.video_url}
              courseId={selectedCourse.id}
              onMarkCompleted={handleMarkCompleted}
            />
          )}
          <div className="mt-4">
            <p className="text-sm text-muted-foreground mb-2">
              Instrutor: {selectedCourse?.instructor}
            </p>
            {selectedCourse?.description && (
              <p className="text-sm">{selectedCourse.description}</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
