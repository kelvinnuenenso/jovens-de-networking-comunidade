
import React from 'react';
import { Video, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { KelvinContent } from '@/hooks/useKelvinContent';

interface KelvinContentCardProps {
  item: KelvinContent;
  isAdmin: boolean;
  onEdit: (item: KelvinContent) => void;
  onDelete: (id: string) => void;
}

export const KelvinContentCard: React.FC<KelvinContentCardProps> = ({
  item,
  isAdmin,
  onEdit,
  onDelete
}) => {
  const handleDelete = () => {
    if (confirm('Tem certeza que deseja deletar este conteúdo?')) {
      onDelete(item.id);
    }
  };

  const getContentTypeLabel = (type: string) => {
    switch (type) {
      case 'video': return 'Vídeo';
      case 'story': return 'Story';
      case 'live': return 'Live';
      default: return type;
    }
  };

  const getContentTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-red-500 text-white';
      case 'story': return 'bg-purple-500 text-white';
      case 'live': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <Card className="glass-effect hover-lift">
      <CardHeader className="p-0">
        <div className="relative">
          <img 
            src={item.thumbnail_url || '/api/placeholder/300/200'} 
            alt={item.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
            {item.duration || '00:00'}
          </div>
          <div className="absolute top-2 left-2">
            <span className={`px-2 py-1 rounded text-xs font-medium ${getContentTypeColor(item.content_type)}`}>
              {getContentTypeLabel(item.content_type)}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-2 line-clamp-2">{item.title}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {item.description}
        </p>
        
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <Button size="sm" variant="outline">
              <Video className="w-4 h-4 mr-2" />
              Assistir
            </Button>
          </div>
          
          {isAdmin && (
            <div className="flex space-x-1">
              <Button size="sm" variant="ghost" onClick={() => onEdit(item)}>
                <Edit className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={handleDelete}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
