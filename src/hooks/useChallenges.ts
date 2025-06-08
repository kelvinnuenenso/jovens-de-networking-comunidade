
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Challenge {
  id: string;
  title: string;
  description: string | null;
  duration_days: number;
  points: number | null;
  reward: string | null;
  status: string | null;
  created_at: string;
}

export interface UserChallenge {
  id: string;
  user_id: string;
  challenge_id: string;
  status: 'active' | 'completed' | 'failed';
  progress: number;
  started_at: string;
  completed_at: string | null;
  challenge: Challenge;
}

export const useChallenges = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [userChallenges, setUserChallenges] = useState<UserChallenge[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchChallenges();
    if (user) {
      fetchUserChallenges();
    }
  }, [user]);

  const fetchChallenges = async () => {
    try {
      const { data, error } = await supabase
        .from('challenges')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setChallenges(data || []);
    } catch (error) {
      console.error('Erro ao buscar desafios:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserChallenges = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_challenges')
        .select(`
          *,
          challenge:challenges(*)
        `)
        .eq('user_id', user.id);

      if (error) throw error;
      setUserChallenges(data || []);
    } catch (error) {
      console.error('Erro ao buscar desafios do usuário:', error);
    }
  };

  const createChallenge = async (challengeData: Omit<Challenge, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('challenges')
        .insert(challengeData)
        .select()
        .single();

      if (error) throw error;

      setChallenges(prev => [data, ...prev]);
      return { data };
    } catch (error) {
      console.error('Erro ao criar desafio:', error);
      return { error };
    }
  };

  const joinChallenge = async (challengeId: string) => {
    if (!user) return { error: 'Usuário não autenticado' };

    try {
      const { data, error } = await supabase
        .from('user_challenges')
        .insert({
          user_id: user.id,
          challenge_id: challengeId,
          status: 'active',
          progress: 0
        })
        .select()
        .single();

      if (error) throw error;

      fetchUserChallenges();
      return { data };
    } catch (error) {
      console.error('Erro ao participar do desafio:', error);
      return { error };
    }
  };

  const updateChallengeProgress = async (userChallengeId: string, progress: number) => {
    try {
      const { data, error } = await supabase
        .from('user_challenges')
        .update({ 
          progress,
          ...(progress >= 100 ? { status: 'completed', completed_at: new Date().toISOString() } : {})
        })
        .eq('id', userChallengeId)
        .select()
        .single();

      if (error) throw error;

      fetchUserChallenges();
      return { data };
    } catch (error) {
      console.error('Erro ao atualizar progresso:', error);
      return { error };
    }
  };

  return {
    challenges,
    userChallenges,
    loading,
    createChallenge,
    joinChallenge,
    updateChallengeProgress,
    refetch: fetchChallenges
  };
};
