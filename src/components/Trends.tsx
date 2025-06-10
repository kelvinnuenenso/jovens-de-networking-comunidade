
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Hash } from 'lucide-react';
import { useTrendingTopics } from '@/hooks/useTrendingTopics';

export const Trends = () => {
  const { topics, loading } = useTrendingTopics();

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Carregando tendências...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center space-x-2 mb-6">
        <TrendingUp className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold">Tendências Virais</h1>
      </div>
      
      <p className="text-muted-foreground mb-8">
        Acompanhe as hashtags e tópicos mais quentes da comunidade Creator PRO
      </p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => (
          <Card key={topic.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center space-x-2">
                <Hash className="w-4 h-4 text-primary" />
                <span className="text-lg">{topic.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                {topic.description}
              </p>
              <Badge variant="secondary" className="text-xs">
                {topic.posts_count} posts
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 p-6 bg-muted rounded-lg">
        <h3 className="font-semibold mb-2">💡 Dica do dia</h3>
        <p className="text-sm text-muted-foreground">
          Use essas tendências nos seus conteúdos para aumentar o alcance e engajamento!
        </p>
      </div>
    </div>
  );
};
