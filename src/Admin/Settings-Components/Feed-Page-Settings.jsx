import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PrevLocation from "../../Previous-Path";



var FeedPageSettings=()=>
{
    const navigate = useNavigate();
    const [Uploadable, setUploadable] = useState(false);
    const {prevPath, setPrevPath} = useContext(PrevLocation);
    

    var SaveLayout=async()=>
    {

    }


    return(
        <>
        <div className="myproducts-supporter" id="supporter-view">
            <div className="inside-pannel-dash p-5">
                <div className="intermost-p-d">
                        <div className="m-p-s-head add-p-nav px-5 py-4">
                            <div className="flex justify-content-between align-items-center for-add-p-b">
                                <div className="for-new-pro">
                                    {/* <Link className="back-btn" to={`${prevPath?prevPath:"/Supporter/Featured-Products"}`}><i class="fa-solid fa-chevron-left"></i> Back</Link> */}
                                    <button className="back-btn" onClick={()=>navigate(-1)}><i class="fa-solid fa-chevron-left"></i> Back</button>
                                </div>
                                <div className="m-p-s-heading flex gap-4">
                                    {
                                        Uploadable?
                                        <>
                                            <button className="action-add-p-btn" onClick={SaveLayout}>Save</button>
                                        </>
                                        :
                                        <>
                                            <button className="action-add-p-btn disabled">Save</button>
                                        </>
                                    }
                                    <Link className="action-add-p-btn" to={`${prevPath?prevPath:"/admin/product-category"}`}>Discard</Link>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
        </>
    )
}


export default FeedPageSettings;