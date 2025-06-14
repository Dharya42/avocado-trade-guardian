
import { cn } from '@/lib/utils';
import { Inspection } from '@/types';

interface PortOfExportSummaryProps {
  inspection: Inspection;
}

export const PortOfExportSummary = ({ inspection }: PortOfExportSummaryProps) => {
  if (inspection.type !== 'Port-Export' || !inspection.portOfExportDetails) return null;

  const { overallAssessment } = inspection.portOfExportDetails;

  return (
    <div className="mt-2 space-y-2">
      <div className="flex items-center gap-2">
        <span className="font-medium">Export Status:</span>
        <span className={cn(
          "text-sm px-2 py-1 rounded",
          overallAssessment.exportClearance 
            ? "bg-green-50 text-green-700"
            : "bg-red-50 text-red-700"
        )}>
          {overallAssessment.exportClearance ? "Cleared for Export" : "Not Cleared"}
        </span>
      </div>
      {overallAssessment.findings && (
        <div className="text-sm text-muted-foreground">
          <span className="font-medium">Key Finding:</span>{' '}
          {overallAssessment.findings.split('\n')[0]}
        </div>
      )}
      {overallAssessment.nonConformities && (
        <div className="text-sm text-muted-foreground">
          <span className="font-medium">Non-Conformities:</span>{' '}
          {overallAssessment.nonConformities.split('\n')[0]}
        </div>
      )}
      {overallAssessment.correctiveActions && (
        <div className="text-sm text-muted-foreground">
          <span className="font-medium">Action Required:</span>{' '}
          {overallAssessment.correctiveActions.split('\n')[0]}
        </div>
      )}
    </div>
  );
};
