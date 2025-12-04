import React, { useState } from 'react';
import { FileText, Download, Star, Eye, Plus, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Script {
  id: string;
  title: string;
  description: string | null;
  category: string;
  preview_text: string | null;
  full_content: string | null;
  views_count: number;
  downloads_count: number;
  rating: number;
  created_at: string;
}

const mockScripts: Script[] = [
  {
    id: '1',
    title: 'Roteiro para Vídeo de Review',
    description: 'Modelo completo para criar reviews que convertem.',
    category: 'Review',
    preview_text: 'Olá pessoal! Hoje vou mostrar pra vocês...',
    full_content: 'Conteúdo completo do roteiro...',
    views_count: 150,
    downloads_count: 45,
    rating: 4.5,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Roteiro para Tutorial',
    description: 'Estrutura perfeita para vídeos educativos.',
    category: 'Tutorial',
    preview_text: 'Neste vídeo você vai aprender...',
    full_content: 'Conteúdo completo do roteiro...',
    views_count: 200,
    downloads_count: 80,
    rating: 4.8,
    created_at: new Date().toISOString()
  }
];

export const Scripts = () => {
  const [scripts, setScripts] = useState<Script[]>(mockScripts);
  const [showAddForm, setShowAddForm] = useState(false);
  const { isAdmin } = useAuth();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    preview_text: '',
    full_content: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newScript: Script = {
      id: Date.now().toString(),
      ...formData,
      views_count: 0,
      downloads_count: 0,
      rating: 0,
      created_at: new Date().toISOString()
    };

    setScripts(prev => [newScript, ...prev]);
    toast({
      title: 'Roteiro adicionado com sucesso!',
      description: 'O novo roteiro está disponível para download.'
    });
    setFormData({
      title: '',
      description: '',
      category: '',
      preview_text: '',
      full_content: ''
    });
    setShowAddForm(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Biblioteca de Roteiros</h2>
          <p className="text-muted-foreground">
            Modelos comprovados para criar conteúdo que converte
          </p>
        </div>
        
        {isAdmin && (
          <Button onClick={() => setShowAddForm(!showAddForm)}>
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Roteiro
          </Button>
        )}
      </div>

      {/* Add Script Form */}
      {showAddForm && isAdmin && (
        <Card>
          <CardHeader>
            <CardTitle>Adicionar Novo Roteiro</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Título do roteiro"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  required
                />
                <Input
                  placeholder="Categoria"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  required
                />
              </div>
              <Textarea
                placeholder="Descrição do roteiro"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={2}
              />
              <Textarea
                placeholder="Preview do roteiro (primeiras linhas)"
                value={formData.preview_text}
                onChange={(e) => setFormData(prev => ({ ...prev, preview_text: e.target.value }))}
                rows={3}
              />
              <Textarea
                placeholder="Conteúdo completo do roteiro"
                value={formData.full_content}
                onChange={(e) => setFormData(prev => ({ ...prev, full_content: e.target.value }))}
                rows={6}
              />
              <div className="flex space-x-2">
                <Button type="submit">Adicionar Roteiro</Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Scripts List */}
      {scripts.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum roteiro disponível</h3>
            <p className="text-muted-foreground">
              {isAdmin ? 'Adicione o primeiro roteiro clicando no botão acima.' : 'Os roteiros serão adicionados em breve.'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-1">
          {scripts.map((script) => (
            <Card key={script.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-primary/20">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{script.title}</CardTitle>
                      <span className="text-sm text-primary font-medium">{script.category}</span>
                    </div>
                  </div>
                  <Button size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Baixar
                  </Button>
                </div>
              </CardHeader>

              <CardContent>
                {script.description && (
                  <p className="text-sm text-muted-foreground mb-4">
                    {script.description}
                  </p>
                )}
                
                {/* Preview */}
                {script.preview_text && (
                  <div className="bg-muted/50 p-4 rounded-lg mb-4">
                    <h4 className="text-sm font-medium mb-2">Preview do Roteiro:</h4>
                    <p className="text-sm italic">"{script.preview_text}"</p>
                  </div>
                )}

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{script.views_count} visualizações</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Download className="w-4 h-4" />
                      <span>{script.downloads_count} downloads</span>
                    </span>
                    {script.rating > 0 && (
                      <span className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{script.rating}</span>
                      </span>
                    )}
                  </div>
                  <Button variant="outline" size="sm">
                    Ver Completo
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
