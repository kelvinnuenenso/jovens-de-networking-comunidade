
import React from 'react';
import { CommunityFeedDesktop } from '@/components/CommunityFeedDesktop';
import { CommunityFeedMobile } from '@/components/CommunityFeedMobile';
import { useMobile } from '@/hooks/use-mobile';

export const CommunityFeed = () => {
  const isMobile = useMobile();

  return isMobile ? <CommunityFeedMobile /> : <CommunityFeedDesktop />;
};
