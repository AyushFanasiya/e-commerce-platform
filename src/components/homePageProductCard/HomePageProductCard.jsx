import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePageProductCard = () => {
    const navigate = useNavigate();
    const context = useContext(myContext);
    const { getAllProduct } = context;
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const addCart = (item) => {
        dispatch(addToCart(item));
        toast.success("Added to cart");
    };

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Removed from cart");
    };

    return (
        <div className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                        Featured Products
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Discover our most popular items
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {getAllProduct?.slice(0, 8).map((item) => {
                        const isInCart = cartItems.some((p) => p.id === item.id);
                        return (
                            <div
                                key={item.id}
                                className="group bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                            >
                                <div className="relative aspect-square overflow-hidden">
                                    <img
                                        onClick={() => navigate(`/productinfo/${item.id}`)}
                                        src={item.productImageUrl}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 cursor-pointer"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                    <div className="absolute top-4 right-4">
                                        <span className="px-3 py-1 text-sm font-medium text-white bg-primary/90 rounded-full backdrop-blur-sm">
                                            {item.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 
                                        onClick={() => navigate(`/productinfo/${item.id}`)}
                                        className="text-lg font-semibold text-gray-900 mb-2 h-14 line-clamp-2 cursor-pointer hover:text-primary transition-colors duration-200"
                                    >
                                        {item.title}
                                    </h3>

                                    <div className="mt-auto">
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <span className="text-2xl font-bold text-gray-900">
                                                    ₹{item.price}
                                                </span>
                                                <span className="text-sm text-gray-500 ml-2">In Stock</span>
                                            </div>
                                            <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                                                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                <span className="ml-1 text-sm font-medium text-yellow-800">4.5</span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => isInCart ? deleteCart(item) : addCart(item)}
                                            className={`w-full ${isInCart ? 'btn-danger' : 'btn-primary'} group-hover:shadow-lg transition-all duration-300`}
                                        >
                                            {isInCart ? 'Remove from Cart' : 'Add to Cart'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <ToastContainer
                position="top-left"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    );
};

export default HomePageProductCard;