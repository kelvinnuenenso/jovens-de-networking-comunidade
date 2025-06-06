
import React from 'react';
import { ExternalLink, Star, Users, MessageCircle, TrendingUp, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const Links = () => {
  const links = [
    {
      id: 1,
      title: 'Análise Completa do Seu Perfil',
      description: 'Receba um diagnóstico detalhado do seu TikTok com estratégias personalizadas para crescer',
      icon: TrendingUp,
      price: 'R$ 97',
      color: 'from-blue-500 to-cyan-500',
      popular: true
    },
    {
      id: 2,
      title: 'Mentoria Individual 1:1',
      description: 'Sessão particular de 60 minutos para acelerar seus resultados no TikTok',
      icon: Star,
      price: 'R$ 297',
      color: 'from-purple-500 to-pink-500',
      popular: false
    },
    {
      id: 3,
      title: 'Gestão Completa da Agência',
      description: 'Deixe nossa equipe cuidar de todo seu TikTok enquanto você foca no seu negócio',
      icon: Zap,
      price: 'Consultar',
      color: 'from-orange-500 to-red-500',
      popular: false
    },
    {
      id: 4,
      title: 'Grupo VIP no WhatsApp',
      description: 'Acesso ao grupo exclusivo com networking e suporte direto da equipe',
      icon: Users,
      price: 'R$ 47/mês',
      color: 'from-green-500 to-emerald-500',
      popular: false
    }
  ];

  const socialLinks = [
    {
      platform: 'TikTok Principal',
      handle: '@kelvincreator',
      followers: '1.2M',
      description: 'Conteúdo diário sobre crescimento no TikTok'
    },
    {
      platform: 'Instagram',
      handle: '@kelvincreator.oficial',
      followers: '450K',
      description: 'Bastidores e dicas exclusivas'
    },
    {
      platform: 'WhatsApp',
      handle: 'Canal de Avisos',
      followers: '12K',
      description: 'Receba notificações sobre novos conteúdos'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Central de Links Úteis</h2>
        <p className="text-muted-foreground">
          Acelere seus resultados com nossos serviços especializados
        </p>
      </div>

      {/* Main Services */}
      <div className="grid gap-6 md:grid-cols-2">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Card key={link.id} className={`glass-effect hover-lift relative overflow-hidden ${
              link.popular ? 'border-primary ring-2 ring-primary/20' : ''
            }`}>
              {link.popular && (
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
                  Mais Popular
                </div>
              )}
              
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${link.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg">{link.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {link.description}
                </p>
              </CardHeader>

              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-primary">
                    {link.price}
                  </div>
                  <Button className="flex items-center space-x-2">
                    <ExternalLink className="w-4 h-4" />
                    <span>Acessar</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Social Media Links */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5 text-primary" />
            <span>Redes Sociais do Kelvin</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {socialLinks.map((social, index) => (
              <div key={index} className="p-4 rounded-lg bg-muted/30 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                <h4 className="font-semibold mb-1">{social.platform}</h4>
                <p className="text-sm text-primary mb-2">{social.handle}</p>
                <p className="text-xs text-muted-foreground mb-2">{social.followers} seguidores</p>
                <p className="text-xs text-muted-foreground">{social.description}</p>
                <Button variant="outline" size="sm" className="mt-3 w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Seguir
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Community Access */}
      <Card className="glass-effect bg-gradient-to-r from-primary/10 to-blue-500/10 border-primary/30">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold mb-4">Quer Resultados Ainda Maiores?</h3>
          <p className="text-muted-foreground mb-6">
            Junte-se ao nosso programa de mentoria intensiva e tenha acesso a estratégias avançadas, 
            suporte personalizado e uma comunidade de creators de alto nível.
          </p>
          <div className="space-y-3">
            <Button size="lg" className="w-full md:w-auto">
              <Star className="w-5 h-5 mr-2" />
              Solicitar Mentoria VIP
            </Button>
            <p className="text-sm text-muted-foreground">
              Vagas limitadas • Próxima turma em breve
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Contact Info */}
      <Card className="glass-effect">
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-semibold mb-4">Dúvidas ou Suporte?</h3>
          <p className="text-muted-foreground mb-4">
            Nossa equipe está sempre disponível para ajudar você a crescer
          </p>
          <div className="flex flex-col md:flex-row gap-3 justify-center">
            <Button variant="outline">
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp Suporte
            </Button>
            <Button variant="outline">
              <ExternalLink className="w-4 h-4 mr-2" />
              Email: contato@creatorpro.com
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
