
import { Inspection } from '@/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircle,
  XCircle,
  Clock,
} from 'lucide-react';
import { PostHarvestDetails } from './PostHarvestDetails';
import { PreShipmentDetails } from './PreShipmentDetails';
import { TransitDetails } from './TransitDetails';
import { PostOfImportDetails } from './PostOfImportDetails';
import { DistributionCenterDetails } from './DistributionCenterDetails';
import { RetailShelfDetails } from './RetailShelfDetails';
import { PortOfExportDetails } from './PortOfExportDetails';
import { InspectionSummary } from './InspectionSummary';
import { QualityChecksTable } from './QualityChecksTable';
import { ComplianceTable } from './ComplianceTable';
import { InspectionTools } from './InspectionTools';
import { LabInformation } from './LabInformation';
import { InspectionNotes } from './InspectionNotes';

interface InspectionDetailProps {
  inspection: Inspection;
}

export const InspectionDetail = ({ inspection }: InspectionDetailProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusIcon = (status: 'Passed' | 'Failed' | 'Pending') => {
    switch (status) {
      case 'Passed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'Failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'Pending':
        return <Clock className="h-5 w-5 text-amber-500" />;
    }
  };

  // Helper: Render last details accordion for the node type within the summary card
  const renderLastAccordionContent = () => {
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            {inspection.type} Inspection 
            <span className="ml-2">{getStatusIcon(inspection.status)}</span>
          </CardTitle>
          <CardDescription>
            <InspectionSummary inspection={inspection} formatDate={formatDate} />
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <QualityChecksTable qualityChecks={inspection.qualityChecks} />
          <ComplianceTable compliances={inspection.compliances} />
          {renderLastAccordionContent()}
        </CardContent>
      </Card>

      <InspectionTools tools={inspection.inspectionTools} />

      {inspection.lab && (
        <LabInformation lab={inspection.lab} inspectionType={inspection.type} />
      )}

      {inspection.notes && (
        <InspectionNotes notes={inspection.notes} />
      )}
    </div>
  );
};
