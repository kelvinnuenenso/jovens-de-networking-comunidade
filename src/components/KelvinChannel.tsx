
import React, { useState } from 'react';
import { Plus, Video, Edit, Trash2, Upload } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useKelvinContent } from '@/hooks/useKelvinContent';
import { useAuth } from '@/contexts/AuthContext';

export const KelvinChannel = () => {
  const { content, createContent, updateContent, deleteContent } = useKelvinContent();
  const { user } = useAuth();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingContent, setEditingContent] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content_type: 'video' as 'video' | 'story' | 'live',
    video_url: '',
    thumbnail_url: '',
    duration: '',
    is_published: false
  });

  // Verificar se é admin (simplificado)
  const isAdmin = true; // Você pode implementar verificação real posteriormente

  const handleSubmit = async () => {
    if (editingContent) {
      await updateContent(editingContent.id, formData);
      setEditingContent(null);
    } else {
      await createContent(formData);
    }
    
    setFormData({
      title: '',
      description: '',
      content_type: 'video',
      video_url: '',
      thumbnail_url: '',
      duration: '',
      is_published: false
    });
    setShowCreateDialog(false);
  };

  const handleEdit = (item: any) => {
    setFormData({
      title: item.title,
      description: item.description || '',
      content_type: item.content_type,
      video_url: item.video_url || '',
      thumbnail_url: item.thumbnail_url || '',
      duration: item.duration || '',
      is_published: item.is_published
    });
    setEditingContent(item);
    setShowCreateDialog(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja deletar este conteúdo?')) {
      await deleteContent(id);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Canal do Kelvin</h2>
        {isAdmin && (
          <Button onClick={() => setShowCreateDialog(true)} className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Adicionar Conteúdo</span>
          </Button>
        )}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {content.map((item) => (
          <Card key={item.id} className="glass-effect hover-lift">
            <CardHeader className="p-0">
              <div className="relative">
                <img 
                  src={item.thumbnail_url || '/api/placeholder/300/200'} 
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                  {item.duration || '00:00'}
                </div>
                <div className="absolute top-2 left-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    item.content_type === 'video' ? 'bg-red-500 text-white' :
                    item.content_type === 'story' ? 'bg-purple-500 text-white' :
                    'bg-green-500 text-white'
                  }`}>
                    {item.content_type === 'video' ? 'Vídeo' :
                     item.content_type === 'story' ? 'Story' : 'Live'}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2 line-clamp-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {item.description}
              </p>
              
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Video className="w-4 h-4 mr-2" />
                    Assistir
                  </Button>
                </div>
                
                {isAdmin && (
                  <div className="flex space-x-1">
                    <Button size="sm" variant="ghost" onClick={() => handleEdit(item)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
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
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
            
            <Textarea
              placeholder="Descrição"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
            />
            
            <Select 
              value={formData.content_type} 
              onValueChange={(value: 'video' | 'story' | 'live') => 
                setFormData({...formData, content_type: value})
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
              onChange={(e) => setFormData({...formData, video_url: e.target.value})}
            />
            
            <Input
              placeholder="URL da thumbnail"
              value={formData.thumbnail_url}
              onChange={(e) => setFormData({...formData, thumbnail_url: e.target.value})}
            />
            
            <Input
              placeholder="Duração (ex: 10:30)"
              value={formData.duration}
              onChange={(e) => setFormData({...formData, duration: e.target.value})}
            />
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="published"
                checked={formData.is_published}
                onChange={(e) => setFormData({...formData, is_published: e.target.checked})}
              />
              <label htmlFor="published">Publicar imediatamente</label>
            </div>
            
            <div className="flex space-x-2">
              <Button onClick={handleSubmit} disabled={!formData.title}>
                {editingContent ? 'Atualizar' : 'Criar'}
              </Button>
              <Button variant="outline" onClick={() => {
                setShowCreateDialog(false);
                setEditingContent(null);
                setFormData({
                  title: '',
                  description: '',
                  content_type: 'video',
                  video_url: '',
                  thumbnail_url: '',
                  duration: '',
                  is_published: false
                });
              }}>
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
