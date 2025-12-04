import React, { useState } from 'react';
import { Edit, Trophy, Target, Calendar, Save, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useUserStats } from '@/hooks/useUserStats';

export const Profile = () => {
  const { profile, updateProfile } = useUserProfile();
  const { stats } = useUserStats();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ full_name: '' });

  const handleEdit = () => {
    if (profile) {
      setEditData({ full_name: profile.full_name || '' });
      setIsEditing(true);
    }
  };

  const handleSave = async () => {
    await updateProfile(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (!profile || !stats) {
    return <div className="text-center py-8">Carregando perfil...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="glass-effect hover-lift">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src={profile.avatar_url || undefined} />
              <AvatarFallback className="text-2xl">
                {profile.full_name?.charAt(0)?.toUpperCase() || 'U'}
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
                    Creator focado em crescimento no TikTok e estratégias de monetização.
                  </p>
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

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="glass-effect">
          <CardContent className="p-4 text-center">
            <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{stats.total_points}</p>
            <p className="text-sm text-muted-foreground">Pontos</p>
          </CardContent>
        </Card>
        <Card className="glass-effect">
          <CardContent className="p-4 text-center">
            <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{stats.courses_completed}</p>
            <p className="text-sm text-muted-foreground">Aulas Concluídas</p>
          </CardContent>
        </Card>
        <Card className="glass-effect">
          <CardContent className="p-4 text-center">
            <Trophy className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{stats.challenges_completed}</p>
            <p className="text-sm text-muted-foreground">Desafios</p>
          </CardContent>
        </Card>
        <Card className="glass-effect">
          <CardContent className="p-4 text-center">
            <Calendar className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{stats.days_in_community}</p>
            <p className="text-sm text-muted-foreground">Dias na Comunidade</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
