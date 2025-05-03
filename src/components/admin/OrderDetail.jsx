import { useContext, useState } from "react";
import myContext from "../../context/myContext";
import { toast } from "react-hot-toast";
import { Timestamp, doc, updateDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";

const OrderDetail = () => {
    const context = useContext(myContext);
    const { getAllOrder, getAllProduct, deleteProduct } = context;
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    // Get unique statuses for filter
    const statuses = ["all", "pending", "processing", "shipped", "delivered", "cancelled"];

    // Filter orders based on search term and status
    const filteredOrders = getAllOrder.filter((order) => {
        // Add null checks for order properties
        const userName = order?.userName || '';
        const userEmail = order?.userEmail || '';
        const orderId = order?.id || '';

        const matchesSearch = 
            userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
            orderId.toLowerCase().includes(searchTerm.toLowerCase());
            
        const matchesStatus = statusFilter === "all" || order?.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Update order status
    const updateOrderStatus = async (orderId, newStatus) => {
        if (!orderId) {
            toast.error("Invalid order ID");
            return;
        }

        try {
            const orderRef = doc(fireDB, 'order', orderId);
            await updateDoc(orderRef, {
                status: newStatus,
                updatedAt: Timestamp.now()
            });
            toast.success(`Order status updated to ${newStatus}`);
        } catch (error) {
            console.error("Error updating order status:", error);
            toast.error("Failed to update order status");
        }
    };

    // Delete order
    const handleDeleteOrder = async (orderId) => {
        if (!orderId) {
            toast.error("Invalid order ID");
            return;
        }

        if (window.confirm("Are you sure you want to delete this order?")) {
            await deleteProduct(orderId);
        }
    };

    // Get status color
    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'processing':
                return 'bg-blue-100 text-blue-800';
            case 'shipped':
                return 'bg-purple-100 text-purple-800';
            case 'delivered':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="p-6">
            {/* Search and Filter Section */}
            <div className="mb-8 space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Search by name, email, or order ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {statuses.map((status) => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={`${
                                    statusFilter === status
                                        ? 'btn-primary'
                                        : 'btn-secondary'
                                }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Orders List */}
            <div className="space-y-6">
                {!getAllOrder || getAllOrder.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No orders found</p>
                    </div>
                ) : filteredOrders.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No orders match your search criteria</p>
                    </div>
                ) : (
                    filteredOrders.map((order) => (
                        <div
                            key={order?.id || Math.random()}
                            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                        >
                            {/* Order Header */}
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            Order #{order?.id || 'N/A'}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {order?.time?.seconds 
                                                ? new Date(order.time.seconds * 1000).toLocaleString()
                                                : 'Date not available'}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order?.status)}`}>
                                            {order?.status || 'pending'}
                                        </span>
                                        <select
                                            value={order?.status || 'pending'}
                                            onChange={(e) => updateOrderStatus(order?.id, e.target.value)}
                                            className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                        >
                                            {statuses.filter(s => s !== 'all').map((status) => (
                                                <option key={status} value={status}>
                                                    {status}
                                                </option>
                                            ))}
                                        </select>
                                        <button
                                            onClick={() => handleDeleteOrder(order?.id)}
                                            className="px-3 py-1 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors duration-200"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Customer Info */}
                            <div className="p-6 border-b border-gray-100">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500 mb-1">Customer</h4>
                                        <p className="text-gray-900">{order?.userName || 'N/A'}</p>
                                        <p className="text-gray-500">{order?.userEmail || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500 mb-1">Delivery Address</h4>
                                        <p className="text-gray-900">{order?.addressInfo?.address || 'N/A'}</p>
                                        <p className="text-gray-500">
                                            {order?.addressInfo?.pincode || 'N/A'} • {order?.addressInfo?.mobileNumber || 'N/A'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="p-6">
                                <h4 className="text-sm font-medium text-gray-500 mb-4">Order Items</h4>
                                <div className="space-y-4">
                                    {order?.cartItems?.map((item) => {
                                        const product = getAllProduct?.find(p => p.id === item.id);
                                        return (
                                            <div key={item?.id || Math.random()} className="flex items-center gap-4">
                                                <div className="w-16 h-16 rounded-lg overflow-hidden">
                                                    <img
                                                        src={product?.productImageUrl}
                                                        alt={product?.title || 'Product image'}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <h5 className="text-gray-900 font-medium">{product?.title || 'Product title not available'}</h5>
                                                    <p className="text-sm text-gray-500">Quantity: {item?.quantity || 0}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-gray-900 font-medium">₹{product?.price || 0}</p>
                                                    <p className="text-sm text-gray-500">Total: ₹{(product?.price || 0) * (item?.quantity || 0)}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Order Summary */}
                                <div className="mt-6 pt-6 border-t border-gray-100">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500">Total Amount</span>
                                        <span className="text-xl font-bold text-gray-900">₹{order?.totalAmount || 0}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default OrderDetail;