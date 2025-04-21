import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from "@/components/layout/Layout";
import { DocumentTitle } from "@/components/ui/document-title";
import { mockTrades } from "@/data/mockData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  AlertCircle, 
  XCircle,
  ArrowRight,
  ArrowUpDown,
  ChevronDown,
  Flag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Trade } from '@/types';
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const mockNotifications = [
  {
    id: "1",
    notification_reference: "2025.1234",
    notification_type: "alert",
    subject: "Aflatoxins in pistachio kernels from Jordan",
    notification_date: "2025-04-15",
    title: "Aflatoxins in pistachio kernels from Jordan",
    validation_status: "Validated",
    last_update: "2025-04-16",
    classification: "Serious",
    product_details: {
      product_category: "Nuts, nut products and seeds",
      product_name: "PISTACHIO KERNEL",
      distribution_status: "Product not (yet) placed on the market"
    },
    organisations: [
      { role: "Origin", country: "JO", name: "Jordan" },
      { role: "Notifying", country: "IT", name: "Italy" },
      { role: "Operator", country: "FR", name: "France" },
      { role: "Operator", country: "JO", name: "Jordan" }
    ],
    risk_assessment: {
      risk_decision: "serious",
      hazards_summary: "Not defined",
      persons_affected: null,
      symptoms: "Unknown"
    },
    hazards: [
      {
        sampling_date: "2025-04-08",
        hazard_type: "Aflatoxin B1 - mycotoxins",
        category: "Mycotoxins",
        result: "52.5 ± 19.9 µg/kg",
        max_limit: "8 µg/kg"
      },
      {
        sampling_date: "2025-04-08",
        hazard_type: "Aflatoxin - mycotoxins",
        category: "Mycotoxins",
        result: "56.8 ± 21.3 µg/kg",
        max_limit: "10 µg/kg"
      }
    ],
    measures_taken: [
      { country: "IT", measure: "Re-dispatch" }
    ],
    follow_ups: []
  },
  {
    id: "2",
    notification_reference: "2025.1342",
    notification_type: "information",
    subject: "Pesticide residues in mangoes from Thailand",
    notification_date: "2025-04-14",
    title: "Pesticide residues in mangoes from Thailand",
    validation_status: "Validated",
    last_update: "2025-04-15",
    classification: "Normal",
    product_details: {
      product_category: "Fruits and vegetables",
      product_name: "MANGO",
      distribution_status: "Distribution to other member countries"
    },
    organisations: [
      { role: "Origin", country: "TH", name: "Thailand" },
      { role: "Notifying", country: "DE", name: "Germany" },
      { role: "Operator", country: "DE", name: "Germany" }
    ],
    risk_assessment: {
      risk_decision: "potential risk",
      hazards_summary: "Excessive pesticide residues",
      persons_affected: null,
      symptoms: "Unknown"
    },
    hazards: [
      {
        sampling_date: "2025-04-07",
        hazard_type: "Chlorpyrifos",
        category: "Pesticide residues",
        result: "0.09 mg/kg",
        max_limit: "0.01 mg/kg"
      }
    ],
    measures_taken: [
      { country: "DE", measure: "Withdrawal from the market" }
    ],
    follow_ups: []
  },
  {
    id: "3",
    notification_reference: "2025.1401",
    notification_type: "border rejection",
    subject: "Salmonella in beef from Brazil",
    notification_date: "2025-04-12",
    title: "Salmonella in beef from Brazil",
    validation_status: "Validated",
    last_update: "2025-04-13",
    classification: "Serious",
    product_details: {
      product_category: "Meat and meat products",
      product_name: "BEEF",
      distribution_status: "Border control - consignment detained"
    },
    organisations: [
      { role: "Origin", country: "BR", name: "Brazil" },
      { role: "Notifying", country: "ES", name: "Spain" }
    ],
    risk_assessment: {
      risk_decision: "serious",
      hazards_summary: "Pathogenic microorganisms",
      persons_affected: null,
      symptoms: "Fever, abdominal pain, diarrhea"
    },
    hazards: [
      {
        sampling_date: "2025-04-10",
        hazard_type: "Salmonella",
        category: "Pathogenic Microorganisms",
        result: "Present /25g",
        max_limit: "Absent /25g"
      }
    ],
    measures_taken: [
      { country: "ES", measure: "Border rejection" }
    ],
    follow_ups: []
  }
];

const getFlagEmoji = (countryCode: string) => {
  if (!countryCode) return "";
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

const getRiskBadgeVariant = (risk: string) => {
  switch (risk?.toLowerCase()) {
    case 'serious':
      return 'destructive';
    case 'potential risk':
      return 'secondary';
    default:
      return 'outline';
  }
};

const getTypeBadgeVariant = (type: string) => {
  switch (type?.toLowerCase()) {
    case 'alert':
      return 'destructive';
    case 'information':
      return 'secondary';
    case 'border rejection':
      return 'outline';
    default:
      return 'outline';
  }
};

const Tracker = () => {
  const navigate = useNavigate();
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedNotification, setSelectedNotification] = useState<any | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedNotifications = [...mockNotifications].sort((a, b) => {
    if (!sortColumn) return 0;
    
    let valueA, valueB;
    
    switch (sortColumn) {
      case 'reference':
        valueA = a.notification_reference;
        valueB = b.notification_reference;
        break;
      case 'category':
        valueA = a.product_details.product_category;
        valueB = b.product_details.product_category;
        break;
      case 'type':
        valueA = a.notification_type;
        valueB = b.notification_type;
        break;
      case 'subject':
        valueA = a.subject;
        valueB = b.subject;
        break;
      case 'date':
        valueA = new Date(a.notification_date).getTime();
        valueB = new Date(b.notification_date).getTime();
        break;
      case 'origin':
        valueA = a.organisations.find((org: any) => org.role === 'Origin')?.name || '';
        valueB = b.organisations.find((org: any) => org.role === 'Origin')?.name || '';
        break;
      case 'notifying':
        valueA = a.organisations.find((org: any) => org.role === 'Notifying')?.name || '';
        valueB = b.organisations.find((org: any) => org.role === 'Notifying')?.name || '';
        break;
      case 'classification':
        valueA = a.classification;
        valueB = b.classification;
        break;
      case 'decision':
        valueA = a.risk_assessment.risk_decision;
        valueB = b.risk_assessment.risk_decision;
        break;
      default:
        return 0;
    }
    
    if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
    if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSelectNotification = (notification: any) => {
    setSelectedNotification(notification);
    setDrawerOpen(true);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getOrganisationByRole = (notification: any, role: string) => {
    return notification.organisations.find((org: any) => org.role === role) || {};
  };

  return (
    <Layout>
      <DocumentTitle title="Compliance Notifications" />
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Compliance Notifications</h1>
          <p className="text-muted-foreground">
            Alerts and notifications from compliance monitoring systems
          </p>
        </div>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle>Recent Notifications</CardTitle>
            <CardDescription>
              Alerts, information notices, and border rejections
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead onClick={() => handleSort('reference')} className="cursor-pointer whitespace-nowrap">
                      Reference <ArrowUpDown className="inline-block h-4 w-4" />
                    </TableHead>
                    <TableHead onClick={() => handleSort('category')} className="cursor-pointer">
                      Category <ArrowUpDown className="inline-block h-4 w-4" />
                    </TableHead>
                    <TableHead onClick={() => handleSort('type')} className="cursor-pointer">
                      Type <ArrowUpDown className="inline-block h-4 w-4" />
                    </TableHead>
                    <TableHead onClick={() => handleSort('subject')} className="cursor-pointer">
                      Subject <ArrowUpDown className="inline-block h-4 w-4" />
                    </TableHead>
                    <TableHead onClick={() => handleSort('date')} className="cursor-pointer">
                      Date <ArrowUpDown className="inline-block h-4 w-4" />
                    </TableHead>
                    <TableHead onClick={() => handleSort('origin')} className="cursor-pointer">
                      Origin <ArrowUpDown className="inline-block h-4 w-4" />
                    </TableHead>
                    <TableHead onClick={() => handleSort('notifying')} className="cursor-pointer">
                      Notifying <ArrowUpDown className="inline-block h-4 w-4" />
                    </TableHead>
                    <TableHead onClick={() => handleSort('classification')} className="cursor-pointer">
                      Classification <ArrowUpDown className="inline-block h-4 w-4" />
                    </TableHead>
                    <TableHead onClick={() => handleSort('decision')} className="cursor-pointer">
                      Decision <ArrowUpDown className="inline-block h-4 w-4" />
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedNotifications.map((notification) => {
                    const origin = getOrganisationByRole(notification, 'Origin');
                    const notifying = getOrganisationByRole(notification, 'Notifying');
                    
                    return (
                      <TableRow 
                        key={notification.id}
                        className="cursor-pointer hover:bg-slate-50"
                        onClick={() => handleSelectNotification(notification)}
                      >
                        <TableCell className="font-medium text-purple-600 underline">
                          {notification.notification_reference}
                        </TableCell>
                        <TableCell className="max-w-[150px] truncate">
                          {notification.product_details.product_category}
                        </TableCell>
                        <TableCell>
                          <Badge variant={getTypeBadgeVariant(notification.notification_type)}>
                            {notification.notification_type}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-[250px] truncate">
                          {notification.subject}
                        </TableCell>
                        <TableCell>
                          {formatDate(notification.notification_date)}
                        </TableCell>
                        <TableCell>
                          <span className="flex items-center">
                            <span className="mr-2">{getFlagEmoji(origin.country)}</span>
                            {origin.name}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="flex items-center">
                            <span className="mr-2">{getFlagEmoji(notifying.country)}</span>
                            {notifying.name}
                          </span>
                        </TableCell>
                        <TableCell>
                          {notification.classification}
                        </TableCell>
                        <TableCell>
                          <Badge variant={getRiskBadgeVariant(notification.risk_assessment.risk_decision)}>
                            {notification.risk_assessment.risk_decision}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4 hidden">
          <div>
            <h1 className="text-3xl font-bold mb-1">UAE Compliance Tracker</h1>
            <p className="text-muted-foreground">
              Monitor trades failing compliance checks en route to UAE.
            </p>
          </div>

          <div className="space-y-4">
            {failedTrades.length > 0 ? (
              failedTrades.map(trade => (
                <Card key={trade.id} className="hover:bg-gray-50">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                        <CardTitle>{trade.tradeNumber}</CardTitle>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="gap-1"
                        onClick={() => navigate(`/trade/${trade.id}`)}
                      >
                        View Details
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardDescription>
                      {trade.supplier}, {trade.supplierCountry} → {trade.buyer}, {trade.buyerCountry}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center text-red-600 text-sm font-medium">
                        <XCircle className="h-4 w-4 mr-1" />
                        {getFailedComplianceCount(trade)} compliance failures detected
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Product: {trade.productType}, Quantity: {trade.quantity}
                        </p>
                        <ul className="mt-2 list-disc list-inside text-sm">
                          {trade.inspections
                            .filter(inspection => 
                              inspection.compliances.some(c => c.status === 'Failed')
                            )
                            .map(inspection => (
                              <li key={inspection.id} className="text-muted-foreground">
                                <span className="font-medium">{inspection.type}:</span>{' '}
                                {inspection.compliances
                                  .filter(c => c.status === 'Failed')
                                  .map(c => c.name)
                                  .join(', ')}
                              </li>
                            ))
                          }
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="pt-6 text-center">
                  <p>No compliance issues detected with current UAE-bound trades.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerContent className="max-h-[90vh] overflow-y-auto">
            <DrawerHeader>
              <DrawerTitle className="text-xl">
                {selectedNotification?.title}
              </DrawerTitle>
              <DrawerDescription className="flex items-center justify-between">
                <span>
                  Reference: <strong>{selectedNotification?.notification_reference}</strong> | 
                  Validation: <strong>{selectedNotification?.validation_status}</strong>
                </span>
                <span>
                  Date: {formatDate(selectedNotification?.notification_date)} | 
                  Last Update: {formatDate(selectedNotification?.last_update)}
                </span>
              </DrawerDescription>
            </DrawerHeader>

            <div className="p-4 pt-0 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Organisations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedNotification?.organisations.map((org: any, idx: number) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <span className="text-lg">{getFlagEmoji(org.country)}</span>
                      <span><strong>{org.name}</strong> – {org.role}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-2">Product Information</h3>
                <div className="space-y-2">
                  <div><strong>Name:</strong> {selectedNotification?.product_details.product_name}</div>
                  <div><strong>Category:</strong> {selectedNotification?.product_details.product_category}</div>
                  <div><strong>Distribution:</strong> {selectedNotification?.product_details.distribution_status}</div>
                </div>
              </div>
              
              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-2">Risk Assessment</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <strong className="mr-2">Risk Decision:</strong> 
                    <Badge variant={getRiskBadgeVariant(selectedNotification?.risk_assessment.risk_decision)}>
                      {selectedNotification?.risk_assessment.risk_decision}
                    </Badge>
                  </div>
                  <div><strong>Hazards Summary:</strong> {selectedNotification?.risk_assessment.hazards_summary || "Not defined"}</div>
                  <div><strong>Persons Affected:</strong> {selectedNotification?.risk_assessment.persons_affected || "---"}</div>
                  <div><strong>Symptoms:</strong> {selectedNotification?.risk_assessment.symptoms || "Unknown"}</div>
                </div>
              </div>
              
              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-2">Hazards Detected</h3>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Sampling Date</TableHead>
                        <TableHead>Hazard Type</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Result</TableHead>
                        <TableHead>Max Limit</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedNotification?.hazards.map((hazard: any, idx: number) => (
                        <TableRow key={idx}>
                          <TableCell>{formatDate(hazard.sampling_date)}</TableCell>
                          <TableCell>{hazard.hazard_type}</TableCell>
                          <TableCell>{hazard.category}</TableCell>
                          <TableCell>{hazard.result}</TableCell>
                          <TableCell>{hazard.max_limit}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-2">Measures Taken</h3>
                <ul className="list-disc list-inside space-y-1">
                  {selectedNotification?.measures_taken.map((measure: any, idx: number) => (
                    <li key={idx}>
                      {getFlagEmoji(measure.country)} {measure.country} → {measure.measure}
                    </li>
                  ))}
                </ul>
              </div>
              
              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-2">Follow-Ups</h3>
                {selectedNotification?.follow_ups.length > 0 ? (
                  <ul className="list-disc list-inside space-y-1">
                    {selectedNotification.follow_ups.map((followUp: any, idx: number) => (
                      <li key={idx}>{followUp.description}</li>
                    ))}
                  </ul>
                ) : (
                  <Alert>
                    <AlertDescription>
                      No follow-ups for this notification.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </div>

            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </Layout>
  );
};

export default Tracker;
