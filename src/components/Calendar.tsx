
import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Clock, Users, Calendar as CalendarIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface Event {
  id: string;
  title: string;
  description: string | null;
  date: string;
  time: string;
  event_type: string;
  duration_minutes: number;
  max_participants: number | null;
  created_by: string | null;
  created_at: string;
}

export const Calendar = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    event_type: 'workshop',
    duration_minutes: 60,
    max_participants: null as number | null
  });

  const isAdmin = true; // Simplificado - implementar verificação real depois

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true })
        .order('time', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!user) return;

    try {
      if (editingEvent) {
        const { error } = await supabase
          .from('events')
          .update(formData)
          .eq('id', editingEvent.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('events')
          .insert({
            ...formData,
            created_by: user.id
          });

        if (error) throw error;
      }

      fetchEvents();
      resetForm();
    } catch (error) {
      console.error('Erro ao salvar evento:', error);
    }
  };

  const handleEdit = (event: Event) => {
    setFormData({
      title: event.title,
      description: event.description || '',
      date: event.date,
      time: event.time,
      event_type: event.event_type,
      duration_minutes: event.duration_minutes,
      max_participants: event.max_participants
    });
    setEditingEvent(event);
    setShowCreateDialog(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja deletar este evento?')) {
      try {
        const { error } = await supabase
          .from('events')
          .delete()
          .eq('id', id);

        if (error) throw error;
        fetchEvents();
      } catch (error) {
        console.error('Erro ao deletar evento:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      event_type: 'workshop',
      duration_minutes: 60,
      max_participants: null
    });
    setEditingEvent(null);
    setShowCreateDialog(false);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('pt-BR');
  };

  const formatTime = (timeStr: string) => {
    return timeStr.substring(0, 5);
  };

  if (loading) {
    return <div className="text-center py-8">Carregando eventos...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Agenda de Eventos</h2>
        {isAdmin && (
          <Button onClick={() => setShowCreateDialog(true)} className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Criar Evento</span>
          </Button>
        )}
      </div>

      {/* Events Grid */}
      <div className="grid gap-6">
        {events.map((event) => (
          <Card key={event.id} className="glass-effect hover-lift">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <CalendarIcon className="w-4 h-4" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{formatTime(event.time)}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>{event.duration_minutes} min</span>
                    </div>
                    {event.max_participants && (
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>Máx. {event.max_participants}</span>
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <p className="text-muted-foreground mb-4">{event.description}</p>
                  
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      event.event_type === 'workshop' ? 'bg-blue-100 text-blue-800' :
                      event.event_type === 'live' ? 'bg-red-100 text-red-800' :
                      event.event_type === 'mentoria' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {event.event_type === 'workshop' ? 'Workshop' :
                       event.event_type === 'live' ? 'Live' :
                       event.event_type === 'mentoria' ? 'Mentoria' :
                       event.event_type}
                    </span>
                    
                    <Button size="sm">
                      Participar
                    </Button>
                  </div>
                </div>
                
                {isAdmin && (
                  <div className="flex space-x-2">
                    <Button size="sm" variant="ghost" onClick={() => handleEdit(event)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleDelete(event.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={resetForm}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingEvent ? 'Editar Evento' : 'Criar Novo Evento'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <Input
              placeholder="Título do evento"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
            
            <Textarea
              placeholder="Descrição"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
              
              <Input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
              />
            </div>
            
            <Select 
              value={formData.event_type} 
              onValueChange={(value) => setFormData({...formData, event_type: value})}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="workshop">Workshop</SelectItem>
                <SelectItem value="live">Live</SelectItem>
                <SelectItem value="mentoria">Mentoria</SelectItem>
                <SelectItem value="networking">Networking</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="number"
                placeholder="Duração (minutos)"
                value={formData.duration_minutes}
                onChange={(e) => setFormData({...formData, duration_minutes: parseInt(e.target.value)})}
              />
              
              <Input
                type="number"
                placeholder="Máx. participantes"
                value={formData.max_participants || ''}
                onChange={(e) => setFormData({...formData, max_participants: e.target.value ? parseInt(e.target.value) : null})}
              />
            </div>
            
            <div className="flex space-x-2">
              <Button onClick={handleSubmit} disabled={!formData.title || !formData.date || !formData.time}>
                {editingEvent ? 'Atualizar' : 'Criar'}
              </Button>
              <Button variant="outline" onClick={resetForm}>
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
