
import React from 'react';
import { Edit, Link as LinkIcon, Trophy, Target, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const Profile = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card className="glass-effect hover-lift">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src="/api/placeholder/96/96" />
              <AvatarFallback className="text-2xl">JD</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold mb-2">João Creator</h2>
              <p className="text-muted-foreground mb-4">
                Creator focado em crescimento no TikTok e estratégias de monetização. 
                Apaixonado por criar conteúdo que transforma vidas.
              </p>
              
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <LinkIcon className="w-4 h-4" />
                  <span>@joaocreator</span>
                </Button>
                <Button variant="outline" size="sm">
                  Ver TikTok
                </Button>
              </div>

              <Button className="flex items-center space-x-2">
                <Edit className="w-4 h-4" />
                <span>Editar Perfil</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="glass-effect text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary mb-1">1,800</div>
            <div className="text-sm text-muted-foreground">Pontos Totais</div>
          </CardContent>
        </Card>
        <Card className="glass-effect text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary mb-1">18</div>
            <div className="text-sm text-muted-foreground">Aulas Assistidas</div>
          </CardContent>
        </Card>
        <Card className="glass-effect text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary mb-1">5</div>
            <div className="text-sm text-muted-foreground">Desafios Completos</div>
          </CardContent>
        </Card>
        <Card className="glass-effect text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary mb-1">45</div>
            <div className="text-sm text-muted-foreground">Dias na Comunidade</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-primary" />
            <span>Atividade Recente</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                type: 'course',
                title: 'Assistiu: "Como Criar Hooks Irresistíveis"',
                time: '2 horas atrás',
                icon: '📺'
              },
              {
                type: 'challenge',
                title: 'Completou: Desafio dos 7 Vídeos Virais',
                time: '1 dia atrás',
                icon: '🏆'
              },
              {
                type: 'post',
                title: 'Postou no feed da comunidade',
                time: '2 dias atrás',
                icon: '💬'
              },
              {
                type: 'event',
                title: 'Participou: Workshop de Roteiros',
                time: '3 dias atrás',
                icon: '🎯'
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
                <span className="text-xl">{activity.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Badges & Achievements */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-primary" />
            <span>Badges & Conquistas</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Creator Consistente', icon: '🔥', earned: true },
              { name: 'Hook Master', icon: '🎯', earned: true },
              { name: 'Viral Creator', icon: '⚡', earned: false },
              { name: 'Community Leader', icon: '👑', earned: false }
            ].map((badge, index) => (
              <div key={index} className={`p-4 rounded-lg text-center ${
                badge.earned ? 'bg-primary/20 border border-primary/30' : 'bg-muted/30'
              }`}>
                <div className={`text-3xl mb-2 ${badge.earned ? '' : 'opacity-30'}`}>
                  {badge.icon}
                </div>
                <div className={`text-sm font-medium ${badge.earned ? 'text-primary' : 'text-muted-foreground'}`}>
                  {badge.name}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Favorites */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-primary" />
            <span>Conteúdos Favoritos</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                title: 'Estratégias de Crescimento Orgânico: 0 a 100k em 90 Dias',
                type: 'Aula',
                duration: '22:15'
              },
              {
                title: 'Hook de Problema + Solução',
                type: 'Roteiro',
                downloads: '89'
              }
            ].map((item, index) => (
              <div key={index} className="p-4 rounded-lg bg-muted/30">
                <h4 className="font-medium mb-2">{item.title}</h4>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>{item.type}</span>
                  <span>{item.duration || `${item.downloads} downloads`}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
