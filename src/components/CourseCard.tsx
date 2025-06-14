
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Play, 
  Clock, 
  Star, 
  Users,
  Edit,
  Trash2
} from 'lucide-react';
import { Course } from '@/hooks/useCourses';

interface CourseCardProps {
  course: Course;
  isAdmin: boolean;
  onEdit: (course: Course) => void;
  onDelete: (course: Course) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  isAdmin,
  onEdit,
  onDelete,
}) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        {course.thumbnail_url ? (
          <img
            src={course.thumbnail_url}
            alt={course.title}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
            <Play className="w-12 h-12 text-primary" />
          </div>
        )}
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-black/50 text-white">
            {course.category}
          </Badge>
        </div>
        {isAdmin && (
          <div className="absolute top-2 left-2 flex gap-1">
            <Button
              size="sm"
              variant="secondary"
              className="h-8 w-8 p-0 bg-black/50 hover:bg-black/70"
              onClick={() => onEdit(course)}
            >
              <Edit className="w-3 h-3" />
            </Button>
            <Button
              size="sm"
              variant="destructive"
              className="h-8 w-8 p-0 bg-red-500/80 hover:bg-red-500"
              onClick={() => onDelete(course)}
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        )}
      </div>
      <CardHeader className="pb-2 flex flex-col items-center justify-center">
        <CardTitle className="text-xl md:text-2xl font-extrabold text-primary text-center tracking-tight mb-1">
          {course.title}
        </CardTitle>
        <p className="text-sm text-muted-foreground text-center font-medium">por {course.instructor}</p>
      </CardHeader>
      <CardContent>
        {course.description && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 text-center">
            {course.description}
          </p>
        )}
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center space-x-4">
            {course.duration && (
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{course.duration}</span>
              </div>
            )}
            {course.rating && (
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-current text-yellow-500" />
                <span>{course.rating}</span>
              </div>
            )}
            {course.students_count && (
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{course.students_count}</span>
              </div>
            )}
          </div>
        </div>
        <Button className="w-full" size="sm">
          <Play className="w-4 h-4 mr-2" />
          Assistir Agora
        </Button>
      </CardContent>
    </Card>
  );
};
