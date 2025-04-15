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
  FileText,
  Info
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
        return "bg-green-50 border-green-200";
      case 'Failed':
        return "bg-red-50 border-red-200";
      case 'Pending':
        return "bg-amber-50 border-amber-200";
    }
  };

  const getStatusTextColor = (status: 'Passed' | 'Failed' | 'Pending') => {
    switch (status) {
      case 'Passed':
        return "text-green-700";
      case 'Failed':
        return "text-red-700";
      case 'Pending':
        return "text-amber-700";
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
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[30%]">Parameter</TableHead>
                <TableHead className="w-[25%]">Value</TableHead>
                <TableHead className="w-[25%]">Threshold</TableHead>
                <TableHead className="w-[20%]">Status</TableHead>
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
                  <TableCell>{check.value || '—'}</TableCell>
                  <TableCell>{check.threshold || '—'}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-between">
                      <div className={`flex items-center px-2 py-1 rounded ${getStatusColor(check.status)}`}>
                        {getStatusIcon(check.status)}
                        <span className={`ml-1 font-medium ${getStatusTextColor(check.status)}`}>{check.status}</span>
                      </div>
                      {check.details && (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Info className="h-4 w-4" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-80" align="end">
                            <div className="flex flex-col space-y-2">
                              <div className="flex items-center">
                                {getQualityIcon(check.type)}
                                <span className="ml-2 font-medium">{check.type} Analysis</span>
                              </div>
                              <div className={`p-3 rounded-md ${getStatusColor(check.status)} border`}>
                                <p className="text-sm text-muted-foreground">{check.details}</p>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[70%]">Compliance</TableHead>
                <TableHead className="w-[30%]">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inspection.compliances.map((compliance, index) => (
                <TableRow 
                  key={index}
                  className={compliance.details ? "cursor-pointer" : ""}
                  onClick={() => {}}
                >
                  <TableCell className="font-medium">
                    {compliance.name}
                  </TableCell>
                  <TableCell>
                    <div className={`flex items-center px-2 py-1 rounded ${getStatusColor(compliance.status)}`}>
                      {getStatusIcon(compliance.status)}
                      <span className={`ml-1 font-medium ${getStatusTextColor(compliance.status)}`}>{compliance.status}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {inspection.compliances.some(compliance => compliance.details) && (
            <div className="p-4 border-t">
              <div className="text-sm font-medium mb-2 flex items-center">
                <Info className="h-4 w-4 mr-1" />
                Compliance Details
              </div>
              <div className="space-y-3">
                {inspection.compliances
                  .filter(compliance => compliance.details)
                  .map((compliance, index) => (
                    <div key={index} className={`p-3 rounded-md ${getStatusColor(compliance.status)} border`}>
                      <div className="font-medium mb-1">
                        {compliance.name}
                      </div>
                      <p className="text-sm text-muted-foreground">{compliance.details}</p>
                    </div>
                  ))}
              </div>
            </div>
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
