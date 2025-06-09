"use client"
import Button from "@/components/ui/button/Button";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import { useState } from "react";

interface UpdatePaymentModalProps {
  isOpen: boolean;
  closeModal: () => void;
  handleSave: (data: PaymentDetails) => void;
  initialData: PaymentDetails;
}

interface PaymentDetails {
  bankName: string;
  accountNumber: string;
  ifsc: string;
  mode: string;
  paymentDate: string;
}

const bankOptions = ["State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank", "Punjab National Bank"];

export default function UpdatePaymentModal({
  isOpen,
  closeModal,
  handleSave,
  initialData,
}: UpdatePaymentModalProps) {
  const [paymentData, setPaymentData] = useState<PaymentDetails>({
    accountNumber:"756546546546",
    bankName:"ICICI Bank",
    ifsc:"IBFS122",
    mode:"NEFT",
    paymentDate:"2025-20-20"
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleChange = (key: keyof PaymentDetails, value: string) => {
    setPaymentData((prev) => ({ ...prev, [key]: value }));
  };

  return (
      <div className="no-scrollbar relative w-full  overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Update Payment Details
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            Modify your bank and transaction details.
          </p>
        </div>

        <form className="flex flex-col">
          <div className="custom-scrollbar max-h-[400px] overflow-y-auto px-2 pb-3">
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
              <div className="relative">
                <Label>Bank Name</Label>
                <button
                  type="button"
                  className="dropdown-toggle w-full rounded-md border px-4 py-2 text-left text-sm text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  {paymentData.bankName}
                </button>
                <Dropdown isOpen={dropdownOpen} onClose={() => setDropdownOpen(false)}>
                  {bankOptions.map((bank) => (
                    <DropdownItem
                      key={bank}
                      onItemClick={() => {
                        handleChange("bankName", bank);
                        setDropdownOpen(false);
                      }}
                      baseClassName="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      {bank}
                    </DropdownItem>
                  ))}
                </Dropdown>
              </div>

              <div>
                <Label>Account Number</Label>
                <Input
                  type="text"
                  defaultValue={paymentData.accountNumber}
                  onChange={(e) => handleChange("accountNumber", e.target.value)}
                />
              </div>

              <div>
                <Label>IFSC</Label>
                <Input
                  type="text"
                  defaultValue={paymentData.ifsc}
                  onChange={(e) => handleChange("ifsc", e.target.value)}
                />
              </div>

              <div>
                <Label>Payment Mode</Label>
                <Input
                  type="text"
                  defaultValue={paymentData.mode}
                  onChange={(e) => handleChange("mode", e.target.value)}
                />
              </div>

              <div>
                <Label>Payment Date</Label>
                <Input
                  type="date"
                  defaultValue={paymentData.paymentDate}
                  onChange={(e) => handleChange("paymentDate", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button size="sm" variant="outline" onClick={closeModal}>
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={() => handleSave(paymentData)}
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>

  );
}
