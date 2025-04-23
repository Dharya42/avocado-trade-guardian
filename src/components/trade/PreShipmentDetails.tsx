import { PreShipmentInspection } from '@/types';
import { useState } from 'react';
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

type Section = {
  id: string;
  title: string;
  icon: React.ReactNode;
  key: keyof PreShipmentInspection;
};

const SECTIONS: Section[] = [
  { id: 'facility-id', title: 'Facility Identification & General Info', icon: <Building2 className="h-5 w-5" />, key: 'facilityIdentification' },
  { id: 'regulatory', title: 'Regulatory Compliance & Documentation', icon: <FileCheck className="h-5 w-5" />, key: 'regulatoryCompliance' },
  { id: 'condition', title: 'Facility Condition & Hygiene', icon: <ClipboardList className="h-5 w-5" />, key: 'facilityCondition' },
  { id: 'receiving', title: 'Receiving Area', icon: <Truck className="h-5 w-5" />, key: 'receivingArea' },
  { id: 'processing', title: 'Processing Line', icon: <SlidersHorizontal className="h-5 w-5" />, key: 'processingLine' },
  { id: 'quality', title: 'Quality Control (QC)', icon: <Target className="h-5 w-5" />, key: 'qualityControl' },
  { id: 'packing', title: 'Packing & Labeling', icon: <PackageCheck className="h-5 w-5" />, key: 'packingLabeling' },
  { id: 'storage', title: 'Storage & Dispatch', icon: <Snowflake className="h-5 w-5" />, key: 'storage' },
  { id: 'hygiene', title: 'Worker Hygiene & Practices', icon: <Users2 className="h-5 w-5" />, key: 'workerHygiene' },
  { id: 'assessment', title: 'Overall Assessment & Corrective Actions', icon: <ClipboardSignature className="h-5 w-5" />, key: 'finalAssessment' },
];

export const PreShipmentDetails = ({ details }: PreShipmentDetailsProps) => {
  const [selectedSection, setSelectedSection] = useState<string>(SECTIONS[0].id);

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

  const renderSectionContent = (sectionId: string) => {
    switch (sectionId) {
      case 'facility-id':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Facility Details</h4>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Packhouse Name</TableCell>
                      <TableCell>{details.facilityIdentification.facilityName}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Registration Number</TableCell>
                      <TableCell>{details.facilityIdentification.registrationNumber}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Physical Location</TableCell>
                      <TableCell>{details.facilityIdentification.address}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Contact Information</h4>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Contact Person</TableCell>
                      <TableCell>{details.facilityIdentification.contactPerson}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Phone</TableCell>
                      <TableCell>{details.facilityIdentification.phone}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Email</TableCell>
                      <TableCell>{details.facilityIdentification.email}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
            {renderPhotos(details.facilityIdentification.photos)}
          </div>
        );

      case 'regulatory':
        return (
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-1 flex items-center">
                <CheckCircle className={`h-4 w-4 mr-2 ${details.regulatoryCompliance.documentsValid ? 'text-green-500' : 'text-gray-300'}`} />
                Valid Operating Licenses & Documentation
              </h4>
              <div className="bg-muted rounded-md p-3">
                <p className="text-sm text-muted-foreground">
                  {details.regulatoryCompliance.documentsValid 
                    ? "All required operating licenses and documents are valid and up to date." 
                    : "Some licenses or documents require attention or renewal."}
                </p>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-1">Certifications & Permits</h4>
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Number</TableHead>
                    <TableHead>Expiry Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {details.regulatoryCompliance.certifications.map((cert, index) => (
                    <TableRow key={index}>
                      <TableCell>{cert.type}</TableCell>
                      <TableCell>{cert.number}</TableCell>
                      <TableCell>{formatDate(cert.expiryDate)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-1">Permits</h4>
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Number</TableHead>
                    <TableHead>Valid Until</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {details.regulatoryCompliance.permits.map((permit, index) => (
                    <TableRow key={index}>
                      <TableCell>{permit.type}</TableCell>
                      <TableCell>{permit.number}</TableCell>
                      <TableCell>{formatDate(permit.validUntil)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {renderPhotos(details.regulatoryCompliance.photos)}
          </div>
        );

      case 'condition':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Facility Status</h4>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Maintenance Status</TableCell>
                      <TableCell>
                        <span className={cn(
                          "px-2 py-1 rounded text-xs font-medium",
                          details.facilityCondition.maintenanceStatus === 'Good' ? "bg-green-100 text-green-800" :
                          details.facilityCondition.maintenanceStatus === 'Fair' ? "bg-amber-100 text-amber-800" :
                          "bg-red-100 text-red-800"
                        )}>
                          {details.facilityCondition.maintenanceStatus}
                        </span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Cleanliness Rating</TableCell>
                      <TableCell>{details.facilityCondition.cleanlinessRating}/10</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Pest Control</h4>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Program Type</TableCell>
                      <TableCell>{details.facilityCondition.pestControl.program}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Last Inspection</TableCell>
                      <TableCell>{details.facilityCondition.pestControl.lastInspection}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Findings</TableCell>
                      <TableCell>{details.facilityCondition.pestControl.findings}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-1">Repairs Needed</h4>
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Area</TableHead>
                    <TableHead>Issue</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {details.facilityCondition.repairs.map((repair, index) => (
                    <TableRow key={index}>
                      <TableCell>{repair.area}</TableCell>
                      <TableCell>{repair.issue}</TableCell>
                      <TableCell>{repair.status}</TableCell>
                      <TableCell>{repair.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {renderPhotos(details.facilityCondition.photos)}
          </div>
        );

      case 'receiving':
        return (
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-1">Temperature Control</h4>
              <div className="bg-muted rounded-md p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm">Current: <span className="font-medium">{details.receivingArea.temperature.current}°C</span></p>
                    <p className="text-sm">Required: <span className="font-medium">{details.receivingArea.temperature.required}°C</span></p>
                  </div>
                  <div className={cn(
                    "px-3 py-1 rounded-full text-sm font-medium",
                    details.receivingArea.temperature.withinRange ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  )}>
                    {details.receivingArea.temperature.withinRange ? "Within Range" : "Out of Range"}
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-1">Loading Docks</h4>
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Number</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead>Cleanliness</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {details.receivingArea.loadingDocks.map((dock, index) => (
                    <TableRow key={index}>
                      <TableCell>{dock.number}</TableCell>
                      <TableCell>{dock.condition}</TableCell>
                      <TableCell>{dock.cleanliness}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {renderPhotos(details.receivingArea.photos)}
          </div>
        );

      case 'processing':
        return (
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-1 flex items-center">
                <span className={cn(
                  "inline-block px-2 py-1 rounded text-xs font-medium mr-2",
                  details.processingLine.equipmentCondition === 'Operational' ? "bg-green-100 text-green-800" :
                  details.processingLine.equipmentCondition === 'Needs Maintenance' ? "bg-amber-100 text-amber-800" :
                  "bg-red-100 text-red-800"
                )}>
                  {details.processingLine.equipmentCondition}
                </span>
                Equipment Condition
              </h4>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-1">Processing Stations</h4>
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Maintenance</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {details.processingLine.stations.map((station, index) => (
                    <TableRow key={index}>
                      <TableCell>{station.name}</TableCell>
                      <TableCell>{station.status}</TableCell>
                      <TableCell>{station.lastMaintenance}</TableCell>
                      <TableCell>{station.notes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-1">Equipment Calibration</h4>
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Equipment</TableHead>
                    <TableHead>Last Calibrated</TableHead>
                    <TableHead>Next Due</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {details.processingLine.calibration.map((cal, index) => (
                    <TableRow key={index}>
                      <TableCell>{cal.equipment}</TableCell>
                      <TableCell>{cal.lastCalibrated}</TableCell>
                      <TableCell>{cal.nextDue}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {renderPhotos(details.processingLine.photos)}
          </div>
        );

      case 'quality':
        return (
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-1 flex items-center">
                <CheckCircle className={`h-4 w-4 mr-2 ${details.qualityControl.proceduresFollowed ? 'text-green-500' : 'text-gray-300'}`} />
                QC Procedures Followed
              </h4>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-1">QC Checkpoints</h4>
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Station</TableHead>
                    <TableHead>Parameters</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Responsible</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {details.qualityControl.checkpoints.map((checkpoint, index) => (
                    <TableRow key={index}>
                      <TableCell>{checkpoint.station}</TableCell>
                      <TableCell>
                        <ul className="list-disc list-inside text-sm">
                          {checkpoint.parameters.map((param, idx) => (
                            <li key={idx}>{param}</li>
                          ))}
                        </ul>
                      </TableCell>
                      <TableCell>{checkpoint.frequency}</TableCell>
                      <TableCell>{checkpoint.responsible}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-1">QC Sampling & Results</h4>
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Sample Type</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Results</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {details.qualityControl.samples.map((sample, index) => (
                    <TableRow key={index}>
                      <TableCell>{sample.type}</TableCell>
                      <TableCell>{sample.quantity}</TableCell>
                      <TableCell>{sample.results}</TableCell>
                      <TableCell>{sample.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {renderPhotos(details.qualityControl.photos)}
          </div>
        );

      case 'packing':
        return (
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-1 flex items-center">
                <CheckCircle className={`h-4 w-4 mr-2 ${details.packingLabeling.materialsCompliant ? 'text-green-500' : 'text-gray-300'}`} />
                Packing Materials Compliant
              </h4>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-1">Packaging Materials</h4>
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead>Quantity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {details.packingLabeling.packaging.map((pkg, index) => (
                    <TableRow key={index}>
                      <TableCell>{pkg.type}</TableCell>
                      <TableCell>{pkg.condition}</TableCell>
                      <TableCell>{pkg.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-1">Labels & Markings</h4>
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Compliance</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {details.packingLabeling.labels.map((label, index) => (
                    <TableRow key={index}>
                      <TableCell>{label.type}</TableCell>
                      <TableCell>
                        {label.compliance ? (
                          <span className="text-green-500 flex items-center">
                            <CheckCircle className="h-4 w-4 mr-1" /> Compliant
                          </span>
                        ) : (
                          <span className="text-red-500 flex items-center">
                            <XCircle className="h-4 w-4 mr-1" /> Non-Compliant
                          </span>
                        )}
                      </TableCell>
                      <TableCell>{label.notes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {renderPhotos(details.packingLabeling.photos)}
          </div>
        );

      case 'storage':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Temperature Control</h4>
                <div className="bg-muted rounded-md p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm">Current: <span className="font-medium">{details.storage.temperature.current}°C</span></p>
                      <p className="text-sm">Required: <span className="font-medium">{details.storage.temperature.required}°C</span></p>
                    </div>
                    <div className={cn(
                      "px-3 py-1 rounded-full text-sm font-medium",
                      details.storage.temperature.withinRange ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    )}>
                      {details.storage.temperature.withinRange ? "Within Range" : "Out of Range"}
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Humidity Control</h4>
                <div className="bg-muted rounded-md p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm">Current: <span className="font-medium">{details.storage.humidity.current}%</span></p>
                      <p className="text-sm">Required: <span className="font-medium">{details.storage.humidity.required}%</span></p>
                    </div>
                    <div className={cn(
                      "px-3 py-1 rounded-full text-sm font-medium",
                      details.storage.humidity.withinRange ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    )}>
                      {details.storage.humidity.withinRange ? "Within Range" : "Out of Range"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-1">Storage Areas</h4>
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Area Name</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Current Usage</TableHead>
                    <TableHead>Condition</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {details.storage.areas.map((area, index) => (
                    <TableRow key={index}>
                      <TableCell>{area.name}</TableCell>
                      <TableCell>{area.capacity}</TableCell>
                      <TableCell>{area.currentUsage}</TableCell>
                      <TableCell>{area.condition}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {renderPhotos(details.storage.photos)}
          </div>
        );

      case 'hygiene':
        return (
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-1 flex items-center">
                <CheckCircle className={`h-4 w-4 mr-2 ${details.workerHygiene.trainingCurrent ? 'text-green-500' : 'text-gray-300'}`} />
                Training Records Current
              </h4>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-1">Personnel Training</h4>
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Role</TableHead>
                    <TableHead>Certified</TableHead>
                    <TableHead>Last Training</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {details.workerHygiene.personnel.map((person, index) => (
                    <TableRow key={index}>
                      <TableCell>{person.role}</TableCell>
                      <TableCell>
                        {person.certified ? (
                          <span className="text-green-500 flex items-center">
                            <CheckCircle className="h-4 w-4 mr-1" /> Yes
                          </span>
                        ) : (
                          <span className="text-red-500 flex items-center">
                            <XCircle className="h-4 w-4 mr-1" /> No
                          </span>
                        )}
                      </TableCell>
                      <TableCell>{person.lastTraining}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-1">Hygiene Facilities</h4>
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead>Adequacy</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {details.workerHygiene.facilities.map((facility, index) => (
                    <TableRow key={index}>
                      <TableCell>{facility.type}</TableCell>
                      <TableCell>{facility.condition}</TableCell>
                      <TableCell>{facility.adequacy}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {renderPhotos(details.workerHygiene.photos)}
          </div>
        );

      case 'assessment':
        return (
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-medium">Shipment Readiness</h4>
                <div className={cn(
                  "px-3 py-1 rounded-full text-sm font-medium",
                  details.finalAssessment.readyForShipment ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                )}>
                  {details.finalAssessment.readyForShipment ? "Ready for Shipment" : "Not Ready"}
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-1">Issues Identified</h4>
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Action Required</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {details.finalAssessment.issues.map((issue, index) => (
                    <TableRow key={index}>
                      <TableCell>{issue.category}</TableCell>
                      <TableCell>{issue.description}</TableCell>
                      <TableCell>
                        <span className={cn(
                          "px-2 py-1 rounded text-xs font-medium",
                          issue.severity === 'Critical' ? "bg-red-100 text-red-800" :
                          issue.severity === 'Major' ? "bg-amber-100 text-amber-800" :
                          "bg-blue-100 text-blue-800"
                        )}>
                          {issue.severity}
                        </span>
                      </TableCell>
                      <TableCell>{issue.action}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-1">Recommendations</h4>
              <ul className="list-disc list-inside space-y-1 bg-muted rounded-md p-3">
                {details.finalAssessment.recommendations.map((rec, index) => (
                  <li key={index} className="text-sm">{rec}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-1">Approval</h4>
              <div className="bg-muted rounded-md p-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Name:</p>
                    <p className="font-medium">{details.finalAssessment.approver.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Position:</p>
                    <p className="font-medium">{details.finalAssessment.approver.position}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date:</p>
                    <p className="font-medium">{details.finalAssessment.approver.date}</p>
                  </div>
                </div>
              </div>
            </div>
            {renderPhotos(details.finalAssessment.photos)}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex gap-6 w-full min-h-[600px]">
      {/* Left Panel - Section List */}
      <div className="w-1/3 border rounded-lg bg-white">
        <div className="p-4 space-y-2">
          {SECTIONS.map((section) => {
            const status = getSectionStatus(section.key);
            return (
              <button
                key={section.id}
                onClick={() => setSelectedSection(section.id)}
                className={cn(
                  "w-full flex items-center p-3 rounded-lg text-left transition-colors",
                  selectedSection === section.id
                    ? "bg-primary/5 text-primary"
                    : "hover:bg-muted"
                )}
              >
                <div className={cn(
                  "flex items-center px-2 py-1 rounded-full border text-xs font-medium mr-3",
                  getStatusBadgeStyle(status)
                )}>
                  {getStatusIcon(status)}
                  <span className="ml-1">{status}</span>
                </div>
                <div className="flex items-center gap-2">
                  {section.icon}
                  <span>{section.title}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Panel - Section Details */}
      <div className="flex-1 border rounded-lg bg-white">
        <div className="p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">
              {SECTIONS.find(s => s.id === selectedSection)?.title}
            </h2>
          </div>
          {renderSectionContent(selectedSection)}
        </div>
      </div>
    </div>
  );
};
