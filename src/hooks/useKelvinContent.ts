
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
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

export const useKelvinContent = () => {
  const [content, setContent] = useState<KelvinContent[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('kelvin_content')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContent(data || []);
    } catch (error) {
      console.error('Erro ao buscar conteúdo:', error);
    } finally {
      setLoading(false);
    }
  };

  const createContent = async (contentData: Omit<KelvinContent, 'id' | 'created_by' | 'created_at' | 'updated_at'>) => {
    if (!user) return { error: 'Usuário não autenticado' };

    try {
      const { data, error } = await supabase
        .from('kelvin_content')
        .insert({
          ...contentData,
          created_by: user.id
        })
        .select()
        .single();

      if (error) throw error;

      setContent(prev => [data, ...prev]);
      return { data };
    } catch (error) {
      console.error('Erro ao criar conteúdo:', error);
      return { error };
    }
  };

  const updateContent = async (id: string, updates: Partial<KelvinContent>) => {
    try {
      const { data, error } = await supabase
        .from('kelvin_content')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setContent(prev => prev.map(item => item.id === id ? data : item));
      return { data };
    } catch (error) {
      console.error('Erro ao atualizar conteúdo:', error);
      return { error };
    }
  };

  const deleteContent = async (id: string) => {
    try {
      const { error } = await supabase
        .from('kelvin_content')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setContent(prev => prev.filter(item => item.id !== id));
      return { success: true };
    } catch (error) {
      console.error('Erro ao deletar conteúdo:', error);
      return { error };
    }
  };

  return {
    content,
    loading,
    createContent,
    updateContent,
    deleteContent,
    refetch: fetchContent
  };
};
