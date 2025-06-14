
import { PortOfExportDetails as PortOfExportDetailsType } from '@/types';
import { 
  CheckCircle,
  AlertCircle as LucideAlertCircle,
  XCircle,
  Truck, 
  Box, 
  Clipboard, 
  FileText,
  ThermometerSnowflake,
  CalendarCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface PortOfExportDetailsProps {
  details: PortOfExportDetailsType;
}

export const PortOfExportDetails = ({ details }: PortOfExportDetailsProps) => {
  if (!details) {
    return (
      <div className="p-4 border rounded-lg bg-white text-center">
        <p className="text-muted-foreground">No port of export inspection details available</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="p-4 border rounded-lg bg-white">
      <div className="space-y-4">
        <div className="flex items-center mb-4">
          <Truck className="h-5 w-5 mr-2" />
          <h3 className="font-medium">Port of Export Inspection Details</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-md p-3">
            <div className="text-sm text-muted-foreground mb-1">Inspector</div>
            <div className="font-medium">Port Inspector</div>
          </div>
          <div className="border rounded-md p-3">
            <div className="text-sm text-muted-foreground mb-1">Inspection Date</div>
            <div className="font-medium">{new Date().toLocaleDateString()}</div>
          </div>
        </div>

        <div className="border rounded-md p-4">
          <h4 className="font-medium mb-2 flex items-center">
            <Box className="h-4 w-4 mr-2" />
            Export Documentation
          </h4>
          <div className="space-y-2">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              <span>Export License Verified</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              <span>Phytosanitary Certificate Present</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              <span>Commercial Invoice Reviewed</span>
            </div>
          </div>
        </div>

        <div className="border rounded-md p-4">
          <h4 className="font-medium mb-2 flex items-center">
            <Clipboard className="h-4 w-4 mr-2" />
            Quality Assessment
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Overall Rating</div>
              <div className="font-medium">4.5/5</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Sample Size</div>
              <div className="font-medium">50 fruits</div>
            </div>
          </div>
        </div>

        <div className="border rounded-md p-4">
          <h4 className="font-medium mb-2 flex items-center">
            <ThermometerSnowflake className="h-4 w-4 mr-2" />
            Temperature Control
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Container Temperature</span>
              <span className="font-medium text-green-600">5.2°C</span>
            </div>
            <div className="flex justify-between">
              <span>Target Range</span>
              <span className="text-muted-foreground">4-6°C</span>
            </div>
          </div>
        </div>

        <div className="border rounded-md p-4">
          <h4 className="font-medium mb-2 flex items-center">
            <CalendarCheck className="h-4 w-4 mr-2" />
            Loading Information
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Container Condition</div>
              <div className="font-medium">Good</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Security Seal</div>
              <div className="font-medium flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                Applied
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
