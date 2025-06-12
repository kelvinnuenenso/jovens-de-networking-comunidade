
import React from 'react';
import { CommunityFeedDesktop } from '@/components/CommunityFeedDesktop';
import { CommunityFeedMobile } from '@/components/CommunityFeedMobile';
import { StatsCards } from '@/components/StatsCards';

interface FeedProps {
  onNavigate: (tab: string) => void;
}

export const Feed: React.FC<FeedProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen">
      {/* Stats Cards */}
      <StatsCards />

      {/* Desktop Feed */}
      <div className="hidden md:block">
        <CommunityFeedDesktop />
      </div>

      {/* Mobile Feed */}
      <div className="md:hidden">
        <CommunityFeedMobile />
      </div>
    </div>
  );
};
