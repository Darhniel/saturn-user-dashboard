"use client";
import { useState } from "react";
import Image from "next/image";
import { EyeIcon, EyeOffIcon, CopyIcon, MoneyIcon, ErrorIcon, SuccessIcon, BankIcon, BitcoinIcon, TetherIcon } from "@/components/saturn/components/SVG";
import { ArrowUpTrayIcon, ArrowDownTrayIcon, ArrowUpRightIcon, PlusIcon, ReceiptPercentIcon, MagnifyingGlassIcon, BellIcon, CalendarIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";

type ReInvestDataType = {
    investmentPlan: string;
    investmentAmount: string;
    isReinvest: boolean;
}

type WithdrawalDataType = {
    investmentPlan: string;
    withdrawalAmount: string;
    isWithdrawal: boolean;
    bankName: string;
    accountName: string;
    accountNumber: string
}

export default function DashboardPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isAmountVisible, setIsAmountVisible] = useState(false);
    const [modal, setModal] = useState(false);
    const [reinvestStep, setReinvestStep] = useState(1);
    const [withdrawalStep, setWithdrawalStep] = useState(1);

    const [reinvestData, setReinvestData] = useState<ReInvestDataType>({
        investmentPlan: "",
        investmentAmount: "",
        isReinvest: false
    });

    const [withdrawalData, setWithdrawalData] = useState<WithdrawalDataType>({
        investmentPlan: "",
        withdrawalAmount: "",
        isWithdrawal: false,
        bankName: "",
        accountName: "",
        accountNumber: ""
    });

    async function handleReinvestNext(stepData: Partial<ReInvestDataType>) {
        setReinvestData((prev) => ({ ...prev, ...stepData }));

        setReinvestStep(reinvestStep + 1);
    }

    async function handleWithdrawalNext(stepData: Partial<WithdrawalDataType>) {
        setWithdrawalData((prev) => ({ ...prev, ...stepData }));

        setWithdrawalStep(withdrawalStep + 1);
    }

    const renderReinvestStep = () => {
        switch (reinvestStep) {
            case 1:
                return <ReinvestFormOne data={reinvestData} onNext={handleReinvestNext} setReinvestData={setReinvestData} setReinvestStep={setReinvestStep} />;
            case 2:
                return <ReinvestFormTwo data={reinvestData} onNext={handleReinvestNext} setReinvestData={setReinvestData} setReinvestStep={setReinvestStep} />;
            case 3:
                return <ReinvestFormThree data={reinvestData} onNext={handleReinvestNext} setReinvestData={setReinvestData} setReinvestStep={setReinvestStep} />;
            case 4:
                return <ReinvestFormFour data={reinvestData} onNext={handleReinvestNext} setReinvestData={setReinvestData} setReinvestStep={setReinvestStep} />;
            default:
                return null;
        };
    };

    const renderWithdrawalStep = () => {
        switch (withdrawalStep) {
            case 1:
                return <WithdrawalFormOne data={withdrawalData} onNext={handleWithdrawalNext} setWithdrawalData={setWithdrawalData} setWithdrawalStep={setWithdrawalStep} />;
            case 2:
                return <WithdrawalFormTwo data={withdrawalData} onNext={handleWithdrawalNext} setWithdrawalData={setWithdrawalData} setWithdrawalStep={setWithdrawalStep} />;
            case 3:
                return <WithdrawalFormThree data={withdrawalData} onNext={handleWithdrawalNext} setWithdrawalData={setWithdrawalData} setWithdrawalStep={setWithdrawalStep} />;
            case 4:
                return <WithdrawalFormFour data={withdrawalData} onNext={handleWithdrawalNext} setWithdrawalData={setWithdrawalData} setWithdrawalStep={setWithdrawalStep} />;
            case 5:
                return <WithdrawalFormFive data={withdrawalData} onNext={handleWithdrawalNext} setWithdrawalData={setWithdrawalData} setWithdrawalStep={setWithdrawalStep} />;
            default:
                return null;
        };
    };


    function DetailRow({ label, value, icon }: { label: string, value: string, icon?: boolean }) {
        return (
            <div className="flex justify-between text-sm text-black mb-4">
                <span className="">{label}</span>
                <span className={`flex gap-2 items-center ${label === "Transaction ID" ? "font-bold text-purple text-base" : "font-semibold"}`}>
                    {value}
                    {
                        icon && <CopyIcon />
                    }
                </span>
            </div>
        );
    }

    return (
        <div className="p-6">
            <header className="mb-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold text-[#101010] hidden md:block">
                        Earnings & Returns
                    </h1>
                    <Image
                        src={"/images/dashboard/logos.svg"}
                        width={112}
                        height={26}
                        alt=""
                        className="md:hidden"
                    />

                    <div className="hidden md:flex gap-3">
                        <div className='bg-[#E7E7E7] rounded-full p-4'>
                            <BellIcon
                                width={24}
                                height={24}
                            />
                        </div>

                        <div className="flex items-center ml-4 space-x-2">
                            <div className="h-10 w-10 bg-gray-400 rounded-full flex items-center justify-center">
                                <div className="bg-[#CCC1F0] rounded-full">
                                    <Image
                                        src={"/images/dashboard/avatar.png"}
                                        width={40}
                                        height={40}
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div>
                                <p className="font-medium text-sm">Sandra Vivian</p>
                                <p className="text-xs text-gray-500">devign@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:flex items-center justify-center md:justify-between">
                    <div className="relative hidden md:block">
                        <div className="w-6 h-6 absolute left-2 top-2">
                            <MagnifyingGlassIcon
                                width={20}
                                height={20}
                            />
                        </div>
                        <input
                            type="text"
                            placeholder="Search anything here"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-[#F7F9FC] w-full"
                        />
                    </div>

                    <div className="flex gap-3">
                        <button className="px-2 md:px-6 py-2 bg-white rounded-xl border border-[#D6D6D6] text-base font-medium text-[#101010] flex items-center gap-1">
                            <ArrowUpTrayIcon
                                width={24}
                                height={24}
                            />
                            Export
                        </button>

                        <button className="px-2 md:px-6 py-2 rounded-xl bg-gradient-to-b from-[#8627FF] to-[#3F1574] text-white text-base font-medium flex items-center gap-1">
                            <PlusIcon
                                width={24}
                                height={24}
                            />
                            Fund Investment
                        </button>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded shadow p-6 flex justify-center items-center flex-col border border-[#EBEBEB]">
                    <div className="flex flex-col items-center justify-between mb-2">
                        <div className="px-5 py-4 bg-white border border-gray-300 rounded flex gap-2 items-start mb-8">
                            <CalendarIcon
                                width={20}
                                height={20}
                            />
                            <span className="text-[#5D5C63] text-base">
                                28 July - 28 Aug
                            </span>
                        </div>
                    </div>
                    <p className="text-[#8C8B90] text-xl font-semibold">
                        Total Investment Value
                    </p>
                    <div className="flex gap-2 items-baseline mb-4">
                        <span className="text-2xl font-semibold">
                            {isAmountVisible ? "$50,000" : "*******"}
                        </span>
                        <div onClick={() => setIsAmountVisible(!isAmountVisible)} className="cursor-pointer">
                            {
                                isAmountVisible ? <EyeOffIcon /> : <EyeIcon />
                            }
                        </div>
                    </div>

                    <span className="text-xl font-medium text-[#5D5C63]">
                        ≈ ₦75,280,500
                    </span>
                </div>

                {/* Right Card: Investment Value (chart placeholder) */}
                <div className="bg-white rounded shadow p-6">
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-gray-500">Transaction Chart</p>
                        {/* Maybe a small dropdown or date filter for the chart */}
                    </div>
                    {/* Simple placeholder for the chart */}
                    <div className="h-36 bg-purple-50 rounded flex items-center justify-center">
                        <p className="text-purple-500">[ Chart Placeholder ]</p>
                    </div>
                    {/* Chart year labels (optional) */}
                    <div className="flex justify-between mt-2 text-xs text-gray-400">
                        <span>2023</span>
                        <span>2024</span>
                        <span>2025</span>
                        <span>2026</span>
                        <span>2027</span>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded shadow p-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Recent Earnings & Returns</h2>
                    <div className="flex items-center space-x-2 text-sm">
                        <span className="text-gray-500">Show:</span>
                        <select className="border border-gray-300 rounded px-2 py-1 focus:outline-none">
                            <option>5</option>
                            <option>10</option>
                            <option>25</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-3 text-gray-500 font-medium text-sm">Investment Type</th>
                                <th className="p-3 text-gray-500 font-medium text-sm">Amt Invested</th>
                                <th className="p-3 text-gray-500 font-medium text-sm">Total Earning</th>
                                <th className="p-3 text-gray-500 font-medium text-sm">Return Rate</th>
                                <th className="p-3 text-gray-500 font-medium text-sm">Monthly Date & Time</th>
                                <th className="p-3 text-gray-500 font-medium text-sm">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b last:border-0">
                                <td className="p-3 text-sm text-purple">INV-20250115-001</td>
                                <td className="p-3 text-sm text-gray-700">
                                    $500,000
                                </td>
                                <td className="p-3 text-sm text-gray-700">
                                    Bitcoin Trust Funds
                                </td>
                                <td className="p-3 text-sm text-gray-700">
                                    Bank Transfer
                                </td>
                                <td className="p-3 text-sm text-gray-700">
                                    25 Feb, 2025  10:45 AM
                                </td>
                                <td className="p-3 text-sm">
                                    <span className="p-2 text-xs bg-green-100 text-green-700 rounded-xl">
                                        Active
                                    </span>
                                </td>
                                <td className="relative group cursor-pointer">
                                    <EllipsisVerticalIcon
                                        width={24}
                                        height={24}
                                    />

                                    <div
                                        className="hidden group-hover:block absolute top-16 md:top-8 right-0 w-52 bg-white shadow-md border border-gray-100 rounded-md z-10"
                                    >
                                        <ul className="py-2 text-sm text-gray-700">
                                            <li
                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                                                onClick={() => setModal(true)}
                                            >
                                                <EyeIcon />
                                                <span>View Details</span>
                                            </li>
                                            <li
                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                                                onClick={() => setReinvestData({ ...reinvestData, isReinvest: true })}
                                            >
                                                <PlusIcon
                                                    width={24}
                                                    height={24}
                                                />
                                                <span>Top Up with Returns</span>
                                            </li>
                                            <li
                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                                                onClick={() => setWithdrawalData({ ...withdrawalData, isWithdrawal: true })}
                                            >
                                                <ArrowUpRightIcon
                                                    width={24}
                                                    height={24}
                                                />
                                                Request Payout
                                            </li>
                                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                                                <ArrowDownTrayIcon
                                                    width={24}
                                                    height={24}
                                                />
                                                Download Receipt
                                            </li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                            <tr className="border-b last:border-0">
                                <td className="p-3 text-sm text-purple">INV-20250115-001</td>
                                <td className="p-3 text-sm text-gray-700">
                                    $500,000
                                </td>
                                <td className="p-3 text-sm text-gray-700">
                                    Bitcoin Trust Funds
                                </td>
                                <td className="p-3 text-sm text-gray-700">
                                    Bank Transfer
                                </td>
                                <td className="p-3 text-sm text-gray-700">
                                    25 Feb, 2025  10:45 AM
                                </td>
                                <td className="p-3 text-sm">
                                    <span className="p-2 text-xs bg-[#E8B55D] text-[#7A4F07] rounded-xl">
                                        Pending
                                    </span>
                                </td>
                                <td className="relative group">
                                    <EllipsisVerticalIcon
                                        width={24}
                                        height={24}
                                    />

                                    <div
                                        className="hidden group-hover:block absolute top-16 md:top-8 right-0 w-52 bg-white shadow-md border border-gray-100 rounded-md z-10"
                                    >
                                        <ul className="py-2 text-sm text-gray-700">
                                            <li
                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                                                onClick={() => setModal(true)}
                                            >
                                                <EyeIcon />
                                                <span>View Details</span>
                                            </li>
                                            <li
                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                                                onClick={() => setReinvestData({ ...reinvestData, isReinvest: true })}
                                            >
                                                <PlusIcon
                                                    width={24}
                                                    height={24}
                                                />
                                                <span>Top Up with Returns</span>
                                            </li>
                                            <li
                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                                                onClick={() => setWithdrawalData({ ...withdrawalData, isWithdrawal: true })}
                                            >
                                                <ArrowUpRightIcon
                                                    width={24}
                                                    height={24}
                                                />
                                                Request Payout
                                            </li>
                                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                                                <ArrowDownTrayIcon
                                                    width={24}
                                                    height={24}
                                                />
                                                Download Receipt
                                            </li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                            <tr className="border-b last:border-0">
                                <td className="p-3 text-sm text-purple">INV-20250115-001</td>
                                <td className="p-3 text-sm text-gray-700">
                                    $500,000
                                </td>
                                <td className="p-3 text-sm text-gray-700">
                                    Bitcoin Trust Funds
                                </td>
                                <td className="p-3 text-sm text-gray-700">
                                    Bank Transfer
                                </td>
                                <td className="p-3 text-sm text-gray-700">
                                    25 Feb, 2025  10:45 AM
                                </td>
                                <td className="p-3 text-sm">
                                    <span className="p-2 text-xs bg-green-100 text-green-700 rounded-xl">
                                        Active
                                    </span>
                                </td>
                                <td className="relative group">
                                    <EllipsisVerticalIcon
                                        width={24}
                                        height={24}
                                    />

                                    <div
                                        className="hidden group-hover:block absolute top-16 md:top-8 right-0 w-52 bg-white shadow-md border border-gray-100 rounded-md z-10"
                                    >
                                        <ul className="py-2 text-sm text-gray-700">
                                            <li
                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                                                onClick={() => setModal(true)}
                                            >
                                                <EyeIcon />
                                                <span>View Details</span>
                                            </li>
                                            <li
                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                                                onClick={() => setReinvestData({ ...reinvestData, isReinvest: true })}
                                            >
                                                <PlusIcon
                                                    width={24}
                                                    height={24}
                                                />
                                                <span>Top Up with Returns</span>
                                            </li>
                                            <li
                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                                                onClick={() => setWithdrawalData({ ...withdrawalData, isWithdrawal: true })}
                                            >
                                                <ArrowUpRightIcon
                                                    width={24}
                                                    height={24}
                                                />
                                                Request Payout
                                            </li>
                                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                                                <ArrowDownTrayIcon
                                                    width={24}
                                                    height={24}
                                                />
                                                Download Receipt
                                            </li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>

            {
                modal &&
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-scroll"
                    onClick={() => setModal(false)}
                >
                    <div
                        className="min-w-[22rem] mx-auto max-w-md bg-white rounded-2xl shadow-md p-6 text-center"
                        onClick={(e) => { e.stopPropagation() }}
                    >
                        {/* Icon */}
                        <div className="p-4 w-fit mx-auto my-4 bg-[#F3E9FF] rounded-full">
                            <ReceiptPercentIcon
                                color="#8627FF"
                                width={24}
                                height={24}
                            />
                        </div>

                        <h1 className="text-xl font-bold text-center text-[#1C1B1F]">Transaction Details</h1>
                        <p className="text-sm text-center text-[#8C8B90] mt-2">
                            View a detailed breakdown of your transaction.
                        </p>

                        {/* Amount */}
                        <div className="mt-6 text-3xl font-bold text-gray-800">$50,000</div>

                        {/* Details Card */}
                        <div className="border border-gray-200 rounded-xl p-4 mt-6 space-y-2 text-left">
                            <DetailRow label="Transaction ID" value="TRX-20250115-001" />
                            <DetailRow label="Investment Name" value="The Bitcoin Fund" />
                            <DetailRow label="Current Balance" value="$50,000" />
                            <DetailRow label="New Balance" value="Adah Jonathan" />
                            <DetailRow label="Maturity Date" value="20-07-2026" />
                            <DetailRow label="Expected Returns" value="$250" />
                            <DetailRow label="Payment Method" value="Bank Transfer" />
                        </div>

                        <button
                            className="mt-6 w-full py-3 rounded-xl bg-purple text-white font-semibold transition-colors"
                        >
                            Download PDF
                        </button>
                    </div>
                </div>
            }

            {
                reinvestData.isReinvest &&
                renderReinvestStep()
            }

            {
                withdrawalData.isWithdrawal &&
                renderWithdrawalStep()
            }
        </div>
    );
}

type ReinvestFormProps = {
    data: ReInvestDataType;
    onNext: (data: Partial<ReInvestDataType>) => void;
    setReinvestData: React.Dispatch<React.SetStateAction<ReInvestDataType>>;
    setReinvestStep: React.Dispatch<React.SetStateAction<number>>;
}

function ReinvestFormOne({ data, onNext, setReinvestData }: ReinvestFormProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(data);
        onNext(data)
    };
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-scroll"
            onClick={() => setReinvestData({ ...data, isReinvest: false })}
        >
            <div
                className="min-w-[22rem] mx-auto max-w-md p-6 bg-white rounded-lg shadow"
                onClick={(e) => { e.stopPropagation() }}
            >
                <div className="p-4 w-fit mx-auto my-4 bg-[#F3E9FF] rounded-full">
                    <MoneyIcon />
                </div>
                <h2 className="text-2xl font-bold text-center">
                    Select Investment for Reinvestment
                </h2>
                <p className="mt-2 text-gray-600 text-center">
                    Select the investment plan where you want to reinvest your returns for continued growth.
                </p>

                <form onSubmit={handleSubmit} className="mt-6">
                    <label className={`w-full flex items-center mb-4 cursor-pointer rounded-xl border p-4 ${data.investmentPlan === "Bitcoin Funds" ? "border-[#AE6EFF] bg-[#F3E9FF]" : "border-[#EBEBEB]"}`}>
                        <div className="relative">
                            <input
                                type="radio"
                                name="investmentPlan"
                                value="Bitcoin Funds"
                                className="peer mb-3 block h-5 w-5 cursor-pointer appearance-none opacity-0 border-gray-300 focus:ring-purple"
                                checked={data.investmentPlan === "Bitcoin Funds"}
                                onChange={() => setReinvestData({ ...data, investmentPlan: 'Bitcoin Funds' })}
                            />
                            <div className="absolute top-1 h-5 w-5 rounded-full border border-[#D0D5DD] transition-all peer-checked:border-purple"></div>
                            <div className="absolute left-1 top-2 h-3 w-3 rounded-full peer-checked:block peer-checked:bg-purple"></div>
                        </div>
                        <span className={`text-base ml-4 ${data.investmentPlan === "Bitcoin Funds" ? " text-purple" : "text-gray-800"}`}>
                            Bitcoin Funds
                        </span>
                    </label>

                    <label className={`w-full flex items-center mb-4 cursor-pointer rounded-xl border p-4 ${data.investmentPlan === "Varied Assets Funds" ? "border-[#AE6EFF] bg-[#F3E9FF]" : "border-[#EBEBEB]"}`}>
                        <div className="relative">
                            <input
                                type="radio"
                                name="investmentPlan"
                                value="Varied Assets Funds"
                                className="peer mb-3 block h-5 w-5 cursor-pointer appearance-none opacity-0 border-gray-300 focus:ring-purple"
                                checked={data.investmentPlan === "Varied Assets Funds"}
                                onChange={() => setReinvestData({ ...data, investmentPlan: 'Varied Assets Funds' })}
                            />
                            <div className="absolute top-1 h-5 w-5 rounded-full border border-[#D0D5DD] transition-all peer-checked:border-purple"></div>
                            <div className="absolute left-1 top-2 h-3 w-3 rounded-full peer-checked:block peer-checked:bg-purple"></div>
                        </div>
                        <span className={`text-base ml-4 ${data.investmentPlan === "Varied Assets Funds" ? " text-purple" : "text-gray-800"}`}>
                            Varied Assets Funds
                        </span>
                    </label>

                    <label className={`w-full flex items-center mb-4 cursor-pointer rounded-xl border p-4 ${data.investmentPlan === "Specialized AI Funds" ? "border-[#AE6EFF] bg-[#F3E9FF]" : "border-[#EBEBEB]"}`}>
                        <div className="relative">
                            <input
                                type="radio"
                                name="investmentPlan"
                                value="Specialized AI Funds"
                                className="peer mb-3 block h-5 w-5 cursor-pointer appearance-none opacity-0 border-gray-300 focus:ring-purple"
                                checked={data.investmentPlan === "Specialized AI Funds"}
                                onChange={() => setReinvestData({ ...data, investmentPlan: 'Specialized AI Funds' })}
                            />
                            <div className="absolute top-1 h-5 w-5 rounded-full border border-[#D0D5DD] transition-all peer-checked:border-purple"></div>
                            <div className="absolute left-1 top-2 h-3 w-3 rounded-full peer-checked:block peer-checked:bg-purple"></div>
                        </div>
                        <span className={`text-base ml-4 ${data.investmentPlan === "Specialized AI Funds" ? " text-purple" : "text-gray-800"}`}>
                            Specialized AI Funds
                        </span>
                    </label>

                    <button
                        type="submit"
                        className={`w-full py-2 px-4 ${data.investmentPlan === "" ? "bg-gray-400" : "bg-purple"} text-white rounded hover:bg-purple-700 transition-colors`}
                        disabled={data.investmentPlan === ""}
                    >
                        Proceed
                    </button>
                </form>
            </div>
        </div>
    )
}

function ReinvestFormTwo({ data, onNext, setReinvestData }: ReinvestFormProps) {
    const [errors, setErrors] = useState({
        amountError: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        // Validate amount
        if (name === 'investmentAmount') {
            if (value === "" || /[a-z]/.test(value) || /[A-Z]/.test(value) || /[!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?]/.test(value)) {
                setErrors(prev => ({ ...prev, amountError: true }));
            } else {
                setErrors(prev => ({ ...prev, amountError: false }));
            }
        }

        setReinvestData({ ...data, [name]: value });
    };

    function complete() {
        if (errors.amountError || data.investmentAmount === "") {
            return true;
        }

        return false;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onNext(data)
    };
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-scroll"
            onClick={() => setReinvestData({ ...data, isReinvest: false })}
        >
            <div
                className="min-w-[22rem] mx-auto max-w-md p-6 bg-white rounded-lg shadow  mt-24 mb-4"
                onClick={(e) => { e.stopPropagation() }}
            >
                <div className="p-4 w-fit mx-auto my-4 bg-[#F3E9FF] rounded-full">
                    <MoneyIcon />
                </div>
                <h2 className="text-2xl font-bold text-center">
                    Top Up With Returns
                </h2>
                <p className="mt-2 text-gray-600 text-center">
                    Boost your investment by adding your earned returns and watch your wealth grow.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-[#F3E9FF] border border-[#D9BCFF] rounded-xl p-4 text-center">
                        <p className="text-sm font-bold text-[#1C1B1F] my-4 sm:my-0">$50,000</p>
                        <p className="text-xs text-[#8C8B90]">Current Investment</p>
                    </div>
                    <div className="bg-[#F3E9FF] border border-[#D9BCFF] rounded-xl p-4 text-center">
                        <p className="text-sm font-bold text-[#1C1B1F] my-2 m:my-0">31st of Mar, 2025</p>
                        <p className="text-xs text-[#8C8B90]">Next Withdrawal Day</p>
                    </div>
                </div>

                <p className="text-[#8C8B90] font-semibold text-xs text-center mt-7">
                    Returns Amount
                </p>
                <p className="mt-1 font-bold text-2xl text-[#1C1B1F] text-center">
                    $50,000
                </p>

                <form onSubmit={handleSubmit} className="mt-6">
                    <div className="mb-6">
                        <label
                            htmlFor="investmentAmount"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Amount to Re-Invest
                        </label>
                        <input
                            type="number"
                            id="investmentAmount"
                            name="investmentAmount"
                            value={data.investmentAmount}
                            onChange={handleChange}
                            placeholder="Enter Amount"
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        />
                        {errors.amountError &&
                            <div className='flex gap-1 items-center mt-1'>
                                <ErrorIcon />
                                <span className="text-sm text-[#D02A2A] font-medium">
                                    Please enter a valid investment amount
                                </span>
                            </div>
                        }
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-2 px-4 ${complete() ? "bg-[#D9D9D9]" : "bg-purple"} text-white rounded-md`}
                        disabled={complete()}
                    >
                        Proceed
                    </button>
                </form>
            </div>
        </div>
    )
}

function DetailRow({ label, value, icon }: { label: string, value: string, icon?: boolean }) {
    return (
        <div className="flex justify-between text-sm text-black mb-4">
            <span className="">{label}</span>
            <span className={`flex gap-2 items-center ${label === "Transaction ID" ? "font-bold text-purple text-base" : "font-semibold"}`}>
                {value}
                {
                    icon && <CopyIcon />
                }
            </span>
        </div>
    );
}

function ReinvestFormThree({ data, onNext, setReinvestData }: ReinvestFormProps) {
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-scroll"
            onClick={() => setReinvestData({ ...data, isReinvest: false })}
        >
            <div
                className="min-w-[22rem] mx-auto max-w-md p-6 bg-white rounded-lg shadow  mt-24 mb-4"
                onClick={(e) => { e.stopPropagation() }}
            >
                <div className="p-4 w-fit mx-auto my-4 bg-[#F3E9FF] rounded-full">
                    <MoneyIcon />
                </div>
                <h2 className="text-2xl font-bold text-center">
                    Review Top Up Details
                </h2>
                <p className="mt-2 text-gray-600 text-center">
                    Double-check your top-up amount and payment details before proceeding.
                </p>

                <p className="text-[#8C8B90] font-semibold text-xs text-center mt-7">
                    Total Amount Invested
                </p>
                <p className="mt-1 font-bold text-2xl text-[#1C1B1F] text-center">
                    $50,000
                </p>

                <div className="border border-gray-200 rounded-xl p-4 mt-6 space-y-2 text-left">
                    <DetailRow label="Investment Name" value={data.investmentPlan} />
                    <DetailRow label="Current Balance" value="$50,000" />
                    <DetailRow label="Reinvested Amount" value={`$${data.investmentAmount}`} />
                    <DetailRow label="New Balance(After Top Up)" value={"$50,000"} />
                    <DetailRow label="Maturity Date" value="20-07-2026" />
                    <DetailRow label="New Expected Returns" value="$250" />
                </div>

                <div className="p-3 rounded-lg bg-[#F3E9FF] border border-[#D9BCFF] mt-5">
                    <p className="text-[#5F1CB5] text-sm font-semibold">
                        Note: Your new balance and expected returns will be updated after successful payment.
                    </p>
                </div>

                <button
                    type="button"
                    className={`w-full py-2 px-4 bg-purple text-white rounded-md mt-12`}
                    onClick={() => onNext(data)}
                >
                    Proceed to Top Up
                </button>
            </div>
        </div>
    )
}

function ReinvestFormFour({ data, setReinvestData }: ReinvestFormProps) {
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-scroll"
            onClick={() => setReinvestData({ ...data, isReinvest: false })}
        >
            <div
                className="text-center border-2 min-w-[22rem] mx-auto max-w-md p-6 bg-white rounded-2xl shadow mb-4"
                onClick={(e) => { e.stopPropagation() }}
            >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-50 mx-auto mb-6">
                    <SuccessIcon />
                </div>
                <h2 className="text-xl font-bold mb-2 text-gray-800">
                    Top Up Successful
                </h2>
                <p className="text-gray-500 mb-10">
                    Your reinvestment has been successfully processed. Your new balance and expected returns have been updated. Keep growing your investment!
                </p>

                <button
                    type="button"
                    className={`py-2 px-4 bg-white border border-[#D6D6D6] text-[#1C1B1F] rounded-md w-40`}
                >
                    Close
                </button>
            </div>
        </div>
    )
}

type WithdrawalFormProps = {
    data: WithdrawalDataType;
    onNext: (data: Partial<WithdrawalDataType>) => void;
    setWithdrawalData: React.Dispatch<React.SetStateAction<WithdrawalDataType>>;
    setWithdrawalStep: React.Dispatch<React.SetStateAction<number>>;
}

function WithdrawalFormOne({ data, onNext, setWithdrawalData }: WithdrawalFormProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(data);
        onNext(data)
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-scroll"
            onClick={() => setWithdrawalData({ ...data, isWithdrawal: false })}
        >
            <div
                className="min-w-[22rem] mx-auto max-w-md p-4 bg-white rounded-lg shadow"
                onClick={(e) => { e.stopPropagation() }}
            >
                <div className="p-4 w-fit mx-auto my-4 bg-[#F3E9FF] rounded-full">
                    <MoneyIcon />
                </div>
                <h2 className="text-2xl font-bold text-center">
                    Select Plan to Withdraw From
                </h2>
                <p className="mt-2 text-gray-600 text-center">
                    Choose the specific investment plan from which you want to withdraw returns.
                </p>

                <form onSubmit={handleSubmit} className="mt-6">
                    <label className={`w-full flex items-center mb-4 cursor-pointer rounded-xl border p-4 ${data.investmentPlan === "Bitcoin Funds" ? "border-[#AE6EFF] bg-[#F3E9FF]" : "border-[#EBEBEB]"}`}>
                        <div className="relative">
                            <input
                                type="radio"
                                name="investmentPlan"
                                value="Bitcoin Funds"
                                className="peer mb-3 block h-5 w-5 cursor-pointer appearance-none opacity-0 border-gray-300 focus:ring-purple"
                                checked={data.investmentPlan === "Bitcoin Funds"}
                                onChange={() => setWithdrawalData({ ...data, investmentPlan: 'Bitcoin Funds' })}
                            />
                            <div className="absolute top-1 h-5 w-5 rounded-full border border-[#D0D5DD] transition-all peer-checked:border-purple"></div>
                            <div className="absolute left-1 top-2 h-3 w-3 rounded-full peer-checked:block peer-checked:bg-purple"></div>
                        </div>
                        <div className={`text-base ml-4 w-full flex justify-between ${data.investmentPlan === "Bitcoin Funds" ? " text-purple" : "text-gray-800"}`}>
                            <div>
                                Bitcoin Funds
                            </div>
                            <div>
                                $200,000
                            </div>
                        </div>
                    </label>

                    <label className={`w-full flex items-center mb-4 cursor-pointer rounded-xl border p-4 ${data.investmentPlan === "Varied Assets Funds" ? "border-[#AE6EFF] bg-[#F3E9FF]" : "border-[#EBEBEB]"}`}>
                        <div className="relative">
                            <input
                                type="radio"
                                name="investmentPlan"
                                value="Varied Assets Funds"
                                className="peer mb-3 block h-5 w-5 cursor-pointer appearance-none opacity-0 border-gray-300 focus:ring-purple"
                                checked={data.investmentPlan === "Varied Assets Funds"}
                                onChange={() => setWithdrawalData({ ...data, investmentPlan: 'Varied Assets Funds' })}
                            />
                            <div className="absolute top-1 h-5 w-5 rounded-full border border-[#D0D5DD] transition-all peer-checked:border-purple"></div>
                            <div className="absolute left-1 top-2 h-3 w-3 rounded-full peer-checked:block peer-checked:bg-purple"></div>
                        </div>
                        <div className={`text-base ml-4 w-full flex justify-between ${data.investmentPlan === "Varied Assets Funds" ? " text-purple" : "text-gray-800"}`}>
                            <div>Varied Assets Funds</div>
                            <div>$200,000</div>
                        </div>
                    </label>

                    <label className={`w-full flex items-center mb-4 cursor-pointer rounded-xl border p-4 ${data.investmentPlan === "Specialized AI Funds" ? "border-[#AE6EFF] bg-[#F3E9FF]" : "border-[#EBEBEB]"}`}>
                        <div className="relative">
                            <input
                                type="radio"
                                name="investmentPlan"
                                value="Specialized AI Funds"
                                className="peer mb-3 block h-5 w-5 cursor-pointer appearance-none opacity-0 border-gray-300 focus:ring-purple"
                                checked={data.investmentPlan === "Specialized AI Funds"}
                                onChange={() => setWithdrawalData({ ...data, investmentPlan: 'Specialized AI Funds' })}
                            />
                            <div className="absolute top-1 h-5 w-5 rounded-full border border-[#D0D5DD] transition-all peer-checked:border-purple"></div>
                            <div className="absolute left-1 top-2 h-3 w-3 rounded-full peer-checked:block peer-checked:bg-purple"></div>
                        </div>
                        <div className={`text-base ml-4 w-full flex justify-between ${data.investmentPlan === "Specialized AI Funds" ? " text-purple" : "text-gray-800"}`}>
                            <div>Specialized AI Funds</div>
                            <div>$200,000</div>
                        </div>
                    </label>

                    <button
                        type="submit"
                        className={`w-full py-2 px-4 ${data.investmentPlan === "" ? "bg-gray-400" : "bg-purple"} text-white rounded hover:bg-purple-700 transition-colors`}
                        disabled={data.investmentPlan === ""}
                    >
                        Proceed
                    </button>
                </form>
            </div>
        </div>
    )
}

function WithdrawalFormTwo({ data, onNext, setWithdrawalData }: WithdrawalFormProps) {
    const [errors, setErrors] = useState({
        amountError: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        // Validate amount
        if (name === 'withdrawalAmount') {
            if (value === "" || /[a-z]/.test(value) || /[A-Z]/.test(value) || /[!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?]/.test(value)) {
                setErrors(prev => ({ ...prev, amountError: true }));
            } else {
                setErrors(prev => ({ ...prev, amountError: false }));
            }
        }

        setWithdrawalData({ ...data, [name]: value });
    };

    function complete() {
        if (errors.amountError || data.withdrawalAmount === "") {
            return true;
        }

        return false;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onNext(data)
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setWithdrawalData(prev => ({ ...prev, isWithdrawal: false }))}
        >
            <div
                className="bg-white rounded-2xl p-6 min-w-[22rem] mx-auto max-w-md "
                onClick={(e) => { e.stopPropagation() }}
            >
                <div className="p-4 w-fit mx-auto my-4 bg-[#F3E9FF] rounded-full">
                    <MoneyIcon />
                </div>
                <h2 className="text-xl font-bold mb-2 text-center text-[#1C1B1F]">
                    Enter Withdrawal Amount
                </h2>
                <p className="text-[#8C8B90] mb-4 text-center text-sm">
                    Specify the amount you wish to withdraw from your available returns. Ensure the amount is within your eligible balance.
                </p>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="amount"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Withdrawal Amount
                        </label>
                        <input
                            type="number"
                            name="withdrawalAmount"
                            value={data.withdrawalAmount}
                            onChange={handleChange}
                            placeholder="Enter Amount"
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        />
                        {errors.amountError &&
                            <div className='flex gap-1 items-center'>
                                <ErrorIcon />
                                <span className="text-sm text-[#D02A2A] font-medium">
                                    Please enter a valid withdrawal amount
                                </span>
                            </div>
                        }
                    </div>
                    <button
                        type="submit"
                        className={`w-full py-2 px-4 ${complete() ? "bg-[#D9D9D9]" : "bg-purple"} text-white rounded-md hover:bg-purple-700`}
                        disabled={complete()}
                    >
                        Proceed
                    </button>
                </form>
            </div>
        </div>
    )
}

function WithdrawalFormThree({ data, onNext, setWithdrawalData }: WithdrawalFormProps) {
    const [activeTab, setActiveTab] = useState("banks");

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onNext(data)
    };

    return (
        <>

            <div
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-scroll"
                onClick={() => setWithdrawalData({ ...data, isWithdrawal: false })}
            >
                <div
                    className="bg-white rounded-2xl p-6 px-10 min-w-[22rem] mx-auto max-w-md mt-32 mb-4"
                    onClick={(e) => { e.stopPropagation() }}
                >
                    <div className="p-4 w-fit mx-auto my-4 bg-[#F3E9FF] rounded-full">
                        <BankIcon />
                    </div>

                    <h1 className="text-xl font-bold mb-2 text-center text-[#1C1B1F]">
                        Select Withdrawal Destination
                    </h1>
                    <p className="text-[#8C8B90] mb-4 text-center text-sm">
                        Choose the bank account where you want to receive your payout securely.
                    </p>

                    <div className="flex justify-center items-center space-x-2 mt-6 bg-[#FEE9F3] py-1 border border-[#FDBBD9] rounded-lg">
                        <button
                            onClick={() => handleTabChange("banks")}
                            className={`px-4 py-2 text-sm font-medium rounded-lg
                    ${activeTab === "banks"
                                    ? "bg-white border border-[#FFDDED] text-[#E12279]"
                                    : "text-[#FA6DAD]"
                                }`}
                        >
                            Nigerian Banks
                        </button>
                        <button
                            onClick={() => handleTabChange("wallet")}
                            className={`px-4 py-2 text-sm font-medium rounded-lg
                    ${activeTab === "wallet"
                                    ? "bg-white border border-[#FFDDED] text-[#E12279]"
                                    : "text-[#FA6DAD]"
                                }`}
                        >
                            Wallet Address
                        </button>
                    </div>

                    {activeTab === "banks" ? (
                        <div className="mt-6 text-left space-y-4">
                            <div
                                className="relative border border-purple rounded-xl p-4 bg-[#F3E9FF]"
                                onClick={() => setWithdrawalData({ ...data, bankName: "Opay", accountName: "John Doe", accountNumber: "8045021299" })}
                            >
                                <div className="font-semibold text-[#101928]">John Doe</div>
                                <div className="text-sm text-[#667185]">Opay • 8045021299</div>
                                {/* Default Label */}
                                <div className="absolute top-[-0.7rem] right-2 bg-[#F72585] text-white text-xs px-2 py-1 rounded-md">
                                    Default
                                </div>
                            </div>

                            <div
                                className="border border-gray-200 rounded-xl p-4"
                                onClick={() => setWithdrawalData({ ...data, bankName: "Kuda Bank", accountName: "John Doe", accountNumber: "1159426194" })}
                            >
                                <div className="font-semibold text-[#101928]">John Doe</div>
                                <div className="text-sm text-gray-500">Kuda Bank • 1159426194</div>
                            </div>

                            <div className="text-center">
                                <button className="text-purple font-medium hover:underline">
                                    + Add New Bank
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="mt-6 text-left space-y-4">
                            <div className="relative border border-purple rounded-xl p-3 bg-[#F3E9FF] flex items-center">
                                <div className="p-3 w-fit mx-auto my-4 bg-[#F7931A] rounded-full">
                                    <BitcoinIcon />
                                </div>
                                <div className="overflow-wrap w-4/5">
                                    <div className="font-semibold text-[#101928]">
                                        1FTaXpGAZDaZ5h2BCSAJyeFjGivGB
                                    </div>
                                    <div className="text-sm text-[#667185]">
                                        Bitcoin
                                    </div>
                                </div>
                                <div className="absolute top-[-0.7rem] right-2 bg-[#F72585] text-white text-xs px-2 py-1 rounded-md">
                                    Default
                                </div>
                            </div>

                            <div className="border border-gray-200 rounded-xl p-3 flex items-center">
                                <div className="w-fit mx-auto my-4">
                                    <TetherIcon />
                                </div>
                                <div className="overflow-wrap w-4/5">
                                    <div className="font-semibold text-[#101928]">
                                        1FTaXpGAZDaZ5h2BCSAJyeFjGivGB
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        USDT
                                    </div>
                                </div>
                            </div>

                            <div className="text-center">
                                <button className="text-purple font-medium hover:underline">
                                    + Add New Address
                                </button>
                            </div>
                        </div>
                    )}

                    <button
                        className="mt-6 w-full py-3 rounded-xl bg-purple text-white font-semibold transition-colors"
                        onClick={() => handleSubmit}
                    >
                        Proceed
                    </button>
                </div>
            </div>
        </>
    );
}

function WithdrawalFormFour({ data, onNext, setWithdrawalData }: WithdrawalFormProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onNext(data)
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setWithdrawalData(prev => ({ ...prev, isWithdrawal: false }))}
        >
            <div className="min-w-[22rem] mx-auto max-w-md bg-white rounded-2xl shadow-md p-6 text-center">
                <div className="p-3 w-fit mx-auto my-4 bg-[#F3E9FF] rounded-full">
                    <MoneyIcon />
                </div>

                <h1 className="text-xl font-bold text-gray-900">
                    Review Withdrawal Details
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Double-check your top-up amount and payment details before proceeding.
                </p>
                <p className="text-[#8C8B90] text-xs text-center">Amount to withdraw</p>
                <p className="font-bold text-center text-2xl">{`$${data.withdrawalAmount}`}</p>

                <div className="mt-6 border border-gray-200 rounded-xl p-4 space-y-2 text-left">
                    <DetailRow
                        label="Withdrawal Fee"
                        value={"₦1,500"}
                    />
                    <DetailRow
                        label="Amount to Receive"
                        value={`₦ ${data.withdrawalAmount}`}
                    />
                    <DetailRow
                        label="Withdrawal Method"
                        value={"Bank Transfer"}
                    />
                    <DetailRow label="Receiving Bank Name" value={data.bankName} />
                    <DetailRow label="Account Name" value={data.accountName} />
                    <DetailRow label="Account Number" value={data.accountNumber} />
                </div>

                <button
                    className="p-2 rounded-lg bg-purple text-white font-semibold w-full"
                    onClick={handleSubmit}
                >
                    Proceed to Withdraw
                </button>
            </div>
        </div>
    )
}

function WithdrawalFormFive({ data, setWithdrawalData, setWithdrawalStep }: WithdrawalFormProps) {
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-scroll"
            onClick={() => setWithdrawalData({ ...data, isWithdrawal: false })}
        >
            <div
                className="text-center border-2 min-w-[22rem] mx-auto max-w-md p-6 bg-white rounded-2xl shadow mb-4"
                onClick={(e) => { e.stopPropagation() }}
            >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-50 mx-auto mb-6">
                    <SuccessIcon />
                </div>
                <h2 className="text-xl font-bold mb-2 text-gray-800">
                    Withdrawal Successful 🎉
                </h2>
                <p className="text-gray-500 mb-10">
                    Your withdrawal request has been processed successfully. The funds will be credited to your selected bank account shortly.
                </p>

                <button
                    type="button"
                    className={`py-2 px-4 bg-white border border-[#D6D6D6] text-[#1C1B1F] rounded-md w-40`}
                    onClick={() => { setWithdrawalData({ ...data, isWithdrawal: false }); setWithdrawalStep(1) }}
                >
                    Close
                </button>
            </div>
        </div>
    )
}

{/* <div
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-scroll"
    onClick={() => setReinvestData({ ...data, isReinvest: false })}
>
    <div
        className="min-w-[22rem] mx-auto max-w-md p-6 bg-white rounded-lg shadow  mt-24 mb-4"
        onClick={(e) => { e.stopPropagation() }}
    >
        <div className="p-4 w-fit mx-auto my-4 bg-[#F3E9FF] rounded-full">
            <MoneyIcon />
        </div>
        <h2 className="text-2xl font-bold text-center">
            Earning Details
        </h2>
        <p className="mt-2 text-gray-600 text-center">
            View a comprehensive breakdown of your earning.
        </p>

        <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-[#F3E9FF] border border-[#D9BCFF] rounded-xl p-4 text-center">
                <p className="text-sm font-bold text-[#1C1B1F] my-4 sm:my-0">$50,000</p>
                <p className="text-xs text-[#8C8B90]">Total Amount Invested</p>
            </div>
            <div className="bg-[#F3E9FF] border border-[#D9BCFF] rounded-xl p-4 text-center">
                <p className="text-sm font-bold text-[#1C1B1F] my-2 m:my-0">31st of Mar, 2025</p>
                <p className="text-xs text-[#8C8B90]">Next Withdrawal Day</p>
            </div>
        </div>

        <p className="text-[#8C8B90] font-semibold text-xs text-center mt-7">
            Amount Withdrawn
        </p>
        <p className="mt-1 font-bold text-2xl text-[#1C1B1F] text-center">
            $10,000
        </p>

        <div className="mt-6 border border-gray-200 rounded-xl p-4 space-y-2 text-left">
            <DetailRow
                label="Investment Name"
                value={"The Bitcoin Fund"}
            />
            <DetailRow
                label="Start Date"
                value={`20-07-2025`}
            />
            <DetailRow
                label="Maturity Date"
                value={"20-07-2026"}
            />
            <DetailRow 
                label="Interest Rate" 
                value={"12%"} 
            />
            <DetailRow 
                label="Total Expected Returns" 
                value={"$2,050"} 
            />
        </div>

    </div>
</div> */}