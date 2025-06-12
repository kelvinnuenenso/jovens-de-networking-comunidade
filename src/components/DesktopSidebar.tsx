
import React from 'react';
import { Home, Calendar, Play, FileText, Target, User, Star, Link, BarChart3, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface DesktopSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'feed', label: 'Feed da Comunidade', icon: Home, badge: '3' },
    { id: 'calendar', label: 'Agenda & Eventos', icon: Calendar },
    { id: 'courses', label: 'Central de Aulas', icon: Play, badge: 'NOVO' },
    { id: 'scripts', label: 'Biblioteca de Roteiros', icon: FileText },
    { id: 'challenges', label: 'Área de Desafios', icon: Target },
    { id: 'kelvin', label: 'Canal do Kelvin', icon: Star, badge: 'LIVE' },
    { id: 'profile', label: 'Meu Perfil', icon: User },
    { id: 'links', label: 'Links Úteis', icon: Link },
  ];

  const quickActions = [
    {
      id: 'scripts',
      label: 'Roteiros',
      description: 'Scripts virais',
      icon: FileText,
      color: 'bg-green-500'
    },
    {
      id: 'trends',
      label: 'Tendências',
      description: 'Veja o que está bombando',
      icon: TrendingUp,
      color: 'bg-red-500'
    },
    {
      id: 'feed',
      label: 'Comunidade',
      description: 'Conecte-se',
      icon: Users,
      color: 'bg-pink-500'
    }
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-400 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">FV</span>
          </div>
          <div>
            <h2 className="font-bold text-lg">Fábrica de Views</h2>
            <p className="text-sm text-muted-foreground">Creator PRO</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <Button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start h-12 ${
                isActive 
                  ? 'bg-primary text-primary-foreground shadow-lg' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              <span className="text-sm font-medium flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span className={`text-xs px-2 py-1 rounded-full ${
                  item.badge === 'LIVE' 
                    ? 'bg-red-500 text-white' 
                    : item.badge === 'NOVO'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {item.badge}
                </span>
              )}
            </Button>
          );
        })}

        {/* Quick Actions Section */}
        <div className="pt-4 mt-4 border-t border-border">
          <h3 className="text-xs font-semibold text-muted-foreground mb-3 px-3">AÇÕES RÁPIDAS</h3>
          <div className="space-y-1">
            {quickActions.map((action) => {
              const Icon = action.icon;
              const isActive = activeTab === action.id;
              
              return (
                <Button
                  key={action.id}
                  onClick={() => setActiveTab(action.id)}
                  variant="ghost"
                  className={`w-full justify-start h-10 ${
                    isActive 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${action.color}`}>
                    <Icon className="w-3 h-3 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-xs font-medium">{action.label}</div>
                    <div className="text-[10px] text-muted-foreground">{action.description}</div>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="p-4 border-t border-border">
        <div className="bg-muted/50 rounded-lg p-4">
          <h3 className="font-semibold text-sm mb-2">Progresso Semanal</h3>
          <p className="text-xs text-muted-foreground mb-3">Aulas assistidas</p>
          <div className="flex items-center justify-between text-sm mb-2">
            <span>8/12</span>
            <span className="text-muted-foreground">67%</span>
          </div>
          <Progress value={67} className="h-2" />
        </div>
      </div>
    </div>
  );
};
