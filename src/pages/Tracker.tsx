
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from "@/components/layout/Layout";
import { DocumentTitle } from "@/components/ui/document-title";
import { mockTrades } from "@/data/mockData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  AlertCircle, 
  XCircle,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Trade } from '@/types';

const Tracker = () => {
  const navigate = useNavigate();

  // Filter trades with failed inspections or compliance issues
  // and coming to UAE
  const failedTrades = mockTrades.filter(trade => 
    trade.buyerCountry === "United Arab Emirates" && 
    (trade.status === 'Rejected' || 
     trade.inspections.some(inspection => 
      inspection.status === 'Failed' || 
      inspection.compliances.some(compliance => compliance.status === 'Failed')
    ))
  );

  const getFailedComplianceCount = (trade: Trade) => {
    let count = 0;
    trade.inspections.forEach(inspection => {
      inspection.compliances.forEach(compliance => {
        if (compliance.status === 'Failed') count++;
      });
    });
    return count;
  };

  return (
    <Layout>
      <DocumentTitle title="Compliance Tracker" />
      <div className="space-y-6">
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
    </Layout>
  );
};

export default Tracker;
