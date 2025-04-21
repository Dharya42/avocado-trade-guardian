import { DistributionCenterInspection } from '@/types';
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
  ClipboardList,
  Thermometer,
  Package2,
  Eye,
  Microscope,
  UtensilsCrossed,
  CheckCircle2,
  Image,
  CheckCircle,
  AlertCircle,
  XCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface DistributionCenterDetailsProps {
  details: DistributionCenterInspection;
}

type SectionStatus = 'Compliant' | 'Pending Review' | 'Issues Found';

export const DistributionCenterDetails = ({ details }: DistributionCenterDetailsProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getSectionStatus = (section: keyof DistributionCenterInspection): SectionStatus => {
    switch (section) {
      case 'shipmentReceiving':
        return details.shipmentReceiving.inspectorName && details.shipmentReceiving.internalLotId ? 'Compliant' : 'Issues Found';
      
      case 'storageConditions':
        const tempOk = details.storageConditions.pulpTemperatures.every(temp => temp.acceptable);
        return tempOk ? 'Compliant' : 'Issues Found';
      
      case 'packagingLabeling':
        const packagingOk = details.packagingLabeling.cartonCondition.status === 'Good' && 
                           details.packagingLabeling.labelAccuracy.status === 'Correct';
        return packagingOk ? 'Compliant' : 'Issues Found';
      
      case 'externalQuality':
        const qualityOk = details.externalQuality.appearance.uniformity === 'Good' &&
                         details.externalQuality.externalDefects.every(defect => defect.percentageAffected < 5);
        return qualityOk ? 'Compliant' : 'Issues Found';
      
      case 'internalQuality':
        const internalOk = details.internalQuality.internalDefects.every(defect => defect.severity === 'None');
        return internalOk ? 'Compliant' : 'Issues Found';
      
      case 'sensoryEvaluation':
        if (!details.sensoryEvaluation) return 'Pending Review';
        return details.sensoryEvaluation.taste === 'Good' ? 'Compliant' : 'Issues Found';
      
      case 'finalAssessment':
        switch (details.finalAssessment.qualityRating) {
          case 'Premium':
            return 'Compliant';
          case 'Acceptable':
            return 'Pending Review';
          case 'Below Standard':
            return 'Issues Found';
          default:
            return 'Pending Review';
        }
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

  const renderStatusBadge = (section: keyof DistributionCenterInspection) => {
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
      {/* Shipment Receiving */}
      <AccordionItem value="shipment-receiving" className="border rounded-lg">
        <AccordionTrigger className="px-4 hover:no-underline [&[data-state=open]>div]:text-primary">
          <div className="flex items-center w-full">
            {renderStatusBadge('shipmentReceiving')}
            <ClipboardList className="h-5 w-5 mr-2" />
            <span>Shipment & Receiving Details</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Inspector Details</p>
              <p className="text-sm">{details.shipmentReceiving.inspectorName} (ID: {details.shipmentReceiving.inspectorId})</p>
              <p className="text-sm">Inspection Date: {formatDate(details.shipmentReceiving.inspectionDate)}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Shipment Identification</p>
              <p className="text-sm">Internal Lot ID: {details.shipmentReceiving.internalLotId}</p>
              <p className="text-sm">Container ID: {details.shipmentReceiving.containerId}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Supplier Information</p>
              <p className="text-sm">Name: {details.shipmentReceiving.supplierName}</p>
              <p className="text-sm">PO Reference: {details.shipmentReceiving.poReference}</p>
              <p className="text-sm">Supplier Lot ID: {details.shipmentReceiving.supplierLotId}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Product Details</p>
              <p className="text-sm">Variety: {details.shipmentReceiving.variety}</p>
              <p className="text-sm">Declared Grade: {details.shipmentReceiving.declaredGrade}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Quantity Information</p>
              <p className="text-sm">Cartons Received: {details.shipmentReceiving.cartonsReceived}</p>
              <p className="text-sm">Cartons Sampled: {details.shipmentReceiving.cartonsSampled}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Pallet Information</p>
              <div className="text-sm space-y-1">
                {details.shipmentReceiving.palletIds.map((id, index) => (
                  <p key={index}>Pallet {index + 1}: {id}</p>
                ))}
              </div>
            </div>
          </div>
          {renderPhotos(details.shipmentReceiving.photos)}
        </AccordionContent>
      </AccordionItem>

      {/* Storage Conditions */}
      <AccordionItem value="storage-conditions" className="border rounded-lg">
        <AccordionTrigger className="px-4 hover:no-underline [&[data-state=open]>div]:text-primary">
          <div className="flex items-center w-full">
            {renderStatusBadge('storageConditions')}
            <Thermometer className="h-5 w-5 mr-2" />
            <span>Storage Conditions (Arrival Check)</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium">Delivery Truck Temperature</p>
              <p className="text-sm">{details.storageConditions.deliveryTruckTemp}°C</p>
            </div>
            
            <div>
              <p className="text-sm font-medium mb-2">Pulp Temperature Readings</p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pallet ID</TableHead>
                    <TableHead>Temperature (°C)</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {details.storageConditions.pulpTemperatures.map((reading, index) => (
                    <TableRow key={index}>
                      <TableCell>{reading.palletId}</TableCell>
                      <TableCell>{reading.temperature}</TableCell>
                      <TableCell>
                        <span className={cn(
                          "px-2 py-1 rounded-full text-xs",
                          reading.acceptable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        )}>
                          {reading.acceptable ? "Acceptable" : "Out of Range"}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <p className="text-sm mt-2">Average Pulp Temperature: {details.storageConditions.averagePulpTemp}°C</p>
            </div>

            <div>
              <p className="text-sm font-medium">Storage Assignment</p>
              <p className="text-sm">Initial Storage Bay: {details.storageConditions.initialStorageBay}</p>
            </div>
          </div>
          {renderPhotos(details.storageConditions.photos)}
        </AccordionContent>
      </AccordionItem>

      {/* Packaging & Labeling */}
      <AccordionItem value="packaging-labeling" className="border rounded-lg">
        <AccordionTrigger className="px-4 hover:no-underline [&[data-state=open]>div]:text-primary">
          <div className="flex items-center w-full">
            {renderStatusBadge('packagingLabeling')}
            <Package2 className="h-5 w-5 mr-2" />
            <span>Packaging & Labeling</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium">Carton Condition</p>
              <div className="bg-muted/50 p-3 rounded-md">
                <p className="text-sm">Status: {details.packagingLabeling.cartonCondition.status}</p>
                <p className="text-sm">Damage Count: {details.packagingLabeling.cartonCondition.damageCount}</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium">Label Accuracy</p>
              <div className="bg-muted/50 p-3 rounded-md">
                <p className="text-sm">Status: {details.packagingLabeling.labelAccuracy.status}</p>
                {details.packagingLabeling.labelAccuracy.details && (
                  <p className="text-sm mt-1">Details: {details.packagingLabeling.labelAccuracy.details}</p>
                )}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium">Pallet Condition</p>
              <p className="text-sm">{details.packagingLabeling.palletCondition}</p>
            </div>
          </div>
          {renderPhotos(details.packagingLabeling.photos)}
        </AccordionContent>
      </AccordionItem>

      {/* External Quality */}
      <AccordionItem value="external-quality" className="border rounded-lg">
        <AccordionTrigger className="px-4 hover:no-underline [&[data-state=open]>div]:text-primary">
          <div className="flex items-center w-full">
            {renderStatusBadge('externalQuality')}
            <Eye className="h-5 w-5 mr-2" />
            <span>External Quality Check</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Appearance</p>
                <div className="bg-muted/50 p-3 rounded-md">
                  <p className="text-sm">Uniformity: {details.externalQuality.appearance.uniformity}</p>
                  <p className="text-sm">Color Stage: {details.externalQuality.appearance.colorStage}</p>
                  <p className="text-sm">Gloss: {details.externalQuality.appearance.gloss}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium">Shape & Size</p>
                <div className="bg-muted/50 p-3 rounded-md">
                  <p className="text-sm">Shape: {details.externalQuality.shape.status}</p>
                  {details.externalQuality.shape.percentageAffected && (
                    <p className="text-sm">Affected: {details.externalQuality.shape.percentageAffected}%</p>
                  )}
                  <p className="text-sm">Size Code: {details.externalQuality.size.sizeCode}</p>
                  <p className="text-sm">Size Uniformity: {details.externalQuality.size.uniformity}</p>
                  <p className="text-sm">Average Weight: {details.externalQuality.size.averageWeight}g</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">External Defects</p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Affected (%)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {details.externalQuality.externalDefects.map((defect, index) => (
                    <TableRow key={index}>
                      <TableCell>{defect.type}</TableCell>
                      <TableCell>{defect.percentageAffected}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          {renderPhotos(details.externalQuality.photos)}
        </AccordionContent>
      </AccordionItem>

      {/* Internal Quality */}
      <AccordionItem value="internal-quality" className="border rounded-lg">
        <AccordionTrigger className="px-4 hover:no-underline [&[data-state=open]>div]:text-primary">
          <div className="flex items-center w-full">
            {renderStatusBadge('internalQuality')}
            <Microscope className="h-5 w-5 mr-2" />
            <span>Internal Quality Check</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Firmness</p>
                <div className="bg-muted/50 p-3 rounded-md">
                  <p className="text-sm">Average: {details.internalQuality.firmness.average}</p>
                  <p className="text-sm">Readings: {details.internalQuality.firmness.readings.join(', ')}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium">Quality Indicators</p>
                <div className="bg-muted/50 p-3 rounded-md">
                  {details.internalQuality.dryMatter && (
                    <p className="text-sm">Dry Matter: {details.internalQuality.dryMatter}%</p>
                  )}
                  <p className="text-sm">Flesh Color: {details.internalQuality.fleshColor}</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Internal Defects</p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Severity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {details.internalQuality.internalDefects.map((defect, index) => (
                    <TableRow key={index}>
                      <TableCell>{defect.type}</TableCell>
                      <TableCell>{defect.severity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          {renderPhotos(details.internalQuality.photos)}
        </AccordionContent>
      </AccordionItem>

      {/* Sensory Evaluation */}
      {details.sensoryEvaluation && (
        <AccordionItem value="sensory-evaluation" className="border rounded-lg">
          <AccordionTrigger className="px-4 hover:no-underline [&[data-state=open]>div]:text-primary">
            <div className="flex items-center w-full">
              {renderStatusBadge('sensoryEvaluation')}
              <UtensilsCrossed className="h-5 w-5 mr-2" />
              <span>Sensory Evaluation</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium">Aroma</p>
                <p className="text-sm">{details.sensoryEvaluation.aroma}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Texture</p>
                <p className="text-sm">{details.sensoryEvaluation.texture}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Taste</p>
                <p className="text-sm">{details.sensoryEvaluation.taste}</p>
              </div>
            </div>
            {renderPhotos(details.sensoryEvaluation.photos)}
          </AccordionContent>
        </AccordionItem>
      )}

      {/* Final Assessment */}
      <AccordionItem value="final-assessment" className="border rounded-lg">
        <AccordionTrigger className="px-4 hover:no-underline [&[data-state=open]>div]:text-primary">
          <div className="flex items-center w-full">
            {renderStatusBadge('finalAssessment')}
            <CheckCircle2 className="h-5 w-5 mr-2" />
            <span>Final Assessment & Decision</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium">Quality Rating</p>
              <div className={cn(
                "mt-1 px-3 py-2 rounded-md inline-block",
                details.finalAssessment.qualityRating === 'Premium' && "bg-green-50 text-green-700",
                details.finalAssessment.qualityRating === 'Acceptable' && "bg-amber-50 text-amber-700",
                details.finalAssessment.qualityRating === 'Below Standard' && "bg-red-50 text-red-700"
              )}>
                <p className="text-sm font-medium">{details.finalAssessment.qualityRating}</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium">Primary Issues</p>
              <ul className="list-disc list-inside text-sm">
                {details.finalAssessment.primaryIssues.map((issue, index) => (
                  <li key={index}>{issue}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm font-medium">Action</p>
              <div className="bg-muted/50 p-3 rounded-md">
                <p className="text-sm">Recommended Action: {details.finalAssessment.recommendedAction}</p>
                {details.finalAssessment.actionDetails && (
                  <p className="text-sm mt-1">Details: {details.finalAssessment.actionDetails}</p>
                )}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium">Storage Assignment</p>
              <p className="text-sm">Final Storage Bay: {details.finalAssessment.finalStorageBay}</p>
            </div>

            <div>
              <p className="text-sm font-medium">Inspector Remarks</p>
              <p className="text-sm whitespace-pre-wrap">{details.finalAssessment.inspectorRemarks}</p>
            </div>
          </div>
          {renderPhotos(details.finalAssessment.photos)}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}; 