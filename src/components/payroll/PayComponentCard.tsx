import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface PayComponentCardProps {
  title: string;
  value: number;
  unit?: string;
  description?: string;
  color?: 'primary' | 'secondary' | 'success' | 'destructive';
}

export function PayComponentCard({ 
  title, 
  value, 
  unit = '%', 
  description,
  color = 'primary',
}: PayComponentCardProps) {
  const colorClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    success: 'text-green-600',
    destructive: 'text-destructive',
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-2">
            <span className={cn('text-3xl font-bold', colorClasses[color])}>
              {value}
            </span>
            <span className="text-lg text-muted-foreground">{unit}</span>
          </div>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
