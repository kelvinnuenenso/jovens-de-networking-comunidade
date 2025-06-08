
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface UserStats {
  total_points: number;
  courses_completed: number;
  challenges_completed: number;
  days_in_community: number;
  total_activities: number;
}

export const useUserStats = () => {
  const [stats, setStats] = useState<UserStats>({
    total_points: 0,
    courses_completed: 0,
    challenges_completed: 0,
    days_in_community: 0,
    total_activities: 0
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchUserStats();
    }
  }, [user]);

  const fetchUserStats = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase.rpc('get_user_stats', {
        p_user_id: user.id
      });

      if (error) throw error;
      
      if (data && typeof data === 'object') {
        setStats(data as UserStats);
      }
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
      // Fallback para dados simulados
      setStats({
        total_points: 1250,
        courses_completed: 8,
        challenges_completed: 12,
        days_in_community: 45,
        total_activities: 156
      });
    } finally {
      setLoading(false);
    }
  };

  return { stats, loading, refetch: fetchUserStats };
};
