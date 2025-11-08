import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Search, Download } from 'lucide-react';

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  target: string;
  details: string;
  type: 'created' | 'updated' | 'deleted' | 'system';
}

const mockLogs: AuditLog[] = [
  {
    id: '1',
    timestamp: '2025-11-08 14:30:22',
    user: 'Admin User',
    role: 'Admin',
    action: 'Updated',
    target: 'Company Settings',
    details: 'Changed PF percentage from 10% to 12%',
    type: 'updated',
  },
  {
    id: '2',
    timestamp: '2025-11-08 13:15:10',
    user: 'HR Officer',
    role: 'HR',
    action: 'Created',
    target: 'Employee Record',
    details: 'Added new employee: Asha Patel (WZ-1001)',
    type: 'created',
  },
  {
    id: '3',
    timestamp: '2025-11-08 12:45:33',
    user: 'Payroll Officer',
    role: 'Payroll',
    action: 'Created',
    target: 'Payrun',
    details: 'Generated payrun for October 2025',
    type: 'created',
  },
  {
    id: '4',
    timestamp: '2025-11-08 11:20:15',
    user: 'System',
    role: 'System',
    action: 'System Event',
    target: 'Attendance',
    details: 'Auto-marked absent for 3 employees',
    type: 'system',
  },
  {
    id: '5',
    timestamp: '2025-11-08 10:05:45',
    user: 'HR Officer',
    role: 'HR',
    action: 'Updated',
    target: 'Attendance Record',
    details: 'Corrected attendance for Rajesh Kumar on 2025-11-05',
    type: 'updated',
  },
  {
    id: '6',
    timestamp: '2025-11-07 16:30:22',
    user: 'Admin User',
    role: 'Admin',
    action: 'Deleted',
    target: 'User Account',
    details: 'Removed inactive user: test@workzen.com',
    type: 'deleted',
  },
];

const actionColors = {
  created: 'bg-green-500/10 text-green-700 border-green-200',
  updated: 'bg-yellow-500/10 text-yellow-700 border-yellow-200',
  deleted: 'bg-red-500/10 text-red-700 border-red-200',
  system: 'bg-blue-500/10 text-blue-700 border-blue-200',
};

export function AuditTable() {
  const [search, setSearch] = useState('');
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  const filteredLogs = mockLogs.filter(
    (log) =>
      log.user.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.target.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Audit Logs</CardTitle>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search logs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Target</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow
                    key={log.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => setSelectedLog(log)}
                  >
                    <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                    <TableCell>{log.user}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{log.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={actionColors[log.type]}>
                        {log.action}
                      </Badge>
                    </TableCell>
                    <TableCell>{log.target}</TableCell>
                    <TableCell className="max-w-md truncate">{log.details}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedLog} onOpenChange={() => setSelectedLog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Audit Log Details</DialogTitle>
          </DialogHeader>
          {selectedLog && (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Timestamp</p>
                <p className="font-mono">{selectedLog.timestamp}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">User</p>
                <p className="font-medium">{selectedLog.user}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Action</p>
                <Badge variant="outline" className={actionColors[selectedLog.type]}>
                  {selectedLog.action}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Target</p>
                <p className="font-medium">{selectedLog.target}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Details</p>
                <p className="text-sm">{selectedLog.details}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
