import { useContext, useState, useEffect, useRef } from "react";
import myContext from "../../context/myContext";
import { useNavigate } from "react-router";

const SearchBar = () => {
    const context = useContext(myContext);
    const { getAllProduct } = context;
    const [search, setSearch] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const navigate = useNavigate();
    const searchRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsFocused(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filterSearchData = getAllProduct
        .filter((obj) => 
            obj.title.toLowerCase().includes(search.toLowerCase()) ||
            obj.category.toLowerCase().includes(search.toLowerCase())
        )
        .slice(0, 8);

    const handleProductClick = (item) => {
        navigate(`/productinfo/${item.id}`);
        setSearch("");
        setIsFocused(false);
    };

    return (
        <div className="relative" ref={searchRef}>
            {/* Search Input */}
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    className="input-field pl-10 pr-4 py-2 w-full bg-white/10 backdrop-blur-sm border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            {/* Search Results Dropdown */}
            {isFocused && search && (
                <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg overflow-hidden z-50 animate-fade-in">
                    {filterSearchData.length > 0 ? (
                        <div className="max-h-96 overflow-y-auto">
                            {filterSearchData.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-4 p-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150 border-b border-gray-100 last:border-b-0"
                                    onClick={() => handleProductClick(item)}
                                >
                                    <div className="w-12 h-12 flex-shrink-0">
                                        <img
                                            className="w-full h-full object-cover rounded-md"
                                            src={item.productImageUrl}
                                            alt={item.title}
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            {item.title}
                                        </p>
                                        <p className="text-xs text-gray-500 capitalize">
                                            {item.category}
                                        </p>
                                    </div>
                                    <div className="text-sm font-medium text-primary">
                                        ${item.price}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-4 text-center">
                            <div className="flex flex-col items-center justify-center py-4">
                                <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-gray-500">No products found</p>
                                <p className="text-sm text-gray-400">Try different keywords</p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
