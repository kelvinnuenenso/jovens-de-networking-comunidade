import React from 'react';
import { Heart, MessageCircle, Share, Camera, Send, Flame } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Hash, TrendingUp, Calendar, Plus, Users, Pin } from 'lucide-react';

export const Feed = () => {
  const posts = [
    {
      id: 1,
      author: 'Maria Silva',
      avatar: '/api/placeholder/40/40',
      time: '2h',
      content: 'Acabei de bater 100k seguidores no TikTok! 🎉 As estratégias do Kelvin funcionam mesmo!',
      likes: 45,
      comments: 12,
      type: 'conquista'
    },
    {
      id: 2,
      author: 'João Creator',
      avatar: '/api/placeholder/40/40',
      time: '4h',
      content: 'Alguém tem dicas para roteiros de produtos digitais? Estou começando agora 🚀',
      likes: 23,
      comments: 8,
      type: 'duvida'
    }
  ];

  const trendingTopics = [
    '#RoteirosVirais',
    '#TikTokGrowth',
    '#CreatorTips',
    '#Monetização'
  ];

  return (
    <div className="space-y-4 px-4">
      {/* Desktop Layout */}
      <div className="hidden md:block max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Community Stats */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="glass-effect">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span>Estatísticas da Comunidade</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Membros ativos</p>
                  <p className="text-2xl font-bold text-primary">1,247</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Posts hoje</p>
                  <p className="text-2xl font-bold">23</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Online agora</p>
                  <p className="text-2xl font-bold text-green-500">156</p>
                </div>
              </CardContent>
            </Card>

            {/* Trending Topics */}
            <Card className="glass-effect">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Hash className="w-5 h-5 text-primary" />
                  <span>Trending Topics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {trendingTopics.map((topic, index) => (
                    <button
                      key={index}
                      className="block w-full text-left text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-6 space-y-6">
            {/* Highlight Card */}
            <Card className="glass-effect border-primary/30 bg-primary/5">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-full bg-primary/20">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">Destaque da Semana</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Nova masterclass sobre hooks virais disponível! Aprenda as técnicas que estão fazendo creators explodirem no TikTok.
                    </p>
                    <Button size="sm">
                      Assistir Agora
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Post Creation */}
            <Card className="glass-effect hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar>
                    <AvatarImage src="/api/placeholder/40/40" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <Input 
                    placeholder="Compartilhe suas conquistas, dúvidas ou ideias com a comunidade..."
                    className="flex-1"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm">
                      <Camera className="w-4 h-4 mr-2" />
                      Imagem
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Hash className="w-4 h-4 mr-2" />
                      Tag
                    </Button>
                  </div>
                  <Button size="sm">
                    <Send className="w-4 h-4 mr-2" />
                    Publicar
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Posts */}
            {posts.map((post) => (
              <Card key={post.id} className="glass-effect hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarImage src={post.avatar} />
                      <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold">{post.author}</h4>
                        <span className="text-sm text-muted-foreground">{post.time}</span>
                        {post.type === 'conquista' && (
                          <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-500">
                            Conquista
                          </span>
                        )}
                        {post.type === 'duvida' && (
                          <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-500">
                            Dúvida
                          </span>
                        )}
                      </div>
                      <p className="text-sm mb-4">{post.content}</p>
                      <div className="flex items-center space-x-6">
                        <button className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                          <Heart className="w-4 h-4" />
                          <span className="text-sm">{post.likes}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-sm">{post.comments}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                          <Share className="w-4 h-4" />
                          <span className="text-sm">Compartilhar</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Right Sidebar - Quick Actions & Events */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="glass-effect">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Plus className="w-5 h-5 text-primary" />
                  <span>Ações Rápidas</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Pergunta
                </Button>
                <Button className="w-full justify-start" variant="outline" size="sm">
                  <Share className="w-4 h-4 mr-2" />
                  Compartilhar Conquista
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card className="glass-effect">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Próximos Eventos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="border-l-2 border-primary pl-3">
                    <h4 className="font-medium text-sm">Mentoria ao Vivo</h4>
                    <p className="text-xs text-muted-foreground">Hoje às 19h</p>
                  </div>
                  <div className="border-l-2 border-blue-500 pl-3">
                    <h4 className="font-medium text-sm">Workshop de Roteiros</h4>
                    <p className="text-xs text-muted-foreground">Amanhã às 15h</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden space-y-4">
        {/* Highlight Card */}
        <Card className="bg-gradient-to-r from-primary to-blue-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Flame className="w-6 h-6 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-1">Destaques da Semana</h3>
                <p className="text-sm opacity-90">
                  Nova masterclass sobre hooks virais disponível!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Post Creation */}
        <Card className="border border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary rounded-full">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <Input 
                placeholder="Compartilhe sua conquista ou dúvida..."
                className="flex-1 bg-muted/30 border-0"
              />
              <button className="p-2 bg-primary rounded-full">
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Posts */}
        {posts.map((post) => (
          <Card key={post.id} className="border border-border/50">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3 mb-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={post.avatar} />
                  <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-sm">{post.author}</h4>
                      <span className="text-xs text-muted-foreground">{post.time}</span>
                    </div>
                    {post.type === 'conquista' && (
                      <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-600 font-medium">
                        🏆 Conquista
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <p className="text-sm mb-4 leading-relaxed">{post.content}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 text-muted-foreground">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-muted-foreground">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">{post.comments}</span>
                  </button>
                </div>
                <button className="text-muted-foreground">
                  <Share className="w-4 h-4" />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
