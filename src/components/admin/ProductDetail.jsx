import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import Loader from "../loader/Loader";
import { deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import { toast } from "react-hot-toast";

const ProductDetail = () => {
    const context = useContext(myContext);
    const { loading, setLoading, getAllProduct, getAllProductFunction } = context;
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    // Get unique categories
    const categories = ["all", ...new Set(getAllProduct.map((item) => item.category))];

    // Filter products based on search term and category
    const filteredProducts = getAllProduct.filter((item) => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Delete product 
    const deleteProduct = async (id) => {
        setLoading(true)
        try {
            await deleteDoc(doc(fireDB, 'products', id))
            toast.success('Product Deleted successfully')
            getAllProductFunction();
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <div>
            <div className="py-5 flex justify-between items-center">
                {/* text  */}
                <h1 className=" text-xl text-black font-bold">All Product</h1>
                {/* Add Product Button  */}
                <Link to={'/addproduct'}>
                    <button className="btn-primary">Add Product</button>
                </Link>
            </div>
            {/* Loading  */}
            <div className="flex justify-center relative top-20">
                {loading && <Loader />}
            </div>
            {/* Search and Filter Section */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto scrollbar-hide whitespace-nowrap py-1 -mx-2 px-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-lg capitalize transition-colors duration-200 min-w-max ${
                                selectedCategory === category
                                    ? "bg-primary text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>
            {/* Products Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Product
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Price
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredProducts.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 flex-shrink-0">
                                                <img
                                                    className="h-10 w-10 rounded-lg object-cover"
                                                    src={item.productImageUrl}
                                                    alt={item.title}
                                                />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{item.title}</div>
                                                <div className="text-sm text-gray-500">{item.description}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary bg-opacity-10 text-primary">
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        ₹{item.price}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {item.date}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end space-x-2">
                                            <button
                                                onClick={() => navigate(`/updateproduct/${item.id}`)}
                                                className="btn-secondary"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => deleteProduct(item.id)}
                                                className="btn-danger"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty State */}
                {filteredProducts.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-4xl mb-4">🔍</div>
                        <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Try adjusting your search or filter to find what you're looking for.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductDetail;