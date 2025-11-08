import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, FileText, PieChart, TrendingUp, Users } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const mockPayrollSummary = [
  { month: 'October 2025', employees: 142, grossPayroll: 8450000, deductions: 1250000, netPayroll: 7200000 },
  { month: 'September 2025', employees: 140, grossPayroll: 8300000, deductions: 1230000, netPayroll: 7070000 },
  { month: 'August 2025', employees: 138, grossPayroll: 8200000, deductions: 1200000, netPayroll: 7000000 },
];

const mockDepartmentBreakdown = [
  { department: 'Engineering', employees: 45, totalSalary: 3200000, avgSalary: 71111 },
  { department: 'Product', employees: 22, totalSalary: 1650000, avgSalary: 75000 },
  { department: 'Sales', employees: 35, totalSalary: 1890000, avgSalary: 54000 },
  { department: 'HR', employees: 12, totalSalary: 680000, avgSalary: 56667 },
  { department: 'Finance', employees: 15, totalSalary: 980000, avgSalary: 65333 },
  { department: 'Marketing', employees: 13, totalSalary: 720000, avgSalary: 55385 },
];

const mockStatutoryReport = [
  { type: 'Provident Fund', amount: 658000, employerContribution: 658000, total: 1316000 },
  { type: 'ESI', amount: 63375, employerContribution: 85000, total: 148375 },
  { type: 'Professional Tax', amount: 28400, employerContribution: 0, total: 28400 },
  { type: 'TDS', amount: 845000, employerContribution: 0, total: 845000 },
];

const mockBonusAnalysis = [
  { department: 'Engineering', avgScore: 8.9, totalBonus: 285000, avgBonus: 6333 },
  { department: 'Product', avgScore: 9.2, totalBonus: 165000, avgBonus: 7500 },
  { department: 'Sales', avgScore: 7.8, totalBonus: 142000, avgBonus: 4057 },
  { department: 'HR', avgScore: 8.5, totalBonus: 68000, avgBonus: 5667 },
  { department: 'Finance', avgScore: 8.7, totalBonus: 85000, avgBonus: 5667 },
];

export default function Reports() {
  const [selectedMonth, setSelectedMonth] = useState('2025-10');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedReport, setSelectedReport] = useState('summary');

  const exportReport = (format: 'csv' | 'pdf') => {
    toast({ 
      title: `Exporting ${format.toUpperCase()}`, 
      description: `${selectedReport} report is being generated...`,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Payroll Reports</h1>
          <p className="text-muted-foreground">Generate and export comprehensive payroll reports</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Report Filters</CardTitle>
            <CardDescription>Select criteria for report generation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Month</label>
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2025-10">October 2025</SelectItem>
                    <SelectItem value="2025-09">September 2025</SelectItem>
                    <SelectItem value="2025-08">August 2025</SelectItem>
                    <SelectItem value="2025-07">July 2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Department</label>
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="product">Product</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="hr">HR</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end gap-2">
                <Button onClick={() => exportReport('csv')} variant="outline" className="flex-1 gap-2">
                  <Download className="h-4 w-4" />
                  CSV
                </Button>
                <Button onClick={() => exportReport('pdf')} variant="outline" className="flex-1 gap-2">
                  <Download className="h-4 w-4" />
                  PDF
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="summary" onValueChange={setSelectedReport}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="summary" className="gap-2">
              <FileText className="h-4 w-4" />
              Summary
            </TabsTrigger>
            <TabsTrigger value="department" className="gap-2">
              <Users className="h-4 w-4" />
              Department
            </TabsTrigger>
            <TabsTrigger value="statutory" className="gap-2">
              <PieChart className="h-4 w-4" />
              Statutory
            </TabsTrigger>
            <TabsTrigger value="bonus" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Bonus
            </TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Payroll Summary</CardTitle>
                <CardDescription>Overview of payroll expenses across months</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead>Employees</TableHead>
                      <TableHead>Gross Payroll</TableHead>
                      <TableHead>Deductions</TableHead>
                      <TableHead>Net Payroll</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockPayrollSummary.map((row) => (
                      <TableRow key={row.month}>
                        <TableCell className="font-medium">{row.month}</TableCell>
                        <TableCell>{row.employees}</TableCell>
                        <TableCell>₹{row.grossPayroll.toLocaleString()}</TableCell>
                        <TableCell className="text-destructive">₹{row.deductions.toLocaleString()}</TableCell>
                        <TableCell className="font-semibold text-primary">₹{row.netPayroll.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="department" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Department Payroll Breakdown</CardTitle>
                <CardDescription>Salary distribution across departments</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Department</TableHead>
                      <TableHead>Employees</TableHead>
                      <TableHead>Total Salary</TableHead>
                      <TableHead>Average Salary</TableHead>
                      <TableHead>% of Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockDepartmentBreakdown.map((dept) => (
                      <TableRow key={dept.department}>
                        <TableCell className="font-medium">{dept.department}</TableCell>
                        <TableCell>{dept.employees}</TableCell>
                        <TableCell>₹{dept.totalSalary.toLocaleString()}</TableCell>
                        <TableCell>₹{dept.avgSalary.toLocaleString()}</TableCell>
                        <TableCell>
                          {((dept.totalSalary / mockDepartmentBreakdown.reduce((sum, d) => sum + d.totalSalary, 0)) * 100).toFixed(1)}%
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="statutory" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>PF/ESI/Tax Contributions Summary</CardTitle>
                <CardDescription>Statutory deductions and contributions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Employee Share</TableHead>
                      <TableHead>Employer Share</TableHead>
                      <TableHead>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockStatutoryReport.map((item) => (
                      <TableRow key={item.type}>
                        <TableCell className="font-medium">{item.type}</TableCell>
                        <TableCell>₹{item.amount.toLocaleString()}</TableCell>
                        <TableCell>₹{item.employerContribution.toLocaleString()}</TableCell>
                        <TableCell className="font-semibold">₹{item.total.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="border-t-2 bg-muted/50 font-semibold">
                      <TableCell>Total</TableCell>
                      <TableCell>₹{mockStatutoryReport.reduce((sum, i) => sum + i.amount, 0).toLocaleString()}</TableCell>
                      <TableCell>₹{mockStatutoryReport.reduce((sum, i) => sum + i.employerContribution, 0).toLocaleString()}</TableCell>
                      <TableCell>₹{mockStatutoryReport.reduce((sum, i) => sum + i.total, 0).toLocaleString()}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bonus" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Bonus & Incentive Analysis</CardTitle>
                <CardDescription>Performance-based bonus distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Department</TableHead>
                      <TableHead>Avg Office Score</TableHead>
                      <TableHead>Total Bonus</TableHead>
                      <TableHead>Avg Bonus/Employee</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockBonusAnalysis.map((item) => (
                      <TableRow key={item.department}>
                        <TableCell className="font-medium">{item.department}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>{item.avgScore}/10</span>
                            <div className="h-2 w-20 overflow-hidden rounded-full bg-muted">
                              <div 
                                className="h-full bg-primary" 
                                style={{ width: `${(item.avgScore / 10) * 100}%` }}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>₹{item.totalBonus.toLocaleString()}</TableCell>
                        <TableCell>₹{item.avgBonus.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
