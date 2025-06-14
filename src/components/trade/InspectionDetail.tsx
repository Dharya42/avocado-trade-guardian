
import { Inspection } from '@/types';
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { QualityChecksTable } from './QualityChecksTable';
import { ComplianceTable } from './ComplianceTable';
import { InspectionTools } from './InspectionTools';
import { LabInformation } from './LabInformation';
import { InspectionNotes } from './InspectionNotes';
import { InspectionHeader } from './InspectionHeader';
import { InspectionTypeDetails } from './InspectionTypeDetails';

interface InspectionDetailProps {
  inspection: Inspection;
}

export const InspectionDetail = ({ inspection }: InspectionDetailProps) => {
  return (
    <div className="space-y-4">
      <Card>
        <InspectionHeader inspection={inspection} />
        <CardContent className="pt-0 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <QualityChecksTable qualityChecks={inspection.qualityChecks} />
            <ComplianceTable compliances={inspection.compliances} />
          </div>
          <InspectionTypeDetails inspection={inspection} />
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
