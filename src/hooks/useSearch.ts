import { useState, useEffect } from 'react';

export interface SearchResult {
  id: string;
  title: string;
  type: 'course' | 'script' | 'event' | 'challenge';
  description?: string;
  category?: string;
}

const mockData: SearchResult[] = [
  { id: '1', title: 'Fundamentos da Edição de Vídeo', type: 'course', category: 'Edição' },
  { id: '2', title: 'Como Viralizar no TikTok', type: 'course', category: 'Marketing' },
  { id: '3', title: 'Roteiro para Review', type: 'script', category: 'Review' },
  { id: '4', title: 'Workshop de Edição', type: 'event' },
  { id: '5', title: 'Desafio 7 Dias', type: 'challenge' }
];

export const useSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    const timeoutId = setTimeout(() => {
      const filtered = mockData.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  return {
    query,
    setQuery,
    results,
    loading
  };
};
