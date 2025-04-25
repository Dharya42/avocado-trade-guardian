import { Toaster as RadixToaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Trade from "./pages/Trade";
import TradeDetail from "./pages/TradeDetail";
import KPI from "./pages/KPI";
import Tracker from "./pages/Tracker";
import Orders from "./pages/supplier/Orders";
import OrderDetail from "./pages/supplier/OrderDetail";
import NotFound from "./pages/NotFound";
import { LoginSelection } from "./components/auth/LoginSelection";
import { RoleWrapper } from "./components/auth/RoleWrapper";
import PurchaseOrders from "./pages/tfc/PurchaseOrders";
import PurchaseOrderDetail from "./pages/tfc/PurchaseOrderDetail";
import AvocadoImports from "./pages/tfc/AvocadoImports";
import Dashboard from "./pages/tfc/Dashboard";
import Cockpit from "./pages/tfc/Cockpit";

const queryClient = new QueryClient();

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginSelection />} />
      
      {/* TFC Routes */}
      <Route path="/tfc/*" element={
        <RoleWrapper role="tfc">
          <Routes>
            <Route path="/" element={<Navigate to="trades" replace />} />
            <Route path="trades" element={<Trade />} />
            <Route path="trade/:id" element={<TradeDetail />} />
            <Route path="purchase-orders" element={<PurchaseOrders />} />
            <Route path="purchase-orders/:orderId" element={<PurchaseOrderDetail />} />
            <Route path="avocado-imports" element={<AvocadoImports />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="cockpit" element={<Cockpit />} />
            <Route path="kpis" element={<KPI />} />
            <Route path="tracker" element={<Tracker />} />
          </Routes>
        </RoleWrapper>
      } />

      {/* Supplier Routes */}
      <Route path="/supplier/*" element={
        <RoleWrapper role="supplier">
          <Routes>
            <Route path="/" element={<Navigate to="trades" replace />} />
            <Route path="trades" element={<Trade />} />
            <Route path="trade/:id" element={<TradeDetail />} />
            <Route path="orders" element={<Orders />} />
            <Route path="orders/:orderId" element={<OrderDetail />} />
            <Route path="kpis" element={<KPI />} />
            <Route path="tracker" element={<Tracker />} />
          </Routes>
        </RoleWrapper>
      } />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AppRoutes />
          <RadixToaster />
          <Sonner />
        </TooltipProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
