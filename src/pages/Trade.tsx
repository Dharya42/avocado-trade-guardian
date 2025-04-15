
import { Layout } from "@/components/layout/Layout";
import { TradeList } from "@/components/trade/TradeList";
import { DocumentTitle } from "@/components/ui/document-title";
import { mockTrades } from "@/data/mockData";

const Trade = () => {
  return (
    <Layout>
      <DocumentTitle title="Trade Management" />
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">Trade Management</h1>
          <p className="text-muted-foreground">
            View and manage all avocado trade inspections.
          </p>
        </div>

        <TradeList trades={mockTrades} />
      </div>
    </Layout>
  );
};

export default Trade;
