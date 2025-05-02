import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../layout/Layout";
import { useContext } from "react";
import myContext from "../../../context/myContext";
import Loader from "../../loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../../redux/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CategoryPage = () => {
  const { categoryname } = useParams();
  const context = useContext(myContext);
  const { getAllProduct, loading } = context;
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const filterProduct = getAllProduct.filter((obj) =>
    obj.category?.toLowerCase().trim().includes(categoryname.toLowerCase().trim())
  );

  const addCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Added to cart");
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Removed from cart");
  };

  return (
    <Layout>
      <div className="pt-24 pb-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 capitalize">
              {categoryname}
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Discover our collection of {categoryname} products
            </p>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <Loader />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filterProduct.length > 0 ? (
                filterProduct.map((item) => {
                  const { id, title, price, productImageUrl, category } = item;
                  const isInCart = cartItems.some((p) => p.id === item.id);

                  return (
                    <div
                      key={id}
                      className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                    >
                      {/* Product Image */}
                      <div
                        onClick={() => navigate(`/productinfo/${id}`)}
                        className="relative w-full h-64 cursor-pointer"
                      >
                        <img
                          src={productImageUrl}
                          alt={title}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
                      </div>

                      {/* Product Info */}
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-primary capitalize">
                            {category}
                          </span>
                          <span className="text-sm font-medium text-gray-500">
                            In Stock
                          </span>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 mb-2 h-14 line-clamp-2">
                          {title}
                        </h3>

                        <div className="mt-auto">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-2xl font-bold text-gray-900">
                              ₹{price}
                            </span>
                            <div className="flex items-center">
                              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span className="ml-1 text-sm text-gray-600">4.5</span>
                            </div>
                          </div>

                          <button
                            onClick={() => isInCart ? deleteCart(item) : addCart(item)}
                            className={`w-full ${isInCart ? 'btn-danger' : 'btn-primary'}`}
                          >
                            {isInCart ? 'Remove from Cart' : 'Add to Cart'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-12">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png"
                    alt="No products found"
                    className="w-24 h-24 mb-4 opacity-50"
                  />
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    No Products Found
                  </h2>
                  <p className="text-gray-600">
                    We couldn't find any {categoryname} products at the moment.
                  </p>
                </div>
              )}
            </div>
          )}
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
    </Layout>
  );
};

export default CategoryPage;
