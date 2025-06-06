
import React, { useState } from 'react';
import { DesktopSidebar } from '@/components/DesktopSidebar';
import { Feed } from '@/components/Feed';
import { Calendar } from '@/components/Calendar';
import { Courses } from '@/components/Courses';
import { Scripts } from '@/components/Scripts';
import { Challenges } from '@/components/Challenges';
import { Profile } from '@/components/Profile';
import { KelvinChannel } from '@/components/KelvinChannel';
import { Links } from '@/components/Links';
import { MobileNavbar } from '@/components/MobileNavbar';
import { DesktopHeader } from '@/components/DesktopHeader';

const Index = () => {
  const [activeTab, setActiveTab] = useState('feed');

  const renderContent = () => {
    switch (activeTab) {
      case 'feed':
        return <Feed />;
      case 'calendar':
        return <Calendar />;
      case 'courses':
        return <Courses />;
      case 'scripts':
        return <Scripts />;
      case 'challenges':
        return <Challenges />;
      case 'profile':
        return <Profile />;
      case 'kelvin':
        return <KelvinChannel />;
      case 'links':
        return <Links />;
      default:
        return <Feed />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Layout */}
      <div className="hidden md:flex">
        {/* Sidebar */}
        <DesktopSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* Main Content */}
        <div className="flex-1 ml-64">
          <DesktopHeader />
          <main className="p-6">
            {renderContent()}
          </main>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-background to-background">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzMzk5RkYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSI0Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
          
          <div className="relative z-10 px-6 py-16 text-center">
            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              Fábrica de Views
            </h1>
            <p className="text-xl text-muted-foreground mb-2">
              Comunidade Creator PRO
            </p>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Transforme conteúdo em resultados. Cresça no TikTok e construa sua autoridade digital com estratégias comprovadas.
            </p>
          </div>
        </div>

        <MobileNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="container mx-auto px-4 py-8 pb-32">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
