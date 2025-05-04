import { useContext, useState } from "react";
import Layout from "../../layout/Layout";
import Loader from "../../loader/Loader";
import myContext from "../../../context/myContext";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
    const user = JSON.parse(localStorage.getItem('users'));
    const context = useContext(myContext);
    const { loading, getAllOrder } = context;
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('orders');

    // Calculate user stats
    const userOrders = getAllOrder.filter((order) => order.userid === user?.uid);
    const totalSpent = userOrders.reduce((total, order) => total + order.totalAmount, 0);
    const totalOrders = userOrders.length;
    const pendingOrders = userOrders.filter(order => order.status === 'pending').length;
    const recentOrders = userOrders.slice(0, 3); // Get 3 most recent orders

    // Calculate order status distribution
    const orderStatusCounts = userOrders.reduce((acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
    }, {});

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50 pt-24 pb-8"> {/* Added pt-24 for navbar spacing */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* User Profile Card */}
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
                        <div className="p-8">
                            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                                <div className="w-24 h-24 rounded-full bg-primary bg-opacity-10 flex items-center justify-center">
                                    <span className="text-4xl">👤</span>
                                </div>
                                <div className="text-center md:text-left">
                                    <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
                                    <p className="text-gray-600">{user?.email}</p>
                                    <div className="mt-2 flex flex-wrap justify-center md:justify-start items-center gap-4 text-sm text-gray-500">
                                        <span>Role: {user?.role}</span>
                                        <span>•</span>
                                        <span>Joined: {user?.date}</span>
                                        <span>•</span>
                                        <span>Orders: {totalOrders}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {[
                            {
                                title: "Total Orders",
                                value: totalOrders,
                                icon: "📦",
                                color: "bg-blue-500",
                            },
                            {
                                title: "Total Spent",
                                value: `₹${totalSpent.toLocaleString()}`,
                                icon: "💰",
                                color: "bg-green-500",
                            },
                            {
                                title: "Pending Orders",
                                value: pendingOrders,
                                icon: "⏳",
                                color: "bg-yellow-500",
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

                    {/* Order Status Distribution */}
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Status Overview</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {Object.entries(orderStatusCounts).map(([status, count]) => (
                                    <div key={status} className="bg-gray-50 rounded-lg p-4">
                                        <div className="text-sm font-medium text-gray-600 capitalize">{status}</div>
                                        <div className="text-2xl font-bold text-gray-900 mt-1">{count}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Recent Orders */}
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
                                <button
                                    onClick={() => setActiveTab('orders')}
                                    className="text-primary hover:text-primary-dark font-medium"
                                >
                                    View All
                                </button>
                            </div>
                            
                            {loading ? (
                                <div className="flex justify-center py-8">
                                    <Loader />
                                </div>
                            ) : recentOrders.length > 0 ? (
                                <div className="space-y-6">
                                    {recentOrders.map((order, index) => (
                                        <div
                                            key={index}
                                            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200"
                                        >
                                            {/* Order Header */}
                                            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                                    <div>
                                                        <h3 className="text-lg font-medium text-gray-900">
                                                            Order #{order.id.slice(0, 8)}
                                                        </h3>
                                                        <p className="text-sm text-gray-500">
                                                            Placed on {order.date}
                                                        </p>
                                                    </div>
                                                    <div className="mt-2 sm:mt-0">
                                                        <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                                                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                            order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                                                            order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                                                            order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                                            'bg-red-100 text-red-800'
                                                        }`}>
                                                            {order.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Order Items */}
                                            <div className="p-6">
                                                <div className="space-y-4">
                                                    {order.cartItems && order.cartItems.length > 0 ? (
                                                        order.cartItems.map((item, itemIndex) => (
                                                            <div key={itemIndex} className="flex items-center space-x-4">
                                                                <img
                                                                    src={item.productImageUrl}
                                                                    alt={item.title}
                                                                    className="w-20 h-20 rounded-lg object-cover"
                                                                />
                                                                <div className="flex-1">
                                                                    <h4 className="text-sm font-medium text-gray-900">{item.title}</h4>
                                                                    <p className="text-sm text-gray-500">
                                                                        Quantity: {item.quantity} × ₹{item.price}
                                                                    </p>
                                                                </div>
                                                                <div className="text-sm font-medium text-gray-900">
                                                                    ₹{item.quantity * item.price}
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div className="text-center py-4 text-gray-500">
                                                            No items in this order
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Order Summary */}
                                                <div className="mt-6 pt-6 border-t border-gray-200">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm font-medium text-gray-900">Total Amount</span>
                                                        <span className="text-lg font-bold text-gray-900">₹{order.totalAmount}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="text-4xl mb-4">📦</div>
                                    <h3 className="text-lg font-medium text-gray-900">No orders yet</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Start shopping to see your orders here.
                                    </p>
                                    <button
                                        onClick={() => navigate('/allproduct')}
                                        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition-colors duration-200"
                                    >
                                        Start Shopping
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <button
                                    onClick={() => navigate('/allproduct')}
                                    className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                                >
                                    <span className="text-2xl mb-2">🛍️</span>
                                    <span className="text-sm font-medium text-gray-900">Shop Now</span>
                                </button>
                                <button
                                    onClick={() => navigate('/cart')}
                                    className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                                >
                                    <span className="text-2xl mb-2">🛒</span>
                                    <span className="text-sm font-medium text-gray-900">View Cart</span>
                                </button>
                                <button
                                    onClick={() => navigate('/wishlist')}
                                    className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                                >
                                    <span className="text-2xl mb-2">❤️</span>
                                    <span className="text-sm font-medium text-gray-900">Wishlist</span>
                                </button>
                                <button
                                    onClick={() => navigate('/profile')}
                                    className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                                >
                                    <span className="text-2xl mb-2">👤</span>
                                    <span className="text-sm font-medium text-gray-900">Edit Profile</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default UserDashboard;