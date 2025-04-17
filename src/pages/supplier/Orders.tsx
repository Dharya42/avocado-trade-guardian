import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from "@/components/layout/Layout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { mockOrders } from '@/data/mockOrders';

const OrderStatusBadge = ({ status }: { status: string }) => {
  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-500 hover:bg-green-600';
      case 'pending':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'rejected':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  return (
    <Badge className={`${getStatusStyle(status)}`}>
      {status}
    </Badge>
  );
};

const Orders = () => {
  const navigate = useNavigate();

  const handleOrderClick = (orderId: string) => {
    navigate(`/supplier/orders/${orderId}`);
  };

  return (
    <Layout>
      <div className="flex flex-col h-full">
        <div className="flex-none">
          <h1 className="text-2xl font-bold mb-2">Order Management</h1>
          <p className="text-muted-foreground mb-6">
            View and manage all purchase orders.
          </p>
          <div className="relative mb-6">
            <Input
              type="search"
              placeholder="Search orders..."
              className="w-full max-w-sm"
            />
          </div>
        </div>

        <Card className="flex-grow">
          <CardHeader className="pb-4">
            <CardTitle>Orders List</CardTitle>
            <CardDescription>Click on an order to view details</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order No.</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>Buyer</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockOrders.map((order) => (
                  <TableRow 
                    key={order.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleOrderClick(order.id)}
                  >
                    <TableCell>{order.customerPoNumber}</TableCell>
                    <TableCell>{order.exporter.name}</TableCell>
                    <TableCell>{order.shipmentDetails.countryOfOrigin}</TableCell>
                    <TableCell>{order.importer.name}</TableCell>
                    <TableCell>{order.shipmentDetails.countryOfDestination}</TableCell>
                    <TableCell>
                      {order.lineItems[0].productName}
                    </TableCell>
                    <TableCell>
                      {`${order.lineItems[0].quantity} ${order.lineItems[0].packagingType}`}
                    </TableCell>
                    <TableCell>
                      <OrderStatusBadge status={order.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Orders; 