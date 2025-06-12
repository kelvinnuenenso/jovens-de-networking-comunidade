
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Course {
  id: string;
  title: string;
  description: string | null;
  instructor: string;
  duration: string | null;
  category: string;
  thumbnail_url: string | null;
  video_url: string | null;
  rating: number | null;
  students_count: number | null;
  created_at: string;
}

export const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchCourses();
    }
  }, [user]);

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCourses(data || []);
    } catch (error) {
      console.error('Erro ao buscar aulas:', error);
    } finally {
      setLoading(false);
    }
  };

  const addCourse = async (course: Omit<Course, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .insert([course])
        .select()
        .single();

      if (error) throw error;

      setCourses(prev => [data, ...prev]);
      return { data, error: null };
    } catch (error) {
      console.error('Erro ao adicionar aula:', error);
      return { data: null, error };
    }
  };

  const updateCourse = async (id: string, updates: Partial<Course>) => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setCourses(prev => prev.map(course => 
        course.id === id ? data : course
      ));
      return { data, error: null };
    } catch (error) {
      console.error('Erro ao atualizar aula:', error);
      return { data: null, error };
    }
  };

  const deleteCourse = async (id: string) => {
    try {
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setCourses(prev => prev.filter(course => course.id !== id));
      return { error: null };
    } catch (error) {
      console.error('Erro ao deletar aula:', error);
      return { error };
    }
  };

  return {
    courses,
    loading,
    addCourse,
    updateCourse,
    deleteCourse,
    refetch: fetchCourses
  };
};
