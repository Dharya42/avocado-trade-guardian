
import { QualityCheck } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  XCircle,
  Clock,
  FlaskConical,
  Weight,
  Droplets,
  Info
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface QualityChecksTableProps {
  qualityChecks: QualityCheck[];
}

export const QualityChecksTable = ({ qualityChecks }: QualityChecksTableProps) => {
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

  return (
    <div className="mb-6">
      <div className="text-lg font-semibold flex items-center mb-2">
        <FlaskConical className="mr-2 h-5 w-5" />
        Quality Inspection Results
      </div>
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
          {qualityChecks.map((check, index) => (
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
    </div>
  );
};
