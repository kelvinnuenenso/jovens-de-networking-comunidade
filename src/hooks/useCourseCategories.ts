import { useState } from 'react';

export interface CourseCategory {
  id: string;
  name: string;
  description: string | null;
  color: string | null;
  icon: string | null;
  created_at: string;
}

const mockCategories: CourseCategory[] = [
  {
    id: '1',
    name: 'Edição de Vídeo',
    description: 'Aprenda a editar vídeos profissionais',
    color: '#3B82F6',
    icon: 'video',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Marketing Digital',
    description: 'Estratégias de crescimento nas redes',
    color: '#10B981',
    icon: 'trending-up',
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Criação de Conteúdo',
    description: 'Como criar conteúdo que engaja',
    color: '#F59E0B',
    icon: 'sparkles',
    created_at: new Date().toISOString()
  }
];

export const useCourseCategories = () => {
  const [categories] = useState<CourseCategory[]>(mockCategories);
  const [loading] = useState(false);

  return {
    categories,
    loading,
    refetch: () => {}
  };
};
