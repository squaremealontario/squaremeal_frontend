import {Route, Routes, Navigate} from "react-router-dom";
import Home from "./Home";
import React from 'react';
import CreateAccount from "./Create-Account";
import SignupStudent from "./Signup-Student";
import SignupSupporter from "./Signup-Supporter";
import Login from "./Login";
import SupporterDashboard from "./Supporter-Dashboard";
import ForSupporter from "./ForSupporter";
import MyProducts from "./MyProducts";
import AddProduct from "./Add-Product";
import MyPosts from "./MyPosts";
import NewPost from "./NewPost";
import SelectPostOption from "./SelectPostOption";
import Cart from "./Cart/Cart";
import AdminPanel from "./Admin/AdminPanel";
import ForAdmin from "./Admin/Restrictors/ForAdmin";
import AdminProducts from "./Admin/Components/Admin-Products";
import AdminAddProduct from "./Admin/Components/Admin-AddProduct";
import ProductCategory from "./Admin/Components/Admin-Category";
import AdminAddCategory from "./Admin/Components/Admin-AddCategory";
import AdminSettings from "./Admin/Settings-Components/Admin-Settings";
import FeedPageSettings from "./Admin/Settings-Components/Feed-Page-Settings";
import SuccessCheckout from "./Cart/SuccessCheckout";
import OnlyAdmin from "./Admin/Restrictors/OnlyAdmin";
import OrderCompletion from "./Admin/Components/OrderCompletion";
import SearchAisle from "./Feed/Search-Aisle";
import UserAccount from "./User/User-Account";
import OnlyUser from "./User/Restrictions/OnlyUser";
import AdminLayout from "./Layouts/AdminLayout";
import NormalLayout from "./Layouts/NormalLayout";
import UserLayout from "./Layouts/UserLayout";
import UserOrders from "./User/Order/User-Orders";
import UserOrderDetail from "./User/Order/User-OrderDetail";
import AdminOrders from "./Admin/Components/Admin-Orders";
import NotFoundURL from "./OtherPages/NotFoundURL";


var AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<NormalLayout MyComp={Home} />} >
                <Route path="result" element={<NormalLayout MyComp={Home} />} />
            </Route>
            <Route path="/Home" element={<Navigate to="/" />} />
            <Route path="/Create-Account" element={<NormalLayout MyComp={CreateAccount} />} />
            <Route path="/Create-Account/Student" element={<NormalLayout MyComp={SignupStudent} />} />
            <Route path="/Create-Account/Supporter" element={<NormalLayout MyComp={SignupSupporter} />} />
            <Route path="/Login" element={<NormalLayout MyComp={Login} />} />
            <Route path="/Supporter/Dashboard" element={<ForSupporter MyComp={SupporterDashboard} />} />
            <Route path="/Supporter/Featured-Products" element={<ForSupporter MyComp={MyProducts} />} />
            <Route path="/Supporter/Add-Product" element={<ForSupporter MyComp={AddProduct} />} />
            <Route path="/Supporter/MyPosts/*" element={<ForSupporter MyComp={MyPosts} />}>
                <Route path="NewPost/*" element={<ForSupporter MyComp={NewPost} />}>
                    <Route path="Select-Product" element={<ForSupporter MyComp={SelectPostOption} />} />
                </Route>
            </Route>
            <Route path="/Cart" element={<NormalLayout MyComp={Cart} />} />
            <Route path="/admin/dashboard" element={<AdminLayout MyComp={AdminPanel} />} />
            <Route path="/admin/products-listing" element={<AdminLayout MyComp={AdminProducts} />} />
            <Route path="/admin/add-product" element={<AdminLayout MyComp={AdminAddProduct} />} />
            <Route path="/admin/product-category" element={<AdminLayout MyComp={ProductCategory} />} />
            <Route path="/admin/add-category" element={<AdminLayout MyComp={AdminAddCategory} />} />
            <Route path="/admin/all-orders" element={<AdminLayout MyComp={AdminOrders} />} />
            <Route path="/admin/settings" element={<AdminLayout MyComp={AdminSettings} />} />
            <Route path="/admin/feed-page-layout-settings" element={<AdminLayout MyComp={FeedPageSettings} />} />
            <Route path="/checkout/success/:query" element={<NormalLayout MyComp={SuccessCheckout} />} />
            <Route path="/scan/check-order/:query" element={<NormalLayout MyComp={OrderCompletion} />} />
            <Route path="/user/account" element={<UserLayout MyComp={UserAccount} />} />
            <Route path="/user/orders" element={<UserLayout MyComp={UserOrders} />} />
            <Route path="/user/order-detail/:id" element={<NormalLayout MyComp={UserOrderDetail} />} />

            
            <Route path="*" element={<NotFoundURL />} />
        </Routes>
    )
}
export default AppRoutes;