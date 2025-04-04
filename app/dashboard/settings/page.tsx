"use client";
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from "react";
import Image from 'next/image';
import { FaCheckCircle, FaRocket, FaEnvelope, FaLock, FaWallet, FaKey, FaExclamationTriangle, FaUserShield } from "react-icons/fa";



const notifications = [
  {
    title: "Payout Completed ✅",
    description: "Your payout of $1,200 has been successfully sent to your bank account.",
    icon: <FaCheckCircle />,
    time: "2 mins ago",
    unread: false,
  },
  {
    title: "Payout Request Received",
    description: "Your payout request is being processed. You will be notified once the funds are sent.",
    icon: <FaCheckCircle />,
    time: "2 mins ago",
    unread: true,
  },
  {
    title: "New Investment Plan Available 🚀",
    description: "Check out our latest investment plans with competitive returns.",
    icon: <FaRocket />,
    time: "2 mins ago",
    unread: true,
  },
  {
    title: "Early Withdrawal Fee Applied",
    description: "A penalty of 2.5% has been deducted due to early payout. Check details in your transactions.",
    icon: <FaExclamationTriangle />,
    time: "2 mins ago",
    unread: false,
  },
  {
    title: "Low Investment Balance Alert",
    description: "Your investment balance is running low. Add funds to continue earning.",
    icon: <FaWallet />,
    time: "2 mins ago",
    unread: true,
  },
  {
    title: "An OTP Has Been Sent to Your Email",
    description: "Enter the one-time password sent to your email to proceed securely.",
    icon: <FaEnvelope />,
    time: "2 mins ago",
    unread: true,
  },
  {
    title: "Password Changed Successfully",
    description: "Your password has been updated. If this wasn’t you, reset your password immediately.",
    icon: <FaLock />,
    time: "2 mins ago",
    unread: true,
  },
  {
    title: "Bank Account Added Successfully",
    description: "Your bank account has been linked. You can now receive payouts seamlessly.",
    icon: <FaWallet />,
    time: "2 mins ago",
    unread: true,
  },
  {
    title: "KYC Verification Approved 🎉",
    description: "Your identity verification is complete. You can now invest and withdraw without limits.",
    icon: <FaUserShield />,
    time: "2 mins ago",
    unread: true,
  },
  {
    title: "New Login Detected",
    description: "A new login was detected on your account from Lagos, Nigeria. If this wasn’t you, secure your account now.",
    icon: <FaKey />,
    time: "2 mins ago",
    unread: true,
  },
];

export default function SettingsPage() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') === 'notification' ? 'notification' : 'profile';
  // Track which tab is active: "profile", "password", "notification"
  const [activeTab, setActiveTab] = useState<"profile" | "password" | "notification">(initialTab);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (searchParams.get('tab') === 'notification') {
      setActiveTab("notification");
    }
  }, [searchParams]);

  return (
    <div className="p-6 space-y-6">
      {/* Top Bar */}
      <header className=" space-y-4 sm:space-y-0">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-[#101010]">
            Settings
          </h1>
          <div className="flex gap-3">
            <div className='bg-[#E7E7E7] rounded-full p-4'>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-bell"
              >
                <path d="M10.268 21a2 2 0 0 0 3.464 0" />
                <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
              </svg>
            </div>

            <div className="flex items-center ml-4 space-x-2">
              <div className="h-10 w-10 bg-gray-400 rounded-full flex items-center justify-center">
                {/* Replace with <img> if you have a real avatar */}
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
            {/* <FaSearch className="absolute left-3 top-3 text-gray-400" /> */}
            <div className="w-6 h-6 absolute left-2 top-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#414141"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-search"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search anything here"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-[#F7F9FC]"
            />
          </div>

          <div className="flex gap-3">
            <button className="px-6 py-2 bg-white rounded-xl border border-[#D6D6D6] text-base font-medium text-[#101010] flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-upload"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" x2="12" y1="3" y2="15" />
              </svg>
              Export
            </button>

            <button className="px-6 py-2 rounded-xl bg-white border border-[#D6D6D6] text-[#101010] text-base font-medium flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-message-square-text"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <path d="M13 8H7" />
                <path d="M17 12H7" />
              </svg>
              Send Message
            </button>
          </div>
        </div>
      </header>

      {/* Tabs: Profile, Password, Notification */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab("profile")}
            className={`pb-3 -mb-px text-sm font-medium ${activeTab === "profile"
              ? "border-b-2 border-purple text-purple"
              : "text-gray-500 hover:text-gray-700"
              }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab("password")}
            className={`pb-3 -mb-px text-sm font-medium ${activeTab === "password"
              ? "text-purple border-b-2 border-purple"
              : "text-gray-500 hover:text-gray-700"
              }`}
          >
            Password
          </button>
          <button
            onClick={() => setActiveTab("notification")}
            className={`pb-3 -mb-px text-sm font-medium ${activeTab === "notification"
              ? "text-purple border-b-2 border-purple"
              : "text-gray-500 hover:text-gray-700"
              }`}
          >
            Notification
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "profile" && <ProfileTab />}
      {activeTab === "password" && <PasswordTab />}
      {activeTab === "notification" && <NotificationTab />}
    </div>
  );
}


function ProfileTab() {
  const [isEditing, setIsEditing] = useState(false);

  // State to store form data
  const [formData, setFormData] = useState({
    fullName: "Adah Jonathan",
    email: "joeeenathanadah@gmail.com",
    role: "Super Admin",
  });

  const [tempData, setTempData] = useState(formData);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTempData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  // Save changes and update formData
  const handleSave = () => {
    setFormData(tempData);
    setIsEditing(false);
    console.log("Saved Data:", tempData); // Replace with API request if needed
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white p-8 rounded shadow flex gap-44">
        {/* Title & Description */}
        <div className="max-w-80">
          <h2 className="text-xl font-semibold mb-2">Profile</h2>
          <p className="text-sm text-gray-500 mb-6">
            Invite your colleagues to work faster and collaborate easily together.
          </p>
        </div>

        <div className="w-full">
          {/* Avatar + Edit Button */}
          <div className="flex items-center mb-8 justify-between">
            {/* Avatar with camera overlay */}
            <div className="relative w-20 h-20">
              {/* Replace this with a real user avatar image or Next.js Image */}
              <Image
                src="/images/dashboard/avatar.png"
                alt="User Avatar"
                width={80}
                height={80}
                className="w-20 h-20 object-cover rounded-full"
              />
              {/* Camera overlay icon */}
              <button
                type="button"
                className="absolute bottom-0 right-0 w-8 h-8 bg-purple-500 hover:bg-purple-600 text-white rounded-full flex items-center justify-center"
              >
                {/* <FaCamera className="text-sm" /> */}
              </button>
            </div>

            {/* Edit button */}
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-sm rounded flex items-center"
              disabled={isEditing} // Disable button if already editing
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-file-pen-line"
              >
                <path d="m18 5-2.414-2.414A2 2 0 0 0 14.172 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2" />
                <path d="M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
                <path d="M8 18h1" />
              </svg>
              Edit
            </button>
          </div>

          {/* Form Fields */}
          <form className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                readOnly={!isEditing}
                className={`mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none ${isEditing ? "focus:ring-1 focus:ring-purple" : ""}`}
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={isEditing ? tempData.email : formData.email}
                onChange={handleChange}
                readOnly={!isEditing}
                className={`mt-1 block w-full bg-[#D9D9D9] border border-gray-300 rounded px-3 py-2 placeholder:text-[#606060] focus:outline-none ${isEditing ? "focus:ring-1 focus:ring-purple" : ""
                  }`}
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <input
                type="text"
                name="role"
                value={isEditing ? tempData.role : formData.role}
                onChange={handleChange}
                readOnly={!isEditing}
                className={`mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none ${isEditing ? "focus:ring-1 focus:ring-purple" : ""
                  }`}
              />
            </div>
          </form>

          {isEditing && (
            <div className="mt-6 text-left">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-purple hover:bg-purple-600 text-white rounded"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


function PasswordTab() {
  return (
    <div className="bg-white rounded shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Password</h2>
      <p className="text-sm text-gray-500 mb-6">
        Update your password here. Make sure it’s strong and secure.
      </p>
      <form className="flex flex-wrap gap-6 items-center">
        {/* Current Password */}
        <div className="w-[48%]">
          <label className="block text-sm font-medium text-gray-700">
            Current Password
          </label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple"
          />
        </div>
        {/* New Password */}
        <div className="w-[48%]">
          <label className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple"
          />
        </div>
        {/* Confirm New Password */}
        <div className="w-[48%]">
          <label className="block text-sm font-medium text-gray-700">
            Confirm New Password
          </label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple"
          />
        </div>
      </form>

      <div className="mt-6 text-left">
        <button
          className="px-6 py-2 bg-purple hover:bg-purple-600 text-white rounded"
        >
          Change Password
        </button>
      </div>
    </div>
  );
}

function NotificationTab() {
  return (
    <div className="bg-white rounded shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Notifications</h2>
      <p className="text-sm text-gray-500 mb-6">
        Choose how you receive notifications.
      </p>
      {/* Example notification preferences */}
      <div className="space-y-4">
        {notifications.map((notification, index) => (
          <div key={index} className="flex items-start justify-between p-4 rounded-lg hover:bg-gray-100 transition">
            {/* Left Section: Icon + Text */}
            <div className="flex items-start space-x-4">
              {/* Icon */}
              <div className={`p-3 rounded-full ${notification.unread ? "bg-purple text-white" : "bg-gray-300 text-gray-600"}`}>
                {notification.icon}
              </div>
              {/* Title & Description */}
              <div>
                <h3 className="font-semibold">{notification.title}</h3>
                <p className={`text-sm ${notification.unread ? "text-gray-700" : "text-gray-400"}`}>
                  {notification.description}
                </p>
              </div>
            </div>

            {/* Right Section: Time & Unread Dot */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">{notification.time}</span>
              {notification.unread && <span className="w-2.5 h-2.5 bg-purple-500 rounded-full"></span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
