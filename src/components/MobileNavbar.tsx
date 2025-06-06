
import React from 'react';
import { Home, Calendar, Play, FileText, Target, User, Star, Link } from 'lucide-react';

interface MobileNavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const MobileNavbar: React.FC<MobileNavbarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'feed', label: 'Feed', icon: Home },
    { id: 'calendar', label: 'Agenda', icon: Calendar },
    { id: 'courses', label: 'Aulas', icon: Play },
    { id: 'scripts', label: 'Roteiros', icon: FileText },
    { id: 'challenges', label: 'Desafios', icon: Target },
    { id: 'profile', label: 'Perfil', icon: User },
    { id: 'kelvin', label: 'Kelvin', icon: Star },
    { id: 'links', label: 'Links', icon: Link },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border z-50">
      <div className="grid grid-cols-4 gap-1 p-2">
        {navItems.slice(0, 4).map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`p-3 rounded-lg transition-all duration-200 flex flex-col items-center space-y-1 ${
                activeTab === item.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-4 gap-1 p-2 pt-0">
        {navItems.slice(4).map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`p-3 rounded-lg transition-all duration-200 flex flex-col items-center space-y-1 ${
                activeTab === item.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
