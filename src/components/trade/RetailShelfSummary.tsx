
import { cn } from '@/lib/utils';
import { Inspection } from '@/types';

interface RetailShelfSummaryProps {
  inspection: Inspection;
}

export const RetailShelfSummary = ({ inspection }: RetailShelfSummaryProps) => {
  if (inspection.type !== 'Retail' || !inspection.retailShelfDetails) return null;

  const { summary } = inspection.retailShelfDetails;

  return (
    <div className="mt-2 space-y-2">
      <div className="flex items-center gap-2">
        <span className="font-medium">Quality:</span>
        <span className={cn(
          "text-sm px-2 py-1 rounded",
          summary.overallQuality === 'Excellent' && "bg-green-50 text-green-700",
          summary.overallQuality === 'Good' && "bg-blue-50 text-blue-700",
          summary.overallQuality === 'Fair' && "bg-amber-50 text-amber-700",
          summary.overallQuality === 'Poor' && "bg-red-50 text-red-700"
        )}>
          {summary.overallQuality}
        </span>
      </div>
      <div className="text-sm text-muted-foreground">
        <span className="font-medium">Stock Level:</span>{' '}
        {summary.stockLevel}
      </div>
      {summary.immediateActions && (
        <div className="text-sm text-muted-foreground">
          <span className="font-medium">Action Taken:</span>{' '}
          {summary.immediateActions.split('\n')[0]}
          {summary.immediateActions.includes('\n') && '...'}
        </div>
      )}
      {summary.storeRecommendations && (
        <div className="text-sm text-muted-foreground">
          <span className="font-medium">Store Advisory:</span>{' '}
          {summary.storeRecommendations.split('\n')[0]}
          {summary.storeRecommendations.includes('\n') && '...'}
        </div>
      )}
    </div>
  );
};
