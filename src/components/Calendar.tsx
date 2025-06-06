
import React from 'react';
import { Clock, Users, Video, Calendar as CalendarIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const Calendar = () => {
  const events = [
    {
      id: 1,
      title: 'Mentoria em Grupo: Estratégias de Crescimento',
      date: '2024-01-15',
      time: '19:00',
      duration: '90min',
      participants: 25,
      type: 'live',
      description: 'Aprenda as melhores estratégias para crescer organicamente no TikTok e converter seguidores em clientes.'
    },
    {
      id: 2,
      title: 'Workshop: Criando Roteiros Virais',
      date: '2024-01-18',
      time: '20:00',
      duration: '60min',
      participants: 15,
      type: 'workshop',
      description: 'Descubra os segredos por trás dos roteiros que viralizam e como adaptar para seu nicho.'
    },
    {
      id: 3,
      title: 'Encontro da Comunidade: Networking',
      date: '2024-01-22',
      time: '18:30',
      duration: '120min',
      participants: 40,
      type: 'meetup',
      description: 'Conecte-se com outros creators, compartilhe experiências e faça parcerias estratégicas.'
    }
  ];

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'live':
        return Video;
      case 'workshop':
        return CalendarIcon;
      case 'meetup':
        return Users;
      default:
        return CalendarIcon;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'live':
        return 'bg-red-500/20 border-red-500/30';
      case 'workshop':
        return 'bg-primary/20 border-primary/30';
      case 'meetup':
        return 'bg-green-500/20 border-green-500/30';
      default:
        return 'bg-primary/20 border-primary/30';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Agenda de Eventos</h2>
        <p className="text-muted-foreground">
          Não perca nenhuma mentoria, workshop ou encontro da comunidade
        </p>
      </div>

      {/* Upcoming Events */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold flex items-center space-x-2">
          <CalendarIcon className="w-5 h-5 text-primary" />
          <span>Próximos Eventos</span>
        </h3>

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
          {events.map((event) => {
            const Icon = getEventIcon(event.type);
            return (
              <Card key={event.id} className={`glass-effect hover-lift ${getEventColor(event.type)}`}>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-background/50">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{event.title}</CardTitle>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center space-x-1">
                            <CalendarIcon className="w-4 h-4" />
                            <span>{new Date(event.date).toLocaleDateString('pt-BR')}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{event.time}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{event.participants} participantes</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" className="shrink-0">
                      Participar
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {event.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary">
                      Duração: {event.duration}
                    </span>
                    <Button variant="outline" size="sm">
                      Adicionar ao Calendário
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <Card className="glass-effect text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary mb-1">12</div>
            <div className="text-sm text-muted-foreground">Eventos este mês</div>
          </CardContent>
        </Card>
        <Card className="glass-effect text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary mb-1">3</div>
            <div className="text-sm text-muted-foreground">Próxima semana</div>
          </CardContent>
        </Card>
        <Card className="glass-effect text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary mb-1">156</div>
            <div className="text-sm text-muted-foreground">Total participantes</div>
          </CardContent>
        </Card>
        <Card className="glass-effect text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary mb-1">8</div>
            <div className="text-sm text-muted-foreground">Eventos assistidos</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
