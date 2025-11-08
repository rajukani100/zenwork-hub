import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { Users, UserCheck, Clock, Calendar } from 'lucide-react';

export default function HRDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">HR Dashboard</h1>
          <p className="text-muted-foreground">Employee management overview</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Employees" value={145} icon={Users} />
          <StatCard title="On Leave Today" value={8} icon={Calendar} />
          <StatCard title="Pending Leave Requests" value={12} icon={Clock} />
          <StatCard
            title="Avg Attendance"
            value="92%"
            icon={UserCheck}
            trend={{ value: 3, isPositive: true }}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
