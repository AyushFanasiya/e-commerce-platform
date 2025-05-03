import { useDispatch, useSelector } from "react-redux";
import Layout from "../../layout/Layout";
import { Trash } from "lucide-react";
import {
  decrementQuantity,
  deleteFromCart,
  incrementQuantity,
} from "../../../redux/cartSlice";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Timestamp, addDoc, collection, doc, updateDoc, getDoc } from "firebase/firestore";
import { fireDB } from "../../../firebase/FirebaseConfig";
import BuyNowModal from "../../buyNowModal/BuyNowModal";
import { Navigate, Link } from "react-router";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Delete cart");
  };

  const handleIncrement = async (id) => {
    // Check current stock
    const productRef = doc(fireDB, "products", id);
    const productDoc = await getDoc(productRef);
    const productData = productDoc.data();
    
    if (!productData) {
      toast.error("Product not found");
      return;
    }

    const currentItem = cartItems.find(item => item.id === id);
    if (currentItem && currentItem.quantity >= productData.quantity) {
      toast.error("Maximum available quantity reached");
      return;
    }

    dispatch(incrementQuantity({ id, availableQuantity: productData.quantity }));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  // const cartQuantity = cartItems.length;

  const cartItemTotal = cartItems
    .map((item) => item.quantity)
    .reduce((prevValue, currValue) => prevValue + currValue, 0);

  const cartTotal = cartItems
    .map((item) => item.price * item.quantity)
    .reduce((prevValue, currValue) => prevValue + currValue, 0);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // user
  const user = JSON.parse(localStorage.getItem("users"));

  // Buy Now Function
  const [addressInfo, setAddressInfo] = useState({
    name: "",
    address: "",
    pincode: "",
    mobileNumber: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const buyNowFunction = async () => {
    // validation
    if (
      addressInfo.name.trim() === "" ||
      addressInfo.address.trim() === "" ||
      addressInfo.pincode.trim() === "" ||
      addressInfo.mobileNumber.trim() === ""
    ) {
      return toast.error("All fields are required");
    }

    // Check if all items are in stock
    for (const item of cartItems) {
      const productRef = doc(fireDB, "products", item.id);
      const productDoc = await getDoc(productRef);
      const productData = productDoc.data();
      
      if (!productData || productData.quantity < item.quantity) {
        toast.error(`Not enough stock for ${item.title}`);
        return;
      }
    }

    // Order Info
    const orderInfo = {
      cartItems,
      addressInfo,
      email: user.email,
      userid: user.uid,
      userName: user.name,
      userEmail: user.email,
      status: "pending",
      totalAmount: cartTotal,
      time: Timestamp.now(),
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };

    try {
      // Create the order
      const orderRef = collection(fireDB, "order");
      await addDoc(orderRef, orderInfo);

      // Update product quantities
      for (const item of cartItems) {
        const productRef = doc(fireDB, "products", item.id);
        const productDoc = await getDoc(productRef);
        const productData = productDoc.data();
        
        await updateDoc(productRef, {
          quantity: productData.quantity - item.quantity
        });
      }

      // Clear the cart
      cartItems.forEach(item => {
        dispatch(deleteFromCart(item));
      });

      // Reset address form
      setAddressInfo({
        name: "",
        address: "",
        pincode: "",
        mobileNumber: "",
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      });

      toast.success("Order placed successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 max-w-7xl lg:px-0">
        <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center mb-8">
            Shopping Cart
          </h1>
          {cartItems.length > 0 ? (
            <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
              <section
                aria-labelledby="cart-heading"
                className="rounded-lg bg-white lg:col-span-8 mx-auto w-full max-w-3xl"
              >
                <h2 id="cart-heading" className="sr-only">
                  Items in your shopping cart
                </h2>
                <ul role="list" className="divide-y divide-gray-200">
                  {cartItems.map((item, index) => {
                    const {
                      id,
                      title,
                      price,
                      productImageUrl,
                      quantity,
                      category,
                    } = item;
                    return (
                      <div key={index} className="py-6">
                        <li className="flex py-6 sm:py-6">
                          <div className="flex-shrink-0">
                            <img
                              src={productImageUrl}
                              alt="img"
                              className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                            <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                              <div>
                                <div className="flex justify-between">
                                  <h3 className="text-sm">
                                    <div className="font-semibold text-black">
                                      {title}
                                    </div>
                                  </h3>
                                </div>
                                <div className="mt-1 flex text-sm">
                                  <p className="text-sm text-gray-500">
                                    {category}
                                  </p>
                                </div>
                                <div className="mt-1 flex items-end">
                                  <p className="text-sm font-medium text-gray-900">
                                    ₹{price}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <div className="mb-2 flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => handleDecrement(id)}
                              type="button"
                              className="btn-icon bg-gray-100 hover:bg-gray-200 text-gray-600"
                            >
                              -
                            </button>
                            <input
                              type="text"
                              className="h-8 w-12 rounded-md border text-center"
                              value={quantity}
                              readOnly
                            />
                            <button
                              onClick={() => handleIncrement(id)}
                              type="button"
                              className="btn-icon bg-gray-100 hover:bg-gray-200 text-gray-600"
                            >
                              +
                            </button>
                          </div>
                          <div className="ml-4">
                            <button
                              onClick={() => deleteCart(item)}
                              className="px-40 py-2 text-base font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors duration-200"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </ul>
              </section>

              {/* Order summary */}
              {cartItems.length > 0 && (
                <section
                  aria-labelledby="summary-heading"
                  className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
                >
                  <h2
                    id="summary-heading"
                    className="border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
                  >
                    Price Details
                  </h2>
                  <div>
                    <dl className="space-y-1 px-4 py-4">
                      <div className="flex items-center justify-between">
                        <dt className="text-sm text-gray-800">
                          Price ({cartItemTotal} items)
                        </dt>
                        <dd className="text-sm font-medium text-gray-900">
                          ₹{cartTotal}
                        </dd>
                      </div>
                      <div className="flex items-center justify-between py-4">
                        <dt className="flex text-sm text-gray-800">
                          <span>Delivery Charges</span>
                        </dt>
                        <dd className="text-sm font-medium text-green-700">Free</dd>
                      </div>
                      <div className="flex items-center justify-between border-y border-dashed py-4">
                        <dt className="text-base font-medium text-gray-900">
                          Total Amount
                        </dt>
                        <dd className="text-base font-medium text-gray-900">
                          ₹{cartTotal}
                        </dd>
                      </div>
                    </dl>
                    <div className="px-4 pb-4 font-medium text-green-700">
                      <div className="flex gap-4 mb-6">
                        {user ? (
                          <BuyNowModal
                            addressInfo={addressInfo}
                            setAddressInfo={setAddressInfo}
                            buyNowFunction={buyNowFunction}
                          />
                        ) : (
                          <Navigate to={"/login"} />
                        )}
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </form>
          ) : (
            <div className="flex justify-center items-center py-16 min-h-[40vh]">
              <div className="bg-white rounded-xl shadow-md p-10 max-w-md w-full text-center">
                <div className="text-4xl mb-4">🛒</div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Your cart is empty
                </h2>
                <p className="text-gray-500 mb-6">
                  Looks like you haven't added any items to your cart yet.
                </p>
                <Link
                  to="/allproduct"
                  className="btn-primary inline-flex items-center"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
