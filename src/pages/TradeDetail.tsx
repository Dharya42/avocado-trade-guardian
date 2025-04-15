
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from "@/components/layout/Layout";
import { InspectionTimeline } from "@/components/trade/InspectionTimeline";
import { InspectionDetail } from "@/components/trade/InspectionDetail";
import { DocumentTitle } from "@/components/ui/document-title";
import { mockTrades } from "@/data/mockData";
import { Inspection, Trade } from '@/types';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Download,
  FileText
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const TradeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const trade = mockTrades.find(t => t.id === id);
  
  const [selectedInspection, setSelectedInspection] = useState<Inspection | null>(
    trade?.inspections.length ? trade.inspections[0] : null
  );

  const handleDownloadReport = () => {
    console.log('Downloading trade report for:', trade?.tradeNumber);
    // Mock download functionality
    alert(`Downloading trade report for ${trade?.tradeNumber}`);
  };

  if (!trade) {
    return (
      <Layout>
        <DocumentTitle title="Trade Not Found" />
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold mb-4">Trade not found</h2>
          <Button onClick={() => navigate('/')}>Back to Trade List</Button>
        </div>
      </Layout>
    );
  }

  const getStatusIcon = (status: Trade['status']) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'Rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'In Transit':
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <DocumentTitle title={`Trade ${trade.tradeNumber}`} />
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <Button 
            variant="outline" 
            size="sm" 
            className="mb-4"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Trade List
          </Button>
          
          <Button 
            onClick={handleDownloadReport}
            className="bg-green-600 hover:bg-green-700"
          >
            <Download className="h-5 w-5 mr-2" /> Download Report
          </Button>
        </div>

        <Card className="shadow-md">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 mb-1">
              <h1 className="text-3xl font-bold">{trade.tradeNumber}</h1>
              <div className="flex items-center bg-muted px-2 py-1 rounded-md">
                {getStatusIcon(trade.status)}
                <span className="ml-1 text-sm">{trade.status}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Supplier</p>
                <p className="font-medium">{trade.supplier}</p>
                <p className="text-sm text-muted-foreground">{trade.supplierCountry}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Buyer</p>
                <p className="font-medium">{trade.buyer}</p>
                <p className="text-sm text-muted-foreground">{trade.buyerCountry}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Product Details</p>
                <p className="font-medium">{trade.productType}</p>
                <p className="text-sm text-muted-foreground">{trade.quantity}</p>
              </div>
            </div>
          </CardContent>
        </Card>
          
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
          <div className="md:sticky md:top-4 self-start">
            {trade.inspections.length > 0 ? (
              <InspectionTimeline
                inspections={trade.inspections}
                onSelectInspection={setSelectedInspection}
                reverse={true}
              />
            ) : (
              <div className="p-4 border rounded-lg bg-white text-center">
                <p className="text-muted-foreground">No inspections recorded yet</p>
              </div>
            )}
          </div>
          
          <div>
            {selectedInspection ? (
              <InspectionDetail inspection={selectedInspection} />
            ) : (
              <div className="p-4 border rounded-lg bg-white text-center">
                <p className="text-muted-foreground">Select an inspection to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TradeDetail;
