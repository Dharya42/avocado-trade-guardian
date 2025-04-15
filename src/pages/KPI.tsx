
import { Layout } from "@/components/layout/Layout";
import { RejectionRateChart } from "@/components/kpi/RejectionRateChart";
import { ComplianceBreachChart } from "@/components/kpi/ComplianceBreachChart";
import { DocumentTitle } from "@/components/ui/document-title";
import { mockKPIData } from "@/data/mockData";

const KPI = () => {
  return (
    <Layout>
      <DocumentTitle title="Key Performance Indicators" />
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Key Performance Indicators</h1>
          <p className="text-muted-foreground">
            Analytics dashboard for avocado trade quality and compliance metrics.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RejectionRateChart data={mockKPIData.rejectionRates} />
          <ComplianceBreachChart data={mockKPIData.complianceBreaches} />
        </div>

        <div className="border rounded-lg p-6 bg-white">
          <h2 className="text-xl font-semibold mb-4">KPI Summary</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Rejection Analysis</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Total rejection rate across all trades: {mockKPIData.rejectionRates.percentage.toFixed(1)}%</li>
                <li>Highest rejection rate by region: {
                  mockKPIData.rejectionRates.byRegion
                    .sort((a, b) => b.percentage - a.percentage)[0]?.region || 'N/A'
                } ({
                  mockKPIData.rejectionRates.byRegion
                    .sort((a, b) => b.percentage - a.percentage)[0]?.percentage.toFixed(1) || 0
                }%)</li>
                <li>Highest rejection rate by supplier: {
                  mockKPIData.rejectionRates.bySupplier
                    .sort((a, b) => b.percentage - a.percentage)[0]?.supplier || 'N/A'
                } ({
                  mockKPIData.rejectionRates.bySupplier
                    .sort((a, b) => b.percentage - a.percentage)[0]?.percentage.toFixed(1) || 0
                }%)</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Compliance Analysis</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Total compliance breach rate: {mockKPIData.complianceBreaches.percentage.toFixed(1)}%</li>
                <li>Highest breach rate by region: {
                  mockKPIData.complianceBreaches.byRegion
                    .sort((a, b) => b.percentage - a.percentage)[0]?.region || 'N/A'
                } ({
                  mockKPIData.complianceBreaches.byRegion
                    .sort((a, b) => b.percentage - a.percentage)[0]?.percentage.toFixed(1) || 0
                }%)</li>
                <li>Highest breach rate by supplier: {
                  mockKPIData.complianceBreaches.bySupplier
                    .sort((a, b) => b.percentage - a.percentage)[0]?.supplier || 'N/A'
                } ({
                  mockKPIData.complianceBreaches.bySupplier
                    .sort((a, b) => b.percentage - a.percentage)[0]?.percentage.toFixed(1) || 0
                }%)</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Recommendations</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Implement additional quality control measures for shipments from Chile</li>
              <li>Schedule supplier audit with Green Valley Farms to address recurring issues</li>
              <li>Review temperature monitoring protocols during transit for Peruvian shipments</li>
              <li>Conduct refresher training for inspectors at Miami port of entry</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default KPI;
