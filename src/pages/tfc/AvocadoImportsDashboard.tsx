import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// Import chart components or use placeholders
// import { ComplianceBreachChart } from "@/components/kpi/ComplianceBreachChart";
// import { RejectionRateChart } from "@/components/kpi/RejectionRateChart";

const AvocadoImportsDashboard: React.FC = () => {
  const [tab, setTab] = useState("overview");

  return (
    <Layout>
      <div className="container mx-auto py-6 space-y-6">
        <h1 className="text-3xl font-bold mb-2">Avocado Imports – TFC Dashboard</h1>
        <p className="text-muted-foreground mb-6">
          High-level operational overview for TFC’s avocado import operations (Kenya → UAE).
        </p>
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="quality">Quality Analysis</TabsTrigger>
            <TabsTrigger value="logistics">Logistics & Transit</TabsTrigger>
            <TabsTrigger value="supplier">Supplier Performance</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* KPI Scorecards */}
              <Card>
                <CardHeader><CardTitle>Acceptance Rate</CardTitle></CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">97%</div>
                  <div className="text-muted-foreground">+2% vs last month</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Avg. Quality Score</CardTitle></CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8.6</div>
                  <div className="text-muted-foreground">Stable</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>On-Time Delivery</CardTitle></CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">94%</div>
                  <div className="text-muted-foreground">-1% vs last month</div>
                </CardContent>
              </Card>
            </div>
            {/* Placeholder for Shipment Route Map and Timeline/Gantt View */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader><CardTitle>Shipment Route Map</CardTitle></CardHeader>
                <CardContent>
                  <div className="h-48 flex items-center justify-center text-muted-foreground">[Map Placeholder]</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Shipment Timeline</CardTitle></CardHeader>
                <CardContent>
                  <div className="h-48 flex items-center justify-center text-muted-foreground">[Timeline/Gantt Placeholder]</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="quality">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader><CardTitle>Quality Trends</CardTitle></CardHeader>
                <CardContent>
                  <div className="h-48 flex items-center justify-center text-muted-foreground">[Line Chart Placeholder]</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Defect Rates</CardTitle></CardHeader>
                <CardContent>
                  <div className="h-48 flex items-center justify-center text-muted-foreground">[Bar Chart Placeholder]</div>
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Card>
                <CardHeader><CardTitle>Dry Matter & Pressure</CardTitle></CardHeader>
                <CardContent>
                  <div className="h-48 flex items-center justify-center text-muted-foreground">[Box Plot/Histogram Placeholder]</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Defect Composition</CardTitle></CardHeader>
                <CardContent>
                  <div className="h-48 flex items-center justify-center text-muted-foreground">[Stacked Bar Chart Placeholder]</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="logistics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader><CardTitle>Transit & Dwell Time</CardTitle></CardHeader>
                <CardContent>
                  <div className="h-48 flex items-center justify-center text-muted-foreground">[Line Chart Placeholder]</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Planned vs Actual Transit</CardTitle></CardHeader>
                <CardContent>
                  <div className="h-48 flex items-center justify-center text-muted-foreground">[Bar Chart Placeholder]</div>
                </CardContent>
              </Card>
            </div>
            <div className="mt-4">
              <Card>
                <CardHeader><CardTitle>Temperature Logs</CardTitle></CardHeader>
                <CardContent>
                  <div className="h-48 flex items-center justify-center text-muted-foreground">[Temperature Log Chart Placeholder]</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="supplier">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader><CardTitle>Supplier Performance</CardTitle></CardHeader>
                <CardContent>
                  <div className="h-48 flex items-center justify-center text-muted-foreground">[Ranked Bar Chart Placeholder]</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Supplier Trends</CardTitle></CardHeader>
                <CardContent>
                  <div className="h-48 flex items-center justify-center text-muted-foreground">[Trend Line Chart Placeholder]</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AvocadoImportsDashboard;
