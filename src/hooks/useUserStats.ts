import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export interface UserStats {
  total_points: number;
  courses_completed: number;
  challenges_completed: number;
  days_in_community: number;
  total_activities: number;
}

export const useUserStats = () => {
  const [stats] = useState<UserStats>({
    total_points: 150,
    courses_completed: 3,
    challenges_completed: 1,
    days_in_community: 7,
    total_activities: 25
  });
  const [loading] = useState(false);
  const { user } = useAuth();

  return { stats, loading, refetch: () => {} };
};
