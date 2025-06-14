
import { cn } from '@/lib/utils';
import { Inspection } from '@/types';

interface DistributionCenterSummaryProps {
  inspection: Inspection;
}

export const DistributionCenterSummary = ({ inspection }: DistributionCenterSummaryProps) => {
  if (inspection.type !== 'Warehouse' || !inspection.distributionCenterDetails) return null;

  const { finalAssessment } = inspection.distributionCenterDetails;

  return (
    <div className="mt-2 space-y-2">
      <div className="flex items-center gap-2">
        <span className="font-medium">Quality Rating:</span>
        <span className={cn(
          "text-sm px-2 py-1 rounded",
          finalAssessment.qualityRating === 'Premium' && "bg-green-50 text-green-700",
          finalAssessment.qualityRating === 'Acceptable' && "bg-amber-50 text-amber-700",
          finalAssessment.qualityRating === 'Below Standard' && "bg-red-50 text-red-700"
        )}>
          {finalAssessment.qualityRating}
        </span>
      </div>
      {finalAssessment.primaryIssues.length > 0 && (
        <div className="text-sm text-muted-foreground">
          <span className="font-medium">Key Issue:</span>{' '}
          {finalAssessment.primaryIssues[0]}
          {finalAssessment.primaryIssues.length > 1 && ' ...'}
        </div>
      )}
      <div className="text-sm text-muted-foreground">
        <span className="font-medium">Action:</span>{' '}
        {finalAssessment.recommendedAction}
      </div>
      <div className="text-sm text-muted-foreground">
        <span className="font-medium">Storage:</span>{' '}
        Bay {finalAssessment.finalStorageBay}
      </div>
    </div>
  );
};
