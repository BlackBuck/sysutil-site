// app/admin/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "~/components/ui/table";
import { Skeleton } from "~/components/ui/skeleton";

type SystemCheck = {
  id: number;
  timestamp: string;
  os_type: string;
  hostname: string;
  disk_encryption: string;
  os_update_status: string;
  antivirus_info: {
    presence: string;
    details: string;
  };
  inactivity_sleep_settings: {
    compliance_status: string;
    configured_minutes: number;
  };
};

export default function AdminDashboard() {
  const [data, setData] = useState<SystemCheck[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await fetch("/api/sysutil");
      // eslint-disable-next-line
      const data: SystemCheck[] = await res.json();
      setData(data);
    } catch (error) {
      console.error("Failed to fetch system checks:", error);
    } finally {
      setLoading(false);
    }
  };

  void fetchData(); // fix for ESLint
}, []);



  if (loading) {
    return (
      <div className="p-6">
        <Skeleton className="h-8 w-full mb-4" />
        <Skeleton className="h-8 w-full mb-4" />
        <Skeleton className="h-8 w-full mb-4" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">System Checks Dashboard</h1>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>OS Type</TableHead>
                <TableHead>Hostname</TableHead>
                <TableHead>Disk Encryption</TableHead>
                <TableHead>OS Update Status</TableHead>
                <TableHead>Antivirus</TableHead>
                <TableHead>Sleep Settings</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{new Date(item.timestamp).toLocaleString()}</TableCell>
                  <TableCell>{item.os_type}</TableCell>
                  <TableCell>{item.hostname}</TableCell>
                  <TableCell>{item.disk_encryption}</TableCell>
                  <TableCell>{item.os_update_status}</TableCell>
                  <TableCell>
                    {item.antivirus_info?.presence} ({item.antivirus_info?.details})
                  </TableCell>
                  <TableCell>
                    {item.inactivity_sleep_settings?.compliance_status} (
                    {item.inactivity_sleep_settings?.configured_minutes} mins)
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
