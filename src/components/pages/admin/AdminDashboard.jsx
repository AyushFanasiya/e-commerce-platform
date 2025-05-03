import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import UserDetail from "../../admin/UserDetail";
import OrderDetail from "../../admin/OrderDetail";
import ProductDetail from "../../admin/ProductDetail";
import { useContext, useState, useEffect } from "react";
import myContext from "../../../context/myContext";
import { useNavigate } from "react-router-dom";
import "react-tabs/style/react-tabs.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("users"));
  const context = useContext(myContext);
  const { getAllProduct, getAllOrder, getAllUser } = context;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    // Calculate total revenue from orders
    const revenue = getAllOrder.reduce((total, order) => {
      const amount = Number(order?.totalAmount) || 0;
      return total + amount;
    }, 0);
    setStats({
      totalRevenue: revenue,
      totalProducts: getAllProduct.length,
      totalOrders: getAllOrder.length,
      totalUsers: getAllUser.length,
    });
  }, [getAllOrder, getAllProduct, getAllUser]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const logout = () => {
    localStorage.removeItem("users");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Admin Dashboard
            </h1>

            {/* Profile Dropdown */}
            {user && (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-3 bg-white rounded-full p-2 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-gray-700 font-medium">{user.name}</span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10 animate-fade-in">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900 capitalize">{user.role}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors duration-200"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "Total Revenue",
              value: `₹${stats.totalRevenue.toLocaleString()}`,
              icon: "💰",
              color: "bg-green-500",
            },
            {
              title: "Total Products",
              value: stats.totalProducts,
              icon: "📦",
              color: "bg-blue-500",
            },
            {
              title: "Total Orders",
              value: stats.totalOrders,
              icon: "📋",
              color: "bg-purple-500",
            },
            {
              title: "Total Users",
              value: stats.totalUsers,
              icon: "👥",
              color: "bg-orange-500",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-full ${stat.color} bg-opacity-10 flex items-center justify-center`}>
                  <span className="text-2xl">{stat.icon}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Admin Info Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 rounded-full bg-primary bg-opacity-10 flex items-center justify-center">
              <span className="text-4xl">👨‍💼</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
              <p className="text-gray-600">{user?.email}</p>
              <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                <span>Role: {user?.role}</span>
                <span>•</span>
                <span>Joined: {user?.date}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <Tabs>
            <TabList className="flex border-b border-gray-200 overflow-x-auto scrollbar-hide whitespace-nowrap">
              {[
                { icon: "📦", label: "Products" },
                { icon: "📋", label: "Orders" },
                { icon: "👥", label: "Users" },
              ].map((tab, index) => (
                <Tab
                  key={index}
                  className="px-6 py-4 text-center cursor-pointer hover:bg-gray-50 transition-colors duration-200 focus:outline-none min-w-[120px]"
                  selectedClassName="border-b-2 border-primary text-primary"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span>{tab.icon}</span>
                    <span className="font-medium">{tab.label}</span>
                  </div>
                </Tab>
              ))}
            </TabList>

            <div className="p-6">
              <TabPanel>
                <ProductDetail />
              </TabPanel>
              <TabPanel>
                <OrderDetail />
              </TabPanel>
              <TabPanel>
                <UserDetail />
              </TabPanel>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
