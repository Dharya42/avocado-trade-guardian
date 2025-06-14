
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
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'Pending':
        return <Clock className="h-4 w-4 text-amber-500" />;
    }
  };

  const getQualityIcon = (type: QualityCheck['type']) => {
    switch (type) {
      case 'Physical':
        return <Weight className="h-4 w-4 text-blue-500" />;
      case 'Chemical':
        return <FlaskConical className="h-4 w-4 text-purple-500" />;
      case 'Moisture':
        return <Droplets className="h-4 w-4 text-cyan-500" />;
    }
  };

  const getStatusColor = (status: 'Passed' | 'Failed' | 'Pending') => {
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
    <div className="space-y-3">
      <div className="text-base font-medium flex items-center">
        <FlaskConical className="mr-2 h-4 w-4" />
        Quality Inspection Results
      </div>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow className="border-b">
              <TableHead className="py-2 text-xs font-medium">Parameter</TableHead>
              <TableHead className="py-2 text-xs font-medium">Value</TableHead>
              <TableHead className="py-2 text-xs font-medium">Threshold</TableHead>
              <TableHead className="py-2 text-xs font-medium">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {qualityChecks.map((check, index) => (
              <TableRow key={index} className="hover:bg-muted/20">
                <TableCell className="py-2 font-medium">
                  <div className="flex items-center">
                    {getQualityIcon(check.type)}
                    <span className="ml-2 text-sm">{check.type}</span>
                  </div>
                </TableCell>
                <TableCell className="py-2 text-sm">{check.value || '—'}</TableCell>
                <TableCell className="py-2 text-sm">{check.threshold || '—'}</TableCell>
                <TableCell className="py-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {getStatusIcon(check.status)}
                      <span className={`ml-1 text-sm font-medium ${getStatusColor(check.status)}`}>
                        {check.status}
                      </span>
                    </div>
                    {check.details && (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Info className="h-3 w-3" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80" align="end">
                          <div className="flex flex-col space-y-2">
                            <div className="flex items-center">
                              {getQualityIcon(check.type)}
                              <span className="ml-2 font-medium text-sm">{check.type} Analysis</span>
                            </div>
                            <div className="p-2 rounded-md bg-muted border">
                              <p className="text-xs text-muted-foreground">{check.details}</p>
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
    </div>
  );
};
