
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useKelvinContent } from '@/hooks/useKelvinContent';
import { useAuth } from '@/contexts/AuthContext';
import { KelvinContentCard } from './KelvinContentCard';
import { KelvinContentDialog } from './KelvinContentDialog';

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
    
    resetForm();
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
    await deleteContent(id);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      content_type: 'video',
      video_url: '',
      thumbnail_url: '',
      duration: '',
      is_published: false
    });
  };

  const handleCancel = () => {
    setShowCreateDialog(false);
    setEditingContent(null);
    resetForm();
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
          <KelvinContentCard
            key={item.id}
            item={item}
            isAdmin={isAdmin}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Create/Edit Dialog */}
      <KelvinContentDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        editingContent={editingContent}
        formData={formData}
        onFormDataChange={setFormData}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
};
