import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PercentageSlider } from '@/components/payroll/PercentageSlider';
import { PayComponentCard } from '@/components/payroll/PayComponentCard';
import { Save, Plus, Trash2, Copy } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface SalaryTemplate {
  id: string;
  name: string;
  basicPayPercent: number;
  hraPercent: number;
  bonusPercent: number;
  officeScoreWeight: number;
  pfPercent: number;
  professionalTax: number;
  esiPercent: number;
  tdsPercent: number;
}

const defaultTemplates: SalaryTemplate[] = [
  {
    id: 'default',
    name: 'Default Template',
    basicPayPercent: 50,
    hraPercent: 40,
    bonusPercent: 10,
    officeScoreWeight: 5,
    pfPercent: 12,
    professionalTax: 200,
    esiPercent: 0.75,
    tdsPercent: 10,
  },
  {
    id: 'tech',
    name: 'Tech Department Template',
    basicPayPercent: 55,
    hraPercent: 35,
    bonusPercent: 15,
    officeScoreWeight: 8,
    pfPercent: 12,
    professionalTax: 200,
    esiPercent: 0.75,
    tdsPercent: 12,
  },
  {
    id: 'sales',
    name: 'Sales Template',
    basicPayPercent: 45,
    hraPercent: 30,
    bonusPercent: 25,
    officeScoreWeight: 10,
    pfPercent: 12,
    professionalTax: 200,
    esiPercent: 0.75,
    tdsPercent: 8,
  },
];

export default function Configuration() {
  const [templates, setTemplates] = useState<SalaryTemplate[]>(defaultTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<SalaryTemplate>(defaultTemplates[0]);
  const [isEditing, setIsEditing] = useState(false);

  const updateTemplateValue = (key: keyof SalaryTemplate, value: number | string) => {
    setSelectedTemplate(prev => ({ ...prev, [key]: value }));
    setIsEditing(true);
  };

  const saveTemplate = () => {
    const updatedTemplates = templates.map(t => 
      t.id === selectedTemplate.id ? selectedTemplate : t
    );
    setTemplates(updatedTemplates);
    setIsEditing(false);
    toast({ 
      title: 'Template Saved', 
      description: `${selectedTemplate.name} has been updated successfully`,
    });
  };

  const createNewTemplate = () => {
    const newTemplate: SalaryTemplate = {
      ...selectedTemplate,
      id: `custom_${Date.now()}`,
      name: 'New Custom Template',
    };
    setTemplates([...templates, newTemplate]);
    setSelectedTemplate(newTemplate);
    setIsEditing(true);
    toast({ title: 'New Template Created', description: 'Customize and save your template' });
  };

  const duplicateTemplate = () => {
    const duplicated: SalaryTemplate = {
      ...selectedTemplate,
      id: `custom_${Date.now()}`,
      name: `${selectedTemplate.name} (Copy)`,
    };
    setTemplates([...templates, duplicated]);
    setSelectedTemplate(duplicated);
    setIsEditing(true);
  };

  const deleteTemplate = (id: string) => {
    if (templates.length <= 1) {
      toast({ title: 'Cannot Delete', description: 'At least one template must exist', variant: 'destructive' });
      return;
    }
    setTemplates(templates.filter(t => t.id !== id));
    setSelectedTemplate(templates[0]);
    toast({ title: 'Template Deleted' });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Payroll Configuration</h1>
          <p className="text-muted-foreground">Manage salary rules, bonuses, and deduction templates</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Template Selector */}
          <Card>
            <CardHeader>
              <CardTitle>Templates</CardTitle>
              <CardDescription>Select or create a template</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className={`flex items-center justify-between rounded-lg border p-3 transition-colors cursor-pointer hover:bg-muted/50 ${
                    selectedTemplate.id === template.id ? 'border-primary bg-primary/5' : ''
                  }`}
                  onClick={() => setSelectedTemplate(template)}
                >
                  <div>
                    <p className="font-medium">{template.name}</p>
                    {selectedTemplate.id === template.id && isEditing && (
                      <p className="text-xs text-muted-foreground">Unsaved changes</p>
                    )}
                  </div>
                  {!['default', 'tech', 'sales'].includes(template.id) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTemplate(template.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                </div>
              ))}
              <div className="flex gap-2 pt-2">
                <Button onClick={createNewTemplate} variant="outline" size="sm" className="flex-1 gap-2">
                  <Plus className="h-4 w-4" />
                  New
                </Button>
                <Button onClick={duplicateTemplate} variant="outline" size="sm" className="flex-1 gap-2">
                  <Copy className="h-4 w-4" />
                  Duplicate
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Configuration Panel */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Template Configuration</CardTitle>
                    <CardDescription>Edit salary components and rules</CardDescription>
                  </div>
                  {isEditing && (
                    <Button onClick={saveTemplate} className="gap-2">
                      <Save className="h-4 w-4" />
                      Save Changes
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="basic" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="basic">Basic</TabsTrigger>
                    <TabsTrigger value="earnings">Earnings</TabsTrigger>
                    <TabsTrigger value="deductions">Deductions</TabsTrigger>
                  </TabsList>

                  <TabsContent value="basic" className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Template Name</Label>
                        <Input
                          value={selectedTemplate.name}
                          onChange={(e) => updateTemplateValue('name', e.target.value)}
                        />
                      </div>
                      
                      <div className="grid gap-6 md:grid-cols-2">
                        <PayComponentCard
                          title="Basic Pay"
                          value={selectedTemplate.basicPayPercent}
                          unit="%"
                          description="Base salary percentage"
                          color="primary"
                        />
                        <PayComponentCard
                          title="Office Score Weight"
                          value={selectedTemplate.officeScoreWeight}
                          unit="%"
                          description="Performance impact on bonus"
                          color="secondary"
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="earnings" className="space-y-6">
                    <div className="space-y-6">
                      <PercentageSlider
                        label="House Rent Allowance (HRA)"
                        value={selectedTemplate.hraPercent}
                        onChange={(val) => updateTemplateValue('hraPercent', val)}
                        description="HRA as percentage of Basic Pay"
                      />
                      <PercentageSlider
                        label="Performance Bonus"
                        value={selectedTemplate.bonusPercent}
                        onChange={(val) => updateTemplateValue('bonusPercent', val)}
                        description="Bonus percentage based on performance"
                      />
                      <PercentageSlider
                        label="Office Score Weight"
                        value={selectedTemplate.officeScoreWeight}
                        onChange={(val) => updateTemplateValue('officeScoreWeight', val)}
                        max={20}
                        description="Weight of office score in total bonus calculation"
                      />
                      
                      <Card className="border-dashed">
                        <CardContent className="pt-6">
                          <div className="space-y-2">
                            <h4 className="text-sm font-semibold">Gross Salary Calculation</h4>
                            <p className="text-sm text-muted-foreground">
                              Gross = Basic + HRA + (Basic × Bonus% × OfficeScore/10)
                            </p>
                            <div className="flex items-center gap-2 text-sm">
                              <span className="text-muted-foreground">Example with ₹50,000 basic & score 8.5:</span>
                              <span className="font-semibold text-primary">
                                ₹{(50000 + (50000 * selectedTemplate.hraPercent / 100) + (50000 * selectedTemplate.bonusPercent / 100 * 8.5 / 10)).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="deductions" className="space-y-6">
                    <div className="space-y-6">
                      <PercentageSlider
                        label="Provident Fund (PF)"
                        value={selectedTemplate.pfPercent}
                        onChange={(val) => updateTemplateValue('pfPercent', val)}
                        max={15}
                        description="PF deduction as percentage of Basic Pay"
                      />
                      <PercentageSlider
                        label="Employee State Insurance (ESI)"
                        value={selectedTemplate.esiPercent}
                        onChange={(val) => updateTemplateValue('esiPercent', val)}
                        max={5}
                        step={0.25}
                        description="ESI as percentage of Gross Salary"
                      />
                      <PercentageSlider
                        label="Tax Deducted at Source (TDS)"
                        value={selectedTemplate.tdsPercent}
                        onChange={(val) => updateTemplateValue('tdsPercent', val)}
                        max={30}
                        description="TDS percentage on Gross Salary"
                      />
                      
                      <div className="space-y-2">
                        <Label>Professional Tax (Fixed Amount)</Label>
                        <Input
                          type="number"
                          value={selectedTemplate.professionalTax}
                          onChange={(e) => updateTemplateValue('professionalTax', Number(e.target.value))}
                          className="max-w-xs"
                        />
                        <p className="text-sm text-muted-foreground">
                          Fixed monthly professional tax amount
                        </p>
                      </div>

                      <Card className="border-dashed">
                        <CardContent className="pt-6">
                          <div className="space-y-2">
                            <h4 className="text-sm font-semibold">Total Deductions Calculation</h4>
                            <p className="text-sm text-muted-foreground">
                              Deductions = PF + ESI + TDS + Professional Tax
                            </p>
                            <div className="flex items-center gap-2 text-sm">
                              <span className="text-muted-foreground">Example with ₹70,000 gross:</span>
                              <span className="font-semibold text-destructive">
                                ₹{(
                                  (50000 * selectedTemplate.pfPercent / 100) +
                                  (70000 * selectedTemplate.esiPercent / 100) +
                                  (70000 * selectedTemplate.tdsPercent / 100) +
                                  selectedTemplate.professionalTax
                                ).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
