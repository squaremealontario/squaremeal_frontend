import { useContext, useEffect, useState } from "react";
import SideBarToggle from "./Contexts/SideBarOpen";
import $ from 'jquery';
import { useNavigate } from "react-router-dom";


var SideBar=(props)=>
{
    const [CategoryData,setCategory] = useState([]);
    const [width, setWidth] = useState();
    const {MenuToggle, setMenuToggle} = useContext(SideBarToggle);
    const navigate = useNavigate();

    useEffect(()=>
    {
        if(props.Category.length>0)
        {
            setCategory(props.Category);
        }
        else
        {
            setCategory([])
        }
    }, [props.Category])

    useEffect(()=>
    {
        if(MenuToggle)
        {
            document.body.classList.add("overflow-y-hidden")
        }
        else
        {
            document.body.classList.remove("overflow-y-hidden")
        }

    }, [MenuToggle])

    
    var fetchCategory =async()=>
        {
            try
            {
                const resp = await fetch(`${process.env.REACT_APP_APIURL}/all-categories`,
                {
                    method:"post",
                    headers:{'Content-type':'application/json'}
                });
                if(resp.ok)
                {
                    var result = await resp.json();
                    if(result.statuscode===0)
                    {
                        setCategory();
                    }
                    else if(result.statuscode===1)
                    {
                        setTimeout(()=>
                        {
                            setCategory(result.membsdata);
                        },[3000])
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

    useEffect(()=>
    {
        console.log(props.ActiveDiv)
    }, [props.ActiveDiv])


    var CloseTheBar=async()=>
    {
        $('.feed-sidebar-animate').addClass('feed-sidebar-back');
        setTimeout(()=>
        {
            setMenuToggle(false);
            $('.feed-sidebar-animate').removeClass('feed-sidebar-back');
        }, 700)
    }


    return(
        <>
        {
            width==='sm'?
            <>
            {
                MenuToggle?
                <>
                <aside className='feed-sidebar feed-sidebar-animate'>
                    <div className="feed-b-main-content position-relative pb-2">
                        <h4 className="SquareBasketName">Square Basket</h4>
                        <div className="the-feed-ratings">
                            4.9 <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i> <span>(100+ Ratings)</span>
                        </div>
                        <div className="feed-tabs mt-4">
                            <div className="the-f-t-card active" onClick={()=> navigate('/')}>
                            <i class="fa-solid fa-shop"></i> Shop
                            </div>
                            <div className="the-f-t-card">
                            <i class="fa-regular fa-rectangle-list"></i> Shop With List
                            </div>
                        </div>
                        <div className="closetheside" onClick={CloseTheBar}>
                        <i class="fa-solid fa-xmark"></i>
                        </div>
                    </div>
                    <div className="internal-feed-sidebar">
                        <div className="i-f-s-inner pt-2">
                            {
                                !CategoryData.length>0?
                                <>
                                <div class="card-2-catopt m-0">
                                    <div class="card__skeleton card__catOpt"></div>
                                </div>
                                <div class="card-2-catopt m-0">
                                    <div class="card__skeleton card__catOpt"></div>
                                </div>
                                <div class="card-2-catopt m-0">
                                    <div class="card__skeleton card__catOpt"></div>
                                </div>
                                <div class="card-2-catopt m-0">
                                    <div class="card__skeleton card__catOpt"></div>
                                </div>
                                <div class="card-2-catopt m-0">
                                    <div class="card__skeleton card__catOpt"></div>
                                </div>
                                <div class="card-2-catopt m-0">
                                    <div class="card__skeleton card__catOpt"></div>
                                </div>
                                <div class="card-2-catopt m-0">
                                    <div class="card__skeleton card__catOpt"></div>
                                </div>
                                <div class="card-2-catopt m-0">
                                    <div class="card__skeleton card__catOpt"></div>
                                </div>
                                <div class="card-2-catopt m-0">
                                    <div class="card__skeleton card__catOpt"></div>
                                </div>
                                <div class="card-2-catopt m-0">
                                    <div class="card__skeleton card__catOpt"></div>
                                </div>
                                </>
                                :
                                <>
                                {
                                    CategoryData.map((data, i) =>
                                        <>
                                            <div className={`the-f-t-card`} key={i} onClick={() =>{ props.Scroll(i);
                                            CloseTheBar();
                                            }}>
                                                {data.Title}
                                            </div>
                                        </>
                                    )
                                }
                                </>
                            }
                            
                        </div>
                    
                    </div>
                    
                </aside>
                </>
                :null
            }
                
            </>
            :width==='lg'?
            <>
            <aside className='feed-sidebar'>
                <div className="feed-b-main-content pb-2">
                    <h4 className="SquareBasketName">Square Basket</h4>
                    <div className="the-feed-ratings">
                        4.9 <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i> <span>(100+ Ratings)</span>
                    </div>
                    <div className="feed-tabs mt-4">
                        <div className="the-f-t-card active" onClick={()=> navigate('/')}>
                        <i class="fa-solid fa-shop"></i> Shop
                        </div>
                        <div className="the-f-t-card">
                        <i class="fa-regular fa-rectangle-list"></i> Shop With List
                        </div>
                    </div>
                </div>
                <div className="internal-feed-sidebar">
                    <div className="i-f-s-inner pt-2">
                        {
                            !CategoryData.length>0?
                            <>
                            <div class="card-2-catopt m-0">
                                <div class="card__skeleton card__catOpt"></div>
                            </div>
                            <div class="card-2-catopt m-0">
                                <div class="card__skeleton card__catOpt"></div>
                            </div>
                            <div class="card-2-catopt m-0">
                                <div class="card__skeleton card__catOpt"></div>
                            </div>
                            <div class="card-2-catopt m-0">
                                <div class="card__skeleton card__catOpt"></div>
                            </div>
                            <div class="card-2-catopt m-0">
                                <div class="card__skeleton card__catOpt"></div>
                            </div>
                            <div class="card-2-catopt m-0">
                                <div class="card__skeleton card__catOpt"></div>
                            </div>
                            <div class="card-2-catopt m-0">
                                <div class="card__skeleton card__catOpt"></div>
                            </div>
                            <div class="card-2-catopt m-0">
                                <div class="card__skeleton card__catOpt"></div>
                            </div>
                            <div class="card-2-catopt m-0">
                                <div class="card__skeleton card__catOpt"></div>
                            </div>
                            <div class="card-2-catopt m-0">
                                <div class="card__skeleton card__catOpt"></div>
                            </div>
                            </>
                            :
                            <>
                            {
                                CategoryData.map((data, i) =>
                                    <>
                                        <div className={`the-f-t-card ${props.ActiveDiv==i?'active':''}`} key={i} onClick={() =>{ props.Scroll(i);
                                        }}>
                                            {data.Title}
                                        </div>
                                    </>
                                )
                            }
                            </>
                        }
                        
                    </div>
                
                </div>
                
            </aside>
            </>
            :null
        }
            
        </>
    )
}

export default SideBar;