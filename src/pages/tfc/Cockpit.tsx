
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  ResponsiveContainer
} from 'recharts';

// Mock data for demonstration
const mockQualityData = {
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

const mockShipmentData = [
  { location: 'Nairobi', shipments: 45 },
  { location: 'Mombasa', shipments: 32 },
  { location: 'Nakuru', shipments: 28 },
  { location: 'Naivasha', shipments: 20 }
];

const KPICard = ({ title, value, trend }: { title: string; value: number | string; trend?: string }) => (
  <Card className="p-4">
    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    <p className="text-2xl font-bold mt-2">{value}</p>
    {trend && <p className={`text-sm ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
      {trend === 'up' ? '↑' : '↓'} vs last period
    </p>}
  </Card>
);

const Cockpit = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">TFC Avocado Imports Dashboard</h1>
      
      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard 
          title="Average Quality Score" 
          value={`${(mockQualityData.fruitPressure / 30 * 100).toFixed(1)}%`}
          trend="up"
        />
        <KPICard 
          title="Dry Matter Average" 
          value={`${((mockQualityData.dryMatter1 + mockQualityData.dryMatter2) / 2).toFixed(1)}%`}
        />
        <KPICard 
          title="Defect Rate" 
          value={`${((mockQualityData.blackspot + mockQualityData.injury) / 200 * 100).toFixed(1)}%`}
          trend="down"
        />
        <KPICard 
          title="On-Time Delivery Rate" 
          value="92%"
          trend="up"
        />
      </div>

      <Tabs defaultValue="quality" className="w-full">
        <TabsList>
          <TabsTrigger value="quality">Quality Analysis</TabsTrigger>
          <TabsTrigger value="supplier">Supplier Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="quality" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-4">Quality Metrics Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={[
                  { month: 'Jan', quality: 85 },
                  { month: 'Feb', quality: 88 },
                  { month: 'Mar', quality: 92 },
                  { month: 'Apr', quality: 90 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="quality" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </Card>

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
          </div>
        </TabsContent>

        <TabsContent value="supplier" className="space-y-4">
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">Supplier Performance Ranking</h3>
            <div className="space-y-4">
              {/* Add supplier performance content here */}
              <p>Supplier performance metrics and rankings will be displayed here.</p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Cockpit;
