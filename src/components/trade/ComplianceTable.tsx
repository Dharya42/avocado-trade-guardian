
import { Compliance } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CheckCircle,
  XCircle,
  Clock,
  Shield,
  Info
} from 'lucide-react';

interface ComplianceTableProps {
  compliances: Compliance[];
}

export const ComplianceTable = ({ compliances }: ComplianceTableProps) => {
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
        <Shield className="mr-2 h-5 w-5" />
        Compliance Information
      </div>
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="w-[70%]">Compliance</TableHead>
            <TableHead className="w-[30%]">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {compliances.map((compliance, index) => (
            <TableRow
              key={index}
              className={compliance.details ? "cursor-pointer" : ""}
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

      {compliances.some(compliance => compliance.details) && (
        <div className="p-4 border-t">
          <div className="text-sm font-medium mb-2 flex items-center">
            <Info className="h-4 w-4 mr-1" />
            Compliance Details
          </div>
          <div className="space-y-3">
            {compliances
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
    </div>
  );
};
