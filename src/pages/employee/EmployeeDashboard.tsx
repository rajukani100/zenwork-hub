import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import {
  Calendar,
  Clock,
  FileText,
  TrendingUp,
  CalendarDays,
  CheckCircle2,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const mockAttendanceData = {
  daysPresent: 22,
  pendingLeaves: 2,
  leaveBalance: 20,
  lastPayslip: '₹45,000',
};

const recentActivities = [
  {
    id: 1,
    type: 'attendance',
    title: 'Attendance marked',
    time: '09:15 AM today',
    status: 'success',
  },
  {
    id: 2,
    type: 'leave',
    title: 'Casual leave approved',
    time: 'Yesterday',
    status: 'success',
  },
  {
    id: 3,
    type: 'payslip',
    title: 'October payslip generated',
    time: '2 days ago',
    status: 'info',
  },
];

const upcomingLeaves = [
  { date: 'Nov 15-17', type: 'Casual Leave', status: 'approved' },
  { date: 'Dec 24-26', type: 'Privilege Leave', status: 'pending' },
];

export default function EmployeeDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your attendance, leaves, and payroll
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Days Present"
            value={mockAttendanceData.daysPresent}
            icon={CheckCircle2}
            subtitle="This month"
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard
            title="Pending Leaves"
            value={mockAttendanceData.pendingLeaves}
            icon={Clock}
            subtitle="Awaiting approval"
          />
          <StatCard
            title="Leave Balance"
            value={mockAttendanceData.leaveBalance}
            icon={Calendar}
            subtitle="Available days"
          />
          <StatCard
            title="Last Payslip"
            value={mockAttendanceData.lastPayslip}
            icon={FileText}
            subtitle="Net pay - October"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Clock className="mr-2 h-4 w-4" />
                Mark Attendance
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <CalendarDays className="mr-2 h-4 w-4" />
                Apply for Leave
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                View Payslips
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <TrendingUp className="mr-2 h-4 w-4" />
                View Performance
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-card-foreground">
                        {activity.title}
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                    <Badge
                      variant={activity.status === 'success' ? 'default' : 'secondary'}
                    >
                      {activity.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Leaves */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Leaves</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingLeaves.map((leave, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-card-foreground">
                        {leave.type}
                      </p>
                      <p className="text-xs text-muted-foreground">{leave.date}</p>
                    </div>
                    <Badge
                      variant={leave.status === 'approved' ? 'default' : 'secondary'}
                    >
                      {leave.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Attendance Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Attendance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Present</span>
                  <span className="font-medium">22 days</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: '88%' }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">On Leave</span>
                  <span className="font-medium">2 days</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full bg-accent transition-all"
                    style={{ width: '8%' }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Absent</span>
                  <span className="font-medium">1 day</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full bg-destructive transition-all"
                    style={{ width: '4%' }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
