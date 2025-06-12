
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, BookOpen, Target, Calendar } from 'lucide-react';
import { useUserStats } from '@/hooks/useUserStats';

export const StatsCards = () => {
  const { stats, loading } = useUserStats();

  const statsData = [
    {
      title: 'Pontos Totais',
      value: loading ? '...' : stats.total_points.toLocaleString(),
      icon: Trophy,
      color: 'text-yellow-500'
    },
    {
      title: 'Cursos Concluídos',
      value: loading ? '...' : stats.courses_completed,
      icon: BookOpen,
      color: 'text-blue-500'
    },
    {
      title: 'Desafios Completados',
      value: loading ? '...' : stats.challenges_completed,
      icon: Target,
      color: 'text-green-500'
    },
    {
      title: 'Dias na Comunidade',
      value: loading ? '...' : stats.days_in_community,
      icon: Calendar,
      color: 'text-purple-500'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {statsData.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
