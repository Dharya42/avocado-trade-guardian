
import { cn } from '@/lib/utils';
import { Inspection } from '@/types';

interface PortOfImportSummaryProps {
  inspection: Inspection;
}

export const PortOfImportSummary = ({ inspection }: PortOfImportSummaryProps) => {
  if (inspection.type !== 'On-Arrival' || !inspection.postOfImportDetails) return null;

  const { complianceDecision } = inspection.postOfImportDetails;
  const hasNonCompliance = complianceDecision.overallCompliance === 'Non-Compliant' || 
                          complianceDecision.overallCompliance === 'Pending Lab Test';

  return (
    <div className="mt-2 space-y-2">
      <div className="flex items-center gap-2">
        <span className="font-medium">Compliance Status:</span>
        <span className={cn(
          "text-sm px-2 py-1 rounded",
          complianceDecision.overallCompliance === 'Compliant' && "bg-green-50 text-green-700",
          complianceDecision.overallCompliance === 'Non-Compliant' && "bg-red-50 text-red-700",
          complianceDecision.overallCompliance === 'Pending Lab Test' && "bg-amber-50 text-amber-700"
        )}>
          {complianceDecision.overallCompliance}
        </span>
      </div>
      {hasNonCompliance && (
        <div className="text-sm text-muted-foreground">
          <span className="font-medium">Key Issues:</span>{' '}
          {Object.entries(complianceDecision.nonComplianceReasons)
            .filter(([_, value]) => value && typeof value === 'boolean')
            .map(([key]) => key.replace(/([A-Z])/g, ' $1').toLowerCase())
            .slice(0, 2)
            .join(', ')}
          {Object.values(complianceDecision.nonComplianceReasons).filter(v => v).length > 2 && ' ...'}
        </div>
      )}
      <div className="text-sm text-muted-foreground">
        <span className="font-medium">Action:</span>{' '}
        {complianceDecision.action}
      </div>
    </div>
  );
};
