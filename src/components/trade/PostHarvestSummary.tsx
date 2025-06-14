
import { cn } from '@/lib/utils';
import { Inspection } from '@/types';

interface PostHarvestSummaryProps {
  inspection: Inspection;
}

export const PostHarvestSummary = ({ inspection }: PostHarvestSummaryProps) => {
  if (inspection.type !== 'Post-Harvest' || !inspection.postHarvestDetails) return null;

  const { finalEvaluation } = inspection.postHarvestDetails;
  const criticalIssuesCount = finalEvaluation.nonConformities.filter(
    nc => nc.severity === 'Critical'
  ).length;

  return (
    <div className="mt-2 space-y-2">
      <div className="flex items-center gap-2">
        <span className="font-medium">Export Status:</span>
        <span className={cn(
          "text-sm px-2 py-1 rounded",
          finalEvaluation.exportReadiness === 'Ready' && "bg-green-100 text-green-700",
          finalEvaluation.exportReadiness === 'Minor Corrections Needed' && "bg-amber-100 text-amber-700",
          finalEvaluation.exportReadiness === 'Not Ready' && "bg-red-100 text-red-700"
        )}>
          {finalEvaluation.exportReadiness}
        </span>
      </div>
      {finalEvaluation.strengths.length > 0 && (
        <div className="text-sm text-muted-foreground">
          <span className="font-medium">Key Strength:</span> {finalEvaluation.strengths[0]}
        </div>
      )}
      <div className="text-sm text-muted-foreground">
        <span className="font-medium">Critical Issues:</span> {
          criticalIssuesCount > 0 ? `${criticalIssuesCount} found` : 'None'
        }
      </div>
    </div>
  );
};
