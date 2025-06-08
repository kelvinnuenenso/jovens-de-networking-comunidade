
import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, TrendingUp, Users, Hash, Image, Send, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useCommunityPosts } from '@/hooks/useCommunityPosts';
import { useAuth } from '@/contexts/AuthContext';

export const CommunityFeedDesktop = () => {
  const { posts, loading, createPost, toggleLike } = useCommunityPosts();
  const { user } = useAuth();
  
  const [newPostContent, setNewPostContent] = useState('');
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  const handleCreatePost = async () => {
    if (!newPostContent.trim()) return;

    setIsCreatingPost(true);
    await createPost(newPostContent);
    setNewPostContent('');
    setIsCreatingPost(false);
  };

  if (loading) {
    return <div className="text-center py-8">Carregando feed...</div>;
  }

  const trendingTopics = [
    '#RoteiroVirais', '#TikTokGrowth', '#CreatorTips', '#Monetização'
  ];

  const communityStats = {
    membersActive: 1247,
    postsToday: 23,
    onlineNow: 156
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Creator PRO Community</h1>
              <p className="text-sm text-muted-foreground">Hub de criadores de conteúdo</p>
            </div>
            <div className="flex items-center space-x-4">
              <Input 
                placeholder="Buscar na comunidade..." 
                className="w-80"
              />
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Nova Pergunta
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar Esquerda */}
          <div className="col-span-3 space-y-4">
            {/* Estatísticas da Comunidade */}
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                  Estatísticas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Membros ativos</span>
                  <span className="font-bold text-primary">{communityStats.membersActive.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Posts hoje</span>
                  <span className="font-bold text-primary">{communityStats.postsToday}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Online agora</span>
                  <span className="font-bold text-green-500">{communityStats.onlineNow}</span>
                </div>
              </CardContent>
            </Card>

            {/* Trending Topics */}
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Hash className="w-5 h-5 mr-2 text-primary" />
                  Trending Topics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {trendingTopics.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg cursor-pointer">
                    <span className="text-sm font-medium text-primary">{topic}</span>
                    <Badge variant="secondary" className="text-xs">
                      {Math.floor(Math.random() * 50) + 10}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Progresso Semanal */}
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-sm">Progresso Semanal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-2">Aulas assistidas</div>
                  <div className="text-2xl font-bold text-primary">8/12</div>
                  <div className="w-full bg-muted rounded-full h-2 mt-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '67%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Feed Principal */}
          <div className="col-span-6 space-y-6">
            {/* Destaque da Semana */}
            <Card className="glass-effect bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/20 p-3 rounded-full">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">Destaque da Semana</h3>
                    <p className="text-muted-foreground mb-4">
                      Nova masterclass sobre hooks virais disponível! 
                      Aprenda as técnicas que estão fazendo creators explodirem no TikTok.
                    </p>
                    <Button className="bg-primary hover:bg-primary/90">
                      Assistir Agora
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Criar Post */}
            <Card className="glass-effect">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarFallback className="bg-primary/20 text-primary">
                      {user?.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-4">
                    <Textarea
                      placeholder="Compartilhe suas conquistas, dúvidas ou ideias com a comunidade..."
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      rows={3}
                      className="resize-none border-0 bg-muted/50"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Image className="w-4 h-4 mr-2" />
                          Imagem
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Hash className="w-4 h-4 mr-2" />
                          Tag
                        </Button>
                      </div>
                      <Button 
                        onClick={handleCreatePost}
                        disabled={isCreatingPost || !newPostContent.trim()}
                        className="bg-primary hover:bg-primary/90"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Publicar
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Posts do Feed */}
            <div className="space-y-4">
              {posts.map((post) => (
                <Card key={post.id} className="glass-effect hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar>
                        <AvatarFallback className="bg-primary/20 text-primary">
                          {post.user_id.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-semibold">Maria Silva</span>
                          <Badge variant="secondary" className="text-xs">Conquista</Badge>
                          <span className="text-sm text-muted-foreground">
                            {new Date(post.created_at).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                        <p className="mb-4 whitespace-pre-wrap">{post.content}</p>
                        {post.image_url && (
                          <img 
                            src={post.image_url} 
                            alt="Post image" 
                            className="rounded-lg max-w-full h-auto mb-4"
                          />
                        )}
                        <div className="flex items-center space-x-6">
                          <button 
                            onClick={() => toggleLike(post.id)}
                            className="flex items-center space-x-2 text-muted-foreground hover:text-red-500 transition-colors"
                          >
                            <Heart className="w-4 h-4" />
                            <span className="text-sm">{post.likes_count}</span>
                          </button>
                          <button className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                            <MessageCircle className="w-4 h-4" />
                            <span className="text-sm">{post.comments_count}</span>
                          </button>
                          <button className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                            <Share2 className="w-4 h-4" />
                            <span className="text-sm">Compartilhar</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar Direita */}
          <div className="col-span-3 space-y-4">
            {/* Ações Rápidas */}
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Users className="w-5 h-5 mr-2 text-primary" />
                  Ações Rápidas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Pergunta
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartilhar Conquista
                </Button>
              </CardContent>
            </Card>

            {/* Próximos Eventos */}
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-lg">Próximos Eventos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-medium">Mentoria ao Vivo</h4>
                  <p className="text-sm text-muted-foreground">Hoje às 20h</p>
                </div>
                <div className="border-l-4 border-accent pl-4">
                  <h4 className="font-medium">Workshop de Roteiros</h4>
                  <p className="text-sm text-muted-foreground">Amanhã às 15h</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
