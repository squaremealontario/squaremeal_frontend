import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Header.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from './Site.js';
import './App.css';
import { useContext, useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import MyContext from './UserContext.js';
import SupporterSideBar from './Supporter-SideBar.js';
import SupporterHeader from './Supporter-Header.js';
import UIContext from './MyUICon.js';
import HeaderUI from './HeaderUI.js';
import PrevLocation from './Previous-Path.js';
import TitleContext from './Post-Title-Context.jsx';
import CartContext from './Contexts/CartContext.jsx';
import PostContext from './Contexts/PostContext.jsx';
import ProductContext from './Contexts/ProductContext.jsx';
import AdminHeader from './Admin/Admin-Header.jsx';
import AdminSideBar from './Admin/Admin-SideBar.jsx';
import { jwtDecode } from 'jwt-decode';
import SideBar from './Feed-Sidebar.jsx';
import SideBarToggle from './Contexts/SideBarOpen.jsx';
import Footer from './Footer.jsx';
import UserSideBar from './User/User-SideBar.jsx';
import UserHeader from './User/User-Header.jsx';

function App() {

  
  const [user, setUser] = useState(null);
  const [prevPath, setPrevPath] = useState(null);
  const [ui, setui] = useState(null);
  const [usertype, setusertype] = useState("guest");
  const [MenuToggle, setMenuToggle] = useState(false);
	const cookies = new Cookies();
  const [title, setTitle] = useState(null);
  const [cartData, setCartData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [postData, setPostData] = useState([]);

  
  useEffect(()=>
    {
      if(user)
      {
        if(user.usertype==="Admin")
        {
          setusertype("Admin");
        }
        else if(user.usertype==="Supporter")
        {
          setusertype("Supporter");
        }
        else if(user.usertype==="Student")
        {
          setusertype("Student");
        }
        else
        {
          setusertype("Other");
        }
      }
    }, [user])
  
    useEffect(()=>
    {
      // var session = sessionStorage.getItem("userInfo");
      var cookieToken = cookies.get("authToken");
      var uiData = sessionStorage.getItem("uitype");
      if(cookieToken!=null)
      {
        const decodedToken = jwtDecode(cookieToken);
        setUser(decodedToken);
      }
      const handleResize = () => {
        if (window.innerWidth > 768) { // Example for small screen width
          setMenuToggle(false);
        }
      };
  
      // Set initial maxItems based on the current window width
      handleResize();
  
      // Add event listener to listen for window resize
      window.addEventListener("resize", handleResize);
  
      // Clean up event listener on component unmount
      return () => window.removeEventListener("resize", handleResize);
      
    }, [])
    
  
  
    // useEffect(()=>
    // {
    //     if(cookies.get("usercookie")!=undefined)
    //     {
    //       var uid = cookies.get("usercookie");
    //       userInfo(uid);
    //     }
    // }, [])
  
  
    var userInfo=async(uid)=>
    {
      try
      {
        
          const resp = await fetch(`${process.env.REACT_APP_APIURL}/search-user-by-id/${uid}`)
          if(resp.ok)
          {
              var result = await resp.json();
              if(result.statuscode===0)
              {
              }
              else if(result.statuscode===1)
              {
                setUser(result.membdata);
                sessionStorage.setItem("userInfo", JSON.stringify(result.membdata));
                sessionStorage.setItem("authToken", result.authToken);
              }
          }
          else
          {
  
          }
        }
        catch
        {
  
        }
    }
  

  return (
      <BrowserRouter>
        <MyContext.Provider value={{ user, setUser }}>
          <PrevLocation.Provider value={{ prevPath, setPrevPath }}>
            
          <TitleContext.Provider value={{ title, setTitle }}>
            
              
              <CartContext.Provider value={{ cartData, setCartData }}>

                <SideBarToggle.Provider value={{ MenuToggle, setMenuToggle }}>

                  <ProductContext.Provider value={{ productData, setProductData }}>
                      <AppRoutes/>
                      <ToastContainer />

                    </ProductContext.Provider>  
                  </SideBarToggle.Provider>
              </CartContext.Provider>
          </TitleContext.Provider>
          </PrevLocation.Provider>
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;
