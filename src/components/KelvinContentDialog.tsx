
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { KelvinContent } from '@/hooks/useKelvinContent';

interface FormData {
  title: string;
  description: string;
  content_type: 'video' | 'story' | 'live';
  video_url: string;
  thumbnail_url: string;
  duration: string;
  is_published: boolean;
}

interface KelvinContentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingContent: KelvinContent | null;
  formData: FormData;
  onFormDataChange: (data: FormData) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export const KelvinContentDialog: React.FC<KelvinContentDialogProps> = ({
  open,
  onOpenChange,
  editingContent,
  formData,
  onFormDataChange,
  onSubmit,
  onCancel
}) => {
  const updateFormData = (field: keyof FormData, value: any) => {
    onFormDataChange({ ...formData, [field]: value });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {editingContent ? 'Editar Conteúdo' : 'Adicionar Novo Conteúdo'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <Input
            placeholder="Título do conteúdo"
            value={formData.title}
            onChange={(e) => updateFormData('title', e.target.value)}
          />
          
          <Textarea
            placeholder="Descrição"
            value={formData.description}
            onChange={(e) => updateFormData('description', e.target.value)}
            rows={3}
          />
          
          <Select 
            value={formData.content_type} 
            onValueChange={(value: 'video' | 'story' | 'live') => 
              updateFormData('content_type', value)
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="video">Vídeo</SelectItem>
              <SelectItem value="story">Story</SelectItem>
              <SelectItem value="live">Live</SelectItem>
            </SelectContent>
          </Select>
          
          <Input
            placeholder="URL do vídeo"
            value={formData.video_url}
            onChange={(e) => updateFormData('video_url', e.target.value)}
          />
          
          <Input
            placeholder="URL da thumbnail"
            value={formData.thumbnail_url}
            onChange={(e) => updateFormData('thumbnail_url', e.target.value)}
          />
          
          <Input
            placeholder="Duração (ex: 10:30)"
            value={formData.duration}
            onChange={(e) => updateFormData('duration', e.target.value)}
          />
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="published"
              checked={formData.is_published}
              onChange={(e) => updateFormData('is_published', e.target.checked)}
            />
            <label htmlFor="published">Publicar imediatamente</label>
          </div>
          
          <div className="flex space-x-2">
            <Button onClick={onSubmit} disabled={!formData.title}>
              {editingContent ? 'Atualizar' : 'Criar'}
            </Button>
            <Button variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
