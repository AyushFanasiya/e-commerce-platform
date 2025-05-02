import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../../context/myContext";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { auth, fireDB } from "../../../firebase/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import Loader from "../../loader/Loader";

const Signup = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  // navigate
  const navigate = useNavigate();

  // User Signup State
  const [userSignup, setUserSignup] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });


  const userSignupFunction = async () => {
    // validation
    if (
      userSignup.name === "" ||
      userSignup.email === "" ||
      userSignup.password === ""
    ) {
      toast.error("All Fields are required");
    }

    setLoading(true);
    try {
      const users = await createUserWithEmailAndPassword(
        auth,
        userSignup.email,
        userSignup.password
      );

      // create user object
      const user = {
        name: userSignup.name,
        email: users.user.email,
        uid: users.user.uid,
        role: userSignup.role,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      // create user Refrence
      const userRefrence = collection(fireDB, "user");

      // Add User Detail
      addDoc(userRefrence, user);

      setUserSignup({
        name: "",
        email: "",
        password: "",
      });

      toast.success("Signup Successfully");

      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {loading && <Loader />}
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <div className="mb-6">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-2">Sign Up</h2>
          <p className="text-center text-gray-500 text-base">Create your account to get started</p>
        </div>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={userSignup.name}
            onChange={(e) => {
              setUserSignup({ ...userSignup, name: e.target.value });
            }}
            className="input-field"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={userSignup.email}
            onChange={(e) => {
              setUserSignup({ ...userSignup, email: e.target.value });
            }}
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            value={userSignup.password}
            onChange={(e) => {
              setUserSignup({ ...userSignup, password: e.target.value });
            }}
            className="input-field"
          />
          <button
            type="button"
            onClick={userSignupFunction}
            className="btn-primary w-full h-12 text-base font-semibold rounded-lg"
          >
            Sign Up
          </button>
        </div>
        <div className="mt-6 text-center">
          <span className="text-gray-600">Already have an account? </span>
          <Link className="text-primary font-semibold hover:underline" to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
