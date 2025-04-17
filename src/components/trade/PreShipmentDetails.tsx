import { PreShipmentInspection } from '@/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Building2,
  FileCheck,
  ClipboardList,
  Truck,
  SlidersHorizontal,
  Target,
  PackageCheck,
  Snowflake,
  Users2,
  ClipboardSignature,
  Image,
  CheckCircle,
  AlertCircle,
  XCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface PreShipmentDetailsProps {
  details: PreShipmentInspection;
}

type SectionStatus = 'Compliant' | 'Pending Review' | 'Issues Found';

export const PreShipmentDetails = ({ details }: PreShipmentDetailsProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getSectionStatus = (section: keyof PreShipmentInspection): SectionStatus => {
    switch (section) {
      case 'facilityIdentification':
        // Check if all required facility information is present
        return details.facilityIdentification.registrationNumber ? 'Compliant' : 'Issues Found';
      
      case 'regulatoryCompliance':
        // Check if all required documents are present and valid
        return details.regulatoryCompliance.documentsValid ? 'Compliant' : 'Issues Found';
      
      case 'facilityCondition':
        // Check facility maintenance and cleanliness
        return details.facilityCondition.maintenanceStatus === 'Good' ? 'Compliant' : 'Issues Found';
      
      case 'receivingArea':
        // Check receiving area compliance
        return details.receivingArea.temperature.withinRange ? 'Compliant' : 'Issues Found';
      
      case 'processingLine':
        // Check processing line equipment and procedures
        return details.processingLine.equipmentCondition === 'Operational' ? 'Compliant' : 'Issues Found';
      
      case 'qualityControl':
        // Check QC procedures and documentation
        return details.qualityControl.proceduresFollowed ? 'Compliant' : 'Pending Review';
      
      case 'packingLabeling':
        // Check packing materials and labeling compliance
        return details.packingLabeling.materialsCompliant ? 'Compliant' : 'Issues Found';
      
      case 'storage':
        // Check cold chain maintenance
        return details.storage.temperature.withinRange ? 'Compliant' : 'Issues Found';
      
      case 'workerHygiene':
        // Check worker hygiene compliance
        return details.workerHygiene.trainingCurrent ? 'Compliant' : 'Issues Found';
      
      case 'finalAssessment':
        // Check overall assessment
        return details.finalAssessment.readyForShipment ? 'Compliant' : 'Pending Review';
      
      default:
        return 'Pending Review';
    }
  };

  const getStatusIcon = (status: SectionStatus) => {
    switch (status) {
      case 'Compliant':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Pending Review':
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case 'Issues Found':
        return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusBadgeStyle = (status: SectionStatus) => {
    switch (status) {
      case 'Compliant':
        return "bg-green-50 text-green-700 border-green-200";
      case 'Pending Review':
        return "bg-amber-50 text-amber-700 border-amber-200";
      case 'Issues Found':
        return "bg-red-50 text-red-700 border-red-200";
    }
  };

  const renderStatusBadge = (section: keyof PreShipmentInspection) => {
    const status = getSectionStatus(section);
    return (
      <div className={cn(
        "flex items-center px-2 py-1 rounded-full border text-xs font-medium mr-3",
        getStatusBadgeStyle(status)
      )}>
        {getStatusIcon(status)}
        <span className="ml-1">{status}</span>
      </div>
    );
  };

  const renderPhotos = (photos: { type: string; url: string; }[]) => {
    if (!photos.length) return null;
    
    return (
      <div className="mt-4 border-t pt-4">
        <div className="text-sm font-medium mb-2 flex items-center">
          <Image className="h-4 w-4 mr-2" />
          Photos
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photo, index) => (
            <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
              <img
                src={photo.url}
                alt={photo.type}
                className="object-cover w-full h-full"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1">
                {photo.type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Accordion type="single" collapsible className="w-full space-y-4">
      {/* Facility Identification */}
      <AccordionItem value="facility-id" className="border rounded-lg">
        <AccordionTrigger className="px-4 hover:no-underline [&[data-state=open]>div]:text-primary">
          <div className="flex items-center w-full">
            {renderStatusBadge('facilityIdentification')}
            <Building2 className="h-5 w-5 mr-2" />
            <span>Facility Identification & General Info</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          {/* Add facility identification content */}
        </AccordionContent>
      </AccordionItem>

      {/* Regulatory Compliance */}
      <AccordionItem value="regulatory" className="border rounded-lg">
        <AccordionTrigger className="px-4 hover:no-underline [&[data-state=open]>div]:text-primary">
          <div className="flex items-center w-full">
            {renderStatusBadge('regulatoryCompliance')}
            <FileCheck className="h-5 w-5 mr-2" />
            <span>Regulatory Compliance & Documentation</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          {/* Add regulatory compliance content */}
        </AccordionContent>
      </AccordionItem>

      {/* Facility Condition */}
      <AccordionItem value="condition" className="border rounded-lg">
        <AccordionTrigger className="px-4 hover:no-underline [&[data-state=open]>div]:text-primary">
          <div className="flex items-center w-full">
            {renderStatusBadge('facilityCondition')}
            <ClipboardList className="h-5 w-5 mr-2" />
            <span>Facility Condition & Hygiene</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          {/* Add facility condition content */}
        </AccordionContent>
      </AccordionItem>

      {/* Receiving Area */}
      <AccordionItem value="receiving" className="border rounded-lg">
        <AccordionTrigger className="px-4 hover:no-underline [&[data-state=open]>div]:text-primary">
          <div className="flex items-center w-full">
            {renderStatusBadge('receivingArea')}
            <Truck className="h-5 w-5 mr-2" />
            <span>Receiving Area</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          {/* Add receiving area content */}
        </AccordionContent>
      </AccordionItem>

      {/* Processing Line */}
      <AccordionItem value="processing" className="border rounded-lg">
        <AccordionTrigger className="px-4 hover:no-underline [&[data-state=open]>div]:text-primary">
          <div className="flex items-center w-full">
            {renderStatusBadge('processingLine')}
            <SlidersHorizontal className="h-5 w-5 mr-2" />
            <span>Processing Line (Washing, Sorting, Grading)</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          {/* Add processing line content */}
        </AccordionContent>
      </AccordionItem>

      {/* Quality Control */}
      <AccordionItem value="quality" className="border rounded-lg">
        <AccordionTrigger className="px-4 hover:no-underline [&[data-state=open]>div]:text-primary">
          <div className="flex items-center w-full">
            {renderStatusBadge('qualityControl')}
            <Target className="h-5 w-5 mr-2" />
            <span>Quality Control (QC)</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          {/* Add quality control content */}
        </AccordionContent>
      </AccordionItem>

      {/* Packing & Labeling */}
      <AccordionItem value="packing" className="border rounded-lg">
        <AccordionTrigger className="px-4 hover:no-underline [&[data-state=open]>div]:text-primary">
          <div className="flex items-center w-full">
            {renderStatusBadge('packingLabeling')}
            <PackageCheck className="h-5 w-5 mr-2" />
            <span>Packing & Labeling</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          {/* Add packing and labeling content */}
        </AccordionContent>
      </AccordionItem>

      {/* Storage & Dispatch */}
      <AccordionItem value="storage" className="border rounded-lg">
        <AccordionTrigger className="px-4 hover:no-underline [&[data-state=open]>div]:text-primary">
          <div className="flex items-center w-full">
            {renderStatusBadge('storage')}
            <Snowflake className="h-5 w-5 mr-2" />
            <span>Storage (Pre-cooling/Cold Chain) & Dispatch</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          {/* Add storage and dispatch content */}
        </AccordionContent>
      </AccordionItem>

      {/* Worker Hygiene */}
      <AccordionItem value="hygiene" className="border rounded-lg">
        <AccordionTrigger className="px-4 hover:no-underline [&[data-state=open]>div]:text-primary">
          <div className="flex items-center w-full">
            {renderStatusBadge('workerHygiene')}
            <Users2 className="h-5 w-5 mr-2" />
            <span>Worker Hygiene & Practices</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          {/* Add worker hygiene content */}
        </AccordionContent>
      </AccordionItem>

      {/* Final Assessment */}
      <AccordionItem value="assessment" className="border rounded-lg">
        <AccordionTrigger className="px-4 hover:no-underline [&[data-state=open]>div]:text-primary">
          <div className="flex items-center w-full">
            {renderStatusBadge('finalAssessment')}
            <ClipboardSignature className="h-5 w-5 mr-2" />
            <span>Overall Assessment & Corrective Actions</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          {/* Add final assessment content */}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}; 