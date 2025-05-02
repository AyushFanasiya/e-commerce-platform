import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem('users'));
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const cartItems = useSelector((state) => state.cart);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const logout = () => {
        localStorage.clear('users');
        navigate("/login");
    };

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    return (
        <nav className={`fixed top-0 z-50 w-full transition-all duration-300 bg-white shadow-md`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Top Row: Logo, Links, Cart+Profile */}
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-bold text-gray-900">
                        E-commerce
                    </Link>

                    {/* Nav Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="font-medium text-gray-700 hover:text-primary transition-colors duration-200">
                            Home
                        </Link>
                        <Link to="/allproduct" className="font-medium text-gray-700 hover:text-primary transition-colors duration-200">
                            All Products
                        </Link>
                        
                        {!user ? (
                            <>
                                <Link to="/signup" className="btn-secondary">Sign Up</Link>
                                <Link to="/login" className="btn-primary">Login</Link>
                            </>
                        ) : (
                            <>
                                {user.role === "user" && (
                                    <Link to="/user-dashboard" className="font-medium text-gray-700 hover:text-primary transition-colors duration-200">
                                        Dashboard
                                    </Link>
                                )}
                                {user.role === "admin" && (
                                    <Link to="/admin-dashboard" className="font-medium text-gray-700 hover:text-primary transition-colors duration-200">
                                        Admin
                                    </Link>
                                )}
                            </>
                        )}
                    </div>

                    {/* Cart + Profile */}
                    <div className="flex items-center space-x-4">
                        <Link
                            to="/cart"
                            className="relative group text-gray-700"
                        >
                            <span className="text-xl">🛒</span>
                            {cartItems.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {cartItems.length}
                                </span>
                            )}
                            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                View Cart
                            </span>
                        </Link>

                        {user && (
                            <div className="relative">
                                <button
                                    onClick={toggleDropdown}
                                    className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors duration-200 text-gray-700"
                                >
                                    👤
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

                {/* Search Bar */}
                <div className="pb-4">
                    <div className="max-w-2xl mx-auto">
                        <SearchBar />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
