
import React from 'react';
import { Heart, MessageCircle, Share, Pin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export const Feed = () => {
  const posts = [
    {
      id: 1,
      author: 'Ana Silva',
      avatar: '/api/placeholder/40/40',
      time: '2h',
      content: '🎉 Consegui! Meu vídeo chegou a 100k visualizações usando a estrutura de roteiro que aprendi aqui. Obrigada, comunidade! 🚀',
      likes: 24,
      comments: 8,
      pinned: true,
      image: '/api/placeholder/400/300'
    },
    {
      id: 2,
      author: 'Carlos Mendes',
      avatar: '/api/placeholder/40/40',
      time: '4h',
      content: 'Pessoal, alguém pode me ajudar? Estou com dificuldade em criar hooks para meus vídeos de negócios. Que estratégias vocês usam para chamar atenção logo nos primeiros 3 segundos?',
      likes: 12,
      comments: 15,
      pinned: false
    },
    {
      id: 3,
      author: 'Mariana Costa',
      avatar: '/api/placeholder/40/40',
      time: '6h',
      content: '💡 DICA: Acabei de descobrir que usar trending sounds aumentou meu alcance em 300%! Quem mais está testando essa estratégia?',
      likes: 31,
      comments: 22,
      pinned: false
    }
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Post Creation */}
      <Card className="glass-effect hover-lift">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/api/placeholder/40/40" />
              <AvatarFallback>EU</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Button variant="outline" className="w-full justify-start text-muted-foreground">
                Compartilhe sua conquista ou dúvida...
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pinned Posts */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center space-x-2">
          <Pin className="w-5 h-5 text-primary" />
          <span>Posts em Destaque</span>
        </h3>
        
        {posts.filter(post => post.pinned).map((post) => (
          <Card key={post.id} className="glass-effect hover-lift border-primary/30">
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
                    <Pin className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-sm mb-4">{post.content}</p>
                  {post.image && (
                    <div className="mb-4 rounded-lg overflow-hidden">
                      <img 
                        src={post.image} 
                        alt="Post content" 
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  )}
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

      {/* Regular Posts */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Feed da Comunidade</h3>
        
        {posts.filter(post => !post.pinned).map((post) => (
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
    </div>
  );
};
