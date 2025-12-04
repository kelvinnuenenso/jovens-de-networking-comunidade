import { useState } from 'react';
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
  const [loading] = useState(false);
  const { user } = useAuth();

  const markAsCompleted = async (courseId: string) => {
    if (!user) return;
    
    const progress: UserProgress = {
      id: Date.now().toString(),
      user_id: user.id,
      course_id: courseId,
      is_completed: true,
      is_favorite: false,
      watch_time: 0,
      rating: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    setUserProgress(prev => {
      const existing = prev.find(p => p.course_id === courseId);
      if (existing) {
        return prev.map(p => p.course_id === courseId ? { ...p, is_completed: true } : p);
      }
      return [...prev, progress];
    });
  };

  const toggleFavorite = async (courseId: string) => {
    if (!user) return;
    
    setUserProgress(prev => {
      const existing = prev.find(p => p.course_id === courseId);
      if (existing) {
        return prev.map(p => p.course_id === courseId ? { ...p, is_favorite: !p.is_favorite } : p);
      }
      const progress: UserProgress = {
        id: Date.now().toString(),
        user_id: user.id,
        course_id: courseId,
        is_completed: false,
        is_favorite: true,
        watch_time: 0,
        rating: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      return [...prev, progress];
    });
  };

  const rateCourse = async (courseId: string, rating: number) => {
    if (!user) return;
    
    setUserProgress(prev => {
      const existing = prev.find(p => p.course_id === courseId);
      if (existing) {
        return prev.map(p => p.course_id === courseId ? { ...p, rating } : p);
      }
      const progress: UserProgress = {
        id: Date.now().toString(),
        user_id: user.id,
        course_id: courseId,
        is_completed: false,
        is_favorite: false,
        watch_time: 0,
        rating,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      return [...prev, progress];
    });
  };

  return {
    userProgress,
    loading,
    markAsCompleted,
    toggleFavorite,
    rateCourse,
    refetch: () => {}
  };
};
