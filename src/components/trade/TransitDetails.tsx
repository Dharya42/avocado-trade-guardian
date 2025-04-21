import { TransitMonitoringDetails } from '@/types';
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
  Package2,
  Ship,
  Radio,
  Thermometer,
  Bell,
  ClipboardList,
  Image,
  CheckCircle,
  AlertCircle,
  XCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TransitDetailsProps {
  details: TransitMonitoringDetails;
}

type SectionStatus = 'Compliant' | 'Pending Review' | 'Issues Found';

export const TransitDetails = ({ details }: TransitDetailsProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getSectionStatus = (section: keyof TransitMonitoringDetails): SectionStatus => {
    switch (section) {
      case 'monitorInfo':
        // Check if monitor info is complete
        return details.monitorInfo.monitorName && details.monitorInfo.startDate ? 'Compliant' : 'Issues Found';
      
      case 'shipmentIdentification':
        // Check if container and seal numbers match
        return details.shipmentIdentification.containerId && details.shipmentIdentification.sealNumber ? 'Compliant' : 'Issues Found';
      
      case 'vesselDetails':
        // Check if vessel details are complete and ETA is current
        return details.vesselDetails.vesselName && details.vesselDetails.portOfDischarge.currentEta ? 'Compliant' : 'Issues Found';
      
      case 'monitoringSources':
        // Check if primary source is defined
        return details.monitoringSources.primarySource.type ? 'Compliant' : 'Issues Found';
      
      case 'environmentalConditions':
        // Check temperature and CA conditions
        const tempOk = !details.environmentalConditions.temperature.deviationsNoted;
        const caOk = !details.environmentalConditions.controlledAtmosphere.required || 
                    !details.environmentalConditions.controlledAtmosphere.deviationsNoted;
        return tempOk && caOk ? 'Compliant' : 'Issues Found';
      
      case 'eventMonitoring':
        // Check for unresolved alerts
        if (!details.eventMonitoring.hasAlerts) return 'Compliant';
        const unresolvedAlerts = details.eventMonitoring.alerts.some(alert => !alert.resolution);
        return unresolvedAlerts ? 'Issues Found' : 'Pending Review';
      
      case 'transitSummary':
        // Check overall condition
        switch (details.transitSummary.overallCondition) {
          case 'OK':
            return 'Compliant';
          case 'Minor Issues':
            return 'Pending Review';
          case 'Major Issues':
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

  const renderStatusBadge = (section: keyof TransitMonitoringDetails) => {
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
      {/* Monitor Info */}
      <AccordionItem value="monitor-info" className="border rounded-lg">
        <AccordionTrigger className="px-4 hover:no-underline [&[data-state=open]>div]:text-primary">
          <div className="flex items-center w-full">
            {renderStatusBadge('monitorInfo')}
            <UserCircle className="h-5 w-5 mr-2" />
            <span>Monitor / Coordinator Details</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Monitor Name / ID</p>
              <p className="text-sm">{details.monitorInfo.monitorName} ({details.monitorInfo.monitorId})</p>
            </div>
            <div>
              <p className="text-sm font-medium">Company / Affiliation</p>
              <p className="text-sm">{details.monitorInfo.company}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Monitoring Period</p>
              <p className="text-sm">
                Start: {formatDate(details.monitorInfo.startDate)}<br />
                End: {formatDate(details.monitorInfo.endDate)}
              </p>
            </div>
          </div>
          {renderPhotos(details.monitorInfo.photos)}
        </AccordionContent>
      </AccordionItem>

      {/* Shipment Identification */}
      <AccordionItem value="shipment-id" className="border rounded-lg">
        <AccordionTrigger className="px-4 hover:no-underline [&[data-state=open]>div]:text-primary">
          <div className="flex items-center w-full">
            {renderStatusBadge('shipmentIdentification')}
            <Package2 className="h-5 w-5 mr-2" />
            <span>Shipment Identification</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Container ID</p>
              <p className="text-sm">{details.shipmentIdentification.containerId}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Booking Reference</p>
              <p className="text-sm">{details.shipmentIdentification.bookingReference}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Exporter / Shipper</p>
              <p className="text-sm">{details.shipmentIdentification.exporterName}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Importer / Consignee</p>
              <p className="text-sm">{details.shipmentIdentification.importerName}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Seal Number</p>
              <p className="text-sm">{details.shipmentIdentification.sealNumber}</p>
            </div>
          </div>
          {renderPhotos(details.shipmentIdentification.photos)}
        </AccordionContent>
      </AccordionItem>

      {/* Vessel Details */}
      <AccordionItem value="vessel" className="border rounded-lg">
        <AccordionTrigger className="px-4 hover:no-underline [&[data-state=open]>div]:text-primary">
          <div className="flex items-center w-full">
            {renderStatusBadge('vesselDetails')}
            <Ship className="h-5 w-5 mr-2" />
            <span>Vessel & Voyage Details</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Vessel Name & IMO</p>
                <p className="text-sm">{details.vesselDetails.vesselName} ({details.vesselDetails.imoNumber})</p>
              </div>
              <div>
                <p className="text-sm font-medium">Voyage Number</p>
                <p className="text-sm">{details.vesselDetails.voyageNumber}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Shipping Line</p>
                <p className="text-sm">{details.vesselDetails.shippingLine}</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Port of Loading</p>
              <div className="bg-muted/50 p-3 rounded-md">
                <p className="text-sm">Port: {details.vesselDetails.portOfLoading.name}</p>
                <p className="text-sm">ATD: {formatDate(details.vesselDetails.portOfLoading.actualDeparture)}</p>
              </div>
            </div>

            {details.vesselDetails.transshipments.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-2">Transshipments</p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Port</TableHead>
                      <TableHead>ETA</TableHead>
                      <TableHead>ATA</TableHead>
                      <TableHead>ATD</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {details.vesselDetails.transshipments.map((trans, index) => (
                      <TableRow key={index}>
                        <TableCell>{trans.port}</TableCell>
                        <TableCell>{formatDate(trans.eta)}</TableCell>
                        <TableCell>{formatDate(trans.ata)}</TableCell>
                        <TableCell>{formatDate(trans.atd)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            <div>
              <p className="text-sm font-medium mb-2">Port of Discharge</p>
              <div className="bg-muted/50 p-3 rounded-md">
                <p className="text-sm">Port: {details.vesselDetails.portOfDischarge.name}</p>
                <p className="text-sm">Original ETA: {formatDate(details.vesselDetails.portOfDischarge.originalEta)}</p>
                <p className="text-sm">Current ETA: {formatDate(details.vesselDetails.portOfDischarge.currentEta)}</p>
              </div>
            </div>

            {details.vesselDetails.portOfDischarge.etaChanges.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-2">ETA Changes Log</p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>New ETA</TableHead>
                      <TableHead>Reason</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {details.vesselDetails.portOfDischarge.etaChanges.map((change, index) => (
                      <TableRow key={index}>
                        <TableCell>{formatDate(change.date)}</TableCell>
                        <TableCell>{formatDate(change.newEta)}</TableCell>
                        <TableCell>{change.reason}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
          {renderPhotos(details.vesselDetails.photos)}
        </AccordionContent>
      </AccordionItem>

      {/* Monitoring Sources */}
      <AccordionItem value="sources" className="border rounded-lg">
        <AccordionTrigger className="px-4 hover:no-underline [&[data-state=open]>div]:text-primary">
          <div className="flex items-center w-full">
            {renderStatusBadge('monitoringSources')}
            <Radio className="h-5 w-5 mr-2" />
            <span>Remote Monitoring Source(s)</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium">Primary Data Source</p>
              <div className="bg-muted/50 p-3 rounded-md mt-1">
                <p className="text-sm font-medium">{details.monitoringSources.primarySource.type}</p>
                <p className="text-sm">{details.monitoringSources.primarySource.details}</p>
              </div>
            </div>

            {details.monitoringSources.secondarySource && (
              <div>
                <p className="text-sm font-medium">Secondary Data Source</p>
                <div className="bg-muted/50 p-3 rounded-md mt-1">
                  <p className="text-sm font-medium">{details.monitoringSources.secondarySource.type}</p>
                  <p className="text-sm">{details.monitoringSources.secondarySource.details}</p>
                </div>
              </div>
            )}

            <div>
              <p className="text-sm font-medium">Review Frequency</p>
              <p className="text-sm">{details.monitoringSources.reviewFrequency}</p>
            </div>
          </div>
          {renderPhotos(details.monitoringSources.photos)}
        </AccordionContent>
      </AccordionItem>

      {/* Environmental Conditions */}
      <AccordionItem value="environmental" className="border rounded-lg">
        <AccordionTrigger className="px-4 hover:no-underline [&[data-state=open]>div]:text-primary">
          <div className="flex items-center w-full">
            {renderStatusBadge('environmentalConditions')}
            <Thermometer className="h-5 w-5 mr-2" />
            <span>Environmental Conditions Monitoring</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="space-y-6">
            {/* Temperature */}
            <div>
              <p className="text-sm font-medium mb-2">Temperature Monitoring</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/50 p-3 rounded-md">
                  <p className="text-sm">Set Point: {details.environmentalConditions.temperature.setPoint}°C</p>
                  <p className="text-sm">Data Availability: {details.environmentalConditions.temperature.dataAvailability}</p>
                  <p className="text-sm">Review Method: {details.environmentalConditions.temperature.reviewMethod}</p>
                </div>
                <div className="bg-muted/50 p-3 rounded-md">
                  <p className="text-sm">Min Temperature: {details.environmentalConditions.temperature.minTemperature}°C</p>
                  <p className="text-sm">Max Temperature: {details.environmentalConditions.temperature.maxTemperature}°C</p>
                  <p className="text-sm">Deviations: {details.environmentalConditions.temperature.deviationsNoted ? 'Yes' : 'No'}</p>
                </div>
              </div>
              {renderPhotos(details.environmentalConditions.temperature.evidence)}
            </div>

            {/* Controlled Atmosphere */}
            <div>
              <p className="text-sm font-medium mb-2">Controlled Atmosphere (CA)</p>
              {details.environmentalConditions.controlledAtmosphere.required ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-muted/50 p-3 rounded-md">
                      <p className="text-sm">O₂ Set Point: {details.environmentalConditions.controlledAtmosphere.o2SetPoint}%</p>
                      {details.environmentalConditions.controlledAtmosphere.o2Range && (
                        <p className="text-sm">
                          O₂ Range: {details.environmentalConditions.controlledAtmosphere.o2Range.min}% - 
                          {details.environmentalConditions.controlledAtmosphere.o2Range.max}%
                        </p>
                      )}
                    </div>
                    <div className="bg-muted/50 p-3 rounded-md">
                      <p className="text-sm">CO₂ Set Point: {details.environmentalConditions.controlledAtmosphere.co2SetPoint}%</p>
                      {details.environmentalConditions.controlledAtmosphere.co2Range && (
                        <p className="text-sm">
                          CO₂ Range: {details.environmentalConditions.controlledAtmosphere.co2Range.min}% - 
                          {details.environmentalConditions.controlledAtmosphere.co2Range.max}%
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="text-sm">Deviations: {details.environmentalConditions.controlledAtmosphere.deviationsNoted ? 'Yes' : 'No'}</p>
                  {renderPhotos(details.environmentalConditions.controlledAtmosphere.evidence)}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">CA not required for this shipment</p>
              )}
            </div>

            {/* Humidity & Power */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium mb-2">Relative Humidity</p>
                {details.environmentalConditions.relativeHumidity.dataReviewed ? (
                  <div className="bg-muted/50 p-3 rounded-md">
                    {details.environmentalConditions.relativeHumidity.range && (
                      <p className="text-sm">
                        Range: {details.environmentalConditions.relativeHumidity.range.min}% - 
                        {details.environmentalConditions.relativeHumidity.range.max}%
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Data not reviewed</p>
                )}
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Reefer Unit Power Status</p>
                <div className="bg-muted/50 p-3 rounded-md">
                  <p className="text-sm">Current Status: {details.environmentalConditions.reeferUnit.powerStatus}</p>
                  {details.environmentalConditions.reeferUnit.outages.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-medium">Outages:</p>
                      {details.environmentalConditions.reeferUnit.outages.map((outage, index) => (
                        <p key={index} className="text-sm">
                          {formatDate(outage.startTime)} - {formatDate(outage.endTime)} ({outage.duration})
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {renderPhotos(details.environmentalConditions.photos)}
        </AccordionContent>
      </AccordionItem>

      {/* Event Monitoring */}
      <AccordionItem value="events" className="border rounded-lg">
        <AccordionTrigger className="px-4 hover:no-underline [&[data-state=open]>div]:text-primary">
          <div className="flex items-center w-full">
            {renderStatusBadge('eventMonitoring')}
            <Bell className="h-5 w-5 mr-2" />
            <span>Event & Alert Monitoring</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="space-y-6">
            {/* Alerts */}
            <div>
              <p className="text-sm font-medium mb-2">Alarms/Events</p>
              {details.eventMonitoring.hasAlerts ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date/Time</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Resolution</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {details.eventMonitoring.alerts.map((alert, index) => (
                      <TableRow key={index}>
                        <TableCell>{alert.dateTime}</TableCell>
                        <TableCell>{alert.description}</TableCell>
                        <TableCell>{alert.duration}</TableCell>
                        <TableCell>{alert.resolution || '—'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-sm text-muted-foreground">No alerts reported</p>
              )}
            </div>

            {/* Delays */}
            <div>
              <p className="text-sm font-medium mb-2">Delays or Route Changes</p>
              {details.eventMonitoring.hasDelays ? (
                <div className="space-y-3">
                  {details.eventMonitoring.delays.map((delay, index) => (
                    <div key={index} className="bg-muted/50 p-3 rounded-md">
                      <p className="text-sm font-medium">{delay.description}</p>
                      <p className="text-sm text-muted-foreground">{delay.impact}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No delays or route changes reported</p>
              )}
            </div>
          </div>
          {renderPhotos(details.eventMonitoring.photos)}
        </AccordionContent>
      </AccordionItem>

      {/* Transit Summary */}
      <AccordionItem value="summary" className="border rounded-lg">
        <AccordionTrigger className="px-4 hover:no-underline [&[data-state=open]>div]:text-primary">
          <div className="flex items-center w-full">
            {renderStatusBadge('transitSummary')}
            <ClipboardList className="h-5 w-5 mr-2" />
            <span>Transit Log Summary</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium">Overall Transit Conditions</p>
              <div className={cn(
                "mt-1 px-3 py-2 rounded-md inline-block",
                details.transitSummary.overallCondition === 'OK' && "bg-green-50 text-green-700",
                details.transitSummary.overallCondition === 'Minor Issues' && "bg-amber-50 text-amber-700",
                details.transitSummary.overallCondition === 'Major Issues' && "bg-red-50 text-red-700"
              )}>
                <p className="text-sm font-medium">{details.transitSummary.overallCondition}</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Communication Log</p>
              <div className="space-y-2">
                {details.transitSummary.communicationLog.map((entry, index) => (
                  <p key={index} className="text-sm">{entry}</p>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium">Final Verified ETA at POD</p>
              <p className="text-sm">{formatDate(details.transitSummary.finalEta)}</p>
            </div>
          </div>
          {renderPhotos(details.transitSummary.photos)}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}; 