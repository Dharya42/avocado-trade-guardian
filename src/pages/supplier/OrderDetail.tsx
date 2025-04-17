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
import { ChevronLeft } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockOrders } from '@/data/mockOrders';
import { PurchaseOrder } from '@/types';

const OrderStatusBadge = ({ status }: { status: string }) => {
  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'rejected':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Badge className={`${getStatusStyle(status)}`}>
      {status}
    </Badge>
  );
};

const OrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const order = mockOrders.find(o => o.id === orderId);

  if (!order) {
    return (
      <Layout>
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold mb-4">Order not found</h2>
          <Button onClick={() => navigate('/supplier/orders')}>Back to Orders</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-6 space-y-6">
        {/* Navigation and Title */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/supplier/orders')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Commercial Invoice</h1>
              <p className="text-muted-foreground">
                {order.customerPoNumber}
              </p>
            </div>
          </div>
          <Button variant="outline">
            Download Invoice
          </Button>
        </div>

        {/* Header Information */}
        <Card>
          <CardHeader>
            <CardTitle>Document Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold">Invoice Number</p>
              <p className="text-sm">{order.invoiceNumber}</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Invoice Date</p>
              <p className="text-sm">{order.invoiceDate}</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Customer PO Number</p>
              <p className="text-sm">{order.customerPoNumber}</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Status</p>
              <OrderStatusBadge status={order.status} />
            </div>
          </CardContent>
        </Card>

        {/* Company Details */}
        <div className="grid grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Exporter / Seller</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="font-semibold">{order.exporter.name}</p>
              <div className="text-sm space-y-1">
                <p>{order.exporter.addressLine1}</p>
                {order.exporter.addressLine2 && <p>{order.exporter.addressLine2}</p>}
                <p>{order.exporter.city}, {order.exporter.country}</p>
                {order.exporter.postalCode && <p>Postal Code: {order.exporter.postalCode}</p>}
                <p>Phone: {order.exporter.phone}</p>
                <p>Email: {order.exporter.email}</p>
                <div className="pt-2">
                  {order.exporter.registrationNumbers.map((reg, index) => (
                    <p key={index} className="font-medium">{reg.type}: {reg.value}</p>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Importer / Buyer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="font-semibold">{order.importer.name}</p>
              <div className="text-sm space-y-1">
                <p>{order.importer.addressLine1}</p>
                {order.importer.addressLine2 && <p>{order.importer.addressLine2}</p>}
                <p>{order.importer.city}, {order.importer.country}</p>
                {order.importer.postalCode && <p>Postal Code: {order.importer.postalCode}</p>}
                <p>Phone: {order.importer.phone}</p>
                <p>Email: {order.importer.email}</p>
                <div className="pt-2">
                  {order.importer.registrationNumbers.map((reg, index) => (
                    <p key={index} className="font-medium">{reg.type}: {reg.value}</p>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Consignee</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {order.consignee ? (
                <>
                  <p className="font-semibold">{order.consignee.name}</p>
                  <div className="text-sm space-y-1">
                    <p>{order.consignee.addressLine1}</p>
                    {order.consignee.addressLine2 && <p>{order.consignee.addressLine2}</p>}
                    <p>{order.consignee.city}, {order.consignee.country}</p>
                    {order.consignee.postalCode && <p>Postal Code: {order.consignee.postalCode}</p>}
                    <p>Phone: {order.consignee.phone}</p>
                    <p>Email: {order.consignee.email}</p>
                  </div>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">Same as Importer</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Shipment and Transaction Details */}
        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Shipment Details</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold">Mode of Transport</p>
                <p className="text-sm">{order.shipmentDetails.modeOfTransport}</p>
              </div>
              {order.shipmentDetails.vesselOrFlightNumber && (
                <div>
                  <p className="text-sm font-semibold">Vessel/Flight Number</p>
                  <p className="text-sm">{order.shipmentDetails.vesselOrFlightNumber}</p>
                </div>
              )}
              {order.shipmentDetails.blOrAwbNumber && (
                <div>
                  <p className="text-sm font-semibold">BL/AWB Number</p>
                  <p className="text-sm">{order.shipmentDetails.blOrAwbNumber}</p>
                </div>
              )}
              <div>
                <p className="text-sm font-semibold">Port of Loading</p>
                <p className="text-sm">{order.shipmentDetails.portOfLoading}</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Port of Discharge</p>
                <p className="text-sm">{order.shipmentDetails.portOfDischarge}</p>
              </div>
              {order.shipmentDetails.finalDestination && (
                <div>
                  <p className="text-sm font-semibold">Final Destination</p>
                  <p className="text-sm">{order.shipmentDetails.finalDestination}</p>
                </div>
              )}
              <div>
                <p className="text-sm font-semibold">Country of Origin</p>
                <p className="text-sm">{order.shipmentDetails.countryOfOrigin}</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Country of Destination</p>
                <p className="text-sm">{order.shipmentDetails.countryOfDestination}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Transaction Details</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold">Incoterms</p>
                <p className="text-sm">{order.transactionDetails.incoterms}</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Payment Terms</p>
                <p className="text-sm">{order.transactionDetails.termsOfPayment}</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Currency</p>
                <p className="text-sm">{order.transactionDetails.currency}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Line Items */}
        <Card>
          <CardHeader>
            <CardTitle>Goods Description</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Packaging</TableHead>
                  <TableHead>HS Code</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Unit Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.lineItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.productName}</TableCell>
                    <TableCell>{item.grade}</TableCell>
                    <TableCell>{item.sizeSpec}</TableCell>
                    <TableCell>{item.packagingType}</TableCell>
                    <TableCell>{item.hsCode}</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">${item.unitPrice.toFixed(2)}</TableCell>
                    <TableCell className="text-right">${item.totalAmount.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Charges */}
        <Card>
          <CardHeader>
            <CardTitle>Charges Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-w-sm ml-auto">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${order.charges.subtotal.toFixed(2)}</span>
              </div>
              {order.charges.freightCharges && (
                <div className="flex justify-between">
                  <span>Freight Charges:</span>
                  <span>${order.charges.freightCharges.toFixed(2)}</span>
                </div>
              )}
              {order.charges.insuranceCharges && (
                <div className="flex justify-between">
                  <span>Insurance Charges:</span>
                  <span>${order.charges.insuranceCharges.toFixed(2)}</span>
                </div>
              )}
              {order.charges.packingCharges && (
                <div className="flex justify-between">
                  <span>Packing Charges:</span>
                  <span>${order.charges.packingCharges.toFixed(2)}</span>
                </div>
              )}
              {order.charges.otherCharges && (
                <div className="flex justify-between">
                  <span>Other Charges:</span>
                  <span>${order.charges.otherCharges.toFixed(2)}</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total Amount:</span>
                <span>${order.charges.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Marks</CardTitle>
            </CardHeader>
            <CardContent>
              <p><span className="font-semibold">Description:</span> {order.shippingMarks.description}</p>
              <p><span className="font-semibold">Lot ID:</span> {order.shippingMarks.lotId}</p>
              <p><span className="font-semibold">Carton Range:</span> {order.shippingMarks.cartonRange}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Declarations & Certifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><span className="font-semibold">Origin Declaration:</span> Product of Kenya</p>
              {order.declarations.map((declaration, index) => (
                <p key={index}>
                  <span className="font-semibold">{declaration.type}:</span> {declaration.reference}
                </p>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Bank Details */}
        <Card>
          <CardHeader>
            <CardTitle>Bank Details</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div>
              <p><span className="font-semibold">Bank Name:</span> {order.bankDetails.bankName}</p>
              <p><span className="font-semibold">Account Name:</span> {order.bankDetails.accountName}</p>
              <p><span className="font-semibold">Account Number:</span> {order.bankDetails.accountNumber}</p>
              <p><span className="font-semibold">SWIFT Code:</span> {order.bankDetails.swiftCode}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold mb-2">Authorized Signature</p>
              <div className="h-20 border-b border-dashed"></div>
              <p className="mt-2 text-sm text-muted-foreground">Digital signature pending</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default OrderDetail; 