
import { Inspection, QualityCheck, Compliance } from '@/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  XCircle,
  Clock,
  FlaskConical,
  Weight,
  Droplets,
  Shield,
  Wrench,
  Beaker,
  FileText
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

  const getStatusColor = (status: 'Passed' | 'Failed' | 'Pending') => {
    switch (status) {
      case 'Passed':
        return "text-green-500";
      case 'Failed':
        return "text-red-500";
      case 'Pending':
        return "text-amber-500";
    }
  };

  const handleDownloadLabReport = () => {
    console.log('Downloading lab report for:', inspection.type);
    // Mock download functionality
    alert(`Downloading lab report for ${inspection.type} inspection`);
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Parameter</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Threshold</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inspection.qualityChecks.map((check, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      {getQualityIcon(check.type)}
                      <span className="ml-2">{check.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>{check.value}</TableCell>
                  <TableCell>{check.threshold || 'N/A'}</TableCell>
                  <TableCell className={getStatusColor(check.status)}>
                    <div className="flex items-center">
                      {getStatusIcon(check.status)}
                      <span className="ml-1">{check.status}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {inspection.qualityChecks.some(check => check.details) && (
            <Accordion type="single" collapsible className="mt-4">
              <AccordionItem value="details">
                <AccordionTrigger>Quality Check Details</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {inspection.qualityChecks
                      .filter(check => check.details)
                      .map((check, index) => (
                        <div key={index} className="p-3 bg-muted rounded-md">
                          <div className="font-medium flex items-center mb-1">
                            {getQualityIcon(check.type)}
                            <span className="ml-2">{check.type} Check</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{check.details}</p>
                        </div>
                      ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Compliance</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inspection.compliances.map((compliance, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {compliance.name}
                  </TableCell>
                  <TableCell className={getStatusColor(compliance.status)}>
                    <div className="flex items-center">
                      {getStatusIcon(compliance.status)}
                      <span className="ml-1">{compliance.status}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {inspection.compliances.some(compliance => compliance.details) && (
            <Accordion type="single" collapsible className="mt-4">
              <AccordionItem value="details">
                <AccordionTrigger>Compliance Details</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {inspection.compliances
                      .filter(compliance => compliance.details)
                      .map((compliance, index) => (
                        <div key={index} className="p-3 bg-muted rounded-md">
                          <div className="font-medium mb-1">
                            {compliance.name}
                          </div>
                          <p className="text-sm text-muted-foreground">{compliance.details}</p>
                        </div>
                      ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
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
