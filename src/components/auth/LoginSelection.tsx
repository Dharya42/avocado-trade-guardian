
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Building2, Users, Leaf } from "lucide-react";

export const LoginSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-avocado-50 to-avocado-100">
      <div className="max-w-5xl w-full px-6">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-avocado-500 p-4 rounded-full shadow-lg">
              <Leaf className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-avocado-900 mb-4">
            Avocado Trade Guardian
          </h1>
          <p className="text-xl text-avocado-700 max-w-2xl mx-auto">
            Quality & Compliance Inspection for Global Avocado Trade
          </p>
          <div className="w-24 h-1 bg-avocado-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Login Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* TFC Card */}
          <Card 
            className="cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-avocado-200 bg-white/80 backdrop-blur-sm"
            onClick={() => navigate('/tfc')}
          >
            <CardHeader className="pb-4">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-avocado-500 p-3 rounded-full">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-center text-2xl font-bold text-avocado-900">
                Trade Facilitation Center
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-center text-avocado-700 text-lg leading-relaxed">
                Access comprehensive trade monitoring, quality control dashboards, and supplier performance analytics
              </p>
              <div className="mt-6 flex justify-center">
                <div className="bg-avocado-100 px-4 py-2 rounded-full">
                  <span className="text-avocado-800 font-medium text-sm">TFC Portal</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Supplier Card */}
          <Card 
            className="cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-avocado-200 bg-white/80 backdrop-blur-sm"
            onClick={() => navigate('/supplier')}
          >
            <CardHeader className="pb-4">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-avocado-600 p-3 rounded-full">
                  <Users className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-center text-2xl font-bold text-avocado-900">
                Supplier Portal
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-center text-avocado-700 text-lg leading-relaxed">
                Manage your shipments, track quality metrics, and monitor order fulfillment status
              </p>
              <div className="mt-6 flex justify-center">
                <div className="bg-avocado-100 px-4 py-2 rounded-full">
                  <span className="text-avocado-800 font-medium text-sm">Supplier Dashboard</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-avocado-600">
            Ensuring quality from farm to table across Kenya → UAE trade routes
          </p>
        </div>
      </div>
    </div>
  );
};
