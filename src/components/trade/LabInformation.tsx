
import { Lab } from '@/types';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Beaker, FileText } from 'lucide-react';

interface LabInformationProps {
  lab: Lab;
  inspectionType: string;
}

export const LabInformation = ({ lab, inspectionType }: LabInformationProps) => {
  const handleDownloadLabReport = () => {
    console.log('Downloading lab report for:', inspectionType);
    alert(`Downloading lab report for ${inspectionType} inspection`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center">
            <Beaker className="mr-2 h-5 w-5" />
            Lab Information
          </div>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto"
            onClick={handleDownloadLabReport}
          >
            <FileText className="h-4 w-4 mr-2" />
            Download Lab Report
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex">
            <span className="w-24 font-medium">Name:</span>
            <span>{lab.name}</span>
          </div>
          <div className="flex">
            <span className="w-24 font-medium">Location:</span>
            <span>{lab.location}</span>
          </div>
          {lab.contactPerson && (
            <div className="flex">
              <span className="w-24 font-medium">Contact:</span>
              <span>{lab.contactPerson}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
