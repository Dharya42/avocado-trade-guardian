
import { useState } from 'react';
import { Inspection } from '@/types';
import { 
  Package, 
  Truck, 
  Warehouse, 
  Box,
  Ship,
  CheckCircle,
  XCircle,
  Clock,
  Store,
  Anchor
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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
      case 'Port-Export':
        return <Anchor className="h-6 w-6" />;
      case 'Transit':
        return <Ship className="h-6 w-6" />;
      case 'On-Arrival':
        return <Truck className="h-6 w-6" />;
      case 'Warehouse':
        return <Warehouse className="h-6 w-6" />;
      case 'Retail':
        return <Store className="h-6 w-6" />;
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
      <ScrollArea className="w-full">
        <div className="relative">
          {/* Horizontal line connecting inspection nodes */}
          <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200 z-0" />
          
          <div className="flex space-x-8 relative z-10 pb-4 px-2">
            {sortedInspections.map((inspection, index) => (
              <div 
                key={inspection.id}
                onClick={() => handleSelect(inspection)}
                className={cn(
                  "flex flex-col items-center cursor-pointer min-w-[150px]",
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
                
                <div className="mt-3 text-center">
                  <div className="flex items-center justify-center">
                    <h4 className="text-sm font-medium">{inspection.type}</h4>
                    <div className="ml-1">{getStatusIcon(inspection.status)}</div>
                  </div>
                  <div className="text-xs text-gray-500">{new Date(inspection.date).toLocaleDateString()}</div>
                  <div className="text-xs text-gray-500 truncate max-w-[140px]">{inspection.location}</div>
                </div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </div>
      </ScrollArea>
    </div>
  );
};
