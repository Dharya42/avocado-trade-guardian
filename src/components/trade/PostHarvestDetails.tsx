import { PostHarvestInspection } from '@/types';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  ClipboardCheck,
  Sprout,
  Bug,
  Truck,
  Users,
  TreePine,
  CheckSquare,
  Image,
  CheckCircle,
  AlertCircle,
  XCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface PostHarvestDetailsProps {
  details: PostHarvestInspection;
}

type SectionStatus = 'Compliant' | 'Issues Found' | 'Not Compliant';

type Section = {
  id: string;
  title: string;
  icon: React.ReactNode;
  key: keyof PostHarvestInspection;
};

const SECTIONS: Section[] = [
  { id: 'farm-id', title: 'Farm Identification & General Info', icon: <Building2 className="h-5 w-5" />, key: 'farmIdentification' },
  { id: 'traceability', title: 'Traceability & Record Keeping', icon: <ClipboardCheck className="h-5 w-5" />, key: 'traceability' },
  { id: 'gap', title: 'Good Agricultural Practices (G.A.P.)', icon: <Sprout className="h-5 w-5" />, key: 'gap' },
  { id: 'pest', title: 'Pest & Disease Management', icon: <Bug className="h-5 w-5" />, key: 'pestManagement' },
  { id: 'pre-harvest', title: 'Pre-Harvest & Harvest Readiness', icon: <Truck className="h-5 w-5" />, key: 'preHarvest' },
  { id: 'welfare', title: 'Food Safety & Worker Welfare', icon: <Users className="h-5 w-5" />, key: 'workerWelfare' },
  { id: 'environmental', title: 'Environmental Protection', icon: <TreePine className="h-5 w-5" />, key: 'environmental' },
  { id: 'evaluation', title: 'Final Evaluation', icon: <CheckSquare className="h-5 w-5" />, key: 'finalEvaluation' },
];

export const PostHarvestDetails = ({ details }: PostHarvestDetailsProps) => {
  const [selectedSection, setSelectedSection] = useState<string>(SECTIONS[0].id);

  if (!details) {
    return (
      <div className="p-4 border rounded-lg bg-white text-center">
        <p className="text-muted-foreground">No post-harvest inspection details available</p>
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

  const getSectionStatus = (section: keyof PostHarvestInspection): SectionStatus => {
    switch (section) {
      case 'farmIdentification':
        return details.farmIdentification && details.farmIdentification.registrationNumbers && 
               details.farmIdentification.registrationNumbers.length > 0 ? 'Compliant' : 'Issues Found';
      
      case 'traceability':
        return details.traceability && details.traceability.recordsAvailable ? 'Compliant' : 'Not Compliant';
      
      case 'gap':
        return details.gap && details.gap.soilManagement && 
               details.gap.soilManagement.storageCompliance ? 'Compliant' : 'Issues Found';
      
      case 'pestManagement':
        return details.pestManagement && details.pestManagement.ipmStrategyPresent && 
               details.pestManagement.pesticides && details.pestManagement.pesticides.storage && 
               details.pestManagement.pesticides.storage.secure ? 'Compliant' : 'Issues Found';
      
      case 'preHarvest':
        return details.preHarvest && details.preHarvest.dryMatterPercentage >= 21 ? 'Compliant' : 'Issues Found';
      
      case 'workerWelfare':
        return details.workerWelfare && details.workerWelfare.firstAid && 
               details.workerWelfare.firstAid.kitsAvailable > 0 && 
               details.workerWelfare.waterAccess && details.workerWelfare.waterAccess.potable ? 'Compliant' : 'Issues Found';
      
      case 'environmental':
        return details.environmental && details.environmental.waterProtection && 
               details.environmental.waterProtection.measures && 
               details.environmental.waterProtection.measures.length > 0 ? 'Compliant' : 'Issues Found';
      
      case 'finalEvaluation':
        return details.finalEvaluation && details.finalEvaluation.exportReadiness === 'Ready' ? 'Compliant' :
               details.finalEvaluation && details.finalEvaluation.exportReadiness === 'Minor Corrections Needed' ? 'Issues Found' : 'Not Compliant';
      
      default:
        return 'Issues Found';
    }
  };

  const getStatusIcon = (status: SectionStatus) => {
    switch (status) {
      case 'Compliant':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Issues Found':
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case 'Not Compliant':
        return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusBadgeStyle = (status: SectionStatus) => {
    switch (status) {
      case 'Compliant':
        return "bg-green-50 text-green-700 border-green-200";
      case 'Issues Found':
        return "bg-amber-50 text-amber-700 border-amber-200";
      case 'Not Compliant':
        return "bg-red-50 text-red-700 border-red-200";
    }
  };

  const renderPhotos = (photos: { type: string; url: string; }[] | undefined) => {
    if (!photos || !photos.length) return null;
    
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
      case 'farm-id':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Farm/Grower Name</p>
                <p className="text-sm">{details.farmIdentification.farmName} / {details.farmIdentification.growerName}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Registration Numbers</p>
                {details.farmIdentification.registrationNumbers.map((reg, index) => (
                  <p key={index} className="text-sm">{reg.type}: {reg.value}</p>
                ))}
              </div>
              <div>
                <p className="text-sm font-medium">Location</p>
                <p className="text-sm">
                  {details.farmIdentification.location.address}<br />
                  GPS: {details.farmIdentification.location.coordinates}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Area</p>
                <p className="text-sm">
                  Total: {details.farmIdentification.areas.total} Ha<br />
                  Avocado: {details.farmIdentification.areas.avocado} Ha
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Varieties</p>
                <p className="text-sm">{details.farmIdentification.varieties.join(', ')}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Target Markets</p>
                <p className="text-sm">{details.farmIdentification.targetMarkets.join(', ')}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Associated Packhouse</p>
                <p className="text-sm">{details.farmIdentification.associatedPackhouse}</p>
              </div>
            </div>
            {renderPhotos(details.farmIdentification.photos)}
          </div>
        );
      case 'traceability':
        return (
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium">System Type</p>
              <p className="text-sm">{details.traceability.systemType}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Records Available</p>
              <p className="text-sm">{details.traceability.recordsAvailable ? 'Yes' : 'No'}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Record Types</p>
              <p className="text-sm">{details.traceability.recordTypes.join(', ')}</p>
            </div>
            {renderPhotos(details.traceability.photos)}
          </div>
        );
      case 'gap':
        return (
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium">Site History</p>
              <p className="text-sm">{details.gap.siteHistory}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Soil Management</p>
              <div className="mt-2">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fertilizer Type</TableHead>
                      <TableHead>Application Date</TableHead>
                      <TableHead>Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {details.gap.soilManagement.fertilizers.map((fert, index) => (
                      <TableRow key={index}>
                        <TableCell>{fert.type}</TableCell>
                        <TableCell>{formatDate(fert.applicationDate)}</TableCell>
                        <TableCell>{fert.rate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <p className="text-sm mt-2">
                  Storage Compliance: {details.gap.soilManagement.storageCompliance ? 'Yes' : 'No'}
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">Water Management</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-sm">Source: {details.gap.waterManagement.source}</p>
                  <p className="text-sm">Method: {details.gap.waterManagement.irrigationMethod}</p>
                </div>
                <div>
                  <p className="text-sm">Last Test: {formatDate(details.gap.waterManagement.qualityTestDate)}</p>
                  <p className="text-sm">Results: {details.gap.waterManagement.testResults}</p>
                </div>
              </div>
            </div>
            {renderPhotos(details.gap.photos)}
          </div>
        );
      case 'pest':
        return (
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium">IPM Strategy</p>
              <p className="text-sm">{details.pestManagement.ipmStrategyPresent ? 'Present' : 'Not Present'}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Monitoring Logs</p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Findings</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {details.pestManagement.monitoringLogs.map((log, index) => (
                    <TableRow key={index}>
                      <TableCell>{formatDate(log.date)}</TableCell>
                      <TableCell>{log.findings}</TableCell>
                      <TableCell>{log.action}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div>
              <p className="text-sm font-medium">Pesticide Management</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-sm">Storage Security: {details.pestManagement.pesticides.storage.secure ? 'Secure' : 'Not Secure'}</p>
                  <p className="text-sm">Storage Conditions: {details.pestManagement.pesticides.storage.conditions}</p>
                </div>
                <div>
                  <p className="text-sm">Disposal Method: {details.pestManagement.pesticides.disposal}</p>
                </div>
              </div>
              <Table className="mt-2">
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Application Date</TableHead>
                    <TableHead>PHI (Days)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {details.pestManagement.pesticides.records.map((record, index) => (
                    <TableRow key={index}>
                      <TableCell>{record.product}</TableCell>
                      <TableCell>{formatDate(record.applicationDate)}</TableCell>
                      <TableCell>{record.phi}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {renderPhotos(details.pestManagement.photos)}
          </div>
        );
      case 'pre-harvest':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Maturity Assessment</p>
                <p className="text-sm">Method: {details.preHarvest.maturityMethod}</p>
                <p className="text-sm">Dry Matter: {details.preHarvest.dryMatterPercentage}%</p>
              </div>
              <div>
                <p className="text-sm font-medium">Heat Removal Plan</p>
                <p className="text-sm">{details.preHarvest.heatRemovalPlan}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">Equipment</p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead>Last Maintenance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {details.preHarvest.equipment.map((equip, index) => (
                    <TableRow key={index}>
                      <TableCell>{equip.type}</TableCell>
                      <TableCell>{equip.condition}</TableCell>
                      <TableCell>{formatDate(equip.lastMaintenance)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div>
              <p className="text-sm font-medium">Training Records</p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Topic</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Attendees</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {details.preHarvest.trainingRecords.map((record, index) => (
                    <TableRow key={index}>
                      <TableCell>{record.topic}</TableCell>
                      <TableCell>{formatDate(record.date)}</TableCell>
                      <TableCell>{record.attendees}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {renderPhotos(details.preHarvest.photos)}
          </div>
        );
      case 'welfare':
        return (
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium">Hygiene Training</p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Topics</TableHead>
                    <TableHead>Trainer</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {details.workerWelfare.hygieneTraining.map((training, index) => (
                    <TableRow key={index}>
                      <TableCell>{formatDate(training.date)}</TableCell>
                      <TableCell>{training.topics.join(', ')}</TableCell>
                      <TableCell>{training.trainer}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div>
              <p className="text-sm font-medium">Facilities</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                {details.workerWelfare.facilities.map((facility, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <p className="text-sm font-medium">{facility.type}</p>
                    <p className="text-sm">Count: {facility.count}</p>
                    <p className="text-sm">Condition: {facility.condition}</p>
                    <p className="text-sm">Supplies: {facility.supplies.join(', ')}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">First Aid & Water</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-sm">First Aid Kits: {details.workerWelfare.firstAid.kitsAvailable}</p>
                  <p className="text-sm">Trained Personnel: {details.workerWelfare.firstAid.trainedPersonnel}</p>
                  <p className="text-sm">Last Inspection: {formatDate(details.workerWelfare.firstAid.lastInspection)}</p>
                </div>
                <div>
                  <p className="text-sm">Water Access Points: {details.workerWelfare.waterAccess.points}</p>
                  <p className="text-sm">Potable: {details.workerWelfare.waterAccess.potable ? 'Yes' : 'No'}</p>
                  <p className="text-sm">Last Test: {formatDate(details.workerWelfare.waterAccess.testDate)}</p>
                </div>
              </div>
            </div>
            {renderPhotos(details.workerWelfare.photos)}
          </div>
        );
      case 'environmental':
        return (
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium">Waste Management</p>
              <p className="text-sm">{details.environmental.wasteManagement.plan}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                {details.environmental.wasteManagement.collectionAreas.map((area, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <p className="text-sm font-medium">{area.type}</p>
                    <p className="text-sm">Condition: {area.condition}</p>
                    <p className="text-sm">Last Cleaned: {formatDate(area.lastCleaned)}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">Water Protection</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                {details.environmental.waterProtection.bufferZones.map((zone, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <p className="text-sm">Location: {zone.location}</p>
                    <p className="text-sm">Width: {zone.width}m</p>
                  </div>
                ))}
              </div>
              <p className="text-sm mt-2">Measures: {details.environmental.waterProtection.measures.join(', ')}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Biodiversity</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                {details.environmental.biodiversity.zones.map((zone, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <p className="text-sm font-medium">{zone.type}</p>
                    <p className="text-sm">Area: {zone.area} Ha</p>
                    <p className="text-sm">Species: {zone.species.join(', ')}</p>
                  </div>
                ))}
              </div>
            </div>
            {renderPhotos(details.environmental.photos)}
          </div>
        );
      case 'evaluation':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Strengths</p>
                <ul className="list-disc list-inside text-sm">
                  {details.finalEvaluation.strengths.map((strength, index) => (
                    <li key={index}>{strength}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium">Weaknesses</p>
                <ul className="list-disc list-inside text-sm">
                  {details.finalEvaluation.weaknesses.map((weakness, index) => (
                    <li key={index}>{weakness}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">Non-Conformities</p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Severity</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Corrective Action</TableHead>
                    <TableHead>Deadline</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {details.finalEvaluation.nonConformities.map((nc, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <span className={cn(
                          "px-2 py-1 rounded text-xs font-medium",
                          nc.severity === 'Critical' && "bg-red-100 text-red-700",
                          nc.severity === 'Major' && "bg-amber-100 text-amber-700",
                          nc.severity === 'Minor' && "bg-blue-100 text-blue-700"
                        )}>
                          {nc.severity}
                        </span>
                      </TableCell>
                      <TableCell>{nc.description}</TableCell>
                      <TableCell>{nc.correctiveAction}</TableCell>
                      <TableCell>{formatDate(nc.deadline)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Export Readiness</p>
                <p className={cn(
                  "text-sm mt-1 px-2 py-1 rounded inline-block",
                  details.finalEvaluation.exportReadiness === 'Ready' && "bg-green-100 text-green-700",
                  details.finalEvaluation.exportReadiness === 'Minor Corrections Needed' && "bg-amber-100 text-amber-700",
                  details.finalEvaluation.exportReadiness === 'Not Ready' && "bg-red-100 text-red-700"
                )}>
                  {details.finalEvaluation.exportReadiness}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Evaluator</p>
                <p className="text-sm">{details.finalEvaluation.evaluator.name}</p>
                <p className="text-sm">{details.finalEvaluation.evaluator.organization}</p>
                <p className="text-sm">{formatDate(details.finalEvaluation.evaluator.date)}</p>
              </div>
            </div>
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
