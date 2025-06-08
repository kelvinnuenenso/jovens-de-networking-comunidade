
import React, { useState } from 'react';
import { Heart, MessageCircle, Send, Image, Users, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useCommunityPosts } from '@/hooks/useCommunityPosts';
import { useMessageGroups } from '@/hooks/useMessageGroups';
import { GroupChat } from '@/components/GroupChat';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';

export const CommunityFeedDesktop = () => {
  const { posts, loading, createPost, toggleLike } = useCommunityPosts();
  const { groups, createGroup } = useMessageGroups();
  const { user } = useAuth();
  
  const [newPostContent, setNewPostContent] = useState('');
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');

  const handleCreatePost = async () => {
    if (!newPostContent.trim()) return;

    setIsCreatingPost(true);
    await createPost(newPostContent);
    setNewPostContent('');
    setIsCreatingPost(false);
  };

  const handleCreateGroup = async () => {
    if (!newGroupName.trim()) return;

    await createGroup(newGroupName);
    setNewGroupName('');
    setShowCreateGroup(false);
  };

  if (loading) {
    return <div className="text-center py-8">Carregando feed...</div>;
  }

  return (
    <div className="grid grid-cols-12 gap-6 max-w-7xl mx-auto p-6">
      {/* Sidebar Esquerda - Grupos */}
      <div className="col-span-3">
        <Card className="sticky top-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Grupos
              </CardTitle>
              <Button onClick={() => setShowCreateGroup(true)} size="sm" variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {groups.slice(0, 6).map((group) => (
              <Card 
                key={group.id}
                className="cursor-pointer hover:shadow-md transition-shadow p-3"
                onClick={() => setSelectedGroup(group)}
              >
                <h4 className="font-medium text-sm">{group.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {group.description || 'Clique para entrar'}
                </p>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Feed Principal */}
      <div className="col-span-6 space-y-6">
        {/* Criar Post */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Avatar>
                  <AvatarFallback>{user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="O que você está pensando?"
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    rows={3}
                    className="resize-none"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="sm">
                  <Image className="w-4 h-4 mr-2" />
                  Adicionar Imagem
                </Button>
                <Button 
                  onClick={handleCreatePost}
                  disabled={isCreatingPost || !newPostContent.trim()}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Publicar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feed de Posts */}
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-semibold">Usuário</span>
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
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Sidebar Direita - Estatísticas */}
      <div className="col-span-3">
        <Card className="sticky top-6">
          <CardHeader>
            <CardTitle className="text-lg">Estatísticas da Comunidade</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{posts.length}</div>
              <div className="text-sm text-muted-foreground">Posts Hoje</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{groups.length}</div>
              <div className="text-sm text-muted-foreground">Grupos Ativos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {posts.reduce((acc, post) => acc + post.likes_count, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Curtidas Totais</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dialogs */}
      <Dialog open={!!selectedGroup} onOpenChange={() => setSelectedGroup(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedGroup?.name}</DialogTitle>
          </DialogHeader>
          {selectedGroup && <GroupChat group={selectedGroup} />}
        </DialogContent>
      </Dialog>

      <Dialog open={showCreateGroup} onOpenChange={setShowCreateGroup}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Novo Grupo</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Nome do grupo"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
            />
            <div className="flex space-x-2">
              <Button onClick={handleCreateGroup} disabled={!newGroupName.trim()}>
                Criar Grupo
              </Button>
              <Button variant="outline" onClick={() => setShowCreateGroup(false)}>
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
