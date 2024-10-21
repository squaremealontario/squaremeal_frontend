import { useNavigate } from "react-router-dom";
import ViewQuiltOutlinedIcon from '@mui/icons-material/ViewQuiltOutlined';



var AdminSettings=()=>
{

    
    const navigate = useNavigate();

    return(
        <>

        <div className="myproducts-supporter" id="supporter-view">
            <div className="inside-pannel-dash p-5">
                <div className="intermost-p-d">
                    <div className="m-p-s-head add-p-nav px-5 py-4">
                        <div className="flex justify-content-center align-items-center for-add-p-b">
                            <div className="for-new-pro">
                                {/* <Link className="back-btn" to={`${prevPath?prevPath:"/Supporter/Featured-Products"}`}><i class="fa-solid fa-chevron-left"></i> Back</Link> */}
                                <h4 className="m-0 the-compo-title"><i class="fa-solid fa-gear"></i> Admin Settings</h4>
                            </div>
                        </div>
                    </div>
                    <div className="the-settings-section mt-5 py-4">
                        <div className="inner-t-s-s">
                            <div className="upper-head-t-s-s mb-4">
                                <h4>Website</h4>
                            </div>
                            <div className="grid the-settings-opts">
                                <div className="the-s-o-tabs" onClick={()=> navigate('/admin/feed-page-layout-settings')}>
                                    <ViewQuiltOutlinedIcon></ViewQuiltOutlinedIcon>
                                    <div className="t-s-o-t-title">
                                        Feed Page
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </>
    )
}

export default AdminSettings;