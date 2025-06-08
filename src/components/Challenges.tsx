
import React, { useState } from 'react';
import { Target, Trophy, Calendar, CheckCircle, Plus, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useChallenges } from '@/hooks/useChallenges';
import { useUserStats } from '@/hooks/useUserStats';
import { useAuth } from '@/contexts/AuthContext';

export const Challenges = () => {
  const { challenges, userChallenges, createChallenge, joinChallenge } = useChallenges();
  const { stats } = useUserStats();
  const { user } = useAuth();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newChallenge, setNewChallenge] = useState({
    title: '',
    description: '',
    duration_days: 7,
    points: 100,
    reward: ''
  });

  // Verificar se o usuário é admin (você pode ajustar esta lógica conforme necessário)
  const isAdmin = user?.email === 'kelvinviraliza@gmail.com'; // Substitua pela sua lógica de admin

  const handleCreateChallenge = async () => {
    if (!newChallenge.title.trim()) return;

    await createChallenge(newChallenge);
    setNewChallenge({
      title: '',
      description: '',
      duration_days: 7,
      points: 100,
      reward: ''
    });
    setShowCreateDialog(false);
  };

  const handleJoinChallenge = async (challengeId: string) => {
    await joinChallenge(challengeId);
  };

  const getUserChallengeForChallenge = (challengeId: string) => {
    return userChallenges.find(uc => uc.challenge_id === challengeId);
  };

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
      <div className="flex justify-between items-center mb-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Área de Desafios</h2>
          <p className="text-muted-foreground">
            Complete missões práticas e evolua como creator
          </p>
        </div>
        {isAdmin && (
          <Button onClick={() => setShowCreateDialog(true)} className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Criar Desafio</span>
          </Button>
        )}
      </div>

      {/* Player Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="glass-effect text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary mb-1">{stats?.total_points || 0}</div>
            <div className="text-sm text-muted-foreground">Pontos Totais</div>
          </CardContent>
        </Card>
        <Card className="glass-effect text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary mb-1">{userChallenges.filter(uc => uc.status === 'completed').length}</div>
            <div className="text-sm text-muted-foreground">Badges Conquistadas</div>
          </CardContent>
        </Card>
        <Card className="glass-effect text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary mb-1">{stats?.challenges_completed || 0}</div>
            <div className="text-sm text-muted-foreground">Desafios Completos</div>
          </CardContent>
        </Card>
        <Card className="glass-effect text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary mb-1">#{Math.floor(Math.random() * 50) + 1}</div>
            <div className="text-sm text-muted-foreground">Ranking Mensal</div>
          </CardContent>
        </Card>
      </div>

      {/* Active Challenges */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Desafios Disponíveis</h3>
        
        {challenges.map((challenge) => {
          const userChallenge = getUserChallengeForChallenge(challenge.id);
          const isParticipating = !!userChallenge;
          const status = userChallenge?.status || 'available';
          
          return (
            <Card key={challenge.id} className={`glass-effect hover-lift ${getStatusColor(status)}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(status)}
                    <div>
                      <CardTitle className="text-lg">{challenge.title}</CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{challenge.duration_days} dias</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Trophy className="w-4 h-4" />
                          <span>{challenge.points} pontos</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  {!isParticipating ? (
                    <Button onClick={() => handleJoinChallenge(challenge.id)} size="sm">
                      Participar
                    </Button>
                  ) : status === 'completed' ? (
                    <Button size="sm" variant="outline" disabled>
                      Concluído
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" disabled>
                      <Clock className="w-4 h-4 mr-2" />
                      Em Andamento
                    </Button>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {challenge.description}
                </p>

                {/* Progress */}
                {userChallenge && (
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Progresso</span>
                      <span>{userChallenge.progress}%</span>
                    </div>
                    <Progress 
                      value={userChallenge.progress} 
                      className="h-2"
                    />
                  </div>
                )}

                {/* Reward */}
                {challenge.reward && (
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="text-sm font-medium text-primary mb-1">Recompensa:</div>
                    <div className="text-sm">{challenge.reward}</div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
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
              { position: 12, name: 'Você', points: stats?.total_points || 0, badge: '' }
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

      {/* Dialog para Criar Desafio */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Novo Desafio</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Título do desafio"
              value={newChallenge.title}
              onChange={(e) => setNewChallenge({...newChallenge, title: e.target.value})}
            />
            <Textarea
              placeholder="Descrição do desafio"
              value={newChallenge.description}
              onChange={(e) => setNewChallenge({...newChallenge, description: e.target.value})}
              rows={3}
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Duração (dias)</label>
                <Input
                  type="number"
                  value={newChallenge.duration_days}
                  onChange={(e) => setNewChallenge({...newChallenge, duration_days: parseInt(e.target.value)})}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Pontos</label>
                <Input
                  type="number"
                  value={newChallenge.points}
                  onChange={(e) => setNewChallenge({...newChallenge, points: parseInt(e.target.value)})}
                />
              </div>
            </div>
            <Input
              placeholder="Recompensa"
              value={newChallenge.reward}
              onChange={(e) => setNewChallenge({...newChallenge, reward: e.target.value})}
            />
            <div className="flex space-x-2">
              <Button onClick={handleCreateChallenge} disabled={!newChallenge.title.trim()}>
                Criar Desafio
              </Button>
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
