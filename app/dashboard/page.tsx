"use client";
import { useState } from "react";
import Image from "next/image";
import { EyeIcon, EyeOffIcon } from "@/components/saturn/components/SVG";
import { ArrowUpTrayIcon, PlusIcon, CalendarIcon, ArrowUpRightIcon, MagnifyingGlassIcon, EllipsisVerticalIcon, BellIcon } from "@heroicons/react/24/outline";

export default function DashboardPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isAmountVisible, setIsAmountVisible] = useState(false);

    return (
        <div className="p-6 space-y-6">
            <header className=" space-y-4 sm:space-y-0">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold text-[#101010] hidden md:block">
                        Welcome Back, Jonathan 🎉
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
                    <div className="relative md:block mb-6 md:mb-0">
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
                        <button className="px-6 py-2 bg-white rounded-xl border border-[#D6D6D6] text-base font-medium text-[#101010] flex items-center gap-2">
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
                        Total Amount Invested
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
                        <p className="text-gray-500">Investment Value</p>
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

            {/* Small Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded shadow p-4 flex flex-col">
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-[#606060]">
                            Investor Status
                        </p>
                        <div className="flex items-center px-2 py-1 rounded-xl border border-[#3Da20B]">
                            <ArrowUpRightIcon
                                width={16}
                                height={16}
                                color="#3DA20B"
                            />
                            <span className="text-[#3DA20B] text-xs">12%</span>
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <span className="text-2xl font-semibold mb-2">
                                Active
                            </span>
                            <span className="text-xs text-[#8C8B90]">
                                Today
                            </span>
                        </div>
                        <div className="flex items-end">
                            <Image
                                src={"/images/dashboard/graph.svg"}
                                width={68}
                                height={28}
                                alt=""
                            />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded shadow p-4 flex flex-col">
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-[#606060]">
                            Active Investments
                        </p>
                        <div className="flex items-center px-2 py-1 rounded-xl border border-[#3Da20B]">
                            <ArrowUpRightIcon
                                width={16}
                                height={16}
                                color="#3DA20B"
                            />
                            <span className="text-[#3DA20B] text-xs">12%</span>
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <span className="text-2xl font-semibold mb-2">
                                3
                            </span>
                            <span className="text-xs text-[#8C8B90]">
                                Today
                            </span>
                        </div>
                        <div className="flex items-end">
                            <Image
                                src={"/images/dashboard/graph.svg"}
                                width={68}
                                height={28}
                                alt=""
                            />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded shadow p-4 flex flex-col">
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-[#606060]">
                            Interest Generated
                        </p>
                        <div className="flex items-center px-2 py-1 rounded-xl border border-[#3Da20B]">
                            <ArrowUpRightIcon
                                width={16}
                                height={16}
                                color="#3DA20B"
                            />
                            <span className="text-[#3DA20B] text-xs">12%</span>
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <span className="text-2xl font-semibold mb-2">
                                $20,224
                            </span>
                            <span className="text-xs text-[#8C8B90]">
                                Today
                            </span>
                        </div>
                        <div className="flex items-end">
                            <Image
                                src={"/images/dashboard/graph.svg"}
                                width={68}
                                height={28}
                                alt=""
                            />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded shadow p-4 flex flex-col">
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-[#606060]">
                            Total Payouts
                        </p>
                        <div className="flex items-center px-2 py-1 rounded-xl border border-[#3Da20B]">
                            <ArrowUpRightIcon
                                width={16}
                                height={16}
                                color="#3DA20B"
                            />
                            <span className="text-[#3DA20B] text-xs">12%</span>
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <span className="text-2xl font-semibold mb-2">
                                $800,000
                            </span>
                            <span className="text-xs text-[#8C8B90]">
                                Today
                            </span>
                        </div>
                        <div className="flex items-end">
                            <Image
                                src={"/images/dashboard/graph.svg"}
                                width={68}
                                height={28}
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Fund Filters (optional) */}
            <div className="flex items-center space-x-4 overflow-x-auto text-sm">
                <button className="py-1 px-3 rounded border border-gray-200 bg-gray-100 text-gray-700 font-medium">
                    All Investments <span className="ml-1 text-gray-500">280</span>
                </button>
                <button className="py-1 px-3 rounded border border-gray-200 hover:bg-gray-50 text-gray-600">
                    Bitcoin Trust Funds <span className="ml-1 text-gray-500">65</span>
                </button>
                <button className="py-1 px-3 rounded border border-gray-200 hover:bg-gray-50 text-gray-600">
                    Specialised AI Fund <span className="ml-1 text-gray-500">215</span>
                </button>
                <button className="py-1 px-3 rounded border border-gray-200 hover:bg-gray-50 text-gray-600">
                    Sundry <span className="ml-1 text-gray-500">215</span>
                </button>
            </div>

            {/* Recent Investments Table */}
            <div className="bg-white rounded shadow p-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Recent Investments</h2>
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
                                <th className="p-3 text-gray-500 font-medium text-sm">Current ROI (%)</th>
                                <th className="p-3 text-gray-500 font-medium text-sm">Current Amount</th>
                                <th className="p-3 text-gray-500 font-medium text-sm">Payout Received</th>
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
                                    8.5%
                                </td>
                                <td className="p-3 text-sm text-gray-700">
                                    $502,500
                                </td>
                                <td className="p-3 text-sm text-gray-700">
                                    30-06-2024
                                </td>
                                <td className="p-3 text-sm">
                                    <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
                                        Active
                                    </span>
                                </td>
                                <td>
                                    <EllipsisVerticalIcon
                                        width={24}
                                        height={24}
                                    />
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
                                    8.5%
                                </td>
                                <td className="p-3 text-sm text-gray-700">
                                    $502,500
                                </td>
                                <td className="p-3 text-sm text-gray-700">
                                    30-06-2024
                                </td>
                                <td className="p-3 text-sm">
                                    <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
                                        Active
                                    </span>
                                </td>
                                <td>
                                    <EllipsisVerticalIcon
                                        width={24}
                                        height={24}
                                    />
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}
