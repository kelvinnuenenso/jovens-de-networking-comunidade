
import React from 'react';
import { Target, Trophy, Calendar, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export const Challenges = () => {
  const challenges = [
    {
      id: 1,
      title: 'Desafio dos 7 Vídeos Virais',
      description: 'Poste 7 vídeos em 7 dias usando estruturas diferentes de roteiro',
      duration: '7 dias',
      points: 500,
      progress: 4,
      total: 7,
      status: 'active',
      reward: 'Badge de Creator Consistente'
    },
    {
      id: 2,
      title: 'Missão Crescimento',
      description: 'Ganhe 1000 novos seguidores usando apenas conteúdo orgânico',
      duration: '15 dias',
      points: 1000,
      progress: 750,
      total: 1000,
      status: 'active',
      reward: 'Acesso ao Grupo VIP'
    },
    {
      id: 3,
      title: 'Semana do Hook Perfeito',
      description: 'Crie 5 vídeos focando apenas em hooks irresistíveis',
      duration: '7 dias',
      points: 300,
      progress: 5,
      total: 5,
      status: 'completed',
      reward: 'Certificado de Hook Master'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'border-primary/30 bg-primary/5';
      case 'completed':
        return 'border-green-500/30 bg-green-500/5';
      default:
        return 'border-muted';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Target className="w-5 h-5 text-primary" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Target className="w-5 h-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Área de Desafios</h2>
        <p className="text-muted-foreground">
          Complete missões práticas e evolua como creator
        </p>
      </div>

      {/* Player Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="glass-effect text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary mb-1">1,800</div>
            <div className="text-sm text-muted-foreground">Pontos Totais</div>
          </CardContent>
        </Card>
        <Card className="glass-effect text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary mb-1">3</div>
            <div className="text-sm text-muted-foreground">Badges Conquistadas</div>
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
            <div className="text-2xl font-bold text-primary mb-1">#12</div>
            <div className="text-sm text-muted-foreground">Ranking Mensal</div>
          </CardContent>
        </Card>
      </div>

      {/* Active Challenges */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Desafios Ativos</h3>
        
        {challenges.map((challenge) => (
          <Card key={challenge.id} className={`glass-effect hover-lift ${getStatusColor(challenge.status)}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(challenge.status)}
                  <div>
                    <CardTitle className="text-lg">{challenge.title}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{challenge.duration}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Trophy className="w-4 h-4" />
                        <span>{challenge.points} pontos</span>
                      </span>
                    </div>
                  </div>
                </div>
                {challenge.status === 'active' ? (
                  <Button size="sm">Participar</Button>
                ) : (
                  <Button size="sm" variant="outline" disabled>
                    Concluído
                  </Button>
                )}
              </div>
            </CardHeader>

            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {challenge.description}
              </p>

              {/* Progress */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Progresso</span>
                  <span>{challenge.progress}/{challenge.total}</span>
                </div>
                <Progress 
                  value={(challenge.progress / challenge.total) * 100} 
                  className="h-2"
                />
              </div>

              {/* Reward */}
              <div className="bg-muted/50 p-3 rounded-lg">
                <div className="text-sm font-medium text-primary mb-1">Recompensa:</div>
                <div className="text-sm">{challenge.reward}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Ranking */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-primary" />
            <span>Ranking Mensal</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { position: 1, name: 'Ana Silva', points: 2400, badge: '🥇' },
              { position: 2, name: 'Carlos Mendes', points: 2100, badge: '🥈' },
              { position: 3, name: 'Mariana Costa', points: 1950, badge: '🥉' },
              { position: 12, name: 'Você', points: 1800, badge: '' }
            ].map((player) => (
              <div key={player.position} className={`flex items-center justify-between p-3 rounded-lg ${
                player.name === 'Você' ? 'bg-primary/10 border border-primary/30' : 'bg-muted/30'
              }`}>
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{player.badge || `#${player.position}`}</span>
                  <span className="font-medium">{player.name}</span>
                </div>
                <span className="text-sm text-primary font-medium">{player.points} pts</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
