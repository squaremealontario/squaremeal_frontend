import { useContext, useEffect, useState } from "react";
import CartContext from "../Contexts/CartContext";
import ProductContext from "../Contexts/ProductContext";
import PostContext from "../Contexts/PostContext";
import MyContext from "../UserContext";
import { Link, useNavigate } from "react-router-dom";
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import { toast } from "react-toastify";


var Cart=()=>
    {
        const {cartData, setCartData} = useContext(CartContext);
        const {user, setUser} = useContext(MyContext);
        const navigate = useNavigate();
        const [fadeLoad,setFadeLoad] = useState("display-flex");
        const [loadingRage,setloadingRage] = useState("display-block");
        const [checkoutCall,setCheckoutCall] = useState(true);
        const [PostsIDs, setPostsIDs] = useState([]);
        const [ProductsIDs, setProductsIDs] = useState([]);
        const [PostData, setPostData] = useState([]);
        const [ProductData, setProductData] = useState([]);
        const [subTotal, setSubTotal] = useState(0);
        const [platformFee, setplatformFee] = useState(5);
        const [taxPercent, setTaxPercent] = useState(0.13);
        const [taxAmount, settaxAmount] = useState(0);
        const [totalBill, setTotalBill] = useState(0);

        
        useEffect(()=>
        {
            window.scrollTo({top: 0, behavior: 'instant'});
        }, [])

        useEffect(()=>
        {
            if(user)
            {
                fetchCart();
            }
            else
            {
                setloadingRage("load-complete");
                var ce = setTimeout(function() {
                    var d = setloadingRage("display-none");
                    var e = setFadeLoad("display-none");
                },600);
            }
        }, [user])


        useEffect(()=>
        {
            if(ProductsIDs.length>0)
            {
                fetchProducts();
            }
        }, [ProductsIDs])

        useEffect(()=>
        {
            if(ProductData.length>0)
            {
                CalcTotal();
            }
        }, [ProductData])

        var CalcTotal=async()=>
        {
            var sub = 0;
            for(var i=0; i<ProductData.length; i++)
            {
                sub += ProductData[i].Price;
            }
            const preTotal = sub + platformFee;
            const tax_amount = preTotal*taxPercent;
            const tax_rounded = Math.round(tax_amount * 100) / 100;
            const Total = preTotal+tax_rounded;
            setSubTotal(sub);
            settaxAmount(tax_rounded);
            setTotalBill(Total);
            setCheckoutCall(false);
        }

        var Checkout=async()=>
        {
            setCheckoutCall(true);
            setloadingRage("display-block");
            setFadeLoad("display-flex");
            var registerData = {Price:totalBill,Product:ProductData, userId:user._id};
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/create-checkout-session`,
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
                    setloadingRage("load-complete");
                    window.location.replace(result.session);
                    var ce = setTimeout(function() {
                        var d = setloadingRage("display-none");
                        var e = setFadeLoad("display-none");
                    },600);
                }
                else if(result.statuscode===0)
                {
                    setloadingRage("load-complete");
                    var ce = setTimeout(function() {
                        var d = setloadingRage("display-none");
                        var e = setFadeLoad("display-none");
                        toast.error(`Something went wrong! Please try again.`, {
                        position: "top-center"
                        });
                    },600);
                }
            }

        }

        var fetchCart=async()=>
            {
                var registerData = {User:user._id};
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
                            const ids = result.membsdata.map(item => item.Product);
                            setProductsIDs(ids);
                        }
                        else
                        {
                            setCartData([]);
                            setloadingRage("load-complete");
                            var ce = setTimeout(function() {
                                var d = setloadingRage("display-none");
                                var e = setFadeLoad("display-none");
                            },600);
                        }
                    }
                    else
                    {
                        
                    }
            }
        
            
            var fetchProducts=async()=>
            {
                var registerData = {Products:ProductsIDs}
                    var resp = await fetch(`${process.env.REACT_APP_APIURL}/product-data`,
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
                            setProductData(result.membsdata);
                            setloadingRage("load-complete");
                            var ce = setTimeout(function() {
                                var d = setloadingRage("display-none");
                                var e = setFadeLoad("display-none");
                            },600);
                        }
                    }
                    else
                    {
                        
                        setloadingRage("load-complete");
                        var ce = setTimeout(function() {
                            var d = setloadingRage("display-none");
                            var e = setFadeLoad("display-none");
                        },600);
                    }
            }
            
            var deleteOneFromCart=async(pid, name)=>
            {
                var registerData = {xyz:pid, abc:user._id}
                    var resp = await fetch(`${process.env.REACT_APP_APIURL}/deleteOneUCart`,
                    {
                        method:"delete",
                        body:JSON.stringify(registerData),
                        headers:{'Content-type':'application/json'}
                    })
            
                    if(resp.ok)
                    {
                        var result = await resp.json();
                        if(result.statuscode===1)
                        {
                            fetchCart();
                        }
                    }
                    else
                    {
                        
                        setloadingRage("load-complete");
                        var ce = setTimeout(function() {
                            var d = setloadingRage("display-none");
                            var e = setFadeLoad("display-none");
                        },600);
                    }
            }

            var deleteAllFromCart=async()=>
            {
                
                var registerData = {abc:user._id}
                    var resp = await fetch(`${process.env.REACT_APP_APIURL}/deleteAllUCart`,
                    {
                        method:"delete",
                        body:JSON.stringify(registerData),
                        headers:{'Content-type':'application/json'}
                    })
            
                    if(resp.ok)
                    {
                        var result = await resp.json();
                        if(result.statuscode===1)
                        {
                            fetchCart();
                        }
                    }
                    else
                    {
                        
                        setloadingRage("load-complete");
                        var ce = setTimeout(function() {
                            var d = setloadingRage("display-none");
                            var e = setFadeLoad("display-none");
                        },600);
                    }
            }

    return(
    <>
    
    <div className="thecartout">
        <div className="py-5 mb-5">
            <div className="container">
                {
                    !user?
                    <>
                        <div className="whole-screen-flex">
                            {/* <h4>Shopping Cart</h4> */}
                            <div className="text-center">
                            <h3>Your Cart Is Currently Empty!</h3>
                            <p className="m-0">You need to <b>sign up/login</b> first in order to start an order.</p>
                            </div>
                            <Link className="return-shop-btn" to={'/'}>Return To Shop</Link>
                            <div className="the-open-empty-cart">
                            <i className="fa-brands fa-opencart"></i>
                            </div>
                        </div>
                    </>
                    :
                    cartData.length>0?
                    <>
                        <div className="the-cart">
                            <div className="inner-cart">
                                <div className="left-side-cart-detail col-lg-8 col-12">

                                    <div className="l-s-c-d-upper-opts">
                                        <div className='section-have-s'>
                                            <div className='inside-have-s position-relative'>
                                                <div className='heading-have-s no-border'>
                                                    <div className="grid">
                                                        <div className='the-head-t'>
                                                            <h4>
                                                                Your Cart
                                                            </h4>
                                                            <div className='c-loader'>
                                                                <div className='c-loader-line'></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="thecart-items">
                                            {
                                                ProductData?.length > 0 ?
                                                    <>
                                                        <div className="inner-cart-items">

                                                            {
                                                                ProductData.map((data, i) =>

                                                                    <div className="cart-items-card" key={i}>
                                                                        <div className="cart-card-inner">
                                                                            <div className="flex align-items-center gap-3">
                                                                                <div className="the-cart-item-photo">
                                                                                    <img src={`/ProductUploads/${data.Image}`} alt="" srcSet="" />
                                                                                </div>
                                                                                <div className="theleft-cartcard-deatils">
                                                                                    <h5>
                                                                                        {data.Title}
                                                                                    </h5>
                                                                                    <h6>
                                                                                        ${data.Price} x 1
                                                                                    </h6>
                                                                                </div>

                                                                            </div>
                                                                            <div className="theright-cartcard-deatils">
                                                                                <h4>
                                                                                    ${data.Price}
                                                                                </h4>
                                                                                <div className="remove-the-item-cart" onClick={()=> {
                                                                                    toast.promise(deleteOneFromCart(data._id, data.Title),
                                                                                        {
                                                                                        pending: `Removing ${data.Title} from the cart`,
                                                                                        success: `${data.Title} removed from the cart`,
                                                                                        error: 'Error! something went wrong.'
                                                                                        }, {
                                                                                            position: "top-center"
                                                                                            });
                                                                                    }}>
                                                                                    <i className="fa-solid fa-trash-can"></i>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }

                                                        </div>
                                                        <div className="empty-the-cart pt-5" onClick={()=> {
                                                            toast.promise(deleteAllFromCart,
                                                                {
                                                                    pending: 'Removing all from the cart',
                                                                    success: 'The cart is empty!',
                                                                    error: 'Error! something went wrong.',
                                                                }, {
                                                                    position: "top-center"
                                                                    });
                                                        }}>
                                                            <h5>Remove All</h5>
                                                        </div>
                                                    </>
                                                    : null
                                            }
                                        </div>

                                    </div>

                                </div>
                                <div className="right-side-cart-detail col-lg-4 col-12 mt-4">
                                    <div className="the-cart-info">
                                        <div className="bill-details pb-2">
                                            <h5>Order Summary</h5>
                                        </div>
                                        <div className="indetails-bill mt-4">
                                            <div className="bill-flex">
                                                <h5>Sub Total</h5>
                                                <h5 className="theprice-bill">${subTotal}</h5>
                                            </div>
                                            <div className="bill-flex">
                                                <h5>Service Fee</h5>
                                                <h5 className="theprice-bill">+ ${platformFee}</h5>
                                            </div>
                                            <div className="bill-flex">
                                                <h5>Tax (13%)</h5>
                                                <h5 className="theprice-bill">${taxAmount}</h5>
                                            </div>
                                            <div className="totalbill-cart">
                                                <h5>Total</h5>
                                                <h5 className="theprice-bill">${totalBill}</h5>
                                            </div>
                                            {
                                                checkoutCall?
                                                <>
                                                <button className="checkout-btn-fade">
                                                    <div class="lds-ellipsis"><div></div><div></div><div></div></div>
                                                </button>
                                                </>
                                                :
                                                <button className="checkout-btn" onClick={Checkout}>Checkout <i class="fa-solid fa-lock"></i></button>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>:
                    <>
                        <div className="whole-screen-flex">
                            {/* <h4>Shopping Cart</h4> */}
                            <div className="text-center">
                            <h3>Your Cart Is Currently Empty!</h3>
                            <p className="m-0">Before proceed to checkout you need to add one meal/grocery in your shopping cart.</p>
                            <p>Click on 'Return To Shop' to find your meal/grocery.</p>
                            </div>
                            <Link className="return-shop-btn" to={'/'}>Return To Shop</Link>
                            <div className="the-open-empty-cart">
                            <i className="fa-brands fa-opencart"></i>
                            </div>
                        </div>
                    </>
                }
                    


            </div>
        </div>
    </div>

    <div className="loading-line">
        <div className={`loading-range ${loadingRage}`}>

        </div>
    </div>

    <div className={`fade-screen ${fadeLoad}`}>
    <svg className="pl" width="240" height="240" viewBox="0 0 240 240">
        <circle className="pl__ring pl__ring--a" cx="120" cy="120" r="105" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 660" strokeDashoffset="-330" strokeLinecap="round"></circle>
        <circle className="pl__ring pl__ring--b" cx="120" cy="120" r="35" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 220" strokeDashoffset="-110" strokeLinecap="round"></circle>
        <circle className="pl__ring pl__ring--c" cx="85" cy="120" r="70" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 440" strokeLinecap="round"></circle>
        <circle className="pl__ring pl__ring--d" cx="155" cy="120" r="70" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 440" strokeLinecap="round"></circle>
    </svg>
    </div>
    </>
    )
}


export default Cart;