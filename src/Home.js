import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MyContext from './UserContext';
import { toast } from 'react-toastify';
import CartContext from './Contexts/CartContext';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import SideBar from './Feed-Sidebar';
import ProductAisle from './Feed/Product-Aisle';
import SearchAisle from './Feed/Search-Aisle';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

var Home=()=>
{

    
    const [PostData, setPostData] = useState([]);
    const [ProductData,setProductData] = useState([]);
    const [CategoryData,setCategory] = useState([]);
    const [ActiveSection,setActiveSection] = useState(null);
    const [fadeLoad,setFadeLoad] = useState("display-none");
    const [loadingRage,setloadingRage] = useState("display-none");
    const {user, setUser} = useContext(MyContext);
    const {cartData, setCartData} = useContext(CartContext);
    const navigate = useNavigate();
    const sectionRef = useRef([]);
    const [childData, setChildData] = useState(false);
    const query = useQuery().get('search_query');

  const handleChildData = (data) => {
    console.log(data)
    setChildData(data); // Update state with data from child
  };

    useEffect(()=>
        {
            window.scrollTo({top: 0, behavior: 'instant'});
            console.log(query)
        }, [])

        useEffect(()=>
        {
            if(user)
            {
                fetchCart();
            }
        }, [user])

        useEffect(()=>
        {
            // fetchProducts();
            fetchCats();
        }, [])

        var fetchCart=async()=>
            {
                var registerData = {User:user}
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


    var ActiveClass=(e)=>
        {
            $("#featured-meals .tabs-for-opts .tabs-opts h5").removeClass("active");
            $(e.target).addClass("active");
        }

    var ActiveClass2=(e)=>
        {
            $("#featured-grocery .tabs-for-opts .tabs-opts h5").removeClass("active");
            $(e.target).addClass("active");
        }

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 8
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 8
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


    const responsive2 = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 8
        },
        desktop: {
          breakpoint: { max: 3000, min: 1200 },
          items: 6
        },
        desktop2: {
          breakpoint: { max: 1200, min: 1024 },
          items: 4
        },
        tablet: {
          breakpoint: { max: 1024, min: 768 },
          items: 3
        },
        tablet2: {
          breakpoint: { max: 768, min: 464 },
          items: 3
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 2.5
        }
      };

      
     
        var fetchProducts =async()=>
            {
                try
                {
                    const resp = await fetch(`${process.env.REACT_APP_APIURL}/feed-products`,
                    {
                        method:"post",
                        headers:{'Content-type':'application/json'}
                    });
                    if(resp.ok)
                    {
                        var result = await resp.json();
                        if(result.statuscode===0)
                        {
                            setProductData();
                        }
                        else if(result.statuscode===1)
                        {
                            setTimeout(()=>
                                {
                                    setProductData(result.membsdata);
                                }, [3000])
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
      
     
        var fetchCats =async()=>
            {
                try
                {
                    const resp = await fetch(`${process.env.REACT_APP_APIURL}/all-showcase-categories`,
                    {
                        method:"post",
                        headers:{'Content-type':'application/json'}
                    });
                    if(resp.ok)
                    {
                        var result = await resp.json();
                        if(result.statuscode===0)
                        {
                            setCategory([]);
                        }
                        else if(result.statuscode===1)
                        {
                            setCategory(result.membsdata);
                            setProductData(result.productsData);
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

        var addtoCart=async(Post,UptoTime)=>
        {
            var a = setloadingRage("display-block");
            var b = setFadeLoad("display-block");
            const Quantity = 1;
            const User = user._id;
            var registerData = {Post,User,Quantity,UptoTime}
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
                    setloadingRage("load-complete");
                    var ce = setTimeout(function() {
                        var d = setloadingRage("display-none");
                        var e = setFadeLoad("display-none");
                        toast.success(`Added To Cart`, {
                        position: "top-center"
                        });
                        navigate('/Cart');
                    },600);
                    fetchCart();
                }
                else if(result.statuscode===0)
                {
                    setloadingRage("load-complete");
                    var ce = setTimeout(function() {
                        var d = setloadingRage("display-none");
                        var e = setFadeLoad("display-none");
                        toast.error(`Error!`, {
                            position: "top-center"
                        });
                    },600);
                }
                else if(result.statuscode===2)
                {
                    setloadingRage("load-complete");
                    var ce = setTimeout(function() {
                        var d = setloadingRage("display-none");
                        var e = setFadeLoad("display-none");
                        toast.error(`Product is already is the Cart`, {
                            position: "top-center"
                        });
                    },600);
                }
            }
            else
            {
                setloadingRage("load-complete");
                var ce = setTimeout(function() {
                    var d = setloadingRage("display-none");
                    var e = setFadeLoad("display-none");
                    toast.error(`Error!`, {
                        position: "top-center"
                    });
                },600);
            }
        }

        const scrollToSection = (index) => {
            autoActive();
            const element = sectionRef.current[index];
            const headerHeight = 80; // The height of your fixed header in pixels
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
              behavior: "smooth",
              block: "start",
              top: elementPosition - headerHeight,
            });
          };

    
          useEffect(() => {
            // Create an intersection observer
            const observer = new IntersectionObserver(
              (entries) => {
                entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                    // Set the active section when it's intersecting
                    const visibleSectionId = entry.target.getAttribute("data-id");
                    setActiveSection(visibleSectionId);
                  }
                });
              },
              {
                threshold: 1.0, // Adjust to trigger when 100% of the section is visible
              }
            );
            // Observe each section
            sectionRef.current.forEach((section) => {
              if (section) observer.observe(section);
            });

        
            return () => {
              // Clean up the observer when the component unmounts
              sectionRef.current.forEach((section) => {
                if (section) observer.unobserve(section);
              });
            };
          });


          useEffect(() => {
            // Create an intersection observer
            const observer = new IntersectionObserver(
              (entries) => {
                entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                    // Set the active section when it's intersecting
                    const visibleSectionId = entry.target.getAttribute("data-id");
                    setActiveSection(visibleSectionId);
                  }
                });
              },
              {
                threshold: 1.0, // Adjust to trigger when 100% of the section is visible
              }
            );
            // Observe each section
            sectionRef.current.forEach((section) => {
              if (section) observer.observe(section);
            });

        
            return () => {
              // Clean up the observer when the component unmounts
              sectionRef.current.forEach((section) => {
                if (section) observer.unobserve(section);
              });
            };
          }, []);



          
        var autoActive=async()=>
        {
            const observer = new IntersectionObserver(
                (entries) => {
                  entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                      // Set the active section when it's intersecting
                      const visibleSectionId = entry.target.getAttribute("data-id");
                      setActiveSection(visibleSectionId);
                    }
                  });
                },
                {
                  threshold: 1.0, // Adjust to trigger when 100% of the section is visible
                }
              );
              // Observe each section
              sectionRef.current.forEach((section) => {
                if (section) observer.observe(section);
              });
  
          
              return () => {
                // Clean up the observer when the component unmounts
                sectionRef.current.forEach((section) => {
                  if (section) observer.unobserve(section);
                });
              };
        }
            
        //   window.addEventListener("scroll", autoActive)

    return(

        <>

        


    <div className='main-flex'>


        <SideBar Category={CategoryData} Scroll={scrollToSection} ActiveDiv={ActiveSection}/>


        <main className='feed-main' id='feed-main'>

            {
                !ProductData.length>0 && !query?
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
                                        <Carousel className='slider-left-right-carousel' responsive={responsive2}>

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
                                        <Carousel className='slider-left-right-carousel' responsive={responsive2}>

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
                                        <Carousel className='slider-left-right-carousel' responsive={responsive2}>

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
                                        <Carousel className='slider-left-right-carousel' responsive={responsive2}>

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
                                        <Carousel className='slider-left-right-carousel' responsive={responsive2}>

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
                                        <Carousel className='slider-left-right-carousel' responsive={responsive2}>

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
                                        <Carousel className='slider-left-right-carousel' responsive={responsive2}>

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
                ProductData.length>0 || query?
                <>

                {
                    CategoryData?.length>0 && !query?
                    <>
                    {
                        CategoryData.map((data,i)=>
                        <>
                        <ProductAisle Responsive={responsive2} ProductData={ProductData} Category={{id:data._id,Title:data.Title}} FetchCart={fetchCart} DataID={i} Reference={(el) => (sectionRef.current[i] = el)} setloadingRage={(e)=> setloadingRage(e)} setFadeLoad={(e)=> setFadeLoad(e)} />
                        </>
                        )
                    }
                    </>
                    :
                    query?
                    <>
                    <SearchAisle/>
                    </>
                    :null
                }
                
                    

                </>
                :
                
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
                                    <Carousel className='slider-left-right-carousel' responsive={responsive2}>

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
                                    <Carousel className='slider-left-right-carousel' responsive={responsive2}>

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
                                    <Carousel className='slider-left-right-carousel' responsive={responsive2}>

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
                                    <Carousel className='slider-left-right-carousel' responsive={responsive2}>

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
                                    <Carousel className='slider-left-right-carousel' responsive={responsive2}>

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
                                    <Carousel className='slider-left-right-carousel' responsive={responsive2}>

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
                                    <Carousel className='slider-left-right-carousel' responsive={responsive2}>

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
            }


        </main>

    </div>

    <div className="loading-line">
        <div className={`loading-range ${loadingRage}`}>

        </div>
    </div>

    <div className={`fade-screen ${fadeLoad}`}>

</div>
        </>

    )

}

    
export default Home;