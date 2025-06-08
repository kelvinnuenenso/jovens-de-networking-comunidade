
import React, { useState } from 'react';
import { Heart, MessageCircle, Send, Image, Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useCommunityPosts } from '@/hooks/useCommunityPosts';
import { useAuth } from '@/contexts/AuthContext';

export const CommunityFeedMobile = () => {
  const { posts, loading, createPost, toggleLike } = useCommunityPosts();
  const { user } = useAuth();
  
  const [newPostContent, setNewPostContent] = useState('');
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);

  const handleCreatePost = async () => {
    if (!newPostContent.trim()) return;

    setIsCreatingPost(true);
    await createPost(newPostContent);
    setNewPostContent('');
    setIsCreatingPost(false);
    setShowCreatePost(false);
  };

  if (loading) {
    return <div className="text-center py-8">Carregando feed...</div>;
  }

  return (
    <div className="max-w-md mx-auto pb-20">
      {/* Header com botão de criar post */}
      <div className="sticky top-0 bg-background/80 backdrop-blur-sm border-b p-4 mb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Comunidade</h2>
          <Button 
            onClick={() => setShowCreatePost(!showCreatePost)} 
            size="sm"
            variant={showCreatePost ? "secondary" : "default"}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Criar Post */}
      {showCreatePost && (
        <Card className="mx-4 mb-4">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="text-xs">
                    {user?.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Textarea
                  placeholder="Compartilhe algo com a comunidade..."
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  rows={3}
                  className="text-sm"
                />
              </div>
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="sm">
                  <Image className="w-4 h-4 mr-1" />
                  Foto
                </Button>
                <Button 
                  onClick={handleCreatePost}
                  disabled={isCreatingPost || !newPostContent.trim()}
                  size="sm"
                >
                  <Send className="w-4 h-4 mr-1" />
                  Publicar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Feed de Posts */}
      <div className="space-y-4 px-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="text-xs">U</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-medium text-sm">Usuário</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(post.created_at).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit'
                      })}
                    </span>
                  </div>
                  <p className="text-sm mb-3 whitespace-pre-wrap break-words">{post.content}</p>
                  {post.image_url && (
                    <img 
                      src={post.image_url} 
                      alt="Post image" 
                      className="rounded-lg max-w-full h-auto mb-3"
                    />
                  )}
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={() => toggleLike(post.id)}
                      className="flex items-center space-x-1 text-muted-foreground hover:text-red-500 transition-colors"
                    >
                      <Heart className="w-4 h-4" />
                      <span className="text-xs">{post.likes_count}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-xs">{post.comments_count}</span>
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
