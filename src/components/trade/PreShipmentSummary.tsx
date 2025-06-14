
import { cn } from '@/lib/utils';
import { Inspection } from '@/types';

interface PreShipmentSummaryProps {
  inspection: Inspection;
}

export const PreShipmentSummary = ({ inspection }: PreShipmentSummaryProps) => {
  if (inspection.type !== 'Pre-Shipment' || !inspection.preShipmentDetails) return null;

  const { finalAssessment } = inspection.preShipmentDetails;
  const criticalIssuesCount = finalAssessment.issues.filter(
    issue => issue.severity === 'Critical'
  ).length;

  return (
    <div className="mt-2 space-y-2">
      <div className="flex items-center gap-2">
        <span className="font-medium">Shipment Status:</span>
        <span className={cn(
          "text-sm px-2 py-1 rounded",
          finalAssessment.readyForShipment ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        )}>
          {finalAssessment.readyForShipment ? "Ready for Shipment" : "Not Ready"}
        </span>
      </div>
      {finalAssessment.recommendations.length > 0 && (
        <div className="text-sm text-muted-foreground">
          <span className="font-medium">Key Recommendation:</span> {finalAssessment.recommendations[0]}
        </div>
      )}
      <div className="text-sm text-muted-foreground">
        <span className="font-medium">Critical Issues:</span> {
          criticalIssuesCount > 0 ? `${criticalIssuesCount} found` : 'None'
        }
      </div>
      <div className="text-sm text-muted-foreground">
        <span className="font-medium">Approved by:</span> {finalAssessment.approver.name}
      </div>
    </div>
  );
};
