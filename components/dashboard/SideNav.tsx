"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import Image from 'next/image';
import { OverviewIcon, SettingsIcon, UsersIcon, PortfolioIcon, TransactionsIcon, KycIcon, MessagesIcon } from '../saturn/components/SVG';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export default function SideNav() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const pathname = usePathname();

    useEffect(() => {
        const mainElement = window.document.querySelector("main")

        if (isSidebarOpen) {
            if (mainElement) {
                mainElement.classList.add('overflow-y-hidden');
            }
        } else {
            if (mainElement) {
                mainElement.classList.remove('overflow-y-hidden');
            }
        }
    }, [isSidebarOpen]);

    const navItems = [
        { name: 'Overview', href: '/dashboard' },
        { name: 'Investments', href: '/investment' },
        { name: 'Earnings & Returns', href: '/earnings', },
        { name: 'Transactions', href: '/transactions' },
        { name: 'Messages', href: '/messages' },
    ];

    const extraNavItems = [
        { name: 'Settings', href: '/settings' }
    ]

    return (
        <>
            <button
                className="md:hidden fixed top-4 right-4 z-50 p-2 text-black rounded-lg"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                {isSidebarOpen ? (
                    <XMarkIcon className="h-6 w-6" />
                ) : (
                    <Bars3Icon className="h-6 w-6" />
                )}
            </button>

            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            <div
                className={`bg-gray-900 text-white w-56 h-screen  flex flex-col fixed md:relative transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 z-40`}
            >
                <div className="px-6 py-4 text-xl font-bold border-b border-gray-700">
                    <Image
                        src={"/images/dashboard/logo.svg"}
                        width={156}
                        height={36}
                        alt='logo'
                    />
                </div>

                <nav className="flex-1 px-2 py-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href === "/dashboard" ? item.href : `/dashboard${item.href}`}
                            className={`flex gap-2 items-center text-base/8 p-2 rounded mb-1 ${pathname.endsWith(item.href) ? 'text-white bg-gradient-to-b from-[#8627FF] to-[#3F1574]' : 'hover:bg-gray-800'
                                }`}
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <div className="h-6 w-6">
                                {
                                    item.name === "Overview" ?
                                        <OverviewIcon href={pathname.endsWith(item.href)} />
                                        :
                                        item.name === "Investments" ?
                                            <UsersIcon href={pathname.endsWith(item.href)} />
                                            :
                                            item.name === "Earnings & Returns" ?
                                                <PortfolioIcon href={pathname.endsWith(item.href)} />
                                                :
                                                item.name === "Transactions" ?
                                                    <TransactionsIcon href={pathname.endsWith(item.href)} />
                                                    :
                                                    item.name === "Messages" ?
                                                        <MessagesIcon href={pathname.endsWith(item.href)} />
                                                        : ""
                                }
                            </div>
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <nav className="flex-1 px-2 py-4">
                    {extraNavItems.map((item) => (
                        <Link
                            key={item.name}
                            href={`/dashboard${item.href}`}
                            className={`flex gap-2 items-center text-base/8 p-2 rounded mb-1 ${pathname.endsWith(item.href) ? 'text-white bg-gradient-to-b from-[#8627FF] to-[#3F1574]' : 'hover:bg-gray-800'
                                }`}
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            {
                                item.name === "Settings" ?
                                    <SettingsIcon href={pathname.endsWith(item.href)} />
                                    : ""
                            }
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="px-2 py-4 border-t border-gray-700">
                    <button className="w-full text-left px-4 py-2 rounded hover:bg-gray-800">
                        Log Out
                    </button>
                </div>
            </div>
        </>
    );
}
