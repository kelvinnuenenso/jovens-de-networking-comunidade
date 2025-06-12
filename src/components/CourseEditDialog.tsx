
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCourseCategories } from '@/hooks/useCourseCategories';
import { Course } from '@/hooks/useCourses';
import { useToast } from '@/hooks/use-toast';

interface CourseEditDialogProps {
  course: Course | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (courseData: Partial<Course>) => Promise<void>;
}

export const CourseEditDialog: React.FC<CourseEditDialogProps> = ({
  course,
  open,
  onOpenChange,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructor: '',
    duration: '',
    category: '',
    thumbnail_url: '',
    video_url: '',
  });
  const [loading, setLoading] = useState(false);
  const { categories } = useCourseCategories();
  const { toast } = useToast();

  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title || '',
        description: course.description || '',
        instructor: course.instructor || '',
        duration: course.duration || '',
        category: course.category || '',
        thumbnail_url: course.thumbnail_url || '',
        video_url: course.video_url || '',
      });
    }
  }, [course]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSave(formData);
      toast({
        title: 'Sucesso',
        description: 'Curso atualizado com sucesso!',
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao atualizar curso. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Curso</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="instructor">Instrutor *</Label>
              <Input
                id="instructor"
                value={formData.instructor}
                onChange={(e) => handleInputChange('instructor', e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="duration">Duração</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                placeholder="Ex: 45 min"
              />
            </div>
            
            <div>
              <Label htmlFor="category">Categoria *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange('category', value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.icon} {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="thumbnail_url">URL da Thumbnail</Label>
            <Input
              id="thumbnail_url"
              value={formData.thumbnail_url}
              onChange={(e) => handleInputChange('thumbnail_url', e.target.value)}
              placeholder="https://exemplo.com/imagem.jpg"
            />
          </div>

          <div>
            <Label htmlFor="video_url">URL do Vídeo</Label>
            <Input
              id="video_url"
              value={formData.video_url}
              onChange={(e) => handleInputChange('video_url', e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
