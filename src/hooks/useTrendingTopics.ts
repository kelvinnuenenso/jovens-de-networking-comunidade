
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface TrendingTopic {
  id: string;
  title: string;
  description: string | null;
  posts_count: number;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export const useTrendingTopics = () => {
  const [topics, setTopics] = useState<TrendingTopic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      const { data, error } = await supabase
        .from('trending_topics')
        .select('*')
        .eq('is_active', true)
        .order('posts_count', { ascending: false });

      if (error) throw error;
      setTopics(data || []);
    } catch (error) {
      console.error('Erro ao buscar trending topics:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    topics,
    loading,
    refetch: fetchTopics
  };
};
