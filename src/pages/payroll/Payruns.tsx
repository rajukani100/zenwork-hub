import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Play, Download, Eye, Edit, Save, FileText } from 'lucide-react';
import { PercentageSlider } from '@/components/payroll/PercentageSlider';
import { ConfigTemplateModal } from '@/components/payroll/ConfigTemplateModal';
import { toast } from '@/hooks/use-toast';

interface PayrollEmployee {
  id: string;
  name: string;
  employeeCode: string;
  department: string;
  basicPay: number;
  officeScore: number;
  attendance: number;
  leaves: number;
  grossPay?: number;
  totalDeductions?: number;
  netPay?: number;
}

const mockEmployees: PayrollEmployee[] = [
  { id: 'emp_1001', name: 'Asha Patel', employeeCode: 'WZ-1001', department: 'Product', basicPay: 50000, officeScore: 8.5, attendance: 22, leaves: 0 },
  { id: 'emp_1002', name: 'Rajesh Kumar', employeeCode: 'WZ-1002', department: 'Engineering', basicPay: 60000, officeScore: 9.2, attendance: 21, leaves: 1 },
  { id: 'emp_1003', name: 'Priya Singh', employeeCode: 'WZ-1003', department: 'Sales', basicPay: 45000, officeScore: 7.8, attendance: 20, leaves: 2 },
  { id: 'emp_1004', name: 'Vikram Mehta', employeeCode: 'WZ-1004', department: 'Engineering', basicPay: 65000, officeScore: 9.5, attendance: 22, leaves: 0 },
  { id: 'emp_1005', name: 'Anita Desai', employeeCode: 'WZ-1005', department: 'HR', basicPay: 48000, officeScore: 8.0, attendance: 21, leaves: 1 },
];

export default function Payruns() {
  const [selectedPeriod, setSelectedPeriod] = useState('2025-11');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [autoCalculate, setAutoCalculate] = useState(true);
  const [isCalculated, setIsCalculated] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState('default');
  
  // Payroll configuration
  const [config, setConfig] = useState({
    basicPayPercent: 50,
    hraPercent: 40,
    bonusPercent: 10,
    officeScoreWeight: 5,
    pfPercent: 12,
    professionalTax: 200,
    esiPercent: 0.75,
    tdsPercent: 10,
  });

  const [calculatedEmployees, setCalculatedEmployees] = useState<PayrollEmployee[]>([]);

  const calculatePayroll = () => {
    const filtered = selectedDepartment === 'all' 
      ? mockEmployees 
      : mockEmployees.filter(e => e.department === selectedDepartment);

    const calculated = filtered.map(emp => {
      const basic = emp.basicPay;
      const hra = (basic * config.hraPercent) / 100;
      const performanceBonus = (basic * config.bonusPercent * emp.officeScore) / (10 * 100);
      const grossPay = basic + hra + performanceBonus;
      
      const pf = (basic * config.pfPercent) / 100;
      const esi = (grossPay * config.esiPercent) / 100;
      const tds = (grossPay * config.tdsPercent) / 100;
      const totalDeductions = pf + esi + tds + config.professionalTax;
      
      const netPay = grossPay - totalDeductions;

      return {
        ...emp,
        grossPay,
        totalDeductions,
        netPay,
      };
    });

    setCalculatedEmployees(calculated);
    setIsCalculated(true);
    toast({ title: 'Payroll Calculated', description: `${calculated.length} employees processed` });
  };

  const confirmPayrun = () => {
    toast({ 
      title: 'Pay Run Confirmed', 
      description: 'Payslips have been generated and sent to employees',
      duration: 3000,
    });
  };

  const updateConfig = (key: string, value: number) => {
    setConfig(prev => ({ ...prev, [key]: value }));
    if (isCalculated) {
      setIsCalculated(false); // Reset calculation when config changes
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Pay Run Management</h1>
          <p className="text-muted-foreground">Configure and execute payroll for selected period</p>
        </div>

        <Tabs defaultValue="setup" className="space-y-6">
          <TabsList>
            <TabsTrigger value="setup">Setup</TabsTrigger>
            <TabsTrigger value="configuration">Configuration</TabsTrigger>
            <TabsTrigger value="calculation" disabled={!isCalculated}>Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="setup" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pay Run Setup</CardTitle>
                <CardDescription>Select period and employees for payroll processing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Pay Period</Label>
                    <Input 
                      type="month" 
                      value={selectedPeriod}
                      onChange={(e) => setSelectedPeriod(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Department</Label>
                    <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        <SelectItem value="Product">Product</SelectItem>
                        <SelectItem value="Engineering">Engineering</SelectItem>
                        <SelectItem value="Sales">Sales</SelectItem>
                        <SelectItem value="HR">HR</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label>Auto-Calculate Deductions & Bonuses</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically calculate based on attendance, leaves, and performance
                    </p>
                  </div>
                  <Switch checked={autoCalculate} onCheckedChange={setAutoCalculate} />
                </div>

                <div className="flex gap-3">
                  <Button onClick={calculatePayroll} className="gap-2">
                    <Play className="h-4 w-4" />
                    Run Payroll Calculation
                  </Button>
                  <Button variant="outline" onClick={() => setShowTemplateModal(true)}>
                    Load Template
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Included Employees</CardTitle>
                <CardDescription>
                  {selectedDepartment === 'all' ? 'All departments' : selectedDepartment} - {
                    selectedDepartment === 'all' 
                      ? mockEmployees.length 
                      : mockEmployees.filter(e => e.department === selectedDepartment).length
                  } employees
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Code</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Basic Pay</TableHead>
                      <TableHead>Office Score</TableHead>
                      <TableHead>Attendance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(selectedDepartment === 'all' ? mockEmployees : mockEmployees.filter(e => e.department === selectedDepartment)).map(emp => (
                      <TableRow key={emp.id}>
                        <TableCell className="font-medium">{emp.name}</TableCell>
                        <TableCell>{emp.employeeCode}</TableCell>
                        <TableCell>{emp.department}</TableCell>
                        <TableCell>₹{emp.basicPay.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant={emp.officeScore >= 9 ? 'default' : emp.officeScore >= 7 ? 'secondary' : 'outline'}>
                            {emp.officeScore}/10
                          </Badge>
                        </TableCell>
                        <TableCell>{emp.attendance} days</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="configuration" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pay Calculation Settings</CardTitle>
                <CardDescription>Configure salary components and deductions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Current Template: <span className="text-primary">{currentTemplate}</span></h3>
                    <Button variant="outline" size="sm" onClick={() => setShowTemplateModal(true)}>
                      Change Template
                    </Button>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="mb-4 text-sm font-semibold text-foreground">Earnings</h4>
                    <div className="space-y-4">
                      <PercentageSlider
                        label="HRA Percentage"
                        value={config.hraPercent}
                        onChange={(val) => updateConfig('hraPercent', val)}
                        description="House Rent Allowance as % of Basic Pay"
                      />
                      <PercentageSlider
                        label="Bonus Percentage"
                        value={config.bonusPercent}
                        onChange={(val) => updateConfig('bonusPercent', val)}
                        description="Performance bonus as % of Basic Pay"
                      />
                      <PercentageSlider
                        label="Office Score Weight"
                        value={config.officeScoreWeight}
                        onChange={(val) => updateConfig('officeScoreWeight', val)}
                        max={20}
                        description="Weight of office score in bonus calculation"
                      />
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-4 text-sm font-semibold text-foreground">Deductions</h4>
                    <div className="space-y-4">
                      <PercentageSlider
                        label="PF Contribution"
                        value={config.pfPercent}
                        onChange={(val) => updateConfig('pfPercent', val)}
                        description="Provident Fund as % of Basic Pay"
                      />
                      <PercentageSlider
                        label="ESI Contribution"
                        value={config.esiPercent}
                        onChange={(val) => updateConfig('esiPercent', val)}
                        max={5}
                        description="Employee State Insurance as % of Gross"
                      />
                      <PercentageSlider
                        label="TDS Percentage"
                        value={config.tdsPercent}
                        onChange={(val) => updateConfig('tdsPercent', val)}
                        max={30}
                        description="Tax Deducted at Source"
                      />
                      <div className="space-y-2">
                        <Label>Professional Tax (Fixed Amount)</Label>
                        <Input
                          type="number"
                          value={config.professionalTax}
                          onChange={(e) => updateConfig('professionalTax', Number(e.target.value))}
                          className="max-w-xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="gap-2">
                    <Save className="h-4 w-4" />
                    Save as Template
                  </Button>
                  <Button onClick={calculatePayroll} className="gap-2">
                    <Play className="h-4 w-4" />
                    Calculate with Current Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calculation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payroll Preview</CardTitle>
                <CardDescription>Review calculated salaries before confirming</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardDescription>Total Payroll</CardDescription>
                        <CardTitle>₹{calculatedEmployees.reduce((sum, e) => sum + (e.grossPay || 0), 0).toLocaleString()}</CardTitle>
                      </CardHeader>
                    </Card>
                    <Card>
                      <CardHeader className="pb-3">
                        <CardDescription>Total Deductions</CardDescription>
                        <CardTitle>₹{calculatedEmployees.reduce((sum, e) => sum + (e.totalDeductions || 0), 0).toLocaleString()}</CardTitle>
                      </CardHeader>
                    </Card>
                    <Card>
                      <CardHeader className="pb-3">
                        <CardDescription>Net Payout</CardDescription>
                        <CardTitle className="text-primary">₹{calculatedEmployees.reduce((sum, e) => sum + (e.netPay || 0), 0).toLocaleString()}</CardTitle>
                      </CardHeader>
                    </Card>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Employee</TableHead>
                        <TableHead>Basic</TableHead>
                        <TableHead>Gross Pay</TableHead>
                        <TableHead>Deductions</TableHead>
                        <TableHead>Net Pay</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {calculatedEmployees.map(emp => (
                        <TableRow key={emp.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{emp.name}</p>
                              <p className="text-sm text-muted-foreground">{emp.employeeCode}</p>
                            </div>
                          </TableCell>
                          <TableCell>₹{emp.basicPay.toLocaleString()}</TableCell>
                          <TableCell>₹{emp.grossPay?.toLocaleString()}</TableCell>
                          <TableCell className="text-destructive">₹{emp.totalDeductions?.toLocaleString()}</TableCell>
                          <TableCell className="font-semibold text-primary">₹{emp.netPay?.toLocaleString()}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  <div className="flex gap-3 pt-4">
                    <Button onClick={confirmPayrun} className="gap-2">
                      <FileText className="h-4 w-4" />
                      Confirm Pay Run & Generate Payslips
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Download className="h-4 w-4" />
                      Export Preview
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <ConfigTemplateModal 
          open={showTemplateModal}
          onOpenChange={setShowTemplateModal}
          onSelectTemplate={(template) => {
            setCurrentTemplate(template);
            toast({ title: 'Template Loaded', description: `${template} configuration applied` });
          }}
        />
      </div>
    </DashboardLayout>
  );
}
