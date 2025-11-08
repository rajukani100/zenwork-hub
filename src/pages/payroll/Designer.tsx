import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PayslipPreview } from '@/components/payroll/PayslipPreview';
import { Save, Eye, Download, Upload } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface PayslipSection {
  id: string;
  label: string;
  enabled: boolean;
  customLabel?: string;
}

const defaultSections: PayslipSection[] = [
  { id: 'employee_info', label: 'Employee Information', enabled: true },
  { id: 'earnings', label: 'Earnings Breakdown', enabled: true },
  { id: 'deductions', label: 'Deductions', enabled: true },
  { id: 'net_pay', label: 'Net Pay', enabled: true },
  { id: 'ctc', label: 'CTC Breakdown', enabled: false },
  { id: 'bonuses', label: 'Bonuses & Office Score', enabled: true },
  { id: 'employer_contributions', label: 'Employer Contributions', enabled: false },
  { id: 'ytd_summary', label: 'Year-to-Date Summary', enabled: false },
  { id: 'signatures', label: 'Signatures', enabled: true },
  { id: 'company_logo', label: 'Company Logo', enabled: true },
  { id: 'notes', label: 'Custom Notes', enabled: false },
];

export default function Designer() {
  const [sections, setSections] = useState<PayslipSection[]>(defaultSections);
  const [templateName, setTemplateName] = useState('Default Template');
  const [companyName, setCompanyName] = useState('WorkZen Technologies');
  const [showPreview, setShowPreview] = useState(true);

  const toggleSection = (id: string) => {
    setSections(sections.map(s => 
      s.id === id ? { ...s, enabled: !s.enabled } : s
    ));
  };

  const updateLabel = (id: string, label: string) => {
    setSections(sections.map(s => 
      s.id === id ? { ...s, customLabel: label } : s
    ));
  };

  const saveTemplate = () => {
    toast({ 
      title: 'Template Saved', 
      description: `"${templateName}" has been saved successfully`,
    });
  };

  const setAsDefault = () => {
    toast({ 
      title: 'Default Template Set', 
      description: 'This template will be used for all new payslips',
    });
  };

  const exportPDF = () => {
    toast({ 
      title: 'Exporting PDF', 
      description: 'Sample payslip is being generated...',
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Payslip Designer</h1>
          <p className="text-muted-foreground">Customize payslip layout and content</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Configuration Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Template Settings</CardTitle>
                <CardDescription>Configure general payslip settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Template Name</Label>
                  <Input 
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    placeholder="Enter template name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Company Name</Label>
                  <Input 
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Enter company name"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Show Live Preview</Label>
                  <Switch checked={showPreview} onCheckedChange={setShowPreview} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payslip Sections</CardTitle>
                <CardDescription>Toggle sections and customize labels</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="sections" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="sections">Sections</TabsTrigger>
                    <TabsTrigger value="labels">Custom Labels</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="sections" className="space-y-4 pt-4">
                    {sections.map((section) => (
                      <div 
                        key={section.id}
                        className="flex items-center justify-between rounded-lg border p-3"
                      >
                        <Label className="cursor-pointer" htmlFor={section.id}>
                          {section.customLabel || section.label}
                        </Label>
                        <Switch
                          id={section.id}
                          checked={section.enabled}
                          onCheckedChange={() => toggleSection(section.id)}
                        />
                      </div>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="labels" className="space-y-4 pt-4">
                    {sections.filter(s => s.enabled).map((section) => (
                      <div key={section.id} className="space-y-2">
                        <Label className="text-xs text-muted-foreground">
                          {section.label}
                        </Label>
                        <Input
                          placeholder={section.label}
                          value={section.customLabel || ''}
                          onChange={(e) => updateLabel(section.id, e.target.value)}
                        />
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
                <CardDescription>Save and manage templates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button onClick={saveTemplate} className="w-full gap-2">
                  <Save className="h-4 w-4" />
                  Save Template
                </Button>
                <Button onClick={setAsDefault} variant="outline" className="w-full">
                  Set as Default Template
                </Button>
                <Button onClick={exportPDF} variant="outline" className="w-full gap-2">
                  <Download className="h-4 w-4" />
                  Export Sample Payslip
                </Button>
                <Button variant="outline" className="w-full gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Company Logo
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Preview Panel */}
          <div className="lg:sticky lg:top-6">
            <Card className="overflow-hidden">
              <CardHeader className="bg-muted/50">
                <div className="flex items-center justify-between">
                  <CardTitle>Live Preview</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setShowPreview(!showPreview)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              {showPreview && (
                <CardContent className="p-0">
                  <PayslipPreview 
                    sections={sections}
                    companyName={companyName}
                  />
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
