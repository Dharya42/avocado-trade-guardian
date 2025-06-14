
import { Inspection } from '@/types';
import {
  CheckCircle,
  XCircle,
  Clock,
} from 'lucide-react';
import {
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { InspectionSummary } from './InspectionSummary';

interface InspectionHeaderProps {
  inspection: Inspection;
}

export const InspectionHeader = ({ inspection }: InspectionHeaderProps) => {
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

  return (
    <CardHeader>
      <CardTitle className="flex items-center">
        {inspection.type} Inspection 
        <span className="ml-2">{getStatusIcon(inspection.status)}</span>
      </CardTitle>
      <CardDescription>
        <InspectionSummary inspection={inspection} formatDate={formatDate} />
      </CardDescription>
    </CardHeader>
  );
};
