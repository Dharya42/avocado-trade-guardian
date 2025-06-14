
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ComplianceTableProps {
  compliances: Compliance[];
}

export const ComplianceTable = ({ compliances }: ComplianceTableProps) => {
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

  const compliancesWithDetails = compliances.filter(compliance => compliance.details);

  return (
    <div className="space-y-3">
      <div className="text-base font-medium flex items-center">
        <Shield className="mr-2 h-4 w-4" />
        Compliance Information
      </div>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow className="border-b">
              <TableHead className="py-2 text-xs font-medium">Compliance</TableHead>
              <TableHead className="py-2 text-xs font-medium">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {compliances.map((compliance, index) => (
              <TableRow key={index} className="hover:bg-muted/20">
                <TableCell className="py-2 font-medium text-sm">
                  {compliance.name}
                </TableCell>
                <TableCell className="py-2">
                  <div className="flex items-center">
                    {getStatusIcon(compliance.status)}
                    <span className={`ml-1 text-sm font-medium ${getStatusColor(compliance.status)}`}>
                      {compliance.status}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {compliancesWithDetails.length > 0 && (
        <Accordion type="single" collapsible className="border rounded-lg">
          <AccordionItem value="compliance-details" className="border-none">
            <AccordionTrigger className="px-4 py-2 text-sm font-medium hover:no-underline">
              <div className="flex items-center">
                <Info className="h-4 w-4 mr-2" />
                Compliance Details ({compliancesWithDetails.length})
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-3">
                {compliancesWithDetails.map((compliance, index) => (
                  <div key={index} className="p-3 rounded-md bg-muted/50 border">
                    <div className="font-medium mb-1 text-sm flex items-center">
                      {getStatusIcon(compliance.status)}
                      <span className="ml-2">{compliance.name}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{compliance.details}</p>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
};
