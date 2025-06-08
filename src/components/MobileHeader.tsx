
import React from 'react';
import { LogOut, Search, Bell } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

export const MobileHeader = () => {
  const { signOut, user } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-bold text-primary truncate">Creator PRO</h1>
          <p className="text-xs text-muted-foreground">Community Hub</p>
        </div>
        
        <div className="flex items-center space-x-2 ml-4">
          <Button 
            variant="ghost" 
            size="icon"
            className="p-2 rounded-full hover:bg-muted transition-colors h-8 w-8"
          >
            <Search className="w-4 h-4 text-muted-foreground" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="p-2 rounded-full hover:bg-muted transition-colors h-8 w-8"
          >
            <Bell className="w-4 h-4 text-muted-foreground" />
          </Button>
          {user && (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleSignOut}
              className="p-2 rounded-full hover:bg-muted transition-colors h-8 w-8"
            >
              <LogOut className="w-4 h-4 text-muted-foreground" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
