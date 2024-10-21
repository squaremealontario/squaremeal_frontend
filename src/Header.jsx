import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MyContext from "./UserContext";
import $ from 'jquery';
import CartContext from "./Contexts/CartContext";
import SideBarToggle from "./Contexts/SideBarOpen";
import { Button, Offcanvas } from "react-bootstrap";

var Header = (prop) =>
{
    const navigate = useNavigate();
    const {user,setUser} = useContext(MyContext);
    const {cartData, setCartData} = useContext(CartContext);
    const {MenuToggle, setMenuToggle} = useContext(SideBarToggle);
    const [width, setWidth] = useState();
    const [searchText, setSearchText] = useState('');
    const location = useLocation();
    const currentPath = location.pathname;
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    $(window).on("scroll", function () {
        var scroll = $(window).scrollTop();
    
        if (scroll >= 80) {
          $("#site-header").addClass("nav-fixed");
        } else {
          $("#site-header").removeClass("nav-fixed");
        }
      });


      useEffect(() => {
        if(user)
        {
            fetchCart();
        }
      }, [user]);

      
      var fetchCart=async()=>
        {
            var registerData = {User:user._id}
                var resp = await fetch(`${process.env.REACT_APP_APIURL}/cart-data`,
                {
                    method:"post",
                    body:JSON.stringify(registerData),
                    headers:{'Content-type':'application/json'}
                })
        
                if(resp.ok)
                {
                    var result = await resp.json();
                    if(result.statuscode===1)
                    {
                        setCartData(result.membsdata);
                    }
                    else
                    {
                        setCartData([]);
                    }
                }
                else
                {
                    
                }
        }

        useEffect(() => {
            // Function to handle window resize
            const handleResize = () => {
              if (window.innerWidth <= 768) { // Example for small screen width
                setWidth('sm');
              } else {
                setWidth('lg');
              }
            };
        
            // Set initial maxItems based on the current window width
            handleResize();
        
            // Add event listener to listen for window resize
            window.addEventListener("resize", handleResize);
        
            // Clean up event listener on component unmount
            return () => window.removeEventListener("resize", handleResize);
          }, []);

          var CloseTheBar=async()=>
            {
                $('.feed-sidebar-animate').addClass('feed-sidebar-back');
                setTimeout(()=>
                {
                    setMenuToggle(false);
                    $('.feed-sidebar-animate').removeClass('feed-sidebar-back');
                }, 700)
            }


        var SearchTheProduct=async()=>
        {
            if(searchText)
            {
                navigate(`/result?search_query=${searchText}`)
            }
        }


        var RedirectToAccount=async()=>
        {
            if(user)
            {
                if(user.usertype=="Admin")
                {
                    navigate('/admin/dashboard');
                }
                else if(user.usertype=="Student")
                {
                    navigate('/user/account');
                }
            }
            
        }

    return(

        <>
          {
            width=='sm'?
            <>
            <header id="site-header">
                    <div className="px-4 head">
                        <div className="align-items-center nav-section">
                            <div className="the-left-nav-con gap-3 flex align-items-center">
                                <div className="header-sm-btns" onClick={()=> setMenuToggle(true)}>
                                    <i class="fa-solid fa-bars-staggered"></i>
                                </div>
                                <div className="header-sm-btns"  onClick={handleShow}>
                                    <i class="fa-solid fa-magnifying-glass"></i>
                                </div>
                            </div>
                            <div className="nav-bar the-center-nav-con">
                                <div className="the-searchbar-header text-center w-100 position-relative">
                                <Link className="logo-pic" to={`/`}><img src="/img/Logo.jpg" alt=""/> </Link>
                                </div>
                            </div>
                            <div className="the-right-nav-con justify-content-end w-100 gap-3 flex align-items-center">
                                <div className="header-sm-btns" onClick={()=> navigate('/Cart')}>
                                    <i class="fa-solid fa-cart-shopping cart-icon position-relative"><span>{cartData?.length}</span></i>
                                </div>
                                {
                                        user?
                                        <>
                                        <div className="account-nav-btn" onClick={RedirectToAccount}>
                                        <div className="my-account-btn"><img src={`/UserProfiles/${user.Picture?user.Picture:'noprofile.jpg'}`} alt="" /></div>
                                        </div>
                                        </>
                                        :
                                        <Link className="header-sm-btns" to={'/Login'}>
                                            <i class="fa-solid fa-user"></i>
                                        </Link>
                                    }
                                
                            </div>
                        </div>
                    </div>
                </header>
            <Offcanvas show={show} onHide={handleClose} placement="top" scroll={false}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Search For Grocery</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="pb-4">
                <div className="the-searchbar-header w-100 position-relative">
                                    <input type="text" placeholder="Search for Grocery" onKeyDown={(e)=> {
                                        if (e.key === 'Enter') {
                                            SearchTheProduct();
                                            handleClose();
                                          }
                                    }} onChange={(e)=>{ setSearchText(e.target.value)
                                        
                                    }}/>
                                    <div className="thesearchbtn-header position-absolute">
                                    <i class="fa-solid fa-magnifying-glass"></i>
                                    </div>
                                </div>
                </Offcanvas.Body>
            </Offcanvas>
            </>
            : width=='lg'?
            <>
                <header id="site-header">
                    <div className="px-4 head">
                        <div className="align-items-center nav-section">
                            <div className="the-left-nav-con pe-4 flex align-items-center">
                                <Link className="logo-pic" to={`/`}><img src="/img/Logo.jpg" alt=""/></Link>
                                <h4 className="theheader-location"><i class="fa-solid fa-location-dot"></i>&nbsp; Humber College North Campus</h4>
                            </div>
                            <div className="nav-bar the-center-nav-con">
                                <div className="the-searchbar-header w-100 pe-3 position-relative">
                                    <input type="text" placeholder="Seach for Grocery" onKeyDown={(e)=> {
                                        if (e.key === 'Enter') {
                                            SearchTheProduct();
                                          }
                                    }} onChange={(e)=>{ setSearchText(e.target.value)
                                        
                                    }}/>
                                    <div className="thesearchbtn-header position-absolute">
                                    <i class="fa-solid fa-magnifying-glass"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="the-right-nav-con">
                                <div className="right-nav-btns">
                                    <div className="cart-icon" onClick={()=> navigate('/Cart')}>
                                        <i className="fa-solid fa-cart-shopping"></i>
                                        <span>{cartData?.length}</span>
                                    </div>
                                    <div className="vertical-line-1-4">

                                    </div>
                                    {
                                        user?
                                        <>
                                        <div className="account-nav-btn" onClick={RedirectToAccount}>
                                        <div className="my-account-btn"><img src={`/UserProfiles/${user.Picture?user.Picture:'noprofile.jpg'}`} alt="" /></div> <span className="ms-2">Account</span>
                                        </div>
                                        </>
                                        :
                                        <Link className="login-btn" to={`/Login`}>Login</Link>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </>
            :
            <>
            <header id="site-header">
                    <div className="px-4 head">
                        <div className="align-items-center nav-section">
                            <div className="the-left-nav-con pe-4 flex align-items-center">
                                <Link className="logo-pic" to={`/`}><img src="/img/Logo.jpg" alt=""/></Link>
                                <h4 className="theheader-location"><i class="fa-solid fa-location-dot"></i>&nbsp; Humber College North Campus</h4>
                            </div>
                            <div className="nav-bar the-center-nav-con">
                                <div className="the-searchbar-header w-100 pe-3 position-relative">
                                    <input type="text" placeholder="Seach for Grocery" />
                                    <div className="thesearchbtn-header position-absolute">
                                    <i class="fa-solid fa-magnifying-glass"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="the-right-nav-con">
                                <div className="right-nav-btns">
                                    <div className="cart-icon" onClick={()=> navigate('/Cart')}>
                                        <i className="fa-solid fa-cart-shopping"></i>
                                        <span>{cartData?.length}</span>
                                    </div>
                                    <div className="vertical-line-1-4">

                                    </div>
                                    {
                                        user?
                                        <>
                                        <div className="account-nav-btn" onClick={RedirectToAccount}>
                                        <div className="my-account-btn"><img src={`/UserProfiles/${user.Picture?user.Picture:'noprofile.jpg'}`} alt="" /></div> <span className="ms-2">Account</span>
                                        </div>
                                        </>
                                        :
                                        <Link className="login-btn" to={`/Login`}>Login</Link>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </>
          }
          

            
        <div className='upper-m-head'></div>

        {
            currentPath!=='/' && MenuToggle?
            <>
            <aside className='feed-sidebar feed-sidebar-animate'>
                <div className="feed-b-main-content position-relative pb-2">
                    <h4 className="SquareBasketName">Square Basket</h4>
                    <div className="the-feed-ratings">
                        4.9 <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i> <span>(100+ Ratings)</span>
                    </div>
                    <div className="feed-tabs mt-4 mb-2">
                        <div className={`the-f-t-card ${currentPath==='/'?'active':''}`} onClick={()=>{ navigate('/'); setMenuToggle(false)}}>
                            <i class="fa-solid fa-shop"></i> Shop
                        </div>
                        <div className="the-f-t-card">
                            <i class="fa-regular fa-rectangle-list"></i> Shop With List
                        </div>
                        <div className="the-f-t-card">
                        <i class="fa-solid fa-magnifying-glass"></i> Search Product
                        </div>
                        <div className={`the-f-t-card ${currentPath==='/Cart'?'active':''}`} onClick={()=>{ navigate('/Cart'); setMenuToggle(false)}}>
                        <i class="fa-solid fa-cart-shopping"></i> My Cart
                        </div>
                        {
                            user?
                            <>
                            <div className={`the-f-t-card ${currentPath==='/account'?'active':''}`} onClick={RedirectToAccount}>
                            <i class="fa-regular fa-user"></i> My Account
                            </div>
                            </>
                            :
                            <>
                            <div className={`the-f-t-card ${currentPath==='/Login'?'active':''}`} onClick={()=> navigate('/Login')}>
                            <i class="fa-solid fa-right-to-bracket"></i> Login
                            </div>
                            <div className={`the-f-t-card ${currentPath==='/Create-Account'?'active':''}`} onClick={()=> navigate('/Create-Account')}>
                            <i class="fa-solid fa-user-plus"></i> Create Account
                            </div>
                            </>
                        }
                        
                    </div>
                    <div className="closetheside" onClick={CloseTheBar}>
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                </div>

            </aside>
            </>
            :null
        }
            
            
        </>

    )

}

export default Header;