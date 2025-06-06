
import React, { useState } from 'react';
import { Play, Clock, Tag, Heart, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Todos', count: 24 },
    { id: 'viral-scripts', label: 'Roteiros Virais', count: 8 },
    { id: 'growth', label: 'Crescimento no TikTok', count: 6 },
    { id: 'monetization', label: 'Monetização', count: 5 },
    { id: 'triggers', label: 'Gatilhos', count: 3 },
    { id: 'strategies', label: 'Estratégias', count: 2 }
  ];

  const courses = [
    {
      id: 1,
      title: 'Como Criar Hooks Irresistíveis nos Primeiros 3 Segundos',
      instructor: 'Kelvin Creator',
      duration: '15:42',
      category: 'viral-scripts',
      thumbnail: '/api/placeholder/300/200',
      rating: 4.9,
      students: 145,
      favorite: false,
      description: 'Aprenda as técnicas exatas para capturar atenção instantaneamente.'
    },
    {
      id: 2,
      title: 'Estratégias de Crescimento Orgânico: 0 a 100k em 90 Dias',
      instructor: 'Kelvin Creator',
      duration: '22:15',
      category: 'growth',
      thumbnail: '/api/placeholder/300/200',
      rating: 4.8,
      students: 203,
      favorite: true,
      description: 'O método completo para crescer sua audiência rapidamente.'
    },
    {
      id: 3,
      title: 'Monetização Inteligente: Vendendo sem Ser Invasivo',
      instructor: 'Kelvin Creator',
      duration: '18:30',
      category: 'monetization',
      thumbnail: '/api/placeholder/300/200',
      rating: 4.9,
      students: 167,
      favorite: false,
      description: 'Como converter seguidores em clientes de forma natural.'
    },
    {
      id: 4,
      title: 'Gatilhos Psicológicos que Fazem Vídeos Viralizarem',
      instructor: 'Kelvin Creator',
      duration: '25:10',
      category: 'triggers',
      thumbnail: '/api/placeholder/300/200',
      rating: 4.7,
      students: 189,
      favorite: true,
      description: 'Os segredos da psicologia por trás dos vídeos virais.'
    }
  ];

  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Central de Aulas & Replays</h2>
        <p className="text-muted-foreground">
          Acesse todo conteúdo educacional da comunidade organizado por categoria
        </p>
      </div>

      {/* Categories Filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className="flex items-center space-x-2"
          >
            <Tag className="w-4 h-4" />
            <span>{category.label}</span>
            <span className="text-xs bg-muted px-2 py-1 rounded-full">
              {category.count}
            </span>
          </Button>
        ))}
      </div>

      {/* Course Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="glass-effect hover-lift overflow-hidden">
            <div className="relative">
              <img 
                src={course.thumbnail} 
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <Button size="lg" className="rounded-full">
                  <Play className="w-6 h-6 mr-2" />
                  Assistir Agora
                </Button>
              </div>
              <div className="absolute top-4 right-4">
                <Button 
                  size="sm" 
                  variant={course.favorite ? "default" : "outline"}
                  className="rounded-full p-2"
                >
                  <Heart className={`w-4 h-4 ${course.favorite ? 'fill-current' : ''}`} />
                </Button>
              </div>
              <div className="absolute bottom-4 right-4 bg-black/70 px-2 py-1 rounded text-sm">
                <Clock className="w-4 h-4 inline mr-1" />
                {course.duration}
              </div>
            </div>
            
            <CardHeader className="pb-4">
              <CardTitle className="text-lg leading-tight">
                {course.title}
              </CardTitle>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>por {course.instructor}</span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{course.rating}</span>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {course.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {course.students} estudantes
                </span>
                <Button size="sm">
                  <Play className="w-4 h-4 mr-2" />
                  Assistir
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Progress Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <Card className="glass-effect text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary mb-1">18</div>
            <div className="text-sm text-muted-foreground">Aulas assistidas</div>
          </CardContent>
        </Card>
        <Card className="glass-effect text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary mb-1">6</div>
            <div className="text-sm text-muted-foreground">Favoritos</div>
          </CardContent>
        </Card>
        <Card className="glass-effect text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary mb-1">75%</div>
            <div className="text-sm text-muted-foreground">Progresso geral</div>
          </CardContent>
        </Card>
        <Card className="glass-effect text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary mb-1">24h</div>
            <div className="text-sm text-muted-foreground">Tempo total</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
