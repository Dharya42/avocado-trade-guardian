
import { useState } from 'react';
import { Inspection } from '@/types';
import { 
  Package, 
  Truck, 
  Warehouse, 
  Box,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface InspectionTimelineProps {
  inspections: Inspection[];
  onSelectInspection: (inspection: Inspection) => void;
  reverse?: boolean;
}

export const InspectionTimeline = ({ 
  inspections, 
  onSelectInspection,
  reverse = false
}: InspectionTimelineProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(
    inspections.length > 0 ? inspections[0].id : null
  );

  const handleSelect = (inspection: Inspection) => {
    setSelectedId(inspection.id);
    onSelectInspection(inspection);
  };

  const getInspectionIcon = (type: Inspection['type']) => {
    switch (type) {
      case 'Post-Harvest':
        return <Package className="h-6 w-6" />;
      case 'Pre-Shipment':
        return <Box className="h-6 w-6" />;
      case 'On-Arrival':
        return <Truck className="h-6 w-6" />;
      case 'Warehouse':
        return <Warehouse className="h-6 w-6" />;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: Inspection['status']) => {
    switch (status) {
      case 'Passed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'Failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'Pending':
        return <Clock className="h-5 w-5 text-amber-500" />;
      default:
        return null;
    }
  };

  // Sort inspections by date
  let sortedInspections = [...inspections].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  
  // If reverse is true, reverse the order
  if (reverse) {
    sortedInspections.reverse();
  }

  return (
    <div className="p-4 border rounded-lg bg-white">
      <h3 className="text-lg font-semibold mb-4">Inspection Timeline</h3>
      <div className="relative">
        {/* Vertical line connecting inspection nodes */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 z-0" />
        
        <div className="space-y-8 relative z-10">
          {sortedInspections.map((inspection, index) => (
            <div 
              key={inspection.id}
              onClick={() => handleSelect(inspection)}
              className={cn(
                "flex items-start cursor-pointer",
                "hover:bg-gray-50 rounded-md p-2 transition-colors",
                selectedId === inspection.id && "bg-avocado-50"
              )}
            >
              <div className={cn(
                "flex items-center justify-center h-12 w-12 rounded-full shrink-0",
                "border-2",
                inspection.status === 'Passed' ? "border-green-500 bg-green-50" :
                inspection.status === 'Failed' ? "border-red-500 bg-red-50" :
                "border-amber-500 bg-amber-50"
              )}>
                {getInspectionIcon(inspection.type)}
              </div>
              
              <div className="ml-4">
                <div className="flex items-center">
                  <h4 className="text-md font-medium">{inspection.type} Inspection</h4>
                  <div className="ml-2">{getStatusIcon(inspection.status)}</div>
                </div>
                <div className="text-sm text-gray-500">{new Date(inspection.date).toLocaleDateString()}</div>
                <div className="text-sm text-gray-500">{inspection.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
