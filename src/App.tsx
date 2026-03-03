import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AppLayout } from "@/components/AppLayout";
import CommandCenter from "@/pages/CommandCenter";
import ExecutiveArchive from "@/pages/ExecutiveArchive";
import AdminDashboard from "@/pages/AdminDashboard";
import Login from "@/pages/Login";
import Forbidden from "@/pages/Forbidden";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/forbidden" element={<Forbidden />} />
            <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
              <Route path="/" element={<CommandCenter />} />
              <Route path="/reports" element={<ExecutiveArchive />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
