import { useState } from 'react';
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

const mockGroups: MessageGroup[] = [
  {
    id: '1',
    name: 'Geral',
    description: 'Grupo geral da comunidade',
    image_url: null,
    created_by: 'admin',
    is_private: false,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Dúvidas',
    description: 'Tire suas dúvidas sobre criação de conteúdo',
    image_url: null,
    created_by: 'admin',
    is_private: false,
    created_at: new Date().toISOString()
  }
];

export const useMessageGroups = () => {
  const [groups, setGroups] = useState<MessageGroup[]>(mockGroups);
  const [loading] = useState(false);
  const { user } = useAuth();

  const joinGroup = async (groupId: string) => {
    if (!user) return;
    console.log('Joined group:', groupId);
  };

  const createGroup = async (name: string, description?: string, isPrivate = false) => {
    if (!user) return { error: 'Usuário não autenticado' };

    const newGroup: MessageGroup = {
      id: Date.now().toString(),
      name,
      description: description || null,
      image_url: null,
      created_by: user.id,
      is_private: isPrivate,
      created_at: new Date().toISOString()
    };

    setGroups(prev => [newGroup, ...prev]);
    return { data: newGroup };
  };

  return {
    groups,
    loading,
    joinGroup,
    createGroup,
    refetch: () => {}
  };
};
