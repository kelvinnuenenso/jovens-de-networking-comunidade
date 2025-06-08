
import React, { useState } from 'react';
import { Edit, Link as LinkIcon, Trophy, Target, Calendar, Save, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useUserStats } from '@/hooks/useUserStats';

export const Profile = () => {
  const { profile, updateProfile } = useUserProfile();
  const { stats } = useUserStats();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    full_name: '',
    bio: '',
    tiktok_username: ''
  });

  const handleEdit = () => {
    if (profile) {
      setEditData({
        full_name: profile.full_name || '',
        bio: profile.bio || '',
        tiktok_username: profile.tiktok_username || ''
      });
      setIsEditing(true);
    }
  };

  const handleSave = async () => {
    await updateProfile(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({ full_name: '', bio: '', tiktok_username: '' });
  };

  if (!profile || !stats) {
    return <div className="text-center py-8">Carregando perfil...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card className="glass-effect hover-lift">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src={profile.avatar_url || undefined} />
              <AvatarFallback className="text-2xl">
                {profile.full_name?.charAt(0) || profile.email.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-center md:text-left">
              {isEditing ? (
                <div className="space-y-4">
                  <Input
                    placeholder="Nome completo"
                    value={editData.full_name}
                    onChange={(e) => setEditData({...editData, full_name: e.target.value})}
                  />
                  <Textarea
                    placeholder="Bio"
                    value={editData.bio}
                    onChange={(e) => setEditData({...editData, bio: e.target.value})}
                    rows={3}
                  />
                  <Input
                    placeholder="@usuario_tiktok"
                    value={editData.tiktok_username}
                    onChange={(e) => setEditData({...editData, tiktok_username: e.target.value})}
                  />
                  <div className="flex space-x-2">
                    <Button onClick={handleSave} className="flex items-center space-x-2">
                      <Save className="w-4 h-4" />
                      <span>Salvar</span>
                    </Button>
                    <Button variant="outline" onClick={handleCancel} className="flex items-center space-x-2">
                      <X className="w-4 h-4" />
                      <span>Cancelar</span>
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold mb-2">{profile.full_name || 'Creator'}</h2>
                  <p className="text-muted-foreground mb-4">
                    {profile.bio || 'Creator focado em crescimento no TikTok e estratégias de monetização.'}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                    {profile.tiktok_username && (
                      <Button variant="outline" size="sm" className="flex items-center space-x-2">
                        <LinkIcon className="w-4 h-4" />
                        <span>{profile.tiktok_username}</span>
                      </Button>
                    )}
                  </div>

                  <Button onClick={handleEdit} className="flex items-center space-x-2">
                    <Edit className="w-4 h-4" />
                    <span>Editar Perfil</span>
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="glass-effect text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary mb-1">{stats.total_points}</div>
            <div className="text-sm text-muted-foreground">Pontos Totais</div>
          </CardContent>
        </Card>
        <Card className="glass-effect text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary mb-1">{stats.courses_completed}</div>
            <div className="text-sm text-muted-foreground">Aulas Assistidas</div>
          </CardContent>
        </Card>
        <Card className="glass-effect text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary mb-1">{stats.challenges_completed}</div>
            <div className="text-sm text-muted-foreground">Desafios Completos</div>
          </CardContent>
        </Card>
        <Card className="glass-effect text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary mb-1">{Math.floor(stats.days_in_community)}</div>
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
            <div className="text-center text-muted-foreground py-8">
              Suas atividades recentes aparecerão aqui conforme você interage com a plataforma.
            </div>
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
              { name: 'Creator Consistente', icon: '🔥', earned: stats.total_activities > 10 },
              { name: 'Hook Master', icon: '🎯', earned: stats.courses_completed > 5 },
              { name: 'Viral Creator', icon: '⚡', earned: stats.total_points > 1000 },
              { name: 'Community Leader', icon: '👑', earned: stats.challenges_completed > 3 }
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
    </div>
  );
};
