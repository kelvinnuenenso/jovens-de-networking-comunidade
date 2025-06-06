
import React from 'react';
import { Home, Calendar, Play, FileText, Target, User, Star } from 'lucide-react';

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
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
      <div className="grid grid-cols-7 px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center py-2 px-1 transition-colors duration-200 ${
                activeTab === item.id
                  ? 'text-primary'
                  : 'text-muted-foreground'
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
