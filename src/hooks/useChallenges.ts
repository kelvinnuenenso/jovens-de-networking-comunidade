import { useState } from 'react';
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

const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Desafio 7 Dias de Conteúdo',
    description: 'Poste um vídeo por dia durante 7 dias consecutivos.',
    duration_days: 7,
    points: 100,
    reward: 'Badge de Consistência',
    status: 'active',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Desafio 1000 Seguidores',
    description: 'Conquiste seus primeiros 1000 seguidores.',
    duration_days: 30,
    points: 500,
    reward: 'Mentoria Individual',
    status: 'active',
    created_at: new Date().toISOString()
  }
];

export const useChallenges = () => {
  const [challenges, setChallenges] = useState<Challenge[]>(mockChallenges);
  const [userChallenges, setUserChallenges] = useState<UserChallenge[]>([]);
  const [loading] = useState(false);
  const { user } = useAuth();

  const createChallenge = async (challengeData: Omit<Challenge, 'id' | 'created_at'>) => {
    const newChallenge: Challenge = {
      id: Date.now().toString(),
      ...challengeData,
      created_at: new Date().toISOString()
    };
    
    setChallenges(prev => [newChallenge, ...prev]);
    return { data: newChallenge };
  };

  const joinChallenge = async (challengeId: string) => {
    if (!user) return { error: 'Usuário não autenticado' };

    const userChallenge: UserChallenge = {
      id: Date.now().toString(),
      user_id: user.id,
      challenge_id: challengeId,
      status: 'active',
      progress: 0,
      started_at: new Date().toISOString(),
      completed_at: null
    };

    setUserChallenges(prev => [...prev, userChallenge]);
    return { data: userChallenge };
  };

  const updateChallengeProgress = async (userChallengeId: string, progress: number) => {
    setUserChallenges(prev => 
      prev.map(uc => 
        uc.id === userChallengeId 
          ? { ...uc, progress, status: progress >= 100 ? 'completed' : 'active' as const }
          : uc
      )
    );
    return { data: { success: true } };
  };

  return {
    challenges,
    userChallenges,
    loading,
    createChallenge,
    joinChallenge,
    updateChallengeProgress,
    refetch: () => {}
  };
};
