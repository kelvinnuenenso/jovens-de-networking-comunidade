import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';

interface Message {
  id: string;
  content: string;
  user_name: string;
  created_at: string;
}

interface GroupChatProps {
  group: {
    id: string;
    name: string;
  };
}

export const GroupChat: React.FC<GroupChatProps> = ({ group }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Bem-vindo ao grupo! 🎉',
      user_name: 'Sistema',
      created_at: new Date().toISOString()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const { user } = useAuth();

  const sendMessage = () => {
    if (!newMessage.trim() || !user) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      user_name: user.email || 'Usuário',
      created_at: new Date().toISOString()
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-96">
      {/* Mensagens */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="flex items-start space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="text-xs">
                  {message.user_name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm font-medium">{message.user_name}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(message.created_at).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input de mensagem */}
      <div className="border-t p-4">
        <div className="flex space-x-2">
          <Input
            placeholder="Digite sua mensagem..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button onClick={sendMessage} disabled={!newMessage.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
