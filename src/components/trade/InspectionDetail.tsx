
import { Inspection, QualityCheck, Compliance } from '@/types';
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
  FlaskConical,
  Weight,
  Droplets,
  Shield,
  Wrench,
  Beaker
} from 'lucide-react';

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

  const getQualityIcon = (type: QualityCheck['type']) => {
    switch (type) {
      case 'Physical':
        return <Weight className="h-5 w-5 text-blue-500" />;
      case 'Chemical':
        return <FlaskConical className="h-5 w-5 text-purple-500" />;
      case 'Moisture':
        return <Droplets className="h-5 w-5 text-cyan-500" />;
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
            {formatDate(inspection.date)} • {inspection.location}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Quality Checks */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <FlaskConical className="mr-2 h-5 w-5" />
            Quality Inspection Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {inspection.qualityChecks.map((check, index) => (
              <div key={index} className="flex items-start border-b pb-4 last:border-0 last:pb-0">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-3">
                  {getQualityIcon(check.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{check.type} Check</h4>
                    {getStatusIcon(check.status)}
                  </div>
                  <div className="mt-1 text-sm flex justify-between">
                    <span className="text-muted-foreground">Result: {check.value}</span>
                    {check.threshold && <span className="text-muted-foreground">Threshold: {check.threshold}</span>}
                  </div>
                  {check.details && (
                    <div className="mt-2 text-sm bg-muted p-2 rounded-md">
                      <p className="text-muted-foreground">{check.details}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compliance Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Shield className="mr-2 h-5 w-5" />
            Compliance Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {inspection.compliances.map((compliance, index) => (
              <div key={index} className="flex items-start border-b pb-4 last:border-0 last:pb-0">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{compliance.name}</h4>
                    {getStatusIcon(compliance.status)}
                  </div>
                  {compliance.details && (
                    <div className="mt-2 text-sm bg-muted p-2 rounded-md">
                      <p className="text-muted-foreground">{compliance.details}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Inspection Tools */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Wrench className="mr-2 h-5 w-5" />
            Inspection Tools
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {inspection.inspectionTools.map((tool, index) => (
              <div key={index} className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm flex items-center">
                <Wrench className="h-4 w-4 mr-1" />
                {tool}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Lab Information */}
      {inspection.lab && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Beaker className="mr-2 h-5 w-5" />
              Lab Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex">
                <span className="w-24 font-medium">Name:</span>
                <span>{inspection.lab.name}</span>
              </div>
              <div className="flex">
                <span className="w-24 font-medium">Location:</span>
                <span>{inspection.lab.location}</span>
              </div>
              {inspection.lab.contactPerson && (
                <div className="flex">
                  <span className="w-24 font-medium">Contact:</span>
                  <span>{inspection.lab.contactPerson}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Notes */}
      {inspection.notes && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{inspection.notes}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
