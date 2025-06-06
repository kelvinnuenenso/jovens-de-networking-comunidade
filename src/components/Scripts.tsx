
import React from 'react';
import { FileText, Download, Star, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const Scripts = () => {
  const scripts = [
    {
      id: 1,
      title: 'Hook de Problema + Solução',
      category: 'Negócios',
      views: 1250,
      downloads: 89,
      rating: 4.8,
      description: 'Estrutura perfeita para apresentar um problema comum e sua solução de forma envolvente.',
      preview: 'Você sabia que 90% das pessoas cometem ESTE erro? [3s de suspense] Eu também cometia até descobrir...'
    },
    {
      id: 2,
      title: 'Storytelling de Transformação',
      category: 'Inspiracional',
      views: 890,
      downloads: 67,
      rating: 4.9,
      description: 'Como contar sua história de transformação de forma que inspire e converta.',
      preview: 'Há 1 ano eu estava quebrado... Hoje faturei R$ 50k este mês. Como? Te conto em 60 segundos.'
    },
    {
      id: 3,
      title: 'Tutorial Rápido com Urgência',
      category: 'Educativo',
      views: 1500,
      downloads: 112,
      rating: 4.7,
      description: 'Ensine algo valioso criando senso de urgência e engajamento.',
      preview: 'PARE TUDO! Isso vai mudar sua vida em 30 segundos. Passo 1: Abra seu celular...'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Biblioteca de Roteiros & Inspirações</h2>
        <p className="text-muted-foreground">
          Modelos comprovados para criar conteúdo que converte
        </p>
      </div>

      {/* Script Cards */}
      <div className="grid gap-6 md:grid-cols-1">
        {scripts.map((script) => (
          <Card key={script.id} className="glass-effect hover-lift">
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
              <p className="text-sm text-muted-foreground mb-4">
                {script.description}
              </p>
              
              {/* Preview */}
              <div className="bg-muted/50 p-4 rounded-lg mb-4">
                <h4 className="text-sm font-medium mb-2">Preview do Roteiro:</h4>
                <p className="text-sm italic">"{script.preview}"</p>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{script.views} visualizações</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Download className="w-4 h-4" />
                    <span>{script.downloads} downloads</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{script.rating}</span>
                  </span>
                </div>
                <Button variant="outline" size="sm">
                  Ver Completo
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Weekly Update Notice */}
      <Card className="glass-effect border-primary/30">
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Novos Roteiros Toda Semana! 🚀</h3>
          <p className="text-muted-foreground">
            A equipe Creator PRO adiciona novos modelos de roteiro baseados nas tendências mais atuais do TikTok.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
