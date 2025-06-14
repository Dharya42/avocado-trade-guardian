
import { cn } from '@/lib/utils';
import { Inspection } from '@/types';

interface TransitSummaryProps {
  inspection: Inspection;
  formatDate: (date: string) => string;
}

export const TransitSummary = ({ inspection, formatDate }: TransitSummaryProps) => {
  if (inspection.type !== 'Transit' || !inspection.transitDetails) return null;

  const { transitSummary } = inspection.transitDetails;

  return (
    <div className="mt-2 space-y-2">
      <div className="flex items-center gap-2">
        <span className="font-medium">Transit Condition:</span>
        <span className={cn(
          "text-sm px-2 py-1 rounded",
          transitSummary.overallCondition === 'OK' && "bg-green-50 text-green-700",
          transitSummary.overallCondition === 'Minor Issues' && "bg-amber-50 text-amber-700",
          transitSummary.overallCondition === 'Major Issues' && "bg-red-50 text-red-700"
        )}>
          {transitSummary.overallCondition}
        </span>
      </div>
      {transitSummary.communicationLog.length > 0 && (
        <div className="text-sm text-muted-foreground">
          <span className="font-medium">Latest Update:</span>{' '}
          {transitSummary.communicationLog[transitSummary.communicationLog.length - 1]}
        </div>
      )}
      <div className="text-sm text-muted-foreground">
        <span className="font-medium">ETA at POD:</span>{' '}
        {formatDate(transitSummary.finalEta)}
      </div>
    </div>
  );
};
