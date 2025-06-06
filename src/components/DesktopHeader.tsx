
import React from 'react';
import { Search, Bell, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const DesktopHeader = () => {
  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-6">
      {/* Title */}
      <div>
        <h1 className="text-xl font-semibold">Fábrica de Views</h1>
        <p className="text-sm text-muted-foreground">Creator PRO Community</p>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar na comunidade..." 
            className="pl-10 bg-background"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></span>
        </Button>
        
        <Button variant="ghost" size="icon">
          <Settings className="w-5 h-5" />
        </Button>

        <Avatar className="w-8 h-8">
          <AvatarImage src="/api/placeholder/32/32" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};
