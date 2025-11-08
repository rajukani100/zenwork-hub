import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { Users, Activity, AlertCircle, Settings } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">System overview and management</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Active Users" value={145} icon={Users} />
          <StatCard title="System Health" value="99.9%" icon={Activity} />
          <StatCard title="Pending Tasks" value={7} icon={AlertCircle} />
          <StatCard title="Configurations" value={23} icon={Settings} />
        </div>
      </div>
    </DashboardLayout>
  );
}
