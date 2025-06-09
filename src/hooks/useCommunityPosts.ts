
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

  const createPost = async (content: string, imageFile?: File) => {
    if (!user) return { error: 'Usuário não autenticado' };

    try {
      let imageUrl = null;

      // Upload da imagem se fornecida
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${user.id}-${Date.now()}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('community-images')
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('community-images')
          .getPublicUrl(uploadData.path);
        
        imageUrl = urlData.publicUrl;
      }

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

  const updatePost = async (postId: string, content: string) => {
    if (!user) return { error: 'Usuário não autenticado' };

    try {
      const { data, error } = await supabase
        .from('community_posts')
        .update({ content, updated_at: new Date().toISOString() })
        .eq('id', postId)
        .select()
        .single();

      if (error) throw error;

      setPosts(prev => prev.map(post => 
        post.id === postId ? data : post
      ));
      return { data };
    } catch (error) {
      console.error('Erro ao atualizar post:', error);
      return { error };
    }
  };

  const deletePost = async (postId: string) => {
    if (!user) return { error: 'Usuário não autenticado' };

    try {
      const { error } = await supabase
        .from('community_posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;

      setPosts(prev => prev.filter(post => post.id !== postId));
      return { success: true };
    } catch (error) {
      console.error('Erro ao deletar post:', error);
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

        // Atualizar contador manualmente
        setPosts(prev => prev.map(post => 
          post.id === postId 
            ? { ...post, likes_count: Math.max(0, post.likes_count - 1) }
            : post
        ));
      } else {
        // Adicionar curtida
        await supabase
          .from('post_likes')
          .insert({ post_id: postId, user_id: user.id });

        // Atualizar contador manualmente
        setPosts(prev => prev.map(post => 
          post.id === postId 
            ? { ...post, likes_count: post.likes_count + 1 }
            : post
        ));
      }
    } catch (error) {
      console.error('Erro ao curtir post:', error);
    }
  };

  const checkUserRole = async () => {
    if (!user) return null;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      return data?.role;
    } catch (error) {
      console.error('Erro ao verificar role:', error);
      return null;
    }
  };

  return {
    posts,
    loading,
    createPost,
    updatePost,
    deletePost,
    toggleLike,
    checkUserRole,
    refetch: fetchPosts
  };
};
