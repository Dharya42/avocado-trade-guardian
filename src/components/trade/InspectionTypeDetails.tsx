
import { Inspection } from '@/types';
import { PostHarvestDetails } from './PostHarvestDetails';
import { PreShipmentDetails } from './PreShipmentDetails';
import { TransitDetails } from './TransitDetails';
import { PostOfImportDetails } from './PostOfImportDetails';
import { DistributionCenterDetails } from './DistributionCenterDetails';
import { RetailShelfDetails } from './RetailShelfDetails';
import { PortOfExportDetails } from './PortOfExportDetails';

interface InspectionTypeDetailsProps {
  inspection: Inspection;
}

export const InspectionTypeDetails = ({ inspection }: InspectionTypeDetailsProps) => {
  switch (inspection.type) {
    case 'Post-Harvest':
      return inspection.postHarvestDetails ? (
        <div className="mt-4">
          <PostHarvestDetails details={inspection.postHarvestDetails} />
        </div>
      ) : null;
    case 'Pre-Shipment':
      return inspection.preShipmentDetails ? (
        <div className="mt-4">
          <PreShipmentDetails details={inspection.preShipmentDetails} />
        </div>
      ) : null;
    case 'Port-Export':
      return inspection.portOfExportDetails ? (
        <div className="mt-4">
          <PortOfExportDetails details={inspection.portOfExportDetails} />
        </div>
      ) : null;
    case 'Transit':
      return inspection.transitDetails ? (
        <div className="mt-4">
          <TransitDetails details={inspection.transitDetails} />
        </div>
      ) : null;
    case 'On-Arrival':
      return inspection.postOfImportDetails ? (
        <div className="mt-4">
          <PostOfImportDetails details={inspection.postOfImportDetails} />
        </div>
      ) : null;
    case 'Warehouse':
      return inspection.distributionCenterDetails ? (
        <div className="mt-4">
          <DistributionCenterDetails details={inspection.distributionCenterDetails} />
        </div>
      ) : null;
    case 'Retail':
      return inspection.retailShelfDetails ? (
        <div className="mt-4">
          <RetailShelfDetails details={inspection.retailShelfDetails} />
        </div>
      ) : null;
    default:
      return null;
  }
};
