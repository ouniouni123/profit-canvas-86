import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, AlertTriangle } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Shield className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">User Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Manage user accounts, roles, and permissions.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <CardTitle className="text-lg">Strike Monitoring</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Monitor system alerts and user activity strikes.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
