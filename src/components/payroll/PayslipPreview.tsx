interface PayslipSection {
  id: string;
  label: string;
  enabled: boolean;
  customLabel?: string;
}

interface PayslipPreviewProps {
  sections: PayslipSection[];
  companyName: string;
}

const sampleData = {
  employee: {
    name: 'Asha Patel',
    code: 'WZ-1001',
    designation: 'Senior Product Manager',
    department: 'Product',
    joiningDate: '2024-03-01',
  },
  period: 'October 2025',
  earnings: {
    basic: 50000,
    hra: 20000,
    bonus: 4250,
    other: 2000,
  },
  deductions: {
    pf: 6000,
    esi: 562,
    professionalTax: 200,
    tds: 7625,
  },
  officeScore: 8.5,
};

export function PayslipPreview({ sections, companyName }: PayslipPreviewProps) {
  const isEnabled = (id: string) => sections.find(s => s.id === id)?.enabled;
  const getLabel = (id: string) => sections.find(s => s.id === id)?.customLabel || sections.find(s => s.id === id)?.label;

  const grossPay = Object.values(sampleData.earnings).reduce((sum, val) => sum + val, 0);
  const totalDeductions = Object.values(sampleData.deductions).reduce((sum, val) => sum + val, 0);
  const netPay = grossPay - totalDeductions;

  return (
    <div className="space-y-4 bg-white p-8 text-gray-900">
      {/* Header */}
      {isEnabled('company_logo') && (
        <div className="border-b pb-4 text-center">
          <div className="mb-2 inline-flex h-16 w-16 items-center justify-center rounded-lg bg-primary text-2xl font-bold text-white">
            WZ
          </div>
          <h1 className="text-2xl font-bold">{companyName}</h1>
          <p className="text-sm text-gray-600">PAYSLIP FOR {sampleData.period.toUpperCase()}</p>
        </div>
      )}

      {/* Employee Information */}
      {isEnabled('employee_info') && (
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">{getLabel('employee_info')}</h2>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Name:</span>
              <span className="font-medium">{sampleData.employee.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Employee Code:</span>
              <span className="font-medium">{sampleData.employee.code}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Designation:</span>
              <span className="font-medium">{sampleData.employee.designation}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Department:</span>
              <span className="font-medium">{sampleData.employee.department}</span>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {/* Earnings */}
        {isEnabled('earnings') && (
          <div className="space-y-2 rounded-lg border p-4">
            <h2 className="font-semibold">{getLabel('earnings')}</h2>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Basic Pay</span>
                <span>₹{sampleData.earnings.basic.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>HRA</span>
                <span>₹{sampleData.earnings.hra.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Bonus</span>
                <span>₹{sampleData.earnings.bonus.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Other</span>
                <span>₹{sampleData.earnings.other.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t pt-1 font-semibold">
                <span>Gross Pay</span>
                <span>₹{grossPay.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        {/* Deductions */}
        {isEnabled('deductions') && (
          <div className="space-y-2 rounded-lg border p-4">
            <h2 className="font-semibold">{getLabel('deductions')}</h2>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Provident Fund</span>
                <span>₹{sampleData.deductions.pf.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>ESI</span>
                <span>₹{sampleData.deductions.esi.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Professional Tax</span>
                <span>₹{sampleData.deductions.professionalTax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>TDS</span>
                <span>₹{sampleData.deductions.tds.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t pt-1 font-semibold text-red-600">
                <span>Total Deductions</span>
                <span>₹{totalDeductions.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Office Score & Bonus */}
      {isEnabled('bonuses') && (
        <div className="space-y-2 rounded-lg border p-4">
          <h2 className="font-semibold">{getLabel('bonuses')}</h2>
          <div className="flex items-center justify-between text-sm">
            <span>Office Performance Score</span>
            <span className="text-lg font-bold text-primary">{sampleData.officeScore}/10</span>
          </div>
          <p className="text-xs text-gray-600">
            Performance bonus of ₹{sampleData.earnings.bonus.toLocaleString()} calculated based on office score
          </p>
        </div>
      )}

      {/* Net Pay */}
      {isEnabled('net_pay') && (
        <div className="rounded-lg bg-primary/10 p-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Net Payable Amount</span>
            <span className="text-2xl font-bold text-primary">₹{netPay.toLocaleString()}</span>
          </div>
          <p className="mt-1 text-xs text-gray-600">Amount will be credited to your bank account</p>
        </div>
      )}

      {/* CTC Breakdown */}
      {isEnabled('ctc') && (
        <div className="space-y-2 rounded-lg border p-4">
          <h2 className="font-semibold">{getLabel('ctc')}</h2>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Annual CTC</span>
              <span className="font-semibold">₹{(grossPay * 12).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>Fixed Component</span>
              <span>₹{((sampleData.earnings.basic + sampleData.earnings.hra) * 12).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>Variable Component</span>
              <span>₹{((sampleData.earnings.bonus + sampleData.earnings.other) * 12).toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      {/* Employer Contributions */}
      {isEnabled('employer_contributions') && (
        <div className="space-y-2 rounded-lg border p-4">
          <h2 className="font-semibold">{getLabel('employer_contributions')}</h2>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Employer PF</span>
              <span>₹{sampleData.deductions.pf.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Employer ESI</span>
              <span>₹{(sampleData.deductions.esi * 1.5).toFixed(0)}</span>
            </div>
          </div>
        </div>
      )}

      {/* YTD Summary */}
      {isEnabled('ytd_summary') && (
        <div className="space-y-2 rounded-lg border p-4">
          <h2 className="font-semibold">{getLabel('ytd_summary')}</h2>
          <div className="grid grid-cols-3 gap-4 text-center text-sm">
            <div>
              <p className="text-xs text-gray-600">YTD Gross</p>
              <p className="font-semibold">₹{(grossPay * 8).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600">YTD Deductions</p>
              <p className="font-semibold text-red-600">₹{(totalDeductions * 8).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600">YTD Net</p>
              <p className="font-semibold text-primary">₹{(netPay * 8).toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}

      {/* Notes */}
      {isEnabled('notes') && (
        <div className="rounded-lg bg-gray-50 p-4 text-xs text-gray-600">
          <p className="font-semibold">Note:</p>
          <p>This is a computer-generated payslip and does not require a signature. For any queries, please contact HR department.</p>
        </div>
      )}

      {/* Signatures */}
      {isEnabled('signatures') && (
        <div className="flex justify-between border-t pt-4 text-xs">
          <div className="text-center">
            <div className="mb-8"></div>
            <p className="font-semibold">Employee Signature</p>
          </div>
          <div className="text-center">
            <div className="mb-8"></div>
            <p className="font-semibold">Authorized Signatory</p>
          </div>
        </div>
      )}
    </div>
  );
}
