'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from '~/components/ui/table';

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
  const [filter, setFilter] = useState('');

  useEffect(() => {
    // eslint-disable-next-line
    fetch('/api/systemchecks')
      .then((res) => res.json())
      .then(setData);
  }, []);

  const filteredData = data.filter((item) =>
    item.hostname.toLowerCase().includes(filter.toLowerCase()) ||
    item.os_type.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">System Check Reports</h1>
      <Input
        placeholder="Filter by hostname or OS..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-4"
      />

      <Card>
        <CardContent className="overflow-x-auto p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Hostname</TableHead>
                <TableHead>OS</TableHead>
                <TableHead>Disk Encryption</TableHead>
                <TableHead>OS Update</TableHead>
                <TableHead>Antivirus</TableHead>
                <TableHead>Sleep Compliance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{new Date(item.timestamp).toLocaleString()}</TableCell>
                  <TableCell>{item.hostname}</TableCell>
                  <TableCell>{item.os_type}</TableCell>
                  <TableCell>{item.disk_encryption}</TableCell>
                  <TableCell>{item.os_update_status}</TableCell>
                  <TableCell>
                    {item.antivirus_info?.presence} — {item.antivirus_info?.details}
                  </TableCell>
                  <TableCell>
                    {item.inactivity_sleep_settings?.compliance_status} (
                    {item.inactivity_sleep_settings?.configured_minutes} min)
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
