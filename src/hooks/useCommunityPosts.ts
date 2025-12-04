import { useState } from 'react';
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
  user_name?: string;
}

const mockPosts: CommunityPost[] = [
  {
    id: '1',
    user_id: 'user1',
    content: 'Acabei de postar meu primeiro vídeo seguindo as dicas do curso! 🎉',
    image_url: null,
    likes_count: 15,
    comments_count: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    user_name: 'Maria Silva'
  },
  {
    id: '2',
    user_id: 'user2',
    content: 'Consegui 1000 views no meu último vídeo! As técnicas funcionam mesmo!',
    image_url: null,
    likes_count: 42,
    comments_count: 8,
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
    user_name: 'João Santos'
  }
];

export const useCommunityPosts = () => {
  const [posts, setPosts] = useState<CommunityPost[]>(mockPosts);
  const [loading] = useState(false);
  const { user, isAdmin } = useAuth();

  const createPost = async (content: string, _imageFile?: File) => {
    if (!user) return { error: 'Usuário não autenticado' };

    const newPost: CommunityPost = {
      id: Date.now().toString(),
      user_id: user.id,
      content,
      image_url: null,
      likes_count: 0,
      comments_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user_name: user.email || 'Usuário'
    };

    setPosts(prev => [newPost, ...prev]);
    return { data: newPost };
  };

  const updatePost = async (postId: string, content: string) => {
    if (!user) return { error: 'Usuário não autenticado' };

    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, content, updated_at: new Date().toISOString() }
        : post
    ));
    return { data: { id: postId, content } };
  };

  const deletePost = async (postId: string) => {
    if (!user) return { error: 'Usuário não autenticado' };

    setPosts(prev => prev.filter(post => post.id !== postId));
    return { success: true };
  };

  const toggleLike = async (postId: string) => {
    if (!user) return;

    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, likes_count: post.likes_count + 1 }
        : post
    ));
  };

  const checkUserRole = async () => {
    return isAdmin ? 'admin' : 'user';
  };

  return {
    posts,
    loading,
    createPost,
    updatePost,
    deletePost,
    toggleLike,
    checkUserRole,
    refetch: () => {}
  };
};
