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
  Store,
  Sun,
  ShoppingBasket,
  Image,
  Percent,
  Package,
  ClipboardList,
  CheckCircle,
  AlertCircle,
  XCircle,
  ThermometerSun
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface RetailShelfAuditDetails {
  auditMetadata: {
    dateTime: string;
    auditorName: string;
    auditorId: string;
    storeName: string;
    storeLocation: string;
    storeContact?: string;
    weatherConditions?: string;
    photos: { type: string; url: string; }[];
  };
  displayArea: {
    location: string;
    displayType: 'Ambient' | 'Refrigerated' | 'Standalone';
    cleanliness: 'Excellent' | 'Good' | 'Fair' | 'Poor';
    lighting: 'Adequate' | 'Too Dim' | 'Too Bright';
    posPresent: boolean;
    posCondition?: 'Good' | 'Damaged' | 'Outdated';
    posOriginAccuracy: 'Correct' | 'Incorrect' | 'Missing';
    overallAppeal: 'High' | 'Medium' | 'Low';
    photos: { type: string; url: string; }[];
  };
  looseAvocados: {
    variety: string;
    originLabeling: 'Clearly Labeled' | 'Incorrect' | 'Missing';
    priceLabeling: 'Clear & Correct' | 'Incorrect' | 'Missing';
    ripenessMix: {
      hardRipenAtHome: number;
      breakingFirmRipe: number;
      readyToEat: number;
      overripe: number;
    };
    visualQuality: {
      sizeColorUniformity: 'Good' | 'Fair' | 'Poor';
      damagedFruit: {
        level: 'None' | 'Some' | 'Excessive';
        count: number;
      };
      overripeMoldyFruit: {
        level: 'None' | 'Some' | 'Excessive';
        count: number;
      };
      handlingDamage: 'Minimal' | 'Evident';
    };
    firmnessConsistency: 'Consistent' | 'Inconsistent';
    stockRotation: {
      olderStockMixed: boolean | 'Unclear';
      removalPercentage: number;
    };
    photos: { type: string; url: string; }[];
  };
  prePackaged?: {
    packageType: string;
    condition: 'Good' | 'Damaged';
    labelingAccuracy: 'Correct' | 'Incorrect' | 'Missing';
    fruitVisibility: 'Yes' | 'Partially' | 'No';
    inPackQuality: {
      uniformity: 'Good' | 'Poor';
      visibleDamage: 'None' | 'Some' | 'Excessive';
    };
    fifoFollowed: boolean;
    photos: { type: string; url: string; }[];
  };
  summary: {
    stockLevel: 'High' | 'Medium' | 'Low' | 'Out of Stock';
    overallQuality: 'Excellent' | 'Good' | 'Fair' | 'Poor';
    immediateActions: string;
    storeRecommendations: string;
    tfcRecommendations: string;
    auditorComments: string;
  };
}

interface RetailShelfDetailsProps {
  details: RetailShelfAuditDetails;
}

type SectionStatus = 'Compliant' | 'Pending Review' | 'Issues Found';

export const RetailShelfDetails = ({ details }: RetailShelfDetailsProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSectionStatus = (section: keyof RetailShelfAuditDetails): SectionStatus => {
    switch (section) {
      case 'auditMetadata':
        return details.auditMetadata.auditorName && details.auditMetadata.storeName ? 'Compliant' : 'Issues Found';
      
      case 'displayArea':
        const displayIssues = 
          details.displayArea.cleanliness === 'Poor' ||
          details.displayArea.posOriginAccuracy === 'Incorrect' ||
          details.displayArea.overallAppeal === 'Low';
        return displayIssues ? 'Issues Found' : 'Compliant';
      
      case 'looseAvocados':
        const qualityIssues = 
          details.looseAvocados.visualQuality.damagedFruit.level === 'Excessive' ||
          details.looseAvocados.visualQuality.overripeMoldyFruit.level === 'Excessive' ||
          details.looseAvocados.originLabeling === 'Missing' ||
          details.looseAvocados.priceLabeling === 'Missing';
        return qualityIssues ? 'Issues Found' : 'Compliant';
      
      case 'prePackaged':
        if (!details.prePackaged) return 'Compliant';
        const packagingIssues = 
          details.prePackaged.condition === 'Damaged' ||
          details.prePackaged.labelingAccuracy === 'Incorrect' ||
          details.prePackaged.inPackQuality.visibleDamage === 'Excessive';
        return packagingIssues ? 'Issues Found' : 'Compliant';
      
      case 'summary':
        switch (details.summary.overallQuality) {
          case 'Excellent':
          case 'Good':
            return 'Compliant';
          case 'Fair':
            return 'Pending Review';
          case 'Poor':
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

  const renderStatusBadge = (section: keyof RetailShelfAuditDetails) => {
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

  const renderRipenessChart = (ripenessMix: RetailShelfAuditDetails['looseAvocados']['ripenessMix']) => {
    return (
      <div className="mt-4">
        <div className="text-sm font-medium mb-2">Ripeness Distribution</div>
        <div className="h-6 w-full rounded-full overflow-hidden flex">
          {Object.entries(ripenessMix).map(([key, value], index) => (
            <div
              key={key}
              style={{ width: `${value}%` }}
              className={cn(
                "h-full",
                index === 0 && "bg-green-200",  // Hard/Ripen at Home
                index === 1 && "bg-green-400",  // Breaking/Firm-Ripe
                index === 2 && "bg-green-600",  // Ready to Eat
                index === 3 && "bg-red-400",    // Overripe
              )}
              title={`${key}: ${value}%`}
            />
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2 text-xs">
          {Object.entries(ripenessMix).map(([key, value]) => (
            <div key={key} className="flex items-center">
              <div className={cn(
                "w-3 h-3 rounded-full mr-1",
                key === 'hardRipenAtHome' && "bg-green-200",
                key === 'breakingFirmRipe' && "bg-green-400",
                key === 'readyToEat' && "bg-green-600",
                key === 'overripe' && "bg-red-400",
              )} />
              <span>{key.replace(/([A-Z])/g, ' $1').trim()}: {value}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Accordion type="single" collapsible className="w-full space-y-4">
      {/* Audit Metadata */}
      <AccordionItem value="audit-metadata" className="border rounded-lg">
        <AccordionTrigger className="px-4 hover:no-underline [&[data-state=open]>div]:text-primary">
          <div className="flex items-center w-full">
            {renderStatusBadge('auditMetadata')}
            <UserCircle className="h-5 w-5 mr-2" />
            <span>Audit Information</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Audit Date & Time</p>
              <p className="text-sm">{formatDate(details.auditMetadata.dateTime)}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Auditor Details</p>
              <p className="text-sm">{details.auditMetadata.auditorName} ({details.auditMetadata.auditorId})</p>
            </div>
            <div>
              <p className="text-sm font-medium">Store Information</p>
              <p className="text-sm">
                {details.auditMetadata.storeName}<br />
                {details.auditMetadata.storeLocation}
              </p>
            </div>
            {details.auditMetadata.storeContact && (
              <div>
                <p className="text-sm font-medium">Store Contact</p>
                <p className="text-sm">{details.auditMetadata.storeContact}</p>
              </div>
            )}
            {details.auditMetadata.weatherConditions && (
              <div>
                <p className="text-sm font-medium">Weather Conditions</p>
                <p className="text-sm">{details.auditMetadata.weatherConditions}</p>
              </div>
            )}
          </div>
          {renderPhotos(details.auditMetadata.photos)}
        </AccordionContent>
      </AccordionItem>

      {/* Display Area Assessment */}
      <AccordionItem value="display-area" className="border rounded-lg">
        <AccordionTrigger className="px-4 hover:no-underline [&[data-state=open]>div]:text-primary">
          <div className="flex items-center w-full">
            {renderStatusBadge('displayArea')}
            <Store className="h-5 w-5 mr-2" />
            <span>Display Area Assessment</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Display Location</p>
              <p className="text-sm">{details.displayArea.location}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Display Type</p>
              <p className="text-sm">{details.displayArea.displayType}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Cleanliness & Tidiness</p>
              <p className="text-sm">{details.displayArea.cleanliness}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Lighting Conditions</p>
              <p className="text-sm">{details.displayArea.lighting}</p>
            </div>
            <div>
              <p className="text-sm font-medium">POS Material Status</p>
              <div className="space-y-1">
                <p className="text-sm">Present: {details.displayArea.posPresent ? 'Yes' : 'No'}</p>
                {details.displayArea.posPresent && details.displayArea.posCondition && (
                  <p className="text-sm">Condition: {details.displayArea.posCondition}</p>
                )}
                <p className="text-sm">Origin Accuracy: {details.displayArea.posOriginAccuracy}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">Overall Display Appeal</p>
              <p className="text-sm">{details.displayArea.overallAppeal}</p>
            </div>
          </div>
          {renderPhotos(details.displayArea.photos)}
        </AccordionContent>
      </AccordionItem>

      {/* Loose Avocados Assessment */}
      <AccordionItem value="loose-avocados" className="border rounded-lg">
        <AccordionTrigger className="px-4 hover:no-underline [&[data-state=open]>div]:text-primary">
          <div className="flex items-center w-full">
            {renderStatusBadge('looseAvocados')}
            <ShoppingBasket className="h-5 w-5 mr-2" />
            <span>Loose Avocados Assessment</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Variety</p>
                <p className="text-sm">{details.looseAvocados.variety}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Origin Labeling</p>
                <p className="text-sm">{details.looseAvocados.originLabeling}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Price Labeling</p>
                <p className="text-sm">{details.looseAvocados.priceLabeling}</p>
              </div>
            </div>

            {renderRipenessChart(details.looseAvocados.ripenessMix)}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Visual Quality</p>
                <div className="space-y-1">
                  <p className="text-sm">Size/Color Uniformity: {details.looseAvocados.visualQuality.sizeColorUniformity}</p>
                  <p className="text-sm">
                    Damaged Fruit: {details.looseAvocados.visualQuality.damagedFruit.level}
                    {details.looseAvocados.visualQuality.damagedFruit.count > 0 && 
                      ` (${details.looseAvocados.visualQuality.damagedFruit.count} units)`}
                  </p>
                  <p className="text-sm">
                    Overripe/Moldy: {details.looseAvocados.visualQuality.overripeMoldyFruit.level}
                    {details.looseAvocados.visualQuality.overripeMoldyFruit.count > 0 && 
                      ` (${details.looseAvocados.visualQuality.overripeMoldyFruit.count} units)`}
                  </p>
                  <p className="text-sm">Handling Damage: {details.looseAvocados.visualQuality.handlingDamage}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Stock Management</p>
                <div className="space-y-1">
                  <p className="text-sm">Firmness Consistency: {details.looseAvocados.firmnessConsistency}</p>
                  <p className="text-sm">
                    Older Stock Mixed: {
                      typeof details.looseAvocados.stockRotation.olderStockMixed === 'boolean'
                        ? details.looseAvocados.stockRotation.olderStockMixed ? 'Yes' : 'No'
                        : 'Unclear'
                    }
                  </p>
                  <p className="text-sm">Stock Needing Removal: {details.looseAvocados.stockRotation.removalPercentage}%</p>
                </div>
              </div>
            </div>
          </div>
          {renderPhotos(details.looseAvocados.photos)}
        </AccordionContent>
      </AccordionItem>

      {/* Pre-packaged Avocados */}
      {details.prePackaged && (
        <AccordionItem value="pre-packaged" className="border rounded-lg">
          <AccordionTrigger className="px-4 hover:no-underline [&[data-state=open]>div]:text-primary">
            <div className="flex items-center w-full">
              {renderStatusBadge('prePackaged')}
              <Package className="h-5 w-5 mr-2" />
              <span>Pre-packaged Avocados</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Package Information</p>
                <div className="space-y-1">
                  <p className="text-sm">Type: {details.prePackaged.packageType}</p>
                  <p className="text-sm">Condition: {details.prePackaged.condition}</p>
                  <p className="text-sm">Label Accuracy: {details.prePackaged.labelingAccuracy}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Product Quality</p>
                <div className="space-y-1">
                  <p className="text-sm">Fruit Visibility: {details.prePackaged.fruitVisibility}</p>
                  <p className="text-sm">Size/Ripeness Uniformity: {details.prePackaged.inPackQuality.uniformity}</p>
                  <p className="text-sm">Visible Damage/Mold: {details.prePackaged.inPackQuality.visibleDamage}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Stock Management</p>
                <p className="text-sm">FIFO Practice Followed: {details.prePackaged.fifoFollowed ? 'Yes' : 'No'}</p>
              </div>
            </div>
            {renderPhotos(details.prePackaged.photos)}
          </AccordionContent>
        </AccordionItem>
      )}

      {/* Summary & Recommendations */}
      <AccordionItem value="summary" className="border rounded-lg">
        <AccordionTrigger className="px-4 hover:no-underline [&[data-state=open]>div]:text-primary">
          <div className="flex items-center w-full">
            {renderStatusBadge('summary')}
            <ClipboardList className="h-5 w-5 mr-2" />
            <span>Summary & Recommendations</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Stock Level</p>
                <p className="text-sm">{details.summary.stockLevel}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Overall Quality</p>
                <p className="text-sm">{details.summary.overallQuality}</p>
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium">Immediate Actions Taken</p>
              <p className="text-sm whitespace-pre-wrap">{details.summary.immediateActions}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium">Recommendations for Store</p>
              <p className="text-sm whitespace-pre-wrap">{details.summary.storeRecommendations}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium">Recommendations for TFC</p>
              <p className="text-sm whitespace-pre-wrap">{details.summary.tfcRecommendations}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium">Additional Comments</p>
              <p className="text-sm whitespace-pre-wrap">{details.summary.auditorComments}</p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}; 