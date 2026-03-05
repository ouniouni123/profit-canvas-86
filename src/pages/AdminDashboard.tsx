import { BellRing, Shield, Users, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockAdminUsers, mockStrikeNotifications } from "@/lib/constants";

export default function AdminDashboard() {
  const totalStrikes = mockAdminUsers.reduce((sum, user) => sum + user.strikes, 0);
  const warnedUsers = mockAdminUsers.filter((user) => user.strikes > 0).length;
  const criticalUsers = mockAdminUsers.filter((user) => user.strikes >= 3).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Shield className="h-6 w-6 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">Monitor users by unique ID and review fake strike activity.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <Users className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Tracked Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAdminUsers.length}</div>
            <p className="text-sm text-muted-foreground">Including admin and user accounts.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <CardTitle className="text-base">Total Strikes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStrikes}</div>
            <p className="text-sm text-muted-foreground">{warnedUsers} user(s) currently have warnings.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <BellRing className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Critical Queue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{criticalUsers}</div>
            <p className="text-sm text-muted-foreground">Users at or above the 3-strike threshold.</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User management preview</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Unique ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Strikes</TableHead>
                <TableHead>Last Warning</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAdminUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-mono text-xs">{user.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.role === "admin" ? "default" : "secondary"}>{user.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.strikes >= 3 ? "destructive" : user.strikes > 0 ? "secondary" : "outline"}>
                      {user.strikes} strike{user.strikes === 1 ? "" : "s"}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-[220px] text-sm text-muted-foreground">{user.lastWarning}</TableCell>
                  <TableCell>
                    <Badge variant={user.status === "critical" ? "destructive" : "outline"}>{user.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">Send warning</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Fake strike notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockStrikeNotifications.map((notification) => (
            <div key={notification.id} className="rounded-lg border p-3">
              <div className="mb-1 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Badge variant={notification.audience === "admin" ? "default" : "secondary"}>
                    {notification.audience}
                  </Badge>
                  <span className="text-sm font-medium">{notification.title}</span>
                </div>
                <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
              </div>
              <p className="text-sm text-muted-foreground">{notification.message}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

