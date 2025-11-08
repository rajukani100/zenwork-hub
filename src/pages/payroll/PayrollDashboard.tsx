import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DollarSign, FileText, Clock, Users, TrendingUp, Play, Palette, FileSpreadsheet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const topPerformers = [
  { name: 'Vikram Mehta', department: 'Engineering', score: 9.5, bonus: 7125 },
  { name: 'Rajesh Kumar', department: 'Engineering', score: 9.2, bonus: 6900 },
  { name: 'Priya Singh', department: 'Product', score: 9.0, bonus: 6750 },
  { name: 'Anita Desai', department: 'Sales', score: 8.8, bonus: 4400 },
  { name: 'Asha Patel', department: 'Product', score: 8.5, bonus: 4250 },
];

const departmentDistribution = [
  { department: 'Engineering', percentage: 38, amount: 3200000 },
  { department: 'Product', percentage: 20, amount: 1650000 },
  { department: 'Sales', percentage: 22, amount: 1890000 },
  { department: 'HR', percentage: 8, amount: 680000 },
  { department: 'Finance', percentage: 12, amount: 980000 },
];

export default function PayrollDashboard() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Payroll Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive payroll management and analytics</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Payroll" value="₹84.5L" icon={DollarSign} />
          <StatCard title="Avg Bonus %" value="12.4%" icon={TrendingUp} />
          <StatCard title="Employees Paid" value={142} icon={Users} />
          <StatCard title="Payslips Generated" value={142} icon={FileText} />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Department-wise Salary Distribution</CardTitle>
              <CardDescription>Current month payroll breakdown by department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departmentDistribution.map((dept) => (
                  <div key={dept.department} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{dept.department}</span>
                      <span className="text-muted-foreground">
                        ₹{(dept.amount / 100000).toFixed(1)}L ({dept.percentage}%)
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div 
                        className="h-full bg-primary transition-all"
                        style={{ width: `${dept.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top 5 Performers</CardTitle>
              <CardDescription>Based on office score and bonus earned</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Bonus</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topPerformers.map((performer, index) => (
                    <TableRow key={performer.name}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{performer.name}</p>
                          <p className="text-xs text-muted-foreground">{performer.department}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={index < 2 ? 'default' : 'secondary'}>
                          {performer.score}/10
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold text-primary">
                        ₹{performer.bonus.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
            <CardDescription>Common payroll actions and tools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Button 
                onClick={() => navigate('/payroll/payruns')}
                className="h-auto flex-col gap-2 py-6"
              >
                <Play className="h-6 w-6" />
                <span>Start New Pay Run</span>
              </Button>
              <Button 
                onClick={() => navigate('/payroll/configuration')}
                variant="outline"
                className="h-auto flex-col gap-2 py-6"
              >
                <Clock className="h-6 w-6" />
                <span>Configure Rules</span>
              </Button>
              <Button 
                onClick={() => navigate('/payroll/designer')}
                variant="outline"
                className="h-auto flex-col gap-2 py-6"
              >
                <Palette className="h-6 w-6" />
                <span>Payslip Templates</span>
              </Button>
              <Button 
                onClick={() => navigate('/payroll/reports')}
                variant="outline"
                className="h-auto flex-col gap-2 py-6"
              >
                <FileSpreadsheet className="h-6 w-6" />
                <span>View Reports</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
