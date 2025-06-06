
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
import { MobileHeader } from '@/components/MobileHeader';

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
        <MobileHeader />
        
        <main className="pt-20 pb-20">
          {renderContent()}
        </main>
        
        <MobileNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
};

export default Index;
