
import React from 'react';
import { Star, Play, MessageCircle, Clock, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const KelvinChannel = () => {
  const exclusiveContent = [
    {
      id: 1,
      title: 'Recado Especial: Os Próximos Passos da Comunidade',
      type: 'video',
      duration: '8:45',
      posted: '2 dias atrás',
      thumbnail: '/api/placeholder/300/200',
      description: 'Compartilho os planos para 2024 e as novidades que estão chegando para vocês.'
    },
    {
      id: 2,
      title: 'Bastidores: Como Criei Meu Primeiro Vídeo Viral',
      type: 'story',
      duration: '12:30',
      posted: '1 semana atrás',
      thumbnail: '/api/placeholder/300/200',
      description: 'A história real por trás do vídeo que mudou tudo na minha jornada.'
    },
    {
      id: 3,
      title: 'Q&A Exclusivo: Respondendo Suas Principais Dúvidas',
      type: 'live',
      duration: '45:20',
      posted: '2 semanas atrás',
      thumbnail: '/api/placeholder/300/200',
      description: 'Sessão ao vivo onde respondo as perguntas mais frequentes da comunidade.'
    }
  ];

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Play className="w-4 h-4" />;
      case 'story':
        return <MessageCircle className="w-4 h-4" />;
      case 'live':
        return <Star className="w-4 h-4" />;
      default:
        return <Play className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Kelvin's Header */}
      <Card className="glass-effect bg-gradient-to-r from-primary/10 to-blue-500/10 border-primary/30">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="w-16 h-16 ring-2 ring-primary">
              <AvatarImage src="/api/placeholder/64/64" />
              <AvatarFallback className="text-xl">KC</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold flex items-center space-x-2">
                <span>Kelvin Creator</span>
                <Star className="w-6 h-6 text-primary fill-current" />
              </h2>
              <p className="text-muted-foreground">Founder da Creator PRO</p>
            </div>
          </div>
          
          <div className="bg-primary/20 p-4 rounded-lg border border-primary/30">
            <h3 className="font-semibold mb-2 flex items-center space-x-2">
              <Lock className="w-4 h-4" />
              <span>Canal Exclusivo para Membros</span>
            </h3>
            <p className="text-sm text-muted-foreground">
              Conteúdos exclusivos, bastidores e conversas diretas que só os membros da Creator PRO têm acesso.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Exclusive Content */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Conteúdos Exclusivos</h3>
        
        {exclusiveContent.map((content) => (
          <Card key={content.id} className="glass-effect hover-lift">
            <div className="flex flex-col md:flex-row">
              <div className="relative md:w-1/3">
                <img 
                  src={content.thumbnail} 
                  alt={content.title}
                  className="w-full h-48 md:h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Button size="lg" className="rounded-full">
                    {getContentIcon(content.type)}
                    <span className="ml-2">Assistir</span>
                  </Button>
                </div>
                <div className="absolute bottom-4 right-4 bg-black/70 px-2 py-1 rounded text-sm flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{content.duration}</span>
                </div>
              </div>
              
              <div className="flex-1 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold mb-2">{content.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      Postado {content.posted}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1 bg-primary/20 px-2 py-1 rounded-full">
                    {getContentIcon(content.type)}
                    <span className="text-xs font-medium text-primary capitalize">
                      {content.type}
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">
                  {content.description}
                </p>
                
                <Button className="w-full md:w-auto">
                  <Play className="w-4 h-4 mr-2" />
                  Assistir Agora
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Community Message */}
      <Card className="glass-effect border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5 text-primary" />
            <span>Mensagem para a Comunidade</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="text-sm mb-4">
              "Pessoal, que orgulho de ver o crescimento de cada um de vocês! 
              Esta comunidade se tornou muito mais do que eu imaginava. 
              Continuem aplicando as estratégias e sempre que precisarem, 
              estarei aqui para ajudar. Vamos juntos rumo aos 100k! 🚀"
            </p>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Avatar className="w-6 h-6">
                <AvatarImage src="/api/placeholder/24/24" />
                <AvatarFallback className="text-xs">KC</AvatarFallback>
              </Avatar>
              <span>Kelvin Creator • Ontem às 18:30</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="glass-effect text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary mb-1">24</div>
            <div className="text-sm text-muted-foreground">Conteúdos Exclusivos</div>
          </CardContent>
        </Card>
        <Card className="glass-effect text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary mb-1">1.2M</div>
            <div className="text-sm text-muted-foreground">Seguidores TikTok</div>
          </CardContent>
        </Card>
        <Card className="glass-effect text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary mb-1">156</div>
            <div className="text-sm text-muted-foreground">Membros Ativos</div>
          </CardContent>
        </Card>
        <Card className="glass-effect text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary mb-1">95%</div>
            <div className="text-sm text-muted-foreground">Taxa de Sucesso</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
