import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import MyContext from "../UserContext";
import { useLocation, useOutletContext } from "react-router-dom";


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

var SearchAisle=(props)=>
{

    
    const [loading, setLoading] = useState(true);
    const [ProductData, setProductData] = useState([]);
    const query = useQuery().get('search_query');
    const {user, setUser} = useContext(MyContext);

    useEffect(()=>
    {
        if(query)
        {
            searchMethod();
        }
    }, [query])
    
    
    var searchMethod =async()=>
        {
            try
            {
                const resp = await fetch(`${process.env.REACT_APP_APIURL}/search-product?search_query=${query}`,
                {
                    method:"get",
                    headers:{'Content-type':'application/json'}
                });
                if(resp.ok)
                {
                    var result = await resp.json();
                    if(result.statuscode===0)
                    {
                        setProductData([]);
                    }
                    else if(result.statuscode===1)
                    {
                        setProductData(result.results);
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


    return(
        <>

        {
            ProductData.length>0?
            <>
            
        <div className='section-have-s py-3' id='featured-meals'>
            <div className='inside-have-s position-relative'>
                <div className='position-relative pt-4'>
                    
                    <div className='heading-have-s no-border'>
                        <div className="grid align-items-center">
                            <div className='the-head-t'>
                                <h4>
                                    {`Showing ${ProductData?.length} items for "${query}"`}
                                </h4>
                                {/* <div className='c-loader'>
                                        <div className='c-loader-line'></div>
                                    </div> */}
                            </div>
                        </div>
                    </div>
                    
                </div>

                {
                    ProductData.length > 0 ?
                        <>

                            <div className='f-res mt-3'>
                                <div className="the-search-page-grid">
                                    

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

                                </div>
                            </div>
                        </>
                        :
                        null
                }
            </div>
        </div>
            </>
            :
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
                                    <div className="the-search-page-grid">

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

                                        </div>
                                    </div>
                    </div>
                </div>
        }    
        </>
    )
}


export default SearchAisle;