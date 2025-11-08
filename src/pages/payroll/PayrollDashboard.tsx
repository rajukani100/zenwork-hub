import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { DollarSign, FileText, Clock, Users } from 'lucide-react';

export default function PayrollDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Payroll Dashboard</h1>
          <p className="text-muted-foreground">Payroll management and reports</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Payroll" value="₹65.2L" icon={DollarSign} />
          <StatCard title="Pending Payruns" value={3} icon={Clock} />
          <StatCard title="Employees Paid" value={142} icon={Users} />
          <StatCard title="Payslips Generated" value={142} icon={FileText} />
        </div>
      </div>
    </DashboardLayout>
  );
}
