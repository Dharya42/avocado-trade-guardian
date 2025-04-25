
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer 
} from 'recharts'

// Mock data - replace with real data from your API
const qualityData = [
  {
    name: 'Shipment 1',
    dryMatter: 23,
    dryMatter2: 34,
    fruitPressure: 23,
    qualityScore: 85
  },
  // ... more shipment data
]

const defectData = [
  {
    name: 'Blackspot',
    value: 32,
  },
  {
    name: 'Injury',
    value: 23,
  },
  {
    name: 'Rub mark/No stem',
    value: 23,
  },
  {
    name: 'Ripen',
    value: 23,
  },
  {
    name: 'Blemish / Scarring',
    value: 45,
  },
]

const locationData = [
  { name: 'Nairobi', shipments: 45 },
  { name: 'Mombasa', shipments: 35 },
  { name: 'Nakuru', shipments: 20 },
  { name: 'Naivasha', shipments: 15 },
]

export default function Cockpit() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Avocado Imports Cockpit</h1>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Average Quality Score</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            85%
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Avg. Dry Matter</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            28.5%
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Avg. Fruit Pressure</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            23 Kg
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="quality" className="space-y-4">
        <TabsList>
          <TabsTrigger value="quality">Quality Analysis</TabsTrigger>
          <TabsTrigger value="supplier">Supplier Performance</TabsTrigger>
          <TabsTrigger value="location">Shipment Locations</TabsTrigger>
        </TabsList>

        <TabsContent value="quality" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quality Metrics Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={qualityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="dryMatter" stroke="#8884d8" name="Dry Matter 1" />
                    <Line type="monotone" dataKey="dryMatter2" stroke="#82ca9d" name="Dry Matter 2" />
                    <Line type="monotone" dataKey="fruitPressure" stroke="#ffc658" name="Fruit Pressure" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Defect Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={defectData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" name="Occurrence Rate %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="location">
          <Card>
            <CardHeader>
              <CardTitle>Shipments by Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={locationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="shipments" fill="#82ca9d" name="Number of Shipments" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="supplier">
          <Card>
            <CardHeader>
              <CardTitle>Supplier Rankings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Supplier performance metrics coming soon...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
