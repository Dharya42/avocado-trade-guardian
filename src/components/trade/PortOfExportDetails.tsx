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
  UserCircle,
  ClipboardCheck,
  FileCheck,
  Box,
  Thermometer,
  PackageOpen,
  LockKeyhole,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Image,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface PortOfExportDetails {
  inspectorInfo: {
    name: string;
    inspectionDate: string;
    inspectionTime: string;
    affiliatedBody: string;
    portLocation: string;
    photos?: { type: string; url: string; }[];
  };
  consignmentInfo: {
    bookingReference: string;
    exporterName: string;
    importerName: string;
    containerId: string;
    vesselInfo?: {
      name: string;
      voyageNumber: string;
    };
    phytosanitaryCertificate: boolean;
    exportPermit: boolean;
    photos?: { type: string; url: string; }[];
  };
  containerCondition: {
    containerType: 'Reefer';
    externalCondition: 'Pass' | 'Fail' | 'Needs Improvement';
    internalCleanliness: 'Pass' | 'Fail' | 'Needs Improvement';
    doorSealsCondition: 'Pass' | 'Fail' | 'Needs Improvement';
    reeferUnitFunctionality: 'Pass' | 'Fail' | 'Needs Improvement';
    photos?: { type: string; url: string; }[];
  };
  temperatureVerification: {
    setTemperature: number;
    actualTemperature: number;
    preCooled: boolean | null;
    pulpTemperatures: {
      location1: number;
      location2: number;
      location3: number;
      location4: number;
      location5: number;
      average: number;
    };
    temperatureLoggerPlaced: boolean | null;
    loggerPosition?: string;
    photos?: { type: string; url: string; }[];
  };
  loadingProcess: {
    loadingMethod: string;
    handlingPractices: 'Good' | 'Fair' | 'Poor';
    stackingPattern: 'Pass' | 'Fail' | 'Needs Improvement';
    cartonCondition: 'Good' | 'Fair' | 'Poor';
    dunnageMaterial?: string;
    timeframeAcceptable: boolean | null;
    photos?: { type: string; url: string; }[];
  };
  finalSealing: {
    totalUnits: {
      pallets?: number;
      cartons: number;
    };
    doorsClosed: boolean;
    highSecuritySeal: boolean;
    sealNumber: string;
    sealType: 'Bolt' | 'Cable' | 'Other';
    photos?: { type: string; url: string; }[];
  };
  overallAssessment: {
    findings: string;
    nonConformities?: string;
    correctiveActions?: string;
    exportClearance: boolean;
  };
}

interface PortOfExportDetailsProps {
  details: PortOfExportDetails;
}

type SectionStatus = 'Compliant' | 'Pending Review' | 'Issues Found';

export const PortOfExportDetails = ({ details }: PortOfExportDetailsProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getSectionStatus = (section: keyof PortOfExportDetails): SectionStatus => {
    switch (section) {
      case 'inspectorInfo':
        return details.inspectorInfo.name && details.inspectorInfo.inspectionDate ? 'Compliant' : 'Issues Found';
      
      case 'consignmentInfo':
        return details.consignmentInfo.phytosanitaryCertificate && details.consignmentInfo.exportPermit ? 'Compliant' : 'Issues Found';
      
      case 'containerCondition':
        const allPassing = Object.values(details.containerCondition).every(val => val === 'Pass');
        return allPassing ? 'Compliant' : 'Issues Found';
      
      case 'temperatureVerification':
        const tempInRange = Math.abs(details.temperatureVerification.setTemperature - details.temperatureVerification.actualTemperature) <= 1;
        return tempInRange ? 'Compliant' : 'Issues Found';
      
      case 'loadingProcess':
        return details.loadingProcess.handlingPractices === 'Good' && details.loadingProcess.stackingPattern === 'Pass'
          ? 'Compliant' : 'Issues Found';
      
      case 'finalSealing':
        return details.finalSealing.doorsClosed && details.finalSealing.highSecuritySeal ? 'Compliant' : 'Issues Found';
      
      case 'overallAssessment':
        return details.overallAssessment.exportClearance ? 'Compliant' : 'Issues Found';
      
      default:
        return 'Pending Review';
    }
  };

  const getStatusIcon = (status: SectionStatus) => {
    switch (status) {
      case 'Compliant':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
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

  const renderStatusBadge = (section: keyof PortOfExportDetails) => {
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

  const renderPhotos = (photos?: { type: string; url: string; }[]) => {
    if (!photos?.length) return null;
    
    return (
      <div className="mt-4 border-t pt-4">
        <div className="text-sm font-medium mb-2 flex items-center">
          <Image className="h-4 w-4 mr-2" />
          Photos & Evidence
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
      {/* Inspector Details */}
      <AccordionItem value="inspector-info" className="border rounded-lg">
        <AccordionTrigger className="px-4 hover:no-underline [&[data-state=open]>div]:text-primary">
          <div className="flex items-center w-full">
            {renderStatusBadge('inspectorInfo')}
            <UserCircle className="h-5 w-5 mr-2" />
            <span>Inspector Details</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Inspector Name</p>
              <p className="text-sm">{details.inspectorInfo.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Inspection Date & Time</p>
              <p className="text-sm">
                {formatDate(details.inspectorInfo.inspectionDate)} at {details.inspectorInfo.inspectionTime}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Affiliated Body</p>
              <p className="text-sm">{details.inspectorInfo.affiliatedBody}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Port Location</p>
              <p className="text-sm">{details.inspectorInfo.portLocation}</p>
            </div>
          </div>
          {renderPhotos(details.inspectorInfo.photos)}
        </AccordionContent>
      </AccordionItem>

      {/* Consignment & Documentation */}
      <AccordionItem value="consignment-info" className="border rounded-lg">
        <AccordionTrigger className="px-4 hover:no-underline [&[data-state=open]>div]:text-primary">
          <div className="flex items-center w-full">
            {renderStatusBadge('consignmentInfo')}
            <ClipboardCheck className="h-5 w-5 mr-2" />
            <span>Consignment & Documentation</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Booking Reference</p>
              <p className="text-sm">{details.consignmentInfo.bookingReference}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Exporter Name</p>
              <p className="text-sm">{details.consignmentInfo.exporterName}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Importer Name</p>
              <p className="text-sm">{details.consignmentInfo.importerName}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Container ID</p>
              <p className="text-sm">{details.consignmentInfo.containerId}</p>
            </div>
            {details.consignmentInfo.vesselInfo && (
              <div>
                <p className="text-sm font-medium">Vessel Details</p>
                <p className="text-sm">
                  {details.consignmentInfo.vesselInfo.name} / {details.consignmentInfo.vesselInfo.voyageNumber}
                </p>
              </div>
            )}
            <div>
              <p className="text-sm font-medium">Documentation Status</p>
              <div className="flex space-x-4">
                <span className={cn(
                  "text-sm px-2 py-1 rounded-full",
                  details.consignmentInfo.phytosanitaryCertificate
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                )}>
                  Phytosanitary: {details.consignmentInfo.phytosanitaryCertificate ? "✓" : "✗"}
                </span>
                <span className={cn(
                  "text-sm px-2 py-1 rounded-full",
                  details.consignmentInfo.exportPermit
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                )}>
                  Export Permit: {details.consignmentInfo.exportPermit ? "✓" : "✗"}
                </span>
              </div>
            </div>
          </div>
          {renderPhotos(details.consignmentInfo.photos)}
        </AccordionContent>
      </AccordionItem>

      {/* Container Condition */}
      <AccordionItem value="container-condition" className="border rounded-lg">
        <AccordionTrigger className="px-4 hover:no-underline [&[data-state=open]>div]:text-primary">
          <div className="flex items-center w-full">
            {renderStatusBadge('containerCondition')}
            <Box className="h-5 w-5 mr-2" />
            <span>Container Condition</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Inspection Point</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>External Condition</TableCell>
                <TableCell>
                  <span className={cn(
                    "px-2 py-1 rounded-full text-sm",
                    details.containerCondition.externalCondition === 'Pass'
                      ? "bg-green-50 text-green-700"
                      : details.containerCondition.externalCondition === 'Fail'
                      ? "bg-red-50 text-red-700"
                      : "bg-amber-50 text-amber-700"
                  )}>
                    {details.containerCondition.externalCondition}
                  </span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Internal Cleanliness</TableCell>
                <TableCell>
                  <span className={cn(
                    "px-2 py-1 rounded-full text-sm",
                    details.containerCondition.internalCleanliness === 'Pass'
                      ? "bg-green-50 text-green-700"
                      : details.containerCondition.internalCleanliness === 'Fail'
                      ? "bg-red-50 text-red-700"
                      : "bg-amber-50 text-amber-700"
                  )}>
                    {details.containerCondition.internalCleanliness}
                  </span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Door Seals Condition</TableCell>
                <TableCell>
                  <span className={cn(
                    "px-2 py-1 rounded-full text-sm",
                    details.containerCondition.doorSealsCondition === 'Pass'
                      ? "bg-green-50 text-green-700"
                      : details.containerCondition.doorSealsCondition === 'Fail'
                      ? "bg-red-50 text-red-700"
                      : "bg-amber-50 text-amber-700"
                  )}>
                    {details.containerCondition.doorSealsCondition}
                  </span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Reefer Unit Functionality</TableCell>
                <TableCell>
                  <span className={cn(
                    "px-2 py-1 rounded-full text-sm",
                    details.containerCondition.reeferUnitFunctionality === 'Pass'
                      ? "bg-green-50 text-green-700"
                      : details.containerCondition.reeferUnitFunctionality === 'Fail'
                      ? "bg-red-50 text-red-700"
                      : "bg-amber-50 text-amber-700"
                  )}>
                    {details.containerCondition.reeferUnitFunctionality}
                  </span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          {renderPhotos(details.containerCondition.photos)}
        </AccordionContent>
      </AccordionItem>

      {/* Temperature Verification */}
      <AccordionItem value="temperature-verification" className="border rounded-lg">
        <AccordionTrigger className="px-4 hover:no-underline [&[data-state=open]>div]:text-primary">
          <div className="flex items-center w-full">
            {renderStatusBadge('temperatureVerification')}
            <Thermometer className="h-5 w-5 mr-2" />
            <span>Temperature Verification</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Temperature Settings</p>
              <div className="space-y-2">
                <p className="text-sm">Set Temperature: {details.temperatureVerification.setTemperature}°C</p>
                <p className="text-sm">Actual Temperature: {details.temperatureVerification.actualTemperature}°C</p>
                <p className="text-sm">Pre-cooled: {
                  details.temperatureVerification.preCooled === null
                    ? "N/A"
                    : details.temperatureVerification.preCooled ? "Yes" : "No"
                }</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">Pulp Temperatures</p>
              <div className="space-y-1">
                <p className="text-sm">Location 1: {details.temperatureVerification.pulpTemperatures.location1}°C</p>
                <p className="text-sm">Location 2: {details.temperatureVerification.pulpTemperatures.location2}°C</p>
                <p className="text-sm">Location 3: {details.temperatureVerification.pulpTemperatures.location3}°C</p>
                <p className="text-sm">Location 4: {details.temperatureVerification.pulpTemperatures.location4}°C</p>
                <p className="text-sm">Location 5: {details.temperatureVerification.pulpTemperatures.location5}°C</p>
                <p className="text-sm font-medium">Average: {details.temperatureVerification.pulpTemperatures.average}°C</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">Temperature Logger</p>
              <p className="text-sm">
                Logger Placed: {
                  details.temperatureVerification.temperatureLoggerPlaced === null
                    ? "N/A"
                    : details.temperatureVerification.temperatureLoggerPlaced ? "Yes" : "No"
                }
                {details.temperatureVerification.loggerPosition && ` (${details.temperatureVerification.loggerPosition})`}
              </p>
            </div>
          </div>
          {renderPhotos(details.temperatureVerification.photos)}
        </AccordionContent>
      </AccordionItem>

      {/* Loading Process */}
      <AccordionItem value="loading-process" className="border rounded-lg">
        <AccordionTrigger className="px-4 hover:no-underline [&[data-state=open]>div]:text-primary">
          <div className="flex items-center w-full">
            {renderStatusBadge('loadingProcess')}
            <PackageOpen className="h-5 w-5 mr-2" />
            <span>Loading Process</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Loading Method</p>
              <p className="text-sm">{details.loadingProcess.loadingMethod}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Handling Practices</p>
              <span className={cn(
                "px-2 py-1 rounded-full text-sm",
                details.loadingProcess.handlingPractices === 'Good'
                  ? "bg-green-50 text-green-700"
                  : details.loadingProcess.handlingPractices === 'Poor'
                  ? "bg-red-50 text-red-700"
                  : "bg-amber-50 text-amber-700"
              )}>
                {details.loadingProcess.handlingPractices}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium">Stacking Pattern</p>
              <span className={cn(
                "px-2 py-1 rounded-full text-sm",
                details.loadingProcess.stackingPattern === 'Pass'
                  ? "bg-green-50 text-green-700"
                  : details.loadingProcess.stackingPattern === 'Fail'
                  ? "bg-red-50 text-red-700"
                  : "bg-amber-50 text-amber-700"
              )}>
                {details.loadingProcess.stackingPattern}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium">Carton Condition</p>
              <span className={cn(
                "px-2 py-1 rounded-full text-sm",
                details.loadingProcess.cartonCondition === 'Good'
                  ? "bg-green-50 text-green-700"
                  : details.loadingProcess.cartonCondition === 'Poor'
                  ? "bg-red-50 text-red-700"
                  : "bg-amber-50 text-amber-700"
              )}>
                {details.loadingProcess.cartonCondition}
              </span>
            </div>
            {details.loadingProcess.dunnageMaterial && (
              <div>
                <p className="text-sm font-medium">Dunnage Material</p>
                <p className="text-sm">{details.loadingProcess.dunnageMaterial}</p>
              </div>
            )}
            <div>
              <p className="text-sm font-medium">Loading Timeframe</p>
              <p className="text-sm">{
                details.loadingProcess.timeframeAcceptable === null
                  ? "N/A"
                  : details.loadingProcess.timeframeAcceptable
                  ? "Within Acceptable Range"
                  : "Exceeded Acceptable Range"
              }</p>
            </div>
          </div>
          {renderPhotos(details.loadingProcess.photos)}
        </AccordionContent>
      </AccordionItem>

      {/* Final Sealing */}
      <AccordionItem value="final-sealing" className="border rounded-lg">
        <AccordionTrigger className="px-4 hover:no-underline [&[data-state=open]>div]:text-primary">
          <div className="flex items-center w-full">
            {renderStatusBadge('finalSealing')}
            <LockKeyhole className="h-5 w-5 mr-2" />
            <span>Final Sealing</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Total Units</p>
              <p className="text-sm">
                {details.finalSealing.totalUnits.pallets && `${details.finalSealing.totalUnits.pallets} Pallets, `}
                {details.finalSealing.totalUnits.cartons} Cartons
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Door Status</p>
              <p className="text-sm">{details.finalSealing.doorsClosed ? "Properly Closed" : "Issue Detected"}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Security Seal</p>
              <div className="space-y-1">
                <p className="text-sm">High-Security Seal: {details.finalSealing.highSecuritySeal ? "Applied" : "Not Applied"}</p>
                <p className="text-sm">Seal Number: {details.finalSealing.sealNumber}</p>
                <p className="text-sm">Type: {details.finalSealing.sealType}</p>
              </div>
            </div>
          </div>
          {renderPhotos(details.finalSealing.photos)}
        </AccordionContent>
      </AccordionItem>

      {/* Overall Assessment */}
      <AccordionItem value="overall-assessment" className="border rounded-lg">
        <AccordionTrigger className="px-4 hover:no-underline [&[data-state=open]>div]:text-primary">
          <div className="flex items-center w-full">
            {renderStatusBadge('overallAssessment')}
            <FileCheck className="h-5 w-5 mr-2" />
            <span>Overall Assessment</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium">Summary of Findings</p>
              <p className="text-sm whitespace-pre-wrap">{details.overallAssessment.findings}</p>
            </div>
            {details.overallAssessment.nonConformities && (
              <div>
                <p className="text-sm font-medium">Non-Conformities</p>
                <p className="text-sm whitespace-pre-wrap">{details.overallAssessment.nonConformities}</p>
              </div>
            )}
            {details.overallAssessment.correctiveActions && (
              <div>
                <p className="text-sm font-medium">Corrective Actions</p>
                <p className="text-sm whitespace-pre-wrap">{details.overallAssessment.correctiveActions}</p>
              </div>
            )}
            <div>
              <p className="text-sm font-medium">Export Clearance Status</p>
              <span className={cn(
                "px-2 py-1 rounded-full text-sm",
                details.overallAssessment.exportClearance
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              )}>
                {details.overallAssessment.exportClearance ? "Cleared for Export" : "Not Cleared"}
              </span>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}; 