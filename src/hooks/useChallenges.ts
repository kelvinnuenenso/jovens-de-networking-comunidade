
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
      // Simular dados para user_challenges já que a tabela não existe ainda
      setUserChallenges([]);
    } catch (error) {
      console.error('Erro ao buscar desafios do usuário:', error);
    }
  };

  const createChallenge = async (challengeData: Omit<Challenge, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('challenges')
        .insert({
          ...challengeData,
          status: 'active'
        })
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
      // Simular participação no desafio
      console.log('Participando do desafio:', challengeId);
      return { data: { success: true } };
    } catch (error) {
      console.error('Erro ao participar do desafio:', error);
      return { error };
    }
  };

  const updateChallengeProgress = async (userChallengeId: string, progress: number) => {
    try {
      // Simular atualização de progresso
      console.log('Atualizando progresso:', userChallengeId, progress);
      return { data: { success: true } };
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
