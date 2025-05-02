import './App.css'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/pages/home/HomePage';
import NoPage from './components/pages/noPage/NoPage';
import ProductInfo from './components/pages/productInfo/ProductInfo';
import ScrollTop from './components/scrollTop/ScrollTop';
import CartPage from './components/pages/cart/CartPage'
import AllProduct from './components/pages/allProduct/AllProduct'
import Login from './components/pages/registration/Login';
import Signup from './components/pages/registration/Signup';
import UserDashboard from './components/pages/user/UserDashboard';
import AdminDashboard from './components/pages/admin/AdminDashboard';
import AddProductPage from './components/pages/admin/AddProductPage';
import UpdateProductPage from './components/pages/admin/UpdateProductPage';
import MyState from './context/myState';
import { Toaster } from 'react-hot-toast';
import { ProtectedRouteForUser } from './protectedRoute/ProtectedRouteForUser';
import { ProtectedRouteForAdmin } from './protectedRoute/ProtectedRouteForAdmin'
import CategoryPage from './components/pages/category/CategoryPage';

const App = () => {
  return (
    <MyState>
      <BrowserRouter>
        <ScrollTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/*" element={<NoPage />} />
          <Route path="/productinfo/:id" element={<ProductInfo />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/allproduct" element={<AllProduct />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/category/:categoryname" element={<CategoryPage />} />  {/* category Page route  */}
          <Route path="/user-dashboard" element={
            <ProtectedRouteForUser>
              <UserDashboard />
            </ProtectedRouteForUser>
          } />
          <Route path="/admin-dashboard" element={
            <ProtectedRouteForAdmin>
              <AdminDashboard />
            </ProtectedRouteForAdmin>
          } />
          <Route path="/addproduct" element={
            <ProtectedRouteForAdmin>
              <AddProductPage />
            </ProtectedRouteForAdmin>
          } />
          <Route path="/updateproduct/:id" element={
            <ProtectedRouteForAdmin>
              <UpdateProductPage />
            </ProtectedRouteForAdmin>
          } />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </MyState>
  );
}

export default App;