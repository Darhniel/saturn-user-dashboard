"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { EyeIcon, EyeOffIcon, CopyIcon, WalletFundIcon, ErrorIcon, ChevronDownIcon, BankIcon, BitcoinIcon, TetherIcon, MailIcon, SuccessIcon, MoneyIcon, SaturnIcon } from "@/components/saturn/components/SVG";
import { ArrowDownTrayIcon, ArrowUpRightIcon, ArrowUpTrayIcon, BellIcon, CalendarIcon, EllipsisVerticalIcon, MagnifyingGlassIcon, PlusIcon, ReceiptPercentIcon } from "@heroicons/react/24/outline";
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'

type InvestmentDataType = {
    amount: string;
    investment: string;
    isFund: boolean;
    payment: string;
}

type RequestDataType = {
    amount: string;
    investment: string;
    isRequest: boolean;
    penalty: string;
}

const notifications = [
    {
        title: "Your Portfolio is Up 8% This Month!",
        description: "Your investments are performing well, with an 8% increase in the past 30 days.",
        time: "45mins ago",
        unread: true,
        icon: <SaturnIcon />,
        logo: true
    },
    {
        title: "Deposit Successful",
        description: "Your deposit of $50,000 has been successfully credited to your Saturn account.",
        time: "45mins ago",
        unread: true,
        icon: <ArrowUpRightIcon width={22} height={22} />,
        logo: false
    },
    {
        title: "Account Created Successfully",
        description: "Welcome to Saturn! Explore investment opportunities now.",
        time: "2hrs ago",
        unread: true,
        icon: <SaturnIcon />,
        logo: true
    }
]

export default function DashboardPage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [isAmountVisible, setIsAmountVisible] = useState(false);
    const [modal, setModal] = useState(false);
    const [fundStep, setFundStep] = useState(1);
    const [reqStep, setReqStep] = useState(1);
    const [investmentData, setInvestmentData] = useState<InvestmentDataType>({
        amount: "",
        investment: "",
        isFund: false,
        payment: "",
    });
    const [requestData, setRequestData] = useState<RequestDataType>({
        amount: "",
        investment: "",
        isRequest: false,
        penalty: "",
    });

    async function handleNext(stepData: Partial<InvestmentDataType>) {
        setInvestmentData((prev) => ({ ...prev, ...stepData }));

        setFundStep(fundStep + 1);
    }

    async function handleRequestNext(stepData: Partial<InvestmentDataType>) {
        setRequestData((prev) => ({ ...prev, ...stepData }));

        setReqStep(reqStep + 1);
    }

    const renderFundStep = () => {
        switch (fundStep) {
            case 1:
                return <InvestmentFormOne data={investmentData} onNext={handleNext} setInvestmentData={setInvestmentData} setFundStep={setFundStep} />;
            case 2:
                return <InvestmentFormTwo data={investmentData} onNext={handleNext} setInvestmentData={setInvestmentData} setFundStep={setFundStep} />;
            case 3:
                return <InvestmentFormThree data={investmentData} onNext={handleNext} setInvestmentData={setInvestmentData} setFundStep={setFundStep} />;
            case 4:
                return <InvestmentFormFour data={investmentData} onNext={handleNext} setInvestmentData={setInvestmentData} setFundStep={setFundStep} />;
            case 5:
                return <InvestmentFormFive setFundStep={setFundStep} setInvestmentData={setInvestmentData} data={investmentData} onNext={handleNext} />;
            default:
                return null;
        };
    };

    const renderReqStep = () => {
        switch (reqStep) {
            case 1:
                return <RequestFormOne data={requestData} onNext={handleRequestNext} setRequestData={setRequestData} setReqStep={setReqStep} />;
            case 2:
                return <RequestFormTwo data={requestData} onNext={handleRequestNext} setRequestData={setRequestData} setReqStep={setReqStep} />;
            case 3:
                return <RequestFormThree data={requestData} onNext={handleRequestNext} setRequestData={setRequestData} setReqStep={setReqStep} />;
            case 4:
                return <RequestFormFour data={requestData} onNext={handleRequestNext} setRequestData={setRequestData} setReqStep={setReqStep} />;
            case 5:
                return <RequestFormFive data={requestData} onNext={handleRequestNext} setRequestData={setRequestData} setReqStep={setReqStep} />;
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

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Toggle the dropdown when the bell icon is clicked
    const handleIconClick = (event: React.MouseEvent) => {
        event.stopPropagation(); // Prevent the global click handler from closing immediately
        setIsOpen(!isOpen);
    };

    // Close the dropdown when clicking anywhere outside it
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        // Add listener
        document.addEventListener('click', handleOutsideClick);

        // Cleanup
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    const handleSeeAllNotifications = () => {
        router.push('/dashboard/settings?tab=notification')
    };

    const [startDate, setStartDate] = useState(dayjs('2023-07-28'));
    // Example: base amount. In real usage, you might calculate or fetch amounts based on date range.
    const [amount, setAmount] = useState(50000);

    // Derive end date by adding 1 month to the start date
    const endDate = startDate.add(1, 'month');

    // Helper function to format date (e.g., "28 July")
    const formatDate = (dateObj: dayjs.Dayjs) => dateObj.format('D MMM');

    // Convert amount to local currency (example: 1 USD = 1,505 NGN, adjust as needed)
    const nairaAmount = amount * 1505;

    const handlePrevMonth = () => {
        const newStartDate = startDate.subtract(1, 'month');
        setStartDate(newStartDate);

        // For demonstration, we’ll just decrement the amount by 5,000 each time we go back a month.
        // You can replace this logic with an actual calculation or data fetch.
        setAmount((prev) => Math.max(prev - 5000, 0));
    };

    // Handler to go to next month
    const handleNextMonth = () => {
        const newStartDate = startDate.add(1, 'month');
        setStartDate(newStartDate);

        // For demonstration, we’ll just increment the amount by 5,000 each time we go forward a month.
        // You can replace this logic with an actual calculation or data fetch.
        setAmount((prev) => prev + 5000);
    };

    return (
        <div className="p-6">
            <header className="mb-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold text-[#101010] hidden md:block">
                        Transactions
                    </h1>
                    <Image
                        src={"/images/dashboard/logos.svg"}
                        width={112}
                        height={26}
                        alt=""
                        className="md:hidden"
                    />

                    <div className="hidden md:flex gap-3">
                        <div className="relative" ref={dropdownRef}>
                            <div
                                className='bg-[#E7E7E7] rounded-full p-4'
                                onClick={handleIconClick}
                            >
                                <BellIcon
                                    width={24}
                                    height={24}
                                />

                                {isOpen && (
                                    <div
                                        className="absolute right-0 top-full mt-2 w-80 rounded-lg border border-gray-200 bg-white shadow-md"
                                    >
                                        <div className="space-y-4">
                                            {notifications.map((notification, index) => (
                                                <div key={index} className="flex items-start justify-between p-4 rounded-lg hover:bg-gray-100 transition border-b border-gray-100">
                                                    <div className="flex items-start space-x-4">
                                                        <div className={`p-3 rounded-full ${notification.logo ? "bg-purple" : "bg-gray-300 text-gray-600"}`}>
                                                            {notification.icon}
                                                        </div>
                                                        <div>
                                                            <h3 className="font-semibold">{notification.title}</h3>
                                                            <p className={`text-sm ${notification.unread ? "text-gray-700" : "text-gray-400"}`}>
                                                                {notification.description}
                                                            </p>
                                                            <span className="text-sm text-gray-500">{notification.time}</span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        {
                                                            notification.unread && <span className="w-2.5 h-2.5 bg-purple rounded-full block"></span>
                                                        }
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <button
                                            className="w-full p-4 text-white bg-indigo-600 hover:bg-indigo-700 transition-colors rounded-b-lg"
                                            onClick={handleSeeAllNotifications}
                                        >
                                            See all Notifications
                                        </button>
                                    </div>
                                )}
                            </div>
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

                <div className="flex items-center justify-center md:justify-between">
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
                        <button
                            className="px-2 md:px-6 py-2 bg-white rounded-xl border border-[#D6D6D6] text-base font-medium text-[#101010] flex items-center gap-1"
                            onClick={() => setRequestData({ ...requestData, isRequest: true })}
                        >
                            <ArrowUpTrayIcon
                                width={24}
                                height={24}
                            />
                            Export
                        </button>

                        <button
                            className="px-6 py-2 rounded-xl bg-gradient-to-b from-[#8627FF] to-[#3F1574] text-white text-base font-medium flex items-center gap-1"
                            onClick={() => setInvestmentData({ ...investmentData, isFund: true })}
                        >
                            <PlusIcon
                                width={24}
                                height={24}
                            />
                            Fund Investment
                        </button>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded p-6 flex justify-center items-center flex-col border border-[#EBEBEB]">
                    <div className="flex flex-col items-center justify-between mb-2">
                        <div className="px-5 py-4 bg-white border border-gray-300 rounded flex gap-2 items-start mb-8">
                            <button
                                onClick={handlePrevMonth}
                                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-l"
                            >
                                &lt;
                            </button>
                            <CalendarIcon
                                width={20}
                                height={20}
                            />
                            <span className="text-[#5D5C63] text-base">
                                {formatDate(startDate)} - {formatDate(endDate)}
                            </span>
                            <button
                                onClick={handleNextMonth}
                                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-r"
                            >
                                &gt;
                            </button>
                        </div>
                    </div>
                    <p className="text-[#8C8B90] text-xl font-semibold">
                        Total Amount Invested
                    </p>
                    <div className="flex gap-2 items-baseline mb-4">
                        <span className="text-2xl font-semibold">
                            {isAmountVisible ? `$${amount.toLocaleString()}` : "*******"}
                        </span>
                        <div onClick={() => setIsAmountVisible(!isAmountVisible)} className="cursor-pointer">
                            {
                                isAmountVisible ? <EyeOffIcon /> : <EyeIcon />
                            }
                        </div>
                    </div>

                    <span className="text-xl font-medium text-[#5D5C63]">
                        {isAmountVisible ? `≈ ₦${nairaAmount.toLocaleString()}` : "***********"}
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

            <div className="bg-white rounded border border-[#EBEBEB] p-4 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Recent Transactions</h2>
                    {/* “Show” dropdown, search, or any other filter */}
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
                                <th className="p-3 text-gray-500 font-medium text-sm">Transaction ID</th>
                                <th className="p-3 text-gray-500 font-medium text-sm">Amt Invested</th>
                                <th className="p-3 text-gray-500 font-medium text-sm">Investment Type</th>
                                <th className="p-3 text-gray-500 font-medium text-sm">Payment Method</th>
                                <th className="p-3 text-gray-500 font-medium text-sm">Date & Time</th>
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
                                <td className="relative group">
                                    <EllipsisVerticalIcon
                                        width={24}
                                        height={24}
                                    />

                                    <div
                                        className="hidden group-hover:block absolute top-8 right-0 w-52 bg-white shadow-md border border-gray-100 rounded-md z-10"
                                    >
                                        <ul className="py-2 text-sm text-gray-700">
                                            <li
                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-4"
                                                onClick={() => setModal(true)}
                                            >
                                                <EyeIcon />
                                                <span>View Details</span>
                                            </li>
                                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-4">
                                                <PlusIcon
                                                    width={24}
                                                    height={24}
                                                />
                                                <span>Top Up Investment</span>
                                            </li>
                                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-4">
                                                <ArrowUpRightIcon
                                                    width={24}
                                                    height={24}
                                                />
                                                Request Payout
                                            </li>
                                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-4">
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
                                        className="hidden group-hover:block absolute top-8 right-0 w-52 bg-white shadow-md border border-gray-100 rounded-md z-10"
                                    >
                                        <ul className="py-2 text-sm text-gray-700">
                                            <li
                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-4"
                                                onClick={() => setModal(true)}
                                            >
                                                <EyeIcon />
                                                <span>View Details</span>
                                            </li>
                                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-4">
                                                <PlusIcon
                                                    width={24}
                                                    height={24}
                                                />
                                                <span>Top Up Investment</span>
                                            </li>
                                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-4">
                                                <ArrowUpRightIcon
                                                    width={24}
                                                    height={24}
                                                />
                                                Request Payout
                                            </li>
                                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-4">
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
                                        className="hidden group-hover:block absolute top-8 right-0 w-52 bg-white shadow-md border border-gray-100 rounded-md z-10"
                                    >
                                        <ul className="py-2 text-sm text-gray-700">
                                            <li
                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-4"
                                                onClick={() => setModal(true)}
                                            >
                                                <EyeIcon />
                                                <span>View Details</span>
                                            </li>
                                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-4">
                                                <PlusIcon
                                                    width={24}
                                                    height={24}
                                                />
                                                <span>Top Up Investment</span>
                                            </li>
                                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-4">
                                                <ArrowUpRightIcon
                                                    width={24}
                                                    height={24}
                                                />
                                                Request Payout
                                            </li>
                                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-4">
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
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mt-0 overflow-y-scroll"
                    onClick={() => setModal(false)}
                >
                    <div
                        className="min-w-[22rem] mx-auto max-w-[22rem] bg-white rounded-2xl shadow-md p-6 text-center"
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

            {investmentData.isFund &&
                renderFundStep()
            }

            {
                requestData.isRequest &&
                renderReqStep()
            }
        </div>
    );
}

type RequestFormProps = {
    data: RequestDataType;
    onNext: (data: Partial<RequestDataType>) => void;
    setRequestData: React.Dispatch<React.SetStateAction<RequestDataType>>;
    setReqStep: React.Dispatch<React.SetStateAction<number>>;
}

function RequestFormOne({ data, onNext, setRequestData }: RequestFormProps) {
    const [localData, setLocalData] = useState({
        amount: data.amount || "",
        investment: data.investment || "",
        penalty: data.penalty || "",
    });
    const [errors, setErrors] = useState({
        amountError: false,
        investmentError: false,
        penaltyError: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        const newLocalData = {
            ...localData,
            [name]: value,
        };

        // Validate amount
        if (name === 'amount') {
            if (value === "" || /[a-z]/.test(value) || /[A-Z]/.test(value) || /[!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?]/.test(value)) {
                setErrors(prev => ({ ...prev, amountError: true }));
            } else {
                setErrors(prev => ({ ...prev, amountError: false }));
            }
        }

        // Validate investment
        if (name === 'investment') {
            if (value === "") {
                setErrors(prev => ({ ...prev, investmentError: true }))
            } else {
                setErrors(prev => ({ ...prev, investmentError: false }))
            }
        }

        setLocalData(newLocalData);
    };

    function complete() {
        if (errors.amountError || errors.investmentError || errors.penaltyError || localData.amount === "" || localData.investment === "" || localData.penalty === "") {
            return true;
        }

        return false;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onNext(localData)
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mt-0 overflow-y-scroll"
            onClick={() => setRequestData(prev => ({ ...prev, isRequest: false }))}
        >
            <div
                className="bg-white rounded-2xl p-6 min-w-[22rem] mx-auto max-w-[22rem] mt-32 mb-4"
                onClick={(e) => { e.stopPropagation() }}
            >
                <div className="p-4 w-fit mx-auto my-4 bg-[#F3E9FF] rounded-full">
                    <WalletFundIcon fill={"#8627FF"} />
                </div>
                <h2 className="text-xl font-bold mb-2 text-center text-[#1C1B1F]">Request Payout</h2>
                <p className="text-[#8C8B90] mb-4 text-center text-sm">
                    Withdraw your investment earnings seamlessly.
                    <br />
                    Early withdrawals may incur a penalty.
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

                <form className="mt-4" onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label
                            htmlFor="amount"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Amount to Withdraw (Minimum is $500)
                        </label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            value={localData.amount}
                            onChange={handleChange}
                            placeholder="Enter Amount"
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        />
                        {errors.amountError &&
                            <div className='flex gap-1 items-center'>
                                <ErrorIcon />
                                <span className="text-sm text-[#D02A2A] font-medium">
                                    Please enter a valid withdarwal amount
                                </span>
                            </div>
                        }
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="investment"
                            className="block text-sm font-medium text-[#1F1E22]"
                        >
                            Investment to withdraw from
                        </label>
                        <div className='relative w-full'>
                            <select
                                className="appearance-none w-full p-3 border border-[#D9D9D9] text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 mb-2 cursor-pointer"
                                name='investment'
                                value={localData.investment}
                                onChange={handleChange}
                            >
                                <option value="">Select an Investment</option>
                                <option value="Bitcoin Trust Fund" className='text-[#7C7C7A]'>
                                    Bitcoin Trust Fund
                                </option>
                                <option value="Varied Asset Fund" className='text-[#7C7C7A]'>
                                    Varied Asset Fund
                                </option>
                                <option value="Specialized AI Fund" className="text-[#7C7C7A]">
                                    Specialized AI Fund
                                </option>
                            </select>

                            <div className="absolute top-[45%] right-3 -translate-y-1/2 pointer-events-none cursor-pointer">
                                <ChevronDownIcon />
                            </div>
                        </div>

                        {errors.investmentError &&
                            <div className='flex gap-1 items-center'>
                                <ErrorIcon />
                                <span className="text-sm text-[#D02A2A] font-medium">
                                    Please select a valid investment
                                </span>
                            </div>
                        }
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="investment"
                            className="block text-sm font-medium text-[#1F1E22]"
                        >
                            Where do you want to be charged the 2.5% penalty fee?
                        </label>
                        <div className='relative w-full'>
                            <select
                                className="appearance-none w-full p-3 border border-[#D9D9D9] text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 mb-2 cursor-pointer"
                                name='penalty'
                                value={localData.penalty}
                                onChange={handleChange}
                            >
                                <option value="">Select an Investment</option>
                                <option value="From Wallet Balance" className='text-[#7C7C7A]'>
                                    From Wallet Balance
                                </option>
                                <option value="From Amount Withdrawn" className='text-[#7C7C7A]'>
                                    From Amount Withdrawn
                                </option>
                            </select>

                            <div className="absolute top-[45%] right-3 -translate-y-1/2 pointer-events-none cursor-pointer">
                                <ChevronDownIcon />
                            </div>
                        </div>

                        {errors.penaltyError &&
                            <div className='flex gap-1 items-center'>
                                <ErrorIcon />
                                <span className="text-sm text-[#D02A2A] font-medium">
                                    Please select a balance
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

function RequestFormTwo({ data, onNext, setRequestData }: RequestFormProps) {
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
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mt-0 overflow-y-scroll"
                onClick={() => setRequestData(prev => ({ ...prev, isRequest: false }))}
            >
                <div
                    className="bg-white rounded-2xl p-6 px-10 min-w-[22rem] mx-auto max-w-[22rem] mt-32 mb-4"
                    onClick={(e) => { e.stopPropagation() }}
                >
                    <div className="p-4 w-fit mx-auto my-4 bg-[#F3E9FF] rounded-full">
                        <BankIcon />
                    </div>

                    <h1 className="text-xl font-bold mb-2 text-center text-[#1C1B1F]">
                        Select Payout Destination
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

                    {/* Content Section */}
                    {activeTab === "banks" ? (
                        <div className="mt-6 text-left space-y-4">
                            <div className="relative border border-purple rounded-xl p-4 bg-[#F3E9FF]">
                                <div className="font-semibold text-[#101928]">John Doe</div>
                                <div className="text-sm text-[#667185]">Opay • 8045021299</div>
                                {/* Default Label */}
                                <div className="absolute top-[-0.7rem] right-2 bg-[#F72585] text-white text-xs px-2 py-1 rounded-md">
                                    Default
                                </div>
                            </div>

                            <div className="border border-gray-200 rounded-xl p-4">
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
                        onClick={handleSubmit}
                    >
                        Proceed
                    </button>
                </div>
            </div>
        </>
    );
}

function RequestFormThree({ setRequestData }: RequestFormProps) {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    // const [isOtp, setIsOtp] = useState(false)
    const isOtp = false;
    // const [localData, setLocalData] = useState({
    //     amount: data.amount || "",
    //     investment: data.investment || "",
    //     penalty: data.penalty || "",
    // });
    // const [errors, setErrors] = useState({
    //     amountError: false,
    //     investmentError: false,
    //     penaltyError: false
    // });

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    //     const { name, value } = e.target;

    //     const newLocalData = {
    //         ...localData,
    //         [name]: value,
    //     };

    //     // Validate amount
    //     if (name === 'amount') {
    //         if (value === "" || /[a-z]/.test(value) || /[A-Z]/.test(value) || /[!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?]/.test(value)) {
    //             setErrors(prev => ({ ...prev, amountError: true }));
    //         } else {
    //             setErrors(prev => ({ ...prev, amountError: false }));
    //         }
    //     }

    //     // Validate investment
    //     if (name === 'investment') {
    //         if (value === "") {
    //             setErrors(prev => ({ ...prev, investmentError: true }))
    //         } else {
    //             setErrors(prev => ({ ...prev, investmentError: false }))
    //         }
    //     }

    //     setLocalData(newLocalData);
    // };

    const handleChange = (index: number, value: string) => {
        if (!/^[0-9]?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < otp.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    // function complete() {
    //     if (errors.amountError || errors.investmentError || errors.penaltyError || localData.amount === "" || localData.investment === "" || localData.penalty === "") {
    //         return true;
    //     }

    //     return false;
    // }

    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     onNext(localData)
    // };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mt-0"
            onClick={() => setRequestData(prev => ({ ...prev, isRequest: false }))}
        >
            <div
                className="bg-white rounded-2xl p-6 min-w-[22rem] mx-auto max-w-[22rem]"
                onClick={(e) => { e.stopPropagation() }}
            >
                {
                    isOtp ?
                        <>
                            <div className="flex justify-center">
                                <div className="p-3 w-fit mx-auto my-4 bg-[#F3E9FF] rounded-full">
                                    <MailIcon />
                                </div>
                            </div>
                            <h1 className="text-xl text-center font-bold text-[#1C1B1F]">OTP Sent to Your Email</h1>
                            <p className="text-sm text-[#8C8B90] text-center mt-1">
                                An OTP has been sent to your email. Please check your inbox and enter the code to proceed securely.
                            </p>

                            <div className="flex justify-center space-x-2 mt-6">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => { inputRefs.current[index] = el }}
                                        type="text"
                                        value={digit}
                                        onChange={(e) => handleChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        maxLength={1}
                                        className="w-12 h-12 border border-gray-300 rounded-lg text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                ))}
                            </div>

                            {/* Buttons */}
                            <div className="grid grid-cols-2 gap-4 mt-10">
                                <button
                                    type="submit"
                                    className={`w-full py-2 px-4 text-purple bg-white rounded-md border border-purple`}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className={`w-full py-2 px-4 bg-purple text-white rounded-md`}
                                >
                                    Yes, Proceed
                                </button>
                            </div>
                        </> :
                        <>
                            <div className="p-3 w-fit mx-auto my-4 bg-[#F3E9FF] rounded-full">
                                <Image
                                    src={"/images/dashboard/icon.png"}
                                    width={20}
                                    height={20}
                                    alt="icon"
                                />
                            </div>
                            <h2 className="text-xl font-bold mb-2 text-center text-[#1C1B1F]">Early Payout Penalty</h2>
                            <p className="text-[#8C8B90] mb-4 text-center text-sm">
                                Payout before the maturity date will incur a 2.5% payout penalty fee. Are you sure want to proceed?
                            </p>

                            <div className="grid grid-cols-2 gap-4 mt-10">
                                <button
                                    type="submit"
                                    className={`w-full py-2 px-4 text-purple bg-white rounded-md border border-purple`}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className={`w-full py-2 px-4 bg-purple text-white rounded-md`}
                                >
                                    Yes, Proceed
                                </button>
                            </div>
                        </>
                }

            </div>
        </div>
    )
}

function RequestFormFour({ data, setRequestData }: RequestFormProps) {
    const localData = {
        amount: data.amount || "",
        investment: data.investment || "",
        penalty: data.penalty || "",
    };
    // const [localData, setLocalData] = useState({
    //     amount: data.amount || "",
    //     investment: data.investment || "",
    //     penalty: data.penalty || "",
    // });

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mt-0"
            onClick={() => setRequestData(prev => ({ ...prev, isRequest: false }))}
        >
            <div className="min-w-[22rem] mx-auto max-w-[22rem] bg-white rounded-2xl shadow-md p-6 text-center">
                <div className="p-3 w-fit mx-auto my-4 bg-[#F3E9FF] rounded-full">
                    <WalletFundIcon />
                </div>

                <h1 className="text-xl font-bold text-gray-900">
                    Review Your Payout Details
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Carefully check your payout amount, bank details, and applicable
                    fees before proceeding.
                </p>

                <div className="mt-6 border border-gray-200 rounded-xl p-4 space-y-2 text-left">
                    <DetailRow label="Payout Amount" value={localData.amount} />
                    <DetailRow label="Bank Name" value={"Access Bank"} />
                    <DetailRow label="Account Name" value={"Adah Jonathan"} />
                    <DetailRow label="Account Number" value={"0085600249"} icon={true} />
                    <DetailRow label="Penalty Fee" value={"$250"} />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center mt-6 gap-4">
                    <button
                        className="p2 rounded-lg border border-purple text-purple font-semibold w-44"
                    >
                        Cancel
                    </button>
                    <button
                        className="p-2 rounded-lg bg-purple text-white font-semibold w-44"
                    >
                        Confirm Payout
                    </button>
                </div>
            </div>
        </div>
    )
}

function RequestFormFive({ setRequestData, setReqStep }: RequestFormProps) {
    // const [localData, setLocalData] = useState({
    //     amount: data.amount || "",
    //     investment: data.investment || "",
    //     penalty: data.penalty || "",
    // });

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mt-0"
            onClick={() => setRequestData(prev => ({ ...prev, isRequest: false }))}
        >
            <div className="min-w-[22rem] mx-auto max-w-[22rem] bg-white rounded-2xl shadow-md p-6 text-center">
                <div className="p-3 w-fit mx-auto my-4 bg-[#F3E9FF] rounded-full">
                    <SuccessIcon />
                </div>

                <h1 className="text-xl font-bold text-gray-900">
                    Payout Successful 🎉
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Your funds have been sent to the selected destination. Check your balance for confirmation.
                </p>

                <button
                    className="p-2 rounded-lg border border-[#D6D6D6] text-[#1C1B1F] font-semibold w-40 mt-6"
                    onClick={() => { setRequestData(prev => ({ ...prev, isRequest: false })); setReqStep(1) }}
                >
                    Close
                </button>
            </div>
        </div>
    )
}

type InvestmentFormProps = {
    data: InvestmentDataType;
    onNext: (data: Partial<InvestmentDataType>) => void;
    setInvestmentData: React.Dispatch<React.SetStateAction<InvestmentDataType>>;
    setFundStep: React.Dispatch<React.SetStateAction<number>>;
};
function InvestmentFormOne({ data, onNext, setInvestmentData }: InvestmentFormProps) {
    const [localData, setLocalData] = useState({
        amount: data.amount || "",
        investment: data.investment || ""
    })

    const [errors, setErrors] = useState({
        amountError: false,
        investmentError: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        const newLocalData = {
            ...localData,
            [name]: value,
        };

        // Validate amount
        if (name === 'amount') {
            if (value === "" || /[a-z]/.test(value) || /[A-Z]/.test(value) || /[!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?]/.test(value)) {
                setErrors(prev => ({ ...prev, amountError: true }));
            } else {
                setErrors(prev => ({ ...prev, amountError: false }));
            }
        }

        // Validate investment
        if (name === 'investment') {
            if (value === "") {
                setErrors(prev => ({ ...prev, investmentError: true }))
            } else {
                setErrors(prev => ({ ...prev, investmentError: false }))
            }
        }

        setLocalData(newLocalData);
    };

    function complete() {
        if (errors.amountError || errors.investmentError || localData.amount === "" || localData.investment === "") {
            return true;
        }

        return false;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onNext(localData)
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mt-0"
            onClick={() => setInvestmentData(prev => ({ ...prev, isFund: false }))}
        >
            <div
                className="bg-white rounded-2xl p-6 w-full max-w-[22rem] "
                onClick={(e) => { e.stopPropagation() }}
            >
                <div className="p-4 w-fit mx-auto my-4 bg-[#F3E9FF] rounded-full">
                    <MoneyIcon />
                </div>
                <h2 className="text-xl font-bold mb-2 text-center text-[#1C1B1F]">Fund Investment</h2>
                <p className="text-[#8C8B90] mb-4 text-center text-sm">
                    Add funds to grow your investment and maximize your returns.
                </p>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="investment"
                            className="block text-sm font-medium text-[#1F1E22]"
                        >
                            Investment to Add Funds
                        </label>
                        <div className='relative w-full'>
                            <select
                                className="appearance-none w-full p-3 border border-[#D9D9D9] text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 mb-2 cursor-pointer"
                                name='investment'
                                value={localData.investment}
                                onChange={handleChange}
                            >
                                <option value="">Select an Investment</option>
                                <option value="Bitcoin Trust Fund" className='text-[#7C7C7A]'>
                                    Bitcoin Trust Fund
                                </option>
                                <option value="Varied Asset Fund" className='text-[#7C7C7A]'>
                                    Varied Asset Fund
                                </option>
                                <option value="Specialized AI Fund" className="text-[#7C7C7A]">
                                    Specialized AI Fund
                                </option>
                            </select>

                            <div className="absolute top-[45%] right-3 -translate-y-1/2 pointer-events-none cursor-pointer">
                                <ChevronDownIcon />
                            </div>
                        </div>

                        {errors.investmentError &&
                            <div className='flex gap-1 items-center'>
                                <ErrorIcon />
                                <span className="text-sm text-[#D02A2A] font-medium">
                                    Please select a valid investment
                                </span>
                            </div>
                        }
                    </div>
                    <div>
                        <label
                            htmlFor="amount"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Amount to Invest
                        </label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            value={localData.amount}
                            onChange={handleChange}
                            placeholder="Enter Amount"
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        />
                        {errors.amountError &&
                            <div className='flex gap-1 items-center'>
                                <ErrorIcon />
                                <span className="text-sm text-[#D02A2A] font-medium">
                                    Please enter a valid investment amount
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

function InvestmentFormTwo({ data, onNext, setInvestmentData }: InvestmentFormProps) {
    const [localData, setLocalData] = useState({
        amount: data.amount,
        investment: data.investment,
        payment: data.payment || ""
    })

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onNext(localData)
        console.log(localData)
    };

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        const newLocalData = {
            ...localData,
            [name]: value
        };

        if (name === "investment") {
            if (value === "") {

            }
        }

        setLocalData(newLocalData)
    }

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mt-0"
            onClick={() => setInvestmentData(prev => ({ ...prev, isFund: false }))}
        >
            <div
                className="bg-white rounded-2xl p-6 w-full max-w-[22rem]"
                onClick={(e) => { e.stopPropagation() }}
            >
                <div className="p-4 w-fit mx-auto my-4 bg-[#F3E9FF] rounded-full">
                    <MoneyIcon />
                </div>
                <h2 className="text-2xl font-bold text-center">Select Payment Method</h2>
                <p className="mt-2 text-gray-600 text-center">
                    Choose your preferred payment method to complete the transaction securely.
                </p>

                <form onSubmit={handleSubmit} className="mt-6">
                    <label className={`w-full flex items-center mb-4 cursor-pointer rounded-xl border p-4 ${localData.payment === "Bank Transfer" ? "border-[#AE6EFF] bg-[#F3E9FF]" : "border-[#EBEBEB]"}`}>
                        <div className="relative">
                            <input
                                type="radio"
                                id="bankTransfer"
                                name="payment"
                                value="Bank Transfer"
                                className="peer mb-3 block h-5 w-5 cursor-pointer appearance-none opacity-0 border-gray-300 focus:ring-purple"
                                checked={localData.payment === "Bank Transfer"}
                                onChange={handleChange}
                            />
                            <div className="absolute top-1 h-5 w-5 rounded-full border border-[#D0D5DD] transition-all peer-checked:border-purple"></div>
                            <div className="absolute left-1 top-2 h-3 w-3 rounded-full peer-checked:block peer-checked:bg-purple"></div>
                        </div>
                        <span className={`text-base ml-4 ${localData.payment === "Bank Transfer" ? "font-semibold text-purple" : "text-gray-800"}`}>
                            Bank Transfer
                        </span>
                    </label>

                    <label className={`w-full flex items-center mb-4 cursor-pointer rounded-xl border p-4 ${localData.payment === "crypto" ? "border-[#AE6EFF] bg-[#F3E9FF]" : "border-[#EBEBEB]"}`}>
                        <div className="relative">
                            <input
                                type="radio"
                                id="crypto"
                                name="payment"
                                value="Cryptocurrency"
                                className="peer mb-3 block h-5 w-5 cursor-pointer appearance-none opacity-0 border-gray-300 focus:ring-purple"
                                checked={localData.payment === "crypto"}
                                onChange={handleChange}
                            />
                            <div className="absolute top-1 h-5 w-5 rounded-full border border-[#D0D5DD] transition-all peer-checked:border-purple"></div>
                            <div className="absolute left-1 top-2 h-3 w-3 rounded-full peer-checked:block peer-checked:bg-purple"></div>
                        </div>
                        <span className={`text-base ml-4 ${localData.payment === "crypto" ? "font-semibold text-purple" : "text-gray-800"}`}>
                            Cryptocurrency
                        </span>
                    </label>

                    <button
                        type="submit"
                        className={`w-full py-2 px-4 ${localData.payment === "oldUser" ? "bg-gray-400" : "bg-purple"} text-white rounded hover:bg-purple-700 transition-colors`}
                        disabled={localData.payment === ""}
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
            <span className="font-medium">{label}</span>
            <span className="flex gap-2 items-center">
                {value}
                {
                    icon && <CopyIcon />
                }
            </span>
        </div>
    );
}

function InvestmentFormThree({ data, onNext, setInvestmentData }: InvestmentFormProps) {
    const newBalance = "Adah Jonathan";
    const maturityDate = "20-07-2026";
    const expectedReturns = 250;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mt-0 overflow-y-scroll"
            onClick={() => setInvestmentData(prev => ({ ...prev, isFund: false }))}
        >
            <div
                className="w-full max-w-[22rem] bg-white rounded-xl shadow-md p-6 mt-32 mb-4"
                onClick={(e) => { e.stopPropagation() }}
            >
                <div className="p-4 w-fit mx-auto my-4 bg-[#F3E9FF] rounded-full">
                    <WalletFundIcon />
                </div>


                <h1 className="text-xl font-bold text-center text-[#1C1B1F]">
                    Review Top Up Details
                </h1>
                <p className="text-sm text-center text-[#8C8B90] mt-2">
                    Double-check your top-up amount and payment details before proceeding.
                </p>

                <div className="text-center mt-6">
                    <p className="text-[#8C8B90] text-xs">Total Amount Invested</p>
                    <p className="text-2xl font-bold text-[#1C1B1F] mt-1">
                        ${data.amount.toLocaleString()}
                    </p>
                </div>

                <div className="border border-[#E7E7E7] bg-[#FBFBFB] rounded-xl py-5 px-3 mt-6 space-y-2">
                    <DetailRow label="Investment Name" value={data.investment} icon={false} />
                    <DetailRow label="Current Balance" value={`$${data.amount.toLocaleString()}`} icon={false} />
                    <DetailRow label="New Balance" value={newBalance} icon={false} />
                    <DetailRow label="Maturity Date" value={maturityDate} icon={false} />
                    <DetailRow label="Expected Returns" value={`$${expectedReturns}`} icon={false} />
                    <DetailRow label="Payment Method" value={data.payment} icon={false} />
                </div>

                <div className="bg-[#D9BCFF] rounded-xl p-3 mt-5 text-sm text-[#5F1CB5]">
                    <p>
                        <strong>Note:</strong> Your new balance and expected returns will be
                        updated after successful payment.
                    </p>
                </div>

                <button
                    className="mt-12 w-full py-3 rounded-xl bg-purple text-white font-semibold transition-colors"
                    onClick={() => onNext(data)}
                >
                    Proceed to Top Up
                </button>
            </div>
        </div>
    )
}

function InvestmentFormFour({ data, onNext, setInvestmentData }: InvestmentFormProps) {
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mt-0"
            onClick={() => setInvestmentData(prev => ({ ...prev, isFund: false }))}
        >
            <div
                className="w-full max-w-[22rem] bg-white rounded-xl shadow-md p-6"
                onClick={(e) => { e.stopPropagation() }}
            >
                <div className="p-4 w-fit mx-auto my-4 bg-[#F3E9FF] rounded-full">
                    <WalletFundIcon />
                </div>


                <h1 className="text-xl font-bold text-center text-[#1C1B1F]">
                    Top Up Account
                </h1>
                <p className="text-sm text-center text-[#8C8B90] mt-2">
                    Below is the account details to make your payment.
                </p>

                <div className="text-center mt-6">
                    <p className="text-[#8C8B90] text-xs">Total Amount Invested</p>
                    <p className="text-2xl font-bold text-[#1C1B1F] mt-1">
                        ${data.amount.toLocaleString()}
                    </p>
                </div>

                <div className="border border-[#E7E7E7] bg-[#FBFBFB] rounded-xl py-5 px-3 mt-6">
                    <DetailRow label="Bank Name" value={"Zenith Bank"} icon={false} />
                    <DetailRow label="Account Name" value={`Saturn Investment Venture`} icon={false} />
                    <DetailRow label="Account Number" value={"0123456789"} icon={true} />
                </div>

                <button
                    className="mt-12 w-full py-3 rounded-xl bg-purple text-white font-semibold transition-colors"
                    onClick={() => onNext(data)}
                >
                    I&apos;ve done the Transfer
                </button>
            </div>
        </div>
    )
}

function InvestmentFormFive({ setFundStep, setInvestmentData }: InvestmentFormProps) {
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mt-0"
            onClick={() => { setInvestmentData(prev => ({ ...prev, amount: "", investment: "", isFund: false, payment: "" })); setFundStep(1) }}
        >
            <div
                className="w-full max-w-sm bg-white rounded-xl shadow-md p-6"
                onClick={(e) => { e.stopPropagation() }}
            >
                <div className="p-4 w-fit mx-auto my-4 bg-[#F3E9FF] rounded-full">
                    <SuccessIcon />
                </div>

                <h2 className="font-bold text-xl text-center text-[#1C1B1F]">
                    Investment Activated Successfully
                </h2>
                <p className="text-sm text-center text-[#8C8B90] mt-2">
                    Your funds have been received, and your investment plan is now active. Track your returns and performance on your dashboard.
                </p>
                <button
                    className="mt-12 w-full py-3 rounded-xl bg-purple text-white font-semibold transition-colors"
                    onClick={() => { setInvestmentData(prev => ({ ...prev, amount: "", investment: "", isFund: false, payment: "" })); setFundStep(1) }}
                >
                    Track Investment
                </button>
            </div>
        </div>
    )
}