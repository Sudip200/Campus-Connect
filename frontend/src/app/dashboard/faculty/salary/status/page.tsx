import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";

export default function Salary() {
  const salaryBreakdown = [
    { title: "Basic Pay", amount: 30000 },
    { title: "HRA", amount: 12000 },
    { title: "DA", amount: 5000 },
    { title: "Other Allowances", amount: 3000 },
    { title: "Gross Salary", amount: 50000, highlight: true },
    { title: "Provident Fund (PF)", amount: -2000 },
    { title: "TDS", amount: -1000 },
    { title: "Net Salary", amount: 47000, highlight: true },
  ];

  const paymentDetails = {
    bankName: "State Bank of India",
    accountNumber: "XXXXXX1234",
    ifsc: "SBIN0001234",
    mode: "NEFT",
    paymentDate: "2025-06-05",
  };

  const salaryHistory = [
    { month: "June 2025", gross: 50000, deductions: 3000, net: 47000, status: "Paid" },
    { month: "May 2025", gross: 50000, deductions: 3000, net: 47000, status: "Paid" },
    { month: "April 2025", gross: 50000, deductions: 3000, net: 47000, status: "Pending" },
  ];

  return (
    <div className="space-y-6  mx-auto px-4 py-8 dark:bg-gray-900 dark:text-white">
        <ComponentCard title="Salary Breakdown" desc="This includes base pay and allowances.">
        <ul className="space-y-2 text-sm">
          {salaryBreakdown.map((item, idx) => (
            <li key={idx} className="flex justify-between">
              <span>{item.title}</span>
              <span className={item.highlight ? "font-bold text-brand-600 dark:text-brand-400" : ""}>
                ₹ {item.amount.toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      </ComponentCard>

      {/* Payment Info */}
      <ComponentCard title="Payment Details" desc="Bank and payment transaction info.">
        <ul className="space-y-2 text-sm">
          <li className="flex justify-between">
            <span>Bank</span>
            <span>{paymentDetails.bankName}</span>
          </li>
          <li className="flex justify-between">
            <span>Account</span>
            <span>{paymentDetails.accountNumber}</span>
          </li>
          <li className="flex justify-between">
            <span>IFSC</span>
            <span>{paymentDetails.ifsc}</span>
          </li>
          <li className="flex justify-between">
            <span>Payment Mode</span>
            <span>{paymentDetails.mode}</span>
          </li>
          <li className="flex justify-between">
            <span>Payment Date</span>
            <span>{paymentDetails.paymentDate}</span>
          </li>
        </ul>
      </ComponentCard>
      <ComponentCard title="Payslip" desc="Download your monthly salary slip.">
        <div className="flex items-center justify-between gap-2">
          <select className="border rounded-md px-3 py-2 text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white">
            <option>June 2025</option>
            <option>May 2025</option>
            <option>April 2025</option>
          </select>
          <Button>Download PDF</Button>
        </div>
      </ComponentCard>
      {/* Salary History */}
      <ComponentCard title="Salary History" desc="Overview of previous months.">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border border-gray-200 dark:border-gray-700 dark:bg-gray-900">
            <thead className="bg-gray-100 dark:bg-gray-800 dark:text-gray-200">
              <tr>
                <th className="px-4 py-2">Month</th>
                <th className="px-4 py-2">Gross</th>
                <th className="px-4 py-2">Deductions</th>
                <th className="px-4 py-2">Net Pay</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {salaryHistory.map((item, idx) => (
                <tr key={idx} className="border-t border-gray-200 dark:border-gray-700">
                  <td className="px-4 py-2">{item.month}</td>
                  <td className="px-4 py-2">₹ {item.gross.toLocaleString()}</td>
                  <td className="px-4 py-2">₹ {item.deductions.toLocaleString()}</td>
                  <td className="px-4 py-2 font-medium">₹ {item.net.toLocaleString()}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        item.status === "Paid"
                          ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ComponentCard>
    </div>
  );
}
