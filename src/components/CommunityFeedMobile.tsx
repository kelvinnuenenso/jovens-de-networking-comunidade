
import React, { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Send, Plus, Hash, TrendingUp, Users, MoreHorizontal } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useCommunityPosts } from '@/hooks/useCommunityPosts';
import { useAuth } from '@/contexts/AuthContext';
import { PostActions } from '@/components/PostActions';
import { EditPostDialog } from '@/components/EditPostDialog';

export const CommunityFeedMobile = () => {
  const { posts, loading, createPost, updatePost, deletePost, toggleLike, checkUserRole } = useCommunityPosts();
  const { user } = useAuth();
  
  const [newPostContent, setNewPostContent] = useState('');
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [editingPost, setEditingPost] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      const role = await checkUserRole();
      setUserRole(role);
    };
    if (user) {
      fetchUserRole();
    }
  }, [user, checkUserRole]);

  const handleCreatePost = async () => {
    if (!newPostContent.trim()) return;

    setIsCreatingPost(true);
    await createPost(newPostContent, selectedImage || undefined);
    setNewPostContent('');
    setSelectedImage(null);
    setImagePreview(null);
    setIsCreatingPost(false);
    setShowCreatePost(false);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditPost = (postId: string, content: string) => {
    setEditingPost(postId);
    setEditContent(content);
  };

  const handleSaveEdit = async (content: string) => {
    if (editingPost) {
      await updatePost(editingPost, content);
      setEditingPost(null);
      setEditContent('');
    }
  };

  const handleDeletePost = async (postId: string) => {
    await deletePost(postId);
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Compacto */}
      <div className="sticky top-0 bg-card/95 backdrop-blur-md border-b z-10 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Feed</h2>
              <p className="text-xs text-muted-foreground">1,247 membros</p>
            </div>
          </div>
          <Button 
            onClick={() => setShowCreatePost(!showCreatePost)} 
            size="sm"
            className={`rounded-full h-9 w-9 p-0 ${showCreatePost ? 'bg-muted' : 'bg-primary'}`}
            variant={showCreatePost ? "secondary" : "default"}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Stats em linha única */}
        <div className="flex justify-between mt-3 bg-muted/30 rounded-lg p-2">
          <div className="text-center flex-1">
            <div className="text-sm font-bold text-primary">23</div>
            <div className="text-xs text-muted-foreground">Posts hoje</div>
          </div>
          <div className="text-center flex-1 border-x border-border/50">
            <div className="text-sm font-bold text-green-500">156</div>
            <div className="text-xs text-muted-foreground">Online</div>
          </div>
          <div className="text-center flex-1">
            <div className="text-sm font-bold text-accent">4.8</div>
            <div className="text-xs text-muted-foreground">Rating</div>
          </div>
        </div>
      </div>

      <div className="px-3 space-y-3 pb-3">
        {/* Trending Topics - Mobile Otimizado */}
        <Card className="glass-effect mt-3">
          <CardContent className="p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Hash className="w-4 h-4 text-primary" />
                <span className="font-medium text-sm">Trending</span>
              </div>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['#RoteiroVirais', '#TikTokGrowth', '#CreatorTips'].map((topic, index) => (
                <Badge key={index} variant="secondary" className="text-xs px-2 py-1">
                  {topic}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Criar Post - Mobile Otimizado */}
        {showCreatePost && (
          <Card className="glass-effect">
            <CardContent className="p-3">
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarFallback className="text-xs bg-primary/20 text-primary">
                      {user?.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Textarea
                    placeholder="O que você quer compartilhar?"
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    rows={3}
                    className="text-sm resize-none border-0 bg-muted/30 min-h-[80px]"
                  />
                </div>
                
                {imagePreview && (
                  <div className="relative pl-10">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <Button
                      onClick={removeImage}
                      size="sm"
                      variant="destructive"
                      className="absolute top-2 right-2 h-6 w-6 p-0"
                    >
                      ×
                    </Button>
                  </div>
                )}
                
                <div className="flex items-center justify-between pl-10">
                  <div className="flex space-x-1">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageSelect}
                      accept="image/*"
                      className="hidden"
                    />
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      📷
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Hash className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button 
                    onClick={handleCreatePost}
                    disabled={isCreatingPost || !newPostContent.trim()}
                    size="sm"
                    className="bg-primary hover:bg-primary/90 h-8 px-3"
                  >
                    <Send className="w-3 h-3 mr-1" />
                    Postar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Posts do Feed - Mobile Otimizado */}
        <div className="space-y-3">
          {posts.map((post) => (
            <Card key={post.id} className="glass-effect">
              <CardContent className="p-3">
                <div className="flex items-start space-x-2">
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarFallback className="text-xs bg-primary/20 text-primary">
                      {post.user_id.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center space-x-2 min-w-0 flex-1">
                        <span className="font-medium text-sm truncate">Creator</span>
                        <Badge variant="secondary" className="text-xs px-1.5 py-0.5 flex-shrink-0">
                          Member
                        </Badge>
                        <span className="text-xs text-muted-foreground flex-shrink-0">
                          {new Date(post.created_at).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit'
                          })}
                        </span>
                      </div>
                      <PostActions
                        postId={post.id}
                        isOwner={post.user_id === user?.id}
                        isAdmin={userRole === 'admin'}
                        onEdit={() => handleEditPost(post.id, post.content)}
                        onDelete={() => handleDeletePost(post.id)}
                      />
                    </div>
                    <p className="text-sm mb-3 whitespace-pre-wrap break-words leading-relaxed">
                      {post.content}
                    </p>
                    {post.image_url && (
                      <div className="mb-3 rounded-lg overflow-hidden">
                        <img 
                          src={post.image_url} 
                          alt="Post image" 
                          className="w-full h-auto max-h-64 object-cover"
                        />
                      </div>
                    )}
                    <div className="flex items-center space-x-4">
                      <button 
                        onClick={() => toggleLike(post.id)}
                        className="flex items-center space-x-1.5 text-muted-foreground hover:text-red-500 transition-colors active:scale-95"
                      >
                        <Heart className="w-4 h-4" />
                        <span className="text-xs font-medium">{post.likes_count}</span>
                      </button>
                      <button className="flex items-center space-x-1.5 text-muted-foreground hover:text-primary transition-colors active:scale-95">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-xs font-medium">{post.comments_count}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Loading mais posts */}
        {posts.length > 0 && (
          <div className="text-center py-4">
            <Button variant="outline" size="sm" className="w-full">
              Carregar mais posts
            </Button>
          </div>
        )}

        {/* Empty state */}
        {posts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-medium mb-2">Nenhum post ainda</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Seja o primeiro a compartilhar algo!
            </p>
            <Button onClick={() => setShowCreatePost(true)}>
              Criar primeiro post
            </Button>
          </div>
        )}
      </div>

      <EditPostDialog
        open={!!editingPost}
        onOpenChange={(open) => !open && setEditingPost(null)}
        initialContent={editContent}
        onSave={handleSaveEdit}
      />
    </div>
  );
};
