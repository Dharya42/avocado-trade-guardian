
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Search 
} from 'lucide-react';
import { Trade } from '@/types';

interface TradeListProps {
  trades: Trade[];
}

export const TradeList = ({ trades }: TradeListProps) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredTrades = trades.filter(trade => 
    trade.tradeNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trade.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trade.buyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trade.productType.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search trades..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 w-full md:w-96"
        />
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Trade No.</TableHead>
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
            {filteredTrades.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  No trades found
                </TableCell>
              </TableRow>
            ) : (
              filteredTrades.map((trade) => (
                <TableRow 
                  key={trade.id} 
                  className="cursor-pointer hover:bg-muted transition-colors"
                  onClick={() => navigate(`/trade/${trade.id}`)}
                >
                  <TableCell className="font-medium">{trade.tradeNumber}</TableCell>
                  <TableCell>{trade.supplier}</TableCell>
                  <TableCell>{trade.supplierCountry}</TableCell>
                  <TableCell>{trade.buyer}</TableCell>
                  <TableCell>{trade.buyerCountry}</TableCell>
                  <TableCell>{trade.productType}</TableCell>
                  <TableCell>{trade.quantity}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(trade.status)}
                      <span>{trade.status}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
