import { useContext, useEffect, useState } from "react";
import MyContext from "../UserContext";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import SideBarToggle from "../Contexts/SideBarOpen";


var ProductAisle=(props)=>
{
    const [ProductData,setProductData] = useState([]);
    const [maxItems, setMaxItems] = useState(6);
    const [seeAll, setSeeAll] = useState(false);
    const navigate = useNavigate();
    const {user, setUser} = useContext(MyContext);
     
    // var fetchProducts =async()=>
    //     {
    //         try
    //         {
    //             const resp = await fetch(`${process.env.REACT_APP_APIURL}/feed-products`,
    //             {
    //                 method:"post",
    //                 headers:{'Content-type':'application/json'}
    //             });
    //             if(resp.ok)
    //             {
    //                 var result = await resp.json();
    //                 if(result.statuscode===0)
    //                 {
    //                     setProductData();
    //                 }
    //                 else if(result.statuscode===1)
    //                 {
    //                     setTimeout(()=>
    //                         {
    //                             setProductData(result.membsdata);
    //                         }, [3000])
    //                 }
    //             }
    //             else
    //             {
                    
    //             }
    //         }
    //         catch
    //         {
    //         }
    //     }

        useEffect(()=>
        {
            if(props.ProductData.length>0 && props.Category)
            {
                const newArray = props.ProductData.filter((e)=> e.Category==props.Category.id)
                setProductData(newArray);
            }
            else
            {
                setProductData([]);
            }
        }, [props.ProductData, props.Category])

        useEffect(() => {
            // Function to handle window resize
            const handleResize = () => {
              if (window.innerWidth <= 4000 && window.innerWidth > 3000) { // Example for small screen width
                setMaxItems(8);
              } 
              else if(window.innerWidth <= 3000 && window.innerWidth > 1200) {
                setMaxItems(6);
              }
              else if(window.innerWidth <= 1200 && window.innerWidth > 1024) {
                setMaxItems(4);
              }
              else if(window.innerWidth <= 1024 && window.innerWidth > 768) {
                setMaxItems(3);
              }
              else if(window.innerWidth <= 768 && window.innerWidth >= 0) {
                setMaxItems(3);
                setSeeAll(true);
              }
            };
        
            // Set initial maxItems based on the current window width
            handleResize();
        
            // Add event listener to listen for window resize
            window.addEventListener("resize", handleResize);
        
            // Clean up event listener on component unmount
            return () => window.removeEventListener("resize", handleResize);
          }, []);

        
        var addtoCart=async(Product)=>
            {
                var a = props.setloadingRage("display-block");
                var b = props.setFadeLoad("display-block");
                const Quantity = 1;
                const User = user._id;
                var registerData = {Product,User,Quantity}
                var resp = await fetch(`${process.env.REACT_APP_APIURL}/add-to-cart`,
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
                        props.setloadingRage("load-complete");
                        var ce = setTimeout(function() {
                            var d = props.setloadingRage("display-none");
                            var e = props.setFadeLoad("display-none");
                            toast.success(`Added To Cart`, {
                            position: "top-center"
                            });
                        },600);
                        props.FetchCart();
                    }
                    else if(result.statuscode===0)
                    {
                        props.setloadingRage("load-complete");
                        var ce = setTimeout(function() {
                            var d = props.setloadingRage("display-none");
                            var e = props.setFadeLoad("display-none");
                            toast.error(`Error!`, {
                                position: "top-center"
                            });
                        },600);
                    }
                    else if(result.statuscode===2)
                    {
                        props.setloadingRage("load-complete");
                        var ce = setTimeout(function() {
                            var d = props.setloadingRage("display-none");
                            var e = props.setFadeLoad("display-none");
                            toast.error(`Product is already is the Cart`, {
                                position: "top-center"
                            });
                        },600);
                    }
                }
                else
                {
                    props.setloadingRage("load-complete");
                    var ce = setTimeout(function() {
                        var d = props.setloadingRage("display-none");
                        var e = props.setFadeLoad("display-none");
                        toast.error(`Error!`, {
                            position: "top-center"
                        });
                    },600);
                }
            }

    
        const responsive2 = {
            superLargeDesktop: {
              // the naming can be any, depends on you.
              breakpoint: { max: 4000, min: 3000 },
              items: 8
            },
            desktop: {
              breakpoint: { max: 3000, min: 1024 },
              items: 6
            },
            desktop: {
              breakpoint: { max: 3000, min: 1024 },
              items: 6
            },
            tablet: {
              breakpoint: { max: 1024, min: 464 },
              items: 2
            },
            mobile: {
              breakpoint: { max: 464, min: 0 },
              items: 1
            }
          };

    return(
        <>

        {
            !ProductData.length>0?
            <>
            <div className='section-have-s py-3' id='featured-meals'>
                <div className='inside-have-s position-relative '>
                    <div className='pt-4'>

                        <div className='heading-have-s no-border'>
                            <div className="grid align-items-center">
                                <div className='the-head-t'>
                                    <div class="card m-0">
                                        <div class="card__skeleton card__cat"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='f-res mt-3'>
                        <Carousel className='slider-left-right-carousel' responsive={props.Responsive}>

                            <div class="card">
                                <div class="card__skeleton card__description"></div>
                                <div class="card__skeleton card__title"></div>
                                <div class="card__skeleton card__price"></div>
                            </div>
                            <div class="card">
                                <div class="card__skeleton card__description"></div>
                                <div class="card__skeleton card__title"></div>
                                <div class="card__skeleton card__price"></div>
                            </div>
                            <div class="card">
                                <div class="card__skeleton card__description"></div>
                                <div class="card__skeleton card__title"></div>
                                <div class="card__skeleton card__price"></div>
                            </div>
                            <div class="card">
                                <div class="card__skeleton card__description"></div>
                                <div class="card__skeleton card__title"></div>
                                <div class="card__skeleton card__price"></div>
                            </div>
                            <div class="card">
                                <div class="card__skeleton card__description"></div>
                                <div class="card__skeleton card__title"></div>
                                <div class="card__skeleton card__price"></div>
                            </div>
                            <div class="card">
                                <div class="card__skeleton card__description"></div>
                                <div class="card__skeleton card__title"></div>
                                <div class="card__skeleton card__price"></div>
                            </div>

                        </Carousel>
                    </div>
                </div>
            </div>
            </>
            :
            <div className='section-have-s py-3' id='featured-meals' data-id={props.DataID} ref={props.Reference}>
                <div className='inside-have-s position-relative'>
                    <div className='position-relative pt-4'>
                        
                        <div className='heading-have-s no-border'>
                            <div className="grid align-items-center">
                                <div className='the-head-t'>
                                    <h4>
                                        {props.Category?props.Category.Title:'Loading...'}
                                    </h4>
                                    {/* <div className='c-loader'>
                                            <div className='c-loader-line'></div>
                                        </div> */}
                                </div>
                                {
                            ProductData.length > maxItems ?
                                <>
                                    <div className='see-all-f-res'>
                                        {
                                            seeAll?
                                            <>
                                            <Link className="goto-sm-btns">
                                            <i class="fa-solid fa-arrow-right"></i>
                                            </Link>
                                            
                                            </>
                                            :
                                            <Link>See All</Link>
                                        }
                                    </div>
                                </>
                                : null
                        }
                            </div>
                        </div>
                        
                    </div>
    
                    {
                        ProductData.length > 0 ?
                            <>
    
                                <div className='f-res mt-3'>
                                    <Carousel className='slider-left-right-carousel' responsive={props.Responsive}>
    
                                        {
                                            ProductData?.map((data, i) =>
                                                <>
                                                    <div className='thecards' key={i}>
                                                        <div className='card-img-outerlay'>
                                                            <div className='card-img' style={{ "backgroundImage": ` url(/ProductUploads/${data.Image})` }}>
    
                                                            </div>
                                                            {
                                                                user ?
                                                                    <>
                                                                        <div className='add-to-cart-btn' onClick={() => addtoCart(data._id)}>
                                                                            <i class="fa-solid fa-plus"></i>
                                                                        </div>
                                                                    </> : null
                                                            }
    
                                                        </div>
                                                        <div className='card-body pt-2'>
                                                            <div>
                                                                <h3 className='The-Price-Heading'>
                                                                    FREE <span className='og-price'>${data.OriginalPrice}</span>
                                                                </h3>
                                                                <h4 className='heading-sm lightdark-heading two-lines'>
                                                                    {data.Title}
                                                                </h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        }
    
                                    </Carousel>
                                </div>
                            </>
                            :
                            null
                    }
                </div>
            </div>
        }


        

        </>
    )
}

export default ProductAisle;