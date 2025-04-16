import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Building2, Users } from "lucide-react";

export const LoginSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-4xl w-full px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Avocado Trade Guardian
        </h1>
        <div className="grid md:grid-cols-2 gap-6">
          {/* TFC Card */}
          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate('/tfc')}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-center space-x-2">
                <Building2 className="h-6 w-6" />
                <span>Login as TFC</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">
                Access the Trade Facilitation Center dashboard
              </p>
            </CardContent>
          </Card>

          {/* Supplier Card */}
          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate('/supplier')}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-center space-x-2">
                <Users className="h-6 w-6" />
                <span>Login as Supplier</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">
                Access the Supplier dashboard
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}; 