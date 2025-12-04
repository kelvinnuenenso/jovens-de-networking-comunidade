import { useState } from 'react';

export interface TrendingTopic {
  id: string;
  title: string;
  description: string | null;
  posts_count: number;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

const mockTopics: TrendingTopic[] = [
  {
    id: '1',
    title: '#TikTokGrowth',
    description: 'Dicas para crescer no TikTok',
    posts_count: 245,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true
  },
  {
    id: '2',
    title: '#VideoEditing',
    description: 'Técnicas de edição de vídeo',
    posts_count: 189,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true
  },
  {
    id: '3',
    title: '#ContentCreator',
    description: 'Vida de criador de conteúdo',
    posts_count: 156,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true
  }
];

export const useTrendingTopics = () => {
  const [topics] = useState<TrendingTopic[]>(mockTopics);
  const [loading] = useState(false);

  return {
    topics,
    loading,
    refetch: () => {}
  };
};
