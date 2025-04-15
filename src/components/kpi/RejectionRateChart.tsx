
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RejectionData } from "@/types";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend
} from 'recharts';

interface RejectionRateChartProps {
  data: RejectionData;
}

export const RejectionRateChart = ({ data }: RejectionRateChartProps) => {
  const colors = [
    "#7EBB3F", // avocado-500
    "#D2E4B6", // avocado-200
    "#4C7025", // avocado-700
    "#B8D78E", // avocado-300
    "#659532"  // avocado-600
  ];

  // Transform data for charts
  const regionData = data.byRegion.map(item => ({
    name: item.region,
    value: item.quantity
  }));

  const supplierData = data.bySupplier.map(item => ({
    name: item.supplier,
    value: item.quantity
  }));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Rejection Rates</CardTitle>
        <CardDescription>
          Total rejections: {data.quantity} ({data.percentage.toFixed(1)}%)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="region">
          <TabsList className="mb-4">
            <TabsTrigger value="region">By Region</TabsTrigger>
            <TabsTrigger value="supplier">By Supplier</TabsTrigger>
          </TabsList>
          
          <TabsContent value="region" className="w-full">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2 h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={regionData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" name="Rejections" fill="#7EBB3F">
                      {regionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full md:w-1/2 h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={regionData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#7EBB3F"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {regionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="supplier" className="w-full">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2 h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={supplierData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" name="Rejections" fill="#7EBB3F">
                      {supplierData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full md:w-1/2 h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={supplierData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#7EBB3F"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {supplierData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
