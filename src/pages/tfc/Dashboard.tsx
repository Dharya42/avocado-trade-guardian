import React, { useState } from 'react';
import { Layout } from "@/components/layout/Layout";
import { DocumentTitle } from "@/components/ui/document-title";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, TrendingDown, TrendingUp, ArrowRight } from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { cn } from '@/lib/utils';

// Mock data for the dashboard
const mockData = {
  qualityKPIs: {
    acceptanceRate: 87.2,
    rejectionRate: 12.8,
    qualityScore: 8.4,
    trendDirection: 'up',
    trendValue: 2.3,
    defectRates: [
      { name: 'Blackspot', rate: 4.2 },
      { name: 'Physical Injury', rate: 2.8 },
      { name: 'Ripeness Issues', rate: 1.7 },
    ],
    dryMatter: 23.6,
    fruitPressure: 6.8,
  },
  logisticsKPIs: {
    onTimeDelivery: 76.5,
    trendDirection: 'down',
    trendValue: 3.1,
    avgTransitTime: 18.5,
    avgDwellTime: 2.3,
    inspectionTime: 8.2,
    temperatureCompliance: 91.7,
  },
  supplierKPIs: {
    topPerformers: [
      { name: 'Green Farms Ltd', score: 92.4 },
      { name: 'Avocado Kings', score: 89.1 },
      { name: 'Fresh Harvest', score: 87.8 },
    ],
    onTimeRates: [
      { name: 'Green Farms Ltd', rate: 94.2 },
      { name: 'Avocado Kings', rate: 82.5 },
      { name: 'Fresh Harvest', rate: 79.3 },
      { name: 'Kenya Exports', rate: 75.8 },
      { name: 'Valley Growers', rate: 72.1 },
    ],
    claimsRate: [
      { name: 'Green Farms Ltd', rate: 2.1 },
      { name: 'Avocado Kings', rate: 4.5 },
      { name: 'Fresh Harvest', rate: 5.2 },
      { name: 'Kenya Exports', rate: 7.3 },
      { name: 'Valley Growers', rate: 8.6 },
    ],
  },
  qualityTrends: {
    scoresByMonth: [
      { month: 'Jan', score: 7.8 },
      { month: 'Feb', score: 7.9 },
      { month: 'Mar', score: 8.1 },
      { month: 'Apr', score: 8.0 },
      { month: 'May', score: 8.3 },
      { month: 'Jun', score: 8.4 },
    ],
    dryMatterTrend: [
      { month: 'Jan', value: 22.1 },
      { month: 'Feb', value: 22.8 },
      { month: 'Mar', value: 23.2 },
      { month: 'Apr', value: 23.5 },
      { month: 'May', value: 23.4 },
      { month: 'Jun', value: 23.6 },
    ],
    pressureTrend: [
      { month: 'Jan', value: 7.2 },
      { month: 'Feb', value: 7.0 },
      { month: 'Mar', value: 6.9 },
      { month: 'Apr', value: 6.8 },
      { month: 'May', value: 6.7 },
      { month: 'Jun', value: 6.8 },
    ],
    defectsBySupplier: [
      { supplier: 'Green Farms Ltd', blackspot: 3.2, injury: 2.1, ripeness: 1.2 },
      { supplier: 'Avocado Kings', blackspot: 4.5, injury: 2.7, ripeness: 1.5 },
      { supplier: 'Fresh Harvest', blackspot: 4.9, injury: 3.2, ripeness: 2.1 },
      { supplier: 'Kenya Exports', blackspot: 5.2, injury: 3.6, ripeness: 2.4 },
      { supplier: 'Valley Growers', blackspot: 5.8, injury: 3.9, ripeness: 2.9 },
    ],
  },
  logisticsTrends: {
    transitTime: [
      { month: 'Jan', days: 19.2 },
      { month: 'Feb', days: 19.0 },
      { month: 'Mar', days: 18.8 },
      { month: 'Apr', days: 18.7 },
      { month: 'May', days: 18.6 },
      { month: 'Jun', days: 18.5 },
    ],
    temperatureData: [
      { time: '00:00', temp: 5.2 },
      { time: '04:00', temp: 5.4 },
      { time: '08:00', temp: 5.6 },
      { time: '12:00', temp: 5.8 },
      { time: '16:00', temp: 5.7 },
      { time: '20:00', temp: 5.5 },
      { time: '24:00', temp: 5.3 },
    ],
    plannedVsActual: [
      { route: 'Mombasa-Jebel Ali', planned: 18, actual: 19.5 },
      { route: 'Nairobi-Dubai', planned: 20, actual: 22.3 },
      { route: 'Naivasha-Sharjah', planned: 19, actual: 20.1 },
      { route: 'Nakuru-Abu Dhabi', planned: 21, actual: 22.7 },
    ],
  },
  shipments: [
    { id: 'SH1001', origin: 'Nairobi', destination: 'Dubai', status: 'In Transit', progress: 65 },
    { id: 'SH1002', origin: 'Mombasa', destination: 'Abu Dhabi', status: 'Arrived Port', progress: 80 },
    { id: 'SH1003', origin: 'Nakuru', destination: 'Sharjah', status: 'Cleared Customs', progress: 90 },
    { id: 'SH1004', origin: 'Naivasha', destination: 'Dubai', status: 'Loading', progress: 25 },
  ],
};
const mockShipmentData = [
  { location: 'Nairobi', shipments: 45 },
  { location: 'Mombasa', shipments: 32 },
  { location: 'Nakuru', shipments: 28 },
  { location: 'Naivasha', shipments: 20 }
];

const qualitySampleData = {
  countSize: 14,
  netWeight: 3.8,
  fruitPressure: 23,
  dryMatter1: 23,
  dryMatter2: 34,
  blemishScarring: 45,
  ripen: 23,
  rubMarkNoStem: 23,
  injury: 23,
  blackspot: 32
};

const Dashboard = () => {
  const [selectedSupplier, setSelectedSupplier] = useState<string>('All');
  
  // Function to render the trend indicator
  const renderTrend = (direction: 'up' | 'down', value: number) => {
    return (
      <div className={cn(
        "flex items-center text-sm font-medium",
        direction === 'up' ? 'text-green-600' : 'text-red-600'
      )}>
        {direction === 'up' ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
        {value}%
      </div>
    );
  };

  // KPI Card component
  const KPICard = ({ title, value, suffix = '%', trend, description }: { 
    title: string; 
    value: number; 
    suffix?: string;
    trend?: { direction: 'up' | 'down'; value: number } | null;
    description?: string;
  }) => (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline justify-between">
          <div className="text-2xl font-bold">{value}{suffix}</div>
          {trend && renderTrend(trend.direction, trend.value)}
        </div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </CardContent>
    </Card>
  );

  // Timeline component for shipment tracking
  const ShipmentTimeline = ({ shipments }: { shipments: any[] }) => (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Active Shipments</CardTitle>
        <CardDescription>Track current shipments from Kenya to UAE</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {shipments.map((shipment) => (
            <div key={shipment.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">{shipment.id}</div>
                  <div className="text-sm text-muted-foreground">{shipment.origin} → {shipment.destination}</div>
                </div>
                <div className={cn(
                  "px-2 py-1 rounded text-xs font-medium",
                  shipment.status === 'In Transit' && "bg-blue-100 text-blue-700",
                  shipment.status === 'Arrived Port' && "bg-amber-100 text-amber-700",
                  shipment.status === 'Cleared Customs' && "bg-green-100 text-green-700",
                  shipment.status === 'Loading' && "bg-purple-100 text-purple-700"
                )}>
                  {shipment.status}
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ width: `${shipment.progress}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Kenya</span>
                <span>In Transit</span>
                <span>UAE</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      <DocumentTitle title="Avocado Imports - TFC Dashboard" />
      
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Avocado Imports Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor quality, logistics, and supplier performance for Kenyan avocado imports.
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="quality">Quality Analysis</TabsTrigger>
            {/* <TabsTrigger value="logistics">Logistics & Transit</TabsTrigger> */}
            <TabsTrigger value="suppliers">Supplier Performance</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* <KPICard 
                title="Overall Acceptance Rate" 
                value={mockData.qualityKPIs.acceptanceRate} 
                suffix="%"
                trend={{ direction: 'up', value: mockData.qualityKPIs.trendValue }}
              /> */}
              <KPICard 
                title="Average Quality Score" 
                value={mockData.qualityKPIs.qualityScore} 
                suffix="/10"
                trend={{ direction: 'up', value: 0.5 }}
                description="Target: 8.5/10"
              />
              <KPICard 
                title="Defect Rate" 
                value={5} 
                suffix="%"
                trend={{ direction: 'down', value: mockData.logisticsKPIs.trendValue }}
              />
            </div>

            {/* Top Defects Bar Chart */}
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-2">Top Defects (Sample Data)</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={[
                  { name: 'Blackspot', value: qualitySampleData.blackspot },
                  { name: 'Blemish/Scarring', value: qualitySampleData.blemishScarring },
                  { name: 'Injury', value: qualitySampleData.injury },
                  { name: 'Ripen', value: qualitySampleData.ripen },
                  { name: 'Rub mark/No stem', value: qualitySampleData.rubMarkNoStem }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#ffb347" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Shipment Tracking */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* <ShipmentTimeline shipments={mockData.shipments} /> */}
                <Card className="p-4">
                              <h3 className="text-lg font-semibold mb-4">Shipments by Location</h3>
                              <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={mockShipmentData}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="location" />
                                  <YAxis />
                                  <Tooltip />
                                  <Legend />
                                  <Bar dataKey="shipments" fill="#82ca9d" />
                                </BarChart>
                              </ResponsiveContainer>
                            </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Top Suppliers</CardTitle>
                  <CardDescription>Based on quality score</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockData.supplierKPIs.topPerformers.map((supplier, idx) => (
                      <div key={supplier.name} className="flex items-center">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center font-medium text-white mr-3",
                          idx === 0 ? "bg-yellow-500" : 
                          idx === 1 ? "bg-gray-400" : 
                          "bg-amber-700"
                        )}>
                          {idx + 1}
                        </div>
                        <div>
                          <div className="font-medium">{supplier.name}</div>
                          <div className="text-sm text-muted-foreground">Score: {supplier.score}/100</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Additional KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <KPICard 
                title="Avg. Dry Matter %" 
                value={mockData.qualityKPIs.dryMatter} 
                suffix="%"
                description="Target range: 23-25%"
              />
              <KPICard 
                title="Avg. Fruit Pressure" 
                value={mockData.qualityKPIs.fruitPressure} 
                suffix=" kg"
                description="Target range: 6.5-7.5 kg"
              />
              {/* <KPICard 
                title="Temperature Compliance" 
                value={mockData.logisticsKPIs.temperatureCompliance} 
                suffix="%"
                description="Target: >95%"
              /> */}
            </div>
          </TabsContent>

          {/* Quality Analysis Tab */}
          <TabsContent value="quality" className="space-y-4">
            
            <Card>
              <CardHeader>
                <CardTitle>Quality Score Trends</CardTitle>
                <CardDescription>Monthly average quality scores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockData.qualityTrends.scoresByMonth}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[7, 9]} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="score" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Dry Matter % Trends</CardTitle>
                  <CardDescription>Monthly averages</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={mockData.qualityTrends.dryMatterTrend}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[20, 25]} />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#82ca9d" activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Fruit Pressure Trends</CardTitle>
                  <CardDescription>Monthly averages (kg)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={mockData.qualityTrends.pressureTrend}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[6, 8]} />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#ffc658" activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Defect Types by Supplier</CardTitle>
                <CardDescription>Top 3 defect categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={mockData.qualityTrends.defectsBySupplier} 
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="supplier" type="category" width={120} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="blackspot" name="Blackspot" fill="#8884d8" />
                      <Bar dataKey="injury" name="Physical Injury" fill="#82ca9d" />
                      <Bar dataKey="ripeness" name="Ripeness Issues" fill="#ffc658" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            {/* Data Source Card */}
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>Data Source</CardTitle>
                <CardDescription>This analysis is derived from the following sample data:</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-1 text-sm text-muted-foreground">
                  <li>Count / Size: <span className="font-semibold text-black">{qualitySampleData.countSize}</span></li>
                  <li>Net Weight (Kgs.): <span className="font-semibold text-black">{qualitySampleData.netWeight}</span></li>
                  <li>Fruit Pressure (Kg): <span className="font-semibold text-black">{qualitySampleData.fruitPressure}</span></li>
                  <li>Dry Matter 1: <span className="font-semibold text-black">{qualitySampleData.dryMatter1}</span></li>
                  <li>Dry Matter 2: <span className="font-semibold text-black">{qualitySampleData.dryMatter2}</span></li>
                  <li>Blemish / Scarring: <span className="font-semibold text-black">{qualitySampleData.blemishScarring}</span></li>
                  <li>Ripen: <span className="font-semibold text-black">{qualitySampleData.ripen}</span></li>
                  <li>Rub mark/No stem: <span className="font-semibold text-black">{qualitySampleData.rubMarkNoStem}</span></li>
                  <li>Injury: <span className="font-semibold text-black">{qualitySampleData.injury}</span></li>
                  <li>Blackspot: <span className="font-semibold text-black">{qualitySampleData.blackspot}</span></li>
                </ul>
              </CardContent>
            </Card>

          </TabsContent>

          {/* Logistics & Transit Tab */}
          {/* <TabsContent value="logistics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Transit Time Trends</CardTitle>
                <CardDescription>Average days from Kenya to UAE</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockData.logisticsTrends.transitTime}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[18, 20]} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="days" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Planned vs. Actual Transit Times</CardTitle>
                  <CardDescription>By route (days)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={mockData.logisticsTrends.plannedVsActual}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="route" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="planned" name="Planned Days" fill="#8884d8" />
                        <Bar dataKey="actual" name="Actual Days" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Temperature Profile</CardTitle>
                  <CardDescription>24-hour container temperature (°C)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={mockData.logisticsTrends.temperatureData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis domain={[4, 7]} />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="temp" 
                          stroke="#ff7300" 
                          activeDot={{ r: 8 }} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <KPICard 
                title="Avg. Transit Time" 
                value={mockData.logisticsKPIs.avgTransitTime} 
                suffix=" days"
                description="Port to port"
              />
              <KPICard 
                title="Avg. Dwell Time" 
                value={mockData.logisticsKPIs.avgDwellTime} 
                suffix=" days"
                description="Port to warehouse"
              />
              <KPICard 
                title="Avg. Inspection Turnaround" 
                value={mockData.logisticsKPIs.inspectionTime} 
                suffix=" hours"
                description="Quality control process"
              />
            </div>
          </TabsContent> */}

          {/* Supplier Performance Tab */}
          <TabsContent value="suppliers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Supplier On-Time Delivery Rate</CardTitle>
                <CardDescription>Percentage of on-time deliveries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={mockData.supplierKPIs.onTimeRates}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="rate" name="On-Time Rate (%)" fill="#8884d8">
                        {mockData.supplierKPIs.onTimeRates.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.rate > 85 ? '#4CAF50' : entry.rate > 75 ? '#FFC107' : '#F44336'} 
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Supplier Claims Rate</CardTitle>
                <CardDescription>Percentage of shipments with claims/rejections</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={mockData.supplierKPIs.claimsRate}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="rate" name="Claims Rate (%)" fill="#F44336">
                        {mockData.supplierKPIs.claimsRate.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.rate < 3 ? '#4CAF50' : entry.rate < 6 ? '#FFC107' : '#F44336'} 
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Dashboard;
