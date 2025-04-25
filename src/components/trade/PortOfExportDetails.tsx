import { useState } from 'react';
import { PortOfExportInspection } from '@/types';
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
  details: PortOfExportInspection;
}

type SectionStatus = 'Compliant' | 'Issues Found' | 'Not Compliant';

type Section = {
  id: string;
  title: string;
  icon: React.ReactNode;
  key: keyof PortOfExportInspection;
};

const SECTIONS: Section[] = [
  { id: 'logistics', title: 'Logistics & Documentation', icon: <Truck className="h-5 w-5" />, key: 'logistics' },
  { id: 'packaging', title: 'Packaging & Labeling', icon: <Box className="h-5 w-5" />, key: 'packaging' },
  { id: 'quality', title: 'Quality Inspection', icon: <Clipboard className="h-5 w-5" />, key: 'quality' },
  { id: 'compliance', title: 'Export Compliance', icon: <FileText className="h-5 w-5" />, key: 'compliance' },
  { id: 'temperature', title: 'Temperature & Conditions', icon: <ThermometerSnowflake className="h-5 w-5" />, key: 'temperature' },
  { id: 'loading', title: 'Container Loading', icon: <CalendarCheck className="h-5 w-5" />, key: 'loading' },
];

export const PortOfExportDetails = ({ details }: PortOfExportDetailsProps) => {
  const [selectedSection, setSelectedSection] = useState<string>(SECTIONS[0].id);

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

  const getSectionStatus = (sectionKey: keyof PortOfExportInspection): SectionStatus => {
    switch (sectionKey) {
      case 'logistics':
        return details.logistics && details.logistics.documents && 
               details.logistics.documents.length > 0 ? 'Compliant' : 'Issues Found';
      
      case 'packaging':
        return details.packaging && details.packaging.condition === 'Good' ? 'Compliant' : 'Issues Found';
      
      case 'quality':
        return details.quality && details.quality.overallRating >= 4 ? 'Compliant' : 
               details.quality && details.quality.overallRating >= 3 ? 'Issues Found' : 'Not Compliant';
      
      case 'compliance':
        return details.compliance && details.compliance.exportPermit && 
               details.compliance.phytosanitaryCertificate ? 'Compliant' : 'Not Compliant';
      
      case 'temperature':
        return details.temperature && 
               details.temperature.readings.every(r => r.value >= 4 && r.value <= 6) ? 'Compliant' : 'Issues Found';
      
      case 'loading':
        return details.loading && details.loading.containerCondition === 'Good' &&
               details.loading.securitySeal ? 'Compliant' : 'Issues Found';
      
      default:
        return 'Issues Found';
    }
  };

  const getStatusIcon = (status: SectionStatus) => {
    switch (status) {
      case 'Compliant':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Issues Found':
        return <LucideAlertCircle className="h-4 w-4 text-amber-500" />;
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
          <FileText className="h-4 w-4 mr-2" />
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

  const renderSectionContent = () => {
    const section = SECTIONS.find(s => s.id === selectedSection);
    if (!section) return null;

    switch (section.id) {
      case 'logistics':
        return (
          <div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="border rounded-md p-3">
                <div className="text-sm text-muted-foreground mb-1">Inspection Date</div>
                <div className="font-medium">{formatDate(details.inspectionDate)}</div>
              </div>
              <div className="border rounded-md p-3">
                <div className="text-sm text-muted-foreground mb-1">Inspector</div>
                <div className="font-medium">{details.inspector}</div>
              </div>
            </div>
            
            <div className="border rounded-md p-4 mb-4">
              <h3 className="font-medium mb-2">Documentation</h3>
              <ul className="space-y-2">
                {details.logistics?.documents?.map((doc, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>{doc.type}: </span>
                    <span className="ml-1 text-muted-foreground">{doc.number}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-2">Shipping Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Vessel/Flight</div>
                  <div>{details.logistics?.vessel || 'N/A'}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Departure Date</div>
                  <div>{details.logistics?.departureDate ? formatDate(details.logistics.departureDate) : 'N/A'}</div>
                </div>
              </div>
            </div>
            
            {renderPhotos(details.logistics?.photos)}
          </div>
        );
        
      case 'packaging':
        return (
          <div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="border rounded-md p-3">
                <div className="text-sm text-muted-foreground mb-1">Packaging Condition</div>
                <div className="font-medium">{details.packaging?.condition || 'N/A'}</div>
              </div>
              <div className="border rounded-md p-3">
                <div className="text-sm text-muted-foreground mb-1">Packaging Type</div>
                <div className="font-medium">{details.packaging?.type || 'N/A'}</div>
              </div>
            </div>
            
            <div className="border rounded-md p-4 mb-4">
              <h3 className="font-medium mb-2">Labeling Compliance</h3>
              <ul className="space-y-2">
                {details.packaging?.labelingCompliance?.map((item, index) => (
                  <li key={index} className="flex items-center">
                    {item.compliant ? 
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> : 
                      <XCircle className="h-4 w-4 text-red-500 mr-2" />
                    }
                    <span>{item.requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {details.packaging?.notes && (
              <div className="border rounded-md p-4 mb-4">
                <h3 className="font-medium mb-2">Notes</h3>
                <p className="text-muted-foreground">{details.packaging.notes}</p>
              </div>
            )}
            
            {renderPhotos(details.packaging?.photos)}
          </div>
        );
        
      case 'quality':
        return (
          <div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="border rounded-md p-3">
                <div className="text-sm text-muted-foreground mb-1">Overall Rating</div>
                <div className="font-medium">{details.quality?.overallRating || 'N/A'}/5</div>
              </div>
              <div className="border rounded-md p-3">
                <div className="text-sm text-muted-foreground mb-1">Sample Size</div>
                <div className="font-medium">{details.quality?.sampleSize || 'N/A'} fruits</div>
              </div>
            </div>
            
            <div className="border rounded-md p-4 mb-4">
              <h3 className="font-medium mb-2">Quality Metrics</h3>
              <div className="space-y-3">
                {details.quality?.metrics?.map((metric, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span>{metric.name}</span>
                      <span className="font-medium">{metric.value}{metric.unit}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary rounded-full h-2" 
                        style={{ width: `${(metric.value / metric.maxValue) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border rounded-md p-4 mb-4">
              <h3 className="font-medium mb-2">Defects Found</h3>
              <div className="grid grid-cols-2 gap-3">
                {details.quality?.defects?.map((defect, index) => (
                  <div key={index} className="flex items-center">
                    <div className={cn(
                      "w-2 h-2 rounded-full mr-2",
                      defect.severity === 'High' ? "bg-red-500" :
                      defect.severity === 'Medium' ? "bg-amber-500" : "bg-yellow-300"
                    )}></div>
                    <span>{defect.type}: </span>
                    <span className="ml-1 text-muted-foreground">{defect.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
            
            {renderPhotos(details.quality?.photos)}
          </div>
        );
        
      case 'compliance':
        return (
          <div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="border rounded-md p-3">
                <div className="text-sm text-muted-foreground mb-1">Export Permit</div>
                <div className="font-medium flex items-center">
                  {details.compliance?.exportPermit ? 
                    <><CheckCircle className="h-4 w-4 text-green-500 mr-2" /> Verified</> : 
                    <><XCircle className="h-4 w-4 text-red-500 mr-2" /> Not Verified</>
                  }
                </div>
              </div>
              <div className="border rounded-md p-3">
                <div className="text-sm text-muted-foreground mb-1">Phytosanitary Certificate</div>
                <div className="font-medium flex items-center">
                  {details.compliance?.phytosanitaryCertificate ? 
                    <><CheckCircle className="h-4 w-4 text-green-500 mr-2" /> Verified</> : 
                    <><XCircle className="h-4 w-4 text-red-500 mr-2" /> Not Verified</>
                  }
                </div>
              </div>
            </div>
            
            <div className="border rounded-md p-4 mb-4">
              <h3 className="font-medium mb-2">Compliance Requirements</h3>
              <ul className="space-y-2">
                {details.compliance?.requirements?.map((req, index) => (
                  <li key={index} className="flex items-center">
                    {req.met ? 
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> : 
                      <XCircle className="h-4 w-4 text-red-500 mr-2" />
                    }
                    <span>{req.name}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {details.compliance?.notes && (
              <div className="border rounded-md p-4 mb-4">
                <h3 className="font-medium mb-2">Notes</h3>
                <p className="text-muted-foreground">{details.compliance.notes}</p>
              </div>
            )}
            
            {renderPhotos(details.compliance?.photos)}
          </div>
        );
        
      case 'temperature':
        return (
          <div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="border rounded-md p-3">
                <div className="text-sm text-muted-foreground mb-1">Target Temperature</div>
                <div className="font-medium">{details.temperature?.targetRange?.min}°C - {details.temperature?.targetRange?.max}°C</div>
              </div>
              <div className="border rounded-md p-3">
                <div className="text-sm text-muted-foreground mb-1">Humidity</div>
                <div className="font-medium">{details.temperature?.humidity || 'N/A'}%</div>
              </div>
            </div>
            
            <div className="border rounded-md p-4 mb-4">
              <h3 className="font-medium mb-2">Temperature Readings</h3>
              <div className="space-y-3">
                {details.temperature?.readings?.map((reading, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span>{reading.location}</span>
                      <span className={cn(
                        "font-medium",
                        reading.value < 4 || reading.value > 6 ? "text-red-500" : "text-green-500"
                      )}>
                        {reading.value}°C
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={cn(
                          "rounded-full h-2",
                          reading.value < 4 || reading.value > 6 ? "bg-red-500" : "bg-green-500"
                        )}
                        style={{ 
                          width: `${Math.min(100, Math.max(0, ((reading.value - 0) / 10) * 100))}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {details.temperature?.notes && (
              <div className="border rounded-md p-4 mb-4">
                <h3 className="font-medium mb-2">Notes</h3>
                <p className="text-muted-foreground">{details.temperature.notes}</p>
              </div>
            )}
            
            {renderPhotos(details.temperature?.photos)}
          </div>
        );
        
      case 'loading':
        return (
          <div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="border rounded-md p-3">
                <div className="text-sm text-muted-foreground mb-1">Container Condition</div>
                <div className="font-medium">{details.loading?.containerCondition || 'N/A'}</div>
              </div>
              <div className="border rounded-md p-3">
                <div className="text-sm text-muted-foreground mb-1">Security Seal</div>
                <div className="font-medium flex items-center">
                  {details.loading?.securitySeal ? 
                    <><CheckCircle className="h-4 w-4 text-green-500 mr-2" /> Applied</> : 
                    <><XCircle className="h-4 w-4 text-red-500 mr-2" /> Not Applied</>
                  }
                </div>
              </div>
            </div>
            
            <div className="border rounded-md p-4 mb-4">
              <h3 className="font-medium mb-2">Container Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Container Number</div>
                  <div>{details.loading?.containerNumber || 'N/A'}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Seal Number</div>
                  <div>{details.loading?.sealNumber || 'N/A'}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Loading Date</div>
                  <div>{details.loading?.loadingDate ? formatDate(details.loading.loadingDate) : 'N/A'}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Loading Completion</div>
                  <div>{details.loading?.loadingCompletion || 'N/A'}</div>
                </div>
              </div>
            </div>
            
            {details.loading?.notes && (
              <div className="border rounded-md p-4 mb-4">
                <h3 className="font-medium mb-2">Notes</h3>
                <p className="text-muted-foreground">{details.loading.notes}</p>
              </div>
            )}
            
            {renderPhotos(details.loading?.photos)}
          </div>
        );
        
      default:
        return (
          <div className="text-center p-4">
            <p className="text-muted-foreground">No details available for this section</p>
          </div>
        );
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
          {renderSectionContent()}
        </div>
      </div>
    </div>
  );
};
