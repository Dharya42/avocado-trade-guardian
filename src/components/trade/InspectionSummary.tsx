import { cn } from '@/lib/utils';
import { Inspection } from '@/types';

interface InspectionSummaryProps {
  inspection: Inspection;
  formatDate: (date: string) => string;
}

export const InspectionSummary = ({ inspection, formatDate }: InspectionSummaryProps) => {
  if (!inspection) return null;

  const renderPostHarvestSummary = () => {
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

  const renderPreShipmentSummary = () => {
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

  const renderPortOfExportSummary = () => {
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

  const renderTransitSummary = () => {
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

  const renderPortOfImportSummary = () => {
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

  const renderDistributionCenterSummary = () => {
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

  const renderRetailShelfSummary = () => {
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

  // Add more inspection type summaries here as needed
  // e.g., renderTransitSummary, etc.

  return (
    <div>
      {formatDate(inspection.date)} • {inspection.location}
      {renderPostHarvestSummary()}
      {renderPreShipmentSummary()}
      {renderPortOfExportSummary()}
      {renderTransitSummary()}
      {renderPortOfImportSummary()}
      {renderDistributionCenterSummary()}
      {renderRetailShelfSummary()}
    </div>
  );
}; 