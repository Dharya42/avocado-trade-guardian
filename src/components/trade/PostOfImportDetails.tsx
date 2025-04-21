import { PostOfImportDetails as PostOfImportDetailsType } from '@/types';
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
  PackageCheck,
  Thermometer,
  Microscope,
  ShieldCheck,
  Image,
  CheckCircle,
  AlertCircle,
  XCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface PostOfImportDetailsProps {
  details: PostOfImportDetailsType;
}

type SectionStatus = 'Compliant' | 'Pending Review' | 'Issues Found';

export const PostOfImportDetails = ({ details }: PostOfImportDetailsProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSectionStatus = (section: keyof PostOfImportDetailsType): SectionStatus => {
    switch (section) {
      case 'shipmentDetails':
        return details.shipmentDetails.inspectorName && 
               details.shipmentDetails.shipmentId ? 'Compliant' : 'Issues Found';
      
      case 'documentVerification':
        const docsComplete = details.documentVerification.importPermit.present &&
                           details.documentVerification.commercialInvoice.present &&
                           details.documentVerification.packingList.present &&
                           details.documentVerification.billOfLading.present &&
                           details.documentVerification.phytosanitaryCert.present &&
                           details.documentVerification.certificateOfOrigin.present;
        return docsComplete ? 'Compliant' : 'Issues Found';
      
      case 'containerSealIntegrity':
        return details.containerSealIntegrity.sealIntegrity === 'Matches' ? 'Compliant' : 'Issues Found';
      
      case 'productTemperatureCheck':
        return details.productTemperatureCheck.temperatureRecorder.inRange &&
               details.productTemperatureCheck.pulpTemperature.acceptable ? 'Compliant' : 'Issues Found';
      
      case 'qualityInspection':
        const qualityOk = details.qualityInspection.appearance.defects === 'None' &&
                         !details.qualityInspection.appearance.pestPresence.detected &&
                         details.qualityInspection.packagingIntegrity.status === 'Intact';
        return qualityOk ? 'Compliant' : 'Issues Found';
      
      case 'complianceDecision':
        switch (details.complianceDecision.overallCompliance) {
          case 'Compliant':
            return 'Compliant';
          case 'Non-Compliant':
            return 'Issues Found';
          default:
            return 'Pending Review';
        }
      
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

  const renderStatusBadge = (section: keyof PostOfImportDetailsType) => {
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

  const renderPhotos = (photos: { type: string; url: string; timestamp: string; description?: string; }[]) => {
    if (!photos.length) return null;
    
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
                <div>{photo.type}</div>
                {photo.description && (
                  <div className="text-xs opacity-75">{photo.description}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Accordion type="single" collapsible className="w-full space-y-4">
      {/* Shipment Details */}
      <AccordionItem value="shipment-details" className="border rounded-lg">
        <AccordionTrigger className="px-4 hover:no-underline [&[data-state=open]>div]:text-primary">
          <div className="flex items-center w-full">
            {renderStatusBadge('shipmentDetails')}
            <ClipboardCheck className="h-5 w-5 mr-2" />
            <span>Shipment Details</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Inspection Date & Time</p>
              <p className="text-sm">{formatDate(details.shipmentDetails.inspectionDateTime)}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Inspector Details</p>
              <p className="text-sm">{details.shipmentDetails.inspectorName} (ID: {details.shipmentDetails.inspectorId})</p>
            </div>
            <div>
              <p className="text-sm font-medium">Shipment & Container ID</p>
              <p className="text-sm">
                Shipment: {details.shipmentDetails.shipmentId}<br />
                Container: {details.shipmentDetails.containerId}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Vessel/Flight Info</p>
              <p className="text-sm">{details.shipmentDetails.vesselInfo}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Importer Details</p>
              <p className="text-sm">
                {details.shipmentDetails.importerInfo.name}<br />
                License: {details.shipmentDetails.importerInfo.licenseNo}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Exporter</p>
              <p className="text-sm">{details.shipmentDetails.exporterName}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Commodity</p>
              <p className="text-sm">{details.shipmentDetails.commodity}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Quantity</p>
              <p className="text-sm">
                {details.shipmentDetails.quantity.cartons} cartons<br />
                {details.shipmentDetails.quantity.weight} {details.shipmentDetails.quantity.unit}
              </p>
            </div>
          </div>
          {renderPhotos(details.shipmentDetails.photos)}
        </AccordionContent>
      </AccordionItem>

      {/* Document Verification */}
      <AccordionItem value="document-verification" className="border rounded-lg">
        <AccordionTrigger className="px-4 hover:no-underline [&[data-state=open]>div]:text-primary">
          <div className="flex items-center w-full">
            {renderStatusBadge('documentVerification')}
            <FileCheck className="h-5 w-5 mr-2" />
            <span>Document Verification</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Import Permit</TableCell>
                <TableCell>{details.documentVerification.importPermit.present ? 'Present' : 'Missing'}</TableCell>
                <TableCell>Check No: {details.documentVerification.importPermit.checkNumber}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Commercial Invoice</TableCell>
                <TableCell>{details.documentVerification.commercialInvoice.present ? 'Present' : 'Missing'}</TableCell>
                <TableCell>
                  Quantity Match: {details.documentVerification.commercialInvoice.quantityMatch ? 'Yes' : 'No'}<br />
                  Value Match: {details.documentVerification.commercialInvoice.valueMatch ? 'Yes' : 'No'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Packing List</TableCell>
                <TableCell>{details.documentVerification.packingList.present ? 'Present' : 'Missing'}</TableCell>
                <TableCell>Carton Count Match: {details.documentVerification.packingList.cartonCountMatch ? 'Yes' : 'No'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Bill of Lading</TableCell>
                <TableCell>{details.documentVerification.billOfLading.present ? 'Present' : 'Missing'}</TableCell>
                <TableCell>Matches Shipment ID: {details.documentVerification.billOfLading.matchesShipmentId ? 'Yes' : 'No'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Phytosanitary Certificate</TableCell>
                <TableCell>{details.documentVerification.phytosanitaryCert.present ? 'Present' : 'Missing'}</TableCell>
                <TableCell>
                  Valid: {details.documentVerification.phytosanitaryCert.valid ? 'Yes' : 'No'}<br />
                  Pest Free: {details.documentVerification.phytosanitaryCert.pestFree ? 'Yes' : 'No'}<br />
                  Date Correct: {details.documentVerification.phytosanitaryCert.dateCorrect ? 'Yes' : 'No'}<br />
                  Cert No: {details.documentVerification.phytosanitaryCert.certNumber}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Certificate of Origin</TableCell>
                <TableCell>{details.documentVerification.certificateOfOrigin.present ? 'Present' : 'Missing'}</TableCell>
                <TableCell>Consistent with Invoice: {details.documentVerification.certificateOfOrigin.consistentWithInvoice ? 'Yes' : 'No'}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          {renderPhotos(details.documentVerification.photos)}
        </AccordionContent>
      </AccordionItem>

      {/* Container & Seal Integrity */}
      <AccordionItem value="container-seal" className="border rounded-lg">
        <AccordionTrigger className="px-4 hover:no-underline [&[data-state=open]>div]:text-primary">
          <div className="flex items-center w-full">
            {renderStatusBadge('containerSealIntegrity')}
            <PackageCheck className="h-5 w-5 mr-2" />
            <span>Container & Seal Integrity</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Container Condition</p>
              <p className="text-sm">{details.containerSealIntegrity.containerCondition}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Seal Numbers</p>
              <p className="text-sm">
                Document: {details.containerSealIntegrity.documentSealNumber}<br />
                Actual: {details.containerSealIntegrity.actualSealNumber}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Seal Integrity</p>
              <p className="text-sm">{details.containerSealIntegrity.sealIntegrity}</p>
            </div>
          </div>
          {renderPhotos(details.containerSealIntegrity.photos)}
        </AccordionContent>
      </AccordionItem>

      {/* Product & Temperature Check */}
      <AccordionItem value="temp-check" className="border rounded-lg">
        <AccordionTrigger className="px-4 hover:no-underline [&[data-state=open]>div]:text-primary">
          <div className="flex items-center w-full">
            {renderStatusBadge('productTemperatureCheck')}
            <Thermometer className="h-5 w-5 mr-2" />
            <span>Product & Temperature Check</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Temperature Recorder</p>
              <p className="text-sm">
                Device ID: {details.productTemperatureCheck.temperatureRecorder.deviceId}<br />
                Reading: {details.productTemperatureCheck.temperatureRecorder.reading}°C<br />
                In Range: {details.productTemperatureCheck.temperatureRecorder.inRange ? 'Yes' : 'No'}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Pulp Temperature</p>
              <p className="text-sm">
                Readings: {details.productTemperatureCheck.pulpTemperature.readings.join('°C, ')}°C<br />
                Acceptable: {details.productTemperatureCheck.pulpTemperature.acceptable ? 'Yes' : 'No'}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Container Atmosphere</p>
              <p className="text-sm">{details.productTemperatureCheck.containerAtmosphere}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Pallet Condition</p>
              <p className="text-sm">
                Status: {details.productTemperatureCheck.palletCondition.status}<br />
                Notes: {details.productTemperatureCheck.palletCondition.notes}
              </p>
            </div>
          </div>
          {renderPhotos(details.productTemperatureCheck.photos)}
        </AccordionContent>
      </AccordionItem>

      {/* Quality Inspection */}
      <AccordionItem value="quality" className="border rounded-lg">
        <AccordionTrigger className="px-4 hover:no-underline [&[data-state=open]>div]:text-primary">
          <div className="flex items-center w-full">
            {renderStatusBadge('qualityInspection')}
            <Microscope className="h-5 w-5 mr-2" />
            <span>Quality Inspection</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium">Sample Cartons</p>
              <p className="text-sm">{details.qualityInspection.sampleCartons.join(', ')}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Appearance</p>
                <p className="text-sm">
                  Color: {details.qualityInspection.appearance.color}<br />
                  Uniformity: {details.qualityInspection.appearance.uniformity}<br />
                  Defects: {details.qualityInspection.appearance.defects}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Pest Presence</p>
                <p className="text-sm">
                  Detected: {details.qualityInspection.appearance.pestPresence.detected ? 'Yes' : 'No'}<br />
                  {details.qualityInspection.appearance.pestPresence.description && (
                    <>Description: {details.qualityInspection.appearance.pestPresence.description}</>
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Packaging Integrity</p>
                <p className="text-sm">
                  Status: {details.qualityInspection.packagingIntegrity.status}<br />
                  Notes: {details.qualityInspection.packagingIntegrity.notes}
                </p>
              </div>
            </div>
          </div>
          {renderPhotos(details.qualityInspection.photos)}
        </AccordionContent>
      </AccordionItem>

      {/* Compliance & Release Decision */}
      <AccordionItem value="compliance" className="border rounded-lg">
        <AccordionTrigger className="px-4 hover:no-underline [&[data-state=open]>div]:text-primary">
          <div className="flex items-center w-full">
            {renderStatusBadge('complianceDecision')}
            <ShieldCheck className="h-5 w-5 mr-2" />
            <span>Compliance & Release Decision</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium">Overall Compliance</p>
              <p className="text-sm">{details.complianceDecision.overallCompliance}</p>
            </div>
            {(details.complianceDecision.overallCompliance === 'Non-Compliant' ||
              details.complianceDecision.overallCompliance === 'Pending Lab Test') && (
              <div>
                <p className="text-sm font-medium">Non-Compliance Reasons</p>
                <ul className="list-disc list-inside text-sm">
                  {details.complianceDecision.nonComplianceReasons.missingDocs && <li>Missing Documents</li>}
                  {details.complianceDecision.nonComplianceReasons.sealTampering && <li>Seal Tampering</li>}
                  {details.complianceDecision.nonComplianceReasons.tempDeviation && <li>Temperature Deviation</li>}
                  {details.complianceDecision.nonComplianceReasons.pests && <li>Pest Presence</li>}
                  {details.complianceDecision.nonComplianceReasons.qualityIssues && <li>Quality Issues</li>}
                  {details.complianceDecision.nonComplianceReasons.other && <li>{details.complianceDecision.nonComplianceReasons.other}</li>}
                </ul>
              </div>
            )}
            <div>
              <p className="text-sm font-medium">Action Taken</p>
              <p className="text-sm">{details.complianceDecision.action}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Inspector Remarks</p>
              <p className="text-sm whitespace-pre-wrap">{details.complianceDecision.inspectorRemarks}</p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}; 