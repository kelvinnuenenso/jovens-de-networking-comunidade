
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface CommunityPost {
  id: string;
  user_id: string;
  content: string;
  image_url: string | null;
  likes_count: number;
  comments_count: number;
  created_at: string;
  updated_at: string;
}

export const useCommunityPosts = () => {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('community_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (content: string, imageUrl?: string) => {
    if (!user) return { error: 'Usuário não autenticado' };

    try {
      const { data, error } = await supabase
        .from('community_posts')
        .insert({
          user_id: user.id,
          content,
          image_url: imageUrl
        })
        .select()
        .single();

      if (error) throw error;

      setPosts(prev => [data, ...prev]);
      return { data };
    } catch (error) {
      console.error('Erro ao criar post:', error);
      return { error };
    }
  };

  const toggleLike = async (postId: string) => {
    if (!user) return;

    try {
      // Verificar se já curtiu
      const { data: existingLike } = await supabase
        .from('post_likes')
        .select('id')
        .eq('post_id', postId)
        .eq('user_id', user.id)
        .single();

      if (existingLike) {
        // Remover curtida
        await supabase
          .from('post_likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', user.id);

        // Atualizar contador
        await supabase.rpc('decrement_likes', { post_id: postId });
      } else {
        // Adicionar curtida
        await supabase
          .from('post_likes')
          .insert({ post_id: postId, user_id: user.id });

        // Atualizar contador
        await supabase.rpc('increment_likes', { post_id: postId });
      }

      fetchPosts();
    } catch (error) {
      console.error('Erro ao curtir post:', error);
    }
  };

  return {
    posts,
    loading,
    createPost,
    toggleLike,
    refetch: fetchPosts
  };
};
