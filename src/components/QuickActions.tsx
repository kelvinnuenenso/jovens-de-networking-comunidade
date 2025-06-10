
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Video, FileText, Users, TrendingUp, Target } from 'lucide-react';

interface QuickActionsProps {
  onNavigate: (tab: string) => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onNavigate }) => {
  const actions = [
    {
      icon: Plus,
      label: 'Criar Post',
      description: 'Compartilhe suas ideias',
      color: 'bg-blue-500',
      onClick: () => console.log('Criar post')
    },
    {
      icon: Video,
      label: 'Ver Aulas',
      description: 'Acesse o conteúdo',
      color: 'bg-purple-500',
      onClick: () => onNavigate('courses')
    },
    {
      icon: FileText,
      label: 'Roteiros',
      description: 'Scripts virais',
      color: 'bg-green-500',
      onClick: () => onNavigate('scripts')
    },
    {
      icon: Target,
      label: 'Desafios',
      description: 'Participe e ganhe',
      color: 'bg-orange-500',
      onClick: () => onNavigate('challenges')
    },
    {
      icon: Users,
      label: 'Comunidade',
      description: 'Conecte-se',
      color: 'bg-pink-500',
      onClick: () => onNavigate('feed')
    },
    {
      icon: TrendingUp,
      label: 'Tendências',
      description: 'Veja o que está bombando',
      color: 'bg-red-500',
      onClick: () => onNavigate('trends')
    }
  ];

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <h3 className="font-semibold mb-4 text-sm text-muted-foreground">Ações Rápidas</h3>
        <div className="grid grid-cols-3 gap-3">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Button
                key={index}
                variant="ghost"
                className="h-auto p-3 flex flex-col items-center space-y-2 hover:bg-muted/50"
                onClick={action.onClick}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${action.color}`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div className="text-center">
                  <div className="text-xs font-medium">{action.label}</div>
                  <div className="text-[10px] text-muted-foreground">{action.description}</div>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
