import { Autocomplete } from "@mui/material";
import { useContext } from "react";
import SideBarToggle from "../Contexts/SideBarOpen";



const options = ['Option 1', 'Option 2'];


var UserHeader=(props)=>
    {
        const {MenuToggle, setMenuToggle} = useContext(SideBarToggle);
        return(
            <>
            
            <div className="supporter-dash-header">
                <div className="inside-s-d-head">
                    <div className="s-d-head px-4">
                        <div className="internal-flex-s-d-h flex justify-content-between align-items-center">
                            {
                                props.screenWidth=='sm'?
                                <>
                                <div className="s-d-h-hamburger" onClick={()=> setMenuToggle(true)}>
                                    <div className="in-notify active n-m-g">
                                    <i class="fa-solid fa-bars-staggered"></i>
                                    </div>
                                </div>
                                </>
                                :null
                            }
                            <Autocomplete
                                sx={(theme) => ({
                                    display: 'inline-block',
                                    '& input': {
                                        width: 200,
                                        bgcolor: 'background.paper',
                                    },
                                })}
                                id="custom-input-demo"
                                options={options}
                                renderInput={(params) => (
                                    <div className="supporter-v-search" ref={params.InputProps.ref}>
                                        <input type="text" placeholder="Search Bar" {...params.inputProps} />
                                    </div>
                                )}
                            />
                            
                            <div className="right-side-s-h-d">
                                <div className="r-f flex align-items-center">
                                    <div className="s-d-h-notifications">
                                        <div className="in-notify active n-m-g">
                                            <i class="fa-regular fa-bell"></i>
                                            <span className="notification-active-">
                                            </span>
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
    
    
export default UserHeader;