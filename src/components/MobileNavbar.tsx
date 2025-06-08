
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
    <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border z-50 safe-area-bottom">
      <div className="grid grid-cols-7 px-1 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center py-2 px-1 transition-all duration-200 rounded-lg active:scale-95 ${
                isActive
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Icon className={`w-4 h-4 mb-1 ${isActive ? 'scale-110' : ''} transition-transform`} />
              <span className={`text-[10px] font-medium leading-tight ${isActive ? 'font-semibold' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
