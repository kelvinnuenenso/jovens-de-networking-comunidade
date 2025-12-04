import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export interface KelvinContent {
  id: string;
  title: string;
  description: string | null;
  content_type: 'video' | 'story' | 'live';
  thumbnail_url: string | null;
  video_url: string | null;
  duration: string | null;
  created_by: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

const mockContent: KelvinContent[] = [
  {
    id: '1',
    title: 'Como Cresci de 0 a 100k Seguidores',
    description: 'Minha jornada completa no TikTok',
    content_type: 'video',
    thumbnail_url: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400',
    video_url: null,
    duration: '15:30',
    created_by: 'kelvin',
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Bastidores do Meu Dia',
    description: 'Um dia na vida de um criador de conteúdo',
    content_type: 'story',
    thumbnail_url: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400',
    video_url: null,
    duration: '2:00',
    created_by: 'kelvin',
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const useKelvinContent = () => {
  const [content, setContent] = useState<KelvinContent[]>(mockContent);
  const [loading] = useState(false);
  const { user, isAdmin } = useAuth();

  const createContent = async (contentData: Omit<KelvinContent, 'id' | 'created_by' | 'created_at' | 'updated_at'>) => {
    if (!user) return { error: 'Usuário não autenticado' };

    const newContent: KelvinContent = {
      id: Date.now().toString(),
      ...contentData,
      created_by: user.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    setContent(prev => [newContent, ...prev]);
    return { data: newContent };
  };

  const updateContent = async (id: string, updates: Partial<KelvinContent>) => {
    setContent(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates, updated_at: new Date().toISOString() } : item
    ));
    return { data: { id, ...updates } };
  };

  const deleteContent = async (id: string) => {
    setContent(prev => prev.filter(item => item.id !== id));
    return { success: true };
  };

  return {
    content,
    loading,
    createContent,
    updateContent,
    deleteContent,
    refetch: () => {}
  };
};
