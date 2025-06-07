
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface UserProgress {
  id: string;
  user_id: string;
  course_id: string;
  is_completed: boolean;
  is_favorite: boolean;
  watch_time: number;
  rating: number | null;
  created_at: string;
  updated_at: string;
}

export const useUserProgress = () => {
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchUserProgress();
    }
  }, [user]);

  const fetchUserProgress = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      setUserProgress(data || []);
    } catch (error) {
      console.error('Erro ao buscar progresso:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsCompleted = async (courseId: string) => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          course_id: courseId,
          is_completed: true,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      
      setUserProgress(prev => {
        const existing = prev.find(p => p.course_id === courseId);
        if (existing) {
          return prev.map(p => p.course_id === courseId ? data : p);
        }
        return [...prev, data];
      });
    } catch (error) {
      console.error('Erro ao marcar como concluída:', error);
    }
  };

  const toggleFavorite = async (courseId: string) => {
    if (!user) return;
    
    try {
      const existing = userProgress.find(p => p.course_id === courseId);
      const isFavorite = existing ? !existing.is_favorite : true;

      const { data, error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          course_id: courseId,
          is_favorite: isFavorite,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      setUserProgress(prev => {
        if (existing) {
          return prev.map(p => p.course_id === courseId ? data : p);
        }
        return [...prev, data];
      });
    } catch (error) {
      console.error('Erro ao favoritar:', error);
    }
  };

  const rateCourse = async (courseId: string, rating: number) => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          course_id: courseId,
          rating,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      setUserProgress(prev => {
        const existing = prev.find(p => p.course_id === courseId);
        if (existing) {
          return prev.map(p => p.course_id === courseId ? data : p);
        }
        return [...prev, data];
      });
    } catch (error) {
      console.error('Erro ao avaliar aula:', error);
    }
  };

  return {
    userProgress,
    loading,
    markAsCompleted,
    toggleFavorite,
    rateCourse,
    refetch: fetchUserProgress
  };
};
