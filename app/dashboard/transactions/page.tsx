"use client";
import { useState } from "react";
import Image from "next/image";
import { EyeIcon, EyeOffIcon, CopyIcon } from "@/components/saturn/components/SVG";
import { ArrowDownTrayIcon, ArrowUpRightIcon, ArrowUpTrayIcon, BellIcon, CalendarIcon, EllipsisVerticalIcon, MagnifyingGlassIcon, PlusIcon, ReceiptPercentIcon,  } from "@heroicons/react/24/outline";

export default function DashboardPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isAmountVisible, setIsAmountVisible] = useState(false);
    const [modal, setModal] = useState(false)

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
                        <button className="px-2 md:px-6 py-2 bg-white rounded-xl border border-[#D6D6D6] text-base font-medium text-[#101010] flex items-center gap-1">
                            <ArrowUpTrayIcon
                                width={24}
                                height={24}
                            />
                            Export
                        </button>

                        <button className="px-6 py-2 rounded-xl bg-gradient-to-b from-[#8627FF] to-[#3F1574] text-white text-base font-medium flex items-center gap-1">
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
        </div>
    );
}