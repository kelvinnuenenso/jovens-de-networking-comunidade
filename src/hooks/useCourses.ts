import { useState } from 'react';
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

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Fundamentos da Edição de Vídeo',
    description: 'Aprenda os conceitos básicos de edição para criar vídeos profissionais.',
    instructor: 'Kelvin',
    duration: '2h 30min',
    category: 'Edição de Vídeo',
    thumbnail_url: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400',
    video_url: null,
    rating: 4.8,
    students_count: 1250,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Como Viralizar no TikTok',
    description: 'Estratégias comprovadas para crescer no TikTok.',
    instructor: 'Kelvin',
    duration: '1h 45min',
    category: 'Marketing Digital',
    thumbnail_url: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400',
    video_url: null,
    rating: 4.9,
    students_count: 2800,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Criando Thumbnails que Convertem',
    description: 'Domine a arte de criar miniaturas irresistíveis.',
    instructor: 'Kelvin',
    duration: '1h 15min',
    category: 'Criação de Conteúdo',
    thumbnail_url: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400',
    video_url: null,
    rating: 4.7,
    students_count: 980,
    created_at: new Date().toISOString()
  }
];

export const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [loading] = useState(false);
  const { user } = useAuth();

  const addCourse = async (course: Omit<Course, 'id' | 'created_at'>) => {
    const newCourse: Course = {
      id: Date.now().toString(),
      ...course,
      created_at: new Date().toISOString()
    };

    setCourses(prev => [newCourse, ...prev]);
    return { data: newCourse, error: null };
  };

  const updateCourse = async (id: string, updates: Partial<Course>) => {
    setCourses(prev => prev.map(course => 
      course.id === id ? { ...course, ...updates } : course
    ));
    return { data: { id, ...updates }, error: null };
  };

  const deleteCourse = async (id: string) => {
    setCourses(prev => prev.filter(course => course.id !== id));
    return { error: null };
  };

  return {
    courses,
    loading,
    addCourse,
    updateCourse,
    deleteCourse,
    refetch: () => {}
  };
};
