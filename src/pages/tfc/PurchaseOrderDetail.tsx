import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from "@/components/layout/Layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Download, FileText, Send } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data for a single PO
const mockPODetail = {
  id: "PO-2024-001",
  status: "Pending",
  poNumber: "TFC-PO-2024-001",
  poDate: "2024-03-20",
  buyer: {
    name: "TFC Holland B.V.",
    address: "Piet Stuurmanweg 7",
    addressLine2: null,
    city: "NL-2742 JX Waddinxveen",
    country: "Europe, Asia, and the Middle East",
    contactPerson: null,
    phone: null,
    email: "info@tfc-holland.nl",
    trnNumber: null
},
  supplier: {
    name: "Green Highlands Avocado Farm",
    address: "123 Farming Zone, Agricultural District",
    city: "Nairobi",
    country: "Kenya",
    contactPerson: "John Kamau",
    phone: "+254 20 1234567",
    email: "exports@ghaf.co.ke",
    registrationNumber: "KE2024/AGR/123"
  },
  lineItems: [
    {
      id: 1,
      sku: "AVO-HASS-4KG",
      description: "Fresh Hass Avocados, Class I",
      variety: "Hass",
      grade: "Premium Grade A",
      size: "Count 16",
      quantity: {
        cartons: 3000,
        netWeight: "12000 KG"
      },
      unitPrice: 12.50,
      totalPrice: 37500.00,
      currency: "USD"
    }
  ],
  qualitySpecs: {
    dryMatter: "23% minimum",
    firmness: "85-95 Shore units",
    defectTolerance: "Max 5% visual defects",
    ripenessStage: "Pre-climacteric stage"
  },
  shipping: {
    eta: "2024-04-15",
    method: "Sea Freight",
    incoterms: "FOB Mombasa",
    portOfLoading: "Mombasa, Kenya",
    portOfDestination: "Jebel Ali, UAE",
    carrier: "MSC",
    specialInstructions: "Maintain reefer temperature at 5°C"
  },
  packaging: {
    cartonType: "4KG telescopic cardboard boxes",
    palletization: "80 cartons per pallet, 20 pallets total",
    markings: [
      "PO Number: TFC-PO-2024-001",
      "Lot ID: Required",
      "Product of Kenya",
      "Keep Refrigerated 5°C"
    ]
  },
  requiredDocs: [
    "Commercial Invoice",
    "Packing List",
    "Bill of Lading",
    "Phytosanitary Certificate",
    "Certificate of Origin",
    "GlobalG.A.P. Certificate"
  ],
  payment: {
    method: "Letter of Credit",
    schedule: "30% advance, 70% against documents",
    bankDetails: "Available upon LC issuance"
  },
  charges: {
    subtotal: 37500.00,
    freight: 2500.00,
    insurance: 500.00,
    totalValue: 40500.00,
    currency: "USD"
  }
};

const PurchaseOrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  
  // In a real app, we would fetch the PO details using the orderId
  const po = mockPODetail;

  return (
    <Layout>
      <div className="container mx-auto py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/tfc/purchase-orders')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Purchase Order</h1>
              <p className="text-muted-foreground">
                {po.poNumber}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
            <Button>
              <Send className="mr-2 h-4 w-4" />
              Send to Supplier
            </Button>
          </div>
        </div>

        {/* Company Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Buyer Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="font-semibold">{po.buyer.name}</p>
              <div className="text-sm space-y-1">
                <p>{po.buyer.address}</p>
                <p>{po.buyer.addressLine2}</p>
                <p>{po.buyer.city}, {po.buyer.country}</p>
                <p>Contact: {po.buyer.contactPerson}</p>
                <p>Phone: {po.buyer.phone}</p>
                <p>Email: {po.buyer.email}</p>
                <p className="font-medium">TRN: {po.buyer.trnNumber}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Supplier Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="font-semibold">{po.supplier.name}</p>
              <div className="text-sm space-y-1">
                <p>{po.supplier.address}</p>
                <p>{po.supplier.city}, {po.supplier.country}</p>
                <p>Contact: {po.supplier.contactPerson}</p>
                <p>Phone: {po.supplier.phone}</p>
                <p>Email: {po.supplier.email}</p>
                <p className="font-medium">Reg No: {po.supplier.registrationNumber}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Line Items */}
        <Card>
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SKU</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Grade/Size</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead className="text-right">Unit Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {po.lineItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.sku}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{item.description}</p>
                        <p className="text-sm text-muted-foreground">Variety: {item.variety}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p>{item.grade}</p>
                        <p className="text-sm text-muted-foreground">{item.size}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p>{item.quantity.cartons} cartons</p>
                        <p className="text-sm text-muted-foreground">{item.quantity.netWeight}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      ${item.unitPrice.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      ${item.totalPrice.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Quality Specifications */}
        <Card>
          <CardHeader>
            <CardTitle>Quality Specifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm font-medium">Dry Matter</p>
                <p className="text-sm">{po.qualitySpecs.dryMatter}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Firmness</p>
                <p className="text-sm">{po.qualitySpecs.firmness}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Defect Tolerance</p>
                <p className="text-sm">{po.qualitySpecs.defectTolerance}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Ripeness Stage</p>
                <p className="text-sm">{po.qualitySpecs.ripenessStage}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shipping & Delivery */}
        <Card>
          <CardHeader>
            <CardTitle>Shipping & Delivery Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm font-medium">Delivery Window</p>
                <p className="text-sm">ETA: {po.shipping.eta}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Shipping Method</p>
                <p className="text-sm">{po.shipping.method}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Incoterms</p>
                <p className="text-sm">{po.shipping.incoterms}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Port of Loading</p>
                <p className="text-sm">{po.shipping.portOfLoading}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Port of Destination</p>
                <p className="text-sm">{po.shipping.portOfDestination}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Preferred Carrier</p>
                <p className="text-sm">{po.shipping.carrier}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium">Special Instructions</p>
              <p className="text-sm">{po.shipping.specialInstructions}</p>
            </div>
          </CardContent>
        </Card>

        {/* Packaging & Documentation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Packaging & Labeling</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium">Carton Specifications</p>
                <p className="text-sm">{po.packaging.cartonType}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Palletization</p>
                <p className="text-sm">{po.packaging.palletization}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Required Markings</p>
                <ul className="text-sm list-disc list-inside">
                  {po.packaging.markings.map((marking, index) => (
                    <li key={index}>{marking}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Required Documentation</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {po.requiredDocs.map((doc, index) => (
                  <li key={index} className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{doc}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Payment & Total */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium">Payment Method</p>
                <p className="text-sm">{po.payment.method}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Payment Schedule</p>
                <p className="text-sm">{po.payment.schedule}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Bank Details</p>
                <p className="text-sm">{po.payment.bankDetails}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Subtotal:</span>
                  <span className="text-sm">${po.charges.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Freight:</span>
                  <span className="text-sm">${po.charges.freight.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Insurance:</span>
                  <span className="text-sm">${po.charges.insurance.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total Value ({po.charges.currency}):</span>
                  <span>${po.charges.totalValue.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Terms & Authorization */}
        <Card>
          <CardHeader>
            <CardTitle>Terms & Authorization</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium">Terms & Conditions</p>
              <p className="text-sm">This Purchase Order is subject to TFC's standard terms and conditions.</p>
              <Button variant="link" className="text-sm p-0 h-auto">
                View Standard Terms
              </Button>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Authorized by TFC:</p>
                <div className="h-20 border-b border-dashed mt-2"></div>
                <p className="text-sm text-muted-foreground mt-1">Name & Title</p>
              </div>
              <div>
                <p className="text-sm font-medium">Company Stamp:</p>
                <div className="h-20 border border-dashed rounded-md mt-2"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PurchaseOrderDetail; 