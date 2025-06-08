
import React, { useState } from 'react';
import { Heart, MessageCircle, Send, Image, Plus, Hash, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
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
    <div className="min-h-screen bg-background pb-20">
      {/* Header Fixo */}
      <div className="sticky top-0 bg-card/80 backdrop-blur-sm border-b z-10">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold">Fábrica de Views</h2>
              <p className="text-xs text-muted-foreground">Creator PRO Community</p>
            </div>
            <Button 
              onClick={() => setShowCreatePost(!showCreatePost)} 
              size="sm"
              variant={showCreatePost ? "secondary" : "default"}
              className="rounded-full"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {/* Stats rápidas */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-primary/10 rounded-lg p-2">
              <div className="text-sm font-bold text-primary">1,247</div>
              <div className="text-xs text-muted-foreground">Membros</div>
            </div>
            <div className="bg-green-500/10 rounded-lg p-2">
              <div className="text-sm font-bold text-green-500">23</div>
              <div className="text-xs text-muted-foreground">Posts Hoje</div>
            </div>
            <div className="bg-accent/10 rounded-lg p-2">
              <div className="text-sm font-bold text-accent">156</div>
              <div className="text-xs text-muted-foreground">Online</div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 space-y-4">
        {/* Destaque da Semana - Mobile */}
        <Card className="glass-effect bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 mt-4">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="bg-primary/20 p-2 rounded-full">
                <TrendingUp className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Destaque da Semana</h3>
                <p className="text-xs text-muted-foreground">Nova masterclass disponível!</p>
              </div>
            </div>
            <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
              Assistir Agora
            </Button>
          </CardContent>
        </Card>

        {/* Trending Topics - Mobile */}
        <Card className="glass-effect">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center">
              <Hash className="w-4 h-4 mr-2 text-primary" />
              Trending
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {['#RoteiroVirais', '#TikTokGrowth', '#CreatorTips'].map((topic, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {topic}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Criar Post - Mobile */}
        {showCreatePost && (
          <Card className="glass-effect">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="text-xs bg-primary/20 text-primary">
                      {user?.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Textarea
                    placeholder="Compartilhe algo com a comunidade..."
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    rows={3}
                    className="text-sm resize-none border-0 bg-muted/50"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Image className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Hash className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button 
                    onClick={handleCreatePost}
                    disabled={isCreatingPost || !newPostContent.trim()}
                    size="sm"
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Send className="w-4 h-4 mr-1" />
                    Publicar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Posts do Feed - Mobile */}
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="glass-effect">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="text-xs bg-primary/20 text-primary">
                      {post.user_id.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium text-sm">João Creator</span>
                      <Badge variant="secondary" className="text-xs">Dúvida</Badge>
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
    </div>
  );
};
