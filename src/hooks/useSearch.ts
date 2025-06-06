
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface SearchResult {
  id: string;
  title: string;
  type: 'course' | 'script' | 'event' | 'challenge';
  description?: string;
  category?: string;
}

export const useSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const performSearch = async (searchQuery: string) => {
    setLoading(true);
    try {
      const searchTerm = `%${searchQuery}%`;
      
      const [coursesRes, scriptsRes, eventsRes, challengesRes] = await Promise.all([
        supabase
          .from('courses')
          .select('id, title, description, category')
          .ilike('title', searchTerm)
          .limit(5),
        supabase
          .from('scripts')
          .select('id, title, description, category')
          .ilike('title', searchTerm)
          .limit(5),
        supabase
          .from('events')
          .select('id, title, description')
          .ilike('title', searchTerm)
          .limit(5),
        supabase
          .from('challenges')
          .select('id, title, description')
          .ilike('title', searchTerm)
          .limit(5)
      ]);

      const searchResults: SearchResult[] = [
        ...(coursesRes.data || []).map(item => ({ ...item, type: 'course' as const })),
        ...(scriptsRes.data || []).map(item => ({ ...item, type: 'script' as const })),
        ...(eventsRes.data || []).map(item => ({ ...item, type: 'event' as const })),
        ...(challengesRes.data || []).map(item => ({ ...item, type: 'challenge' as const }))
      ];

      setResults(searchResults);
    } catch (error) {
      console.error('Erro na busca:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    query,
    setQuery,
    results,
    loading
  };
};
