import { useContext, useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import myContext from "../../../context/myContext";
import { useParams, useNavigate } from "react-router";
import { fireDB } from "../../../firebase/FirebaseConfig";
import { doc, getDoc, collection, addDoc } from "firebase/firestore";
import Loader from "../../loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../../redux/cartSlice";
import toast from "react-hot-toast";
import BuyNowModal from "../../buyNowModal/BuyNowModal";

const ProductInfo = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;
  const navigate = useNavigate();

  const [product, setProduct] = useState("");
  const [addressInfo, setAddressInfo] = useState({
    name: "",
    address: "",
    pincode: "",
    mobileNumber: "",
  });

  const { id } = useParams();

  // getProductData
  const getProductData = async () => {
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(fireDB, "products", id));
      setProduct({ ...productTemp.data(), id: productTemp.id });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Failed to load product details");
    }
  };

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

  // Buy Now Function
  const buyNowFunction = async () => {
    if (!addressInfo.name || !addressInfo.address || !addressInfo.pincode || !addressInfo.mobileNumber) {
      return toast.error("All fields are required");
    }

    setLoading(true);
    try {
      const orderData = {
        ...product,
        ...addressInfo,
        status: "pending",
        time: new Date().toISOString(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      await addDoc(collection(fireDB, "order"), orderData);
      toast.success("Order placed successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <Layout>
      <section className="py-8 font-poppins bg-white">
        {loading ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <Loader />
          </div>
        ) : (
          <div className="max-w-6xl px-4 mx-auto">
            <div className="flex flex-wrap -mx-4">
              {/* Product Image */}
              <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
                <div className="sticky top-32">
                  <div className="relative">
                    <img
                      className="w-full h-[500px] object-cover rounded-2xl shadow-lg"
                      src={product?.productImageUrl}
                      alt={product?.title}
                    />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 text-sm font-medium text-white bg-primary rounded-full">
                        {product?.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="w-full px-4 md:w-1/2">
                <div className="lg:pl-20">
                  <div className="mb-6">
                    <h2 className="max-w-xl mb-6 text-2xl font-bold leading-loose tracking-wide text-gray-900 md:text-3xl">
                      {product?.title}
                    </h2>
                    
                    <div className="flex items-center mb-6">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-5 h-5 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-2 text-sm text-gray-600">4.5 (120 reviews)</span>
                      </div>
                    </div>

                    <p className="inline-block text-3xl font-bold text-gray-900">
                      ₹{product?.price}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h2 className="mb-2 text-lg font-semibold text-gray-900">
                      Description
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      {product?.description}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h2 className="mb-2 text-lg font-semibold text-gray-900">
                      Availability
                    </h2>
                    <p className="text-green-600 font-medium">
                      In Stock ({product?.quantity || 1} available)
                    </p>
                  </div>

                  <div className="flex flex-col gap-4">
                    {cartItems.some((p) => p.id === product.id) ? (
                      <button
                        onClick={() => deleteCart(product)}
                        className="btn-danger w-full"
                      >
                        Remove from Cart
                      </button>
                    ) : (
                      <button
                        onClick={() => addCart(product)}
                        className="btn-primary w-full"
                      >
                        Add to Cart
                      </button>
                    )}

                    <BuyNowModal
                      addressInfo={addressInfo}
                      setAddressInfo={setAddressInfo}
                      buyNowFunction={buyNowFunction}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default ProductInfo;
