
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface MessageGroup {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  created_by: string;
  is_private: boolean;
  created_at: string;
}

export interface GroupMessage {
  id: string;
  group_id: string;
  user_id: string;
  content: string;
  message_type: string;
  created_at: string;
}

export const useMessageGroups = () => {
  const [groups, setGroups] = useState<MessageGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchGroups();
  }, [user]);

  const fetchGroups = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('message_groups')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGroups(data || []);
    } catch (error) {
      console.error('Erro ao buscar grupos:', error);
    } finally {
      setLoading(false);
    }
  };

  const joinGroup = async (groupId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('group_members')
        .insert({
          group_id: groupId,
          user_id: user.id
        });

      if (error) throw error;
    } catch (error) {
      console.error('Erro ao entrar no grupo:', error);
    }
  };

  const createGroup = async (name: string, description?: string, isPrivate = false) => {
    if (!user) return { error: 'Usuário não autenticado' };

    try {
      const { data, error } = await supabase
        .from('message_groups')
        .insert({
          name,
          description,
          created_by: user.id,
          is_private: isPrivate
        })
        .select()
        .single();

      if (error) throw error;

      // Adicionar criador como membro
      await supabase
        .from('group_members')
        .insert({
          group_id: data.id,
          user_id: user.id,
          role: 'admin'
        });

      setGroups(prev => [data, ...prev]);
      return { data };
    } catch (error) {
      console.error('Erro ao criar grupo:', error);
      return { error };
    }
  };

  return {
    groups,
    loading,
    joinGroup,
    createGroup,
    refetch: fetchGroups
  };
};
