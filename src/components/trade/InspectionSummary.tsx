
import { Inspection } from '@/types';
import { PostHarvestSummary } from './PostHarvestSummary';
import { PreShipmentSummary } from './PreShipmentSummary';
import { PortOfExportSummary } from './PortOfExportSummary';
import { TransitSummary } from './TransitSummary';
import { PortOfImportSummary } from './PortOfImportSummary';
import { DistributionCenterSummary } from './DistributionCenterSummary';
import { RetailShelfSummary } from './RetailShelfSummary';

interface InspectionSummaryProps {
  inspection: Inspection;
  formatDate: (date: string) => string;
}

export const InspectionSummary = ({ inspection, formatDate }: InspectionSummaryProps) => {
  if (!inspection) return null;

  return (
    <div>
      {formatDate(inspection.date)} • {inspection.location}
      <PostHarvestSummary inspection={inspection} />
      <PreShipmentSummary inspection={inspection} />
      <PortOfExportSummary inspection={inspection} />
      <TransitSummary inspection={inspection} formatDate={formatDate} />
      <PortOfImportSummary inspection={inspection} />
      <DistributionCenterSummary inspection={inspection} />
      <RetailShelfSummary inspection={inspection} />
    </div>
  );
};
