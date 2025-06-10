
import { CommunityFeed } from '@/components/CommunityFeed';
import { QuickActions } from '@/components/QuickActions';
import { useUserStats } from '@/hooks/useUserStats';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, BookOpen, Target, Calendar } from 'lucide-react';

interface FeedProps {
  onNavigate?: (tab: string) => void;
}

export const Feed: React.FC<FeedProps> = ({ onNavigate = () => {} }) => {
  const { stats, loading } = useUserStats();

  return (
    <div className="space-y-6">
      {/* Estatísticas do Usuário */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pontos</CardTitle>
            <Trophy className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? '...' : stats.total_points.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aulas</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? '...' : stats.courses_completed}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Desafios</CardTitle>
            <Target className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? '...' : stats.challenges_completed}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dias na Comunidade</CardTitle>
            <Calendar className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? '...' : stats.days_in_community}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ações Rápidas */}
      <QuickActions onNavigate={onNavigate} />

      {/* Feed da Comunidade */}
      <CommunityFeed />
    </div>
  );
};
