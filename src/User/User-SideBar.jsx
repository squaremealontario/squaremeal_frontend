import { useContext, useEffect, useState } from "react";
import $ from 'jquery';
import { Link, useLocation, useNavigate } from "react-router-dom";
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { Button, DialogActions, DialogContent, DialogTitle, Divider, Modal, ModalDialog } from "@mui/joy";
import MyContext from "../UserContext";
import Cookies from "universal-cookie";
import SideBarToggle from "../Contexts/SideBarOpen";




var UserSideBar=(props)=>
    {
        const location = useLocation();
        const {user, setUser} = useContext(MyContext);
        const cookies = new Cookies();
        const navigate = useNavigate();
        const [open, setOpen] = useState(false);
        const {MenuToggle, setMenuToggle} = useContext(SideBarToggle);

        
    var ActiveClass=(e)=>
        {
            $(".inner-s-d-s-opts ul li a").removeClass("active");
            $(e.target).addClass("active");
        }

    useEffect(()=>
        {
            $(`.inner-s-d-s-opts .upper-sidebtns li a`).removeClass('active');
            $(`.inner-s-d-s-opts .upper-sidebtns li a`).each(function() {
                if (this.href == window.location.href) {
                    $(this).addClass('active');
                }
            });

            if(MenuToggle)
                {
                    document.body.classList.add("overflow-y-hidden")
                }
                else
                {
                    document.body.classList.remove("overflow-y-hidden")
                }
        }, [location, MenuToggle, props.screenWidth])
    
    var Logout=async()=>
        {
            sessionStorage.clear();
            cookies.remove('authToken', { path: '/' });
            setUser(null);
            setMenuToggle(false);
            navigate("/");
        }

        return(
            <>

            {
                props?.screenWidth=='lg'?
                <>
                <div className="supporter-dash-sidebar">
                    <div className="inside-s-d-side py-4 overflow-y-auto">
                        <div className="s-d-s-body">
                            <div className="up-head">
                                <div className="logo-heading px-4 pb-2 justify-content-evenly align-items-center">
                                    <h2 onClick={()=> navigate('/')}>Square Basket</h2>
                                </div>
                                <div className="s-d-s-opts-body mt-4">
                                    <div className="inner-s-d-s-opts flex">
                                        <ul className="upper-sidebtns">
                                            <li onClick={(e)=> ActiveClass(e)}><Link to={`/user/account`}><i class="fa-solid fa-circle-user"></i> Account</Link></li>
                                            <li onClick={(e)=> ActiveClass(e)}><Link to={`/user/orders`}><i class="fa-solid fa-cash-register"></i> Orders</Link></li>
                                            <li onClick={(e)=> ActiveClass(e)}><Link to={`/`}><i class="fa-regular fa-circle-question"></i> Help</Link></li>
                                            <li onClick={(e)=> ActiveClass(e)}><Link to={`/user/settings`}><i class="fa-solid fa-gear"></i> Settings</Link></li>
                                        </ul>
                                        <ul>
                                            <li><div className="logout-btn" onClick={() => setOpen(true)}><i class="fa-solid fa-arrow-right-from-bracket"></i>Log Out</div></li>
                                        </ul>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </>
                :
                props?.screenWidth=='sm' && MenuToggle?
                <>
                <div className="supporter-dash-sidebar animate-slide">
                    <div className="inside-s-d-side py-lg-4 overflow-y-auto">
                        <div className="s-d-s-header">
                            <div className="px-4 h-100">
                                <div className="internal-flex-s-d-h flex justify-content-between align-items-center">
                                    <Link to={`/`} className="s-d-h-hamburger" onClick={()=> setMenuToggle(false)}>
                                        <div className="in-notify active n-m-g">
                                        <i class="fa-solid fa-house-chimney"></i>
                                        </div>
                                    </Link>
                                    <div className="the-console-side-logo">
                                        <h6>Square Basket User's</h6>
                                    </div>
                                    <div className="s-d-h-hamburger" onClick={()=> setMenuToggle(false)}>
                                        <div className="in-notify active n-m-g">
                                        <i class="fa-solid fa-x"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="s-d-s-body">
                            <div className="up-head">
                                <div className="s-d-s-opts-body mt-lg-4">
                                    <div className="inner-s-d-s-opts flex">
                                        <ul className="upper-sidebtns">
                                            <li onClick={()=> setMenuToggle(false)}><Link to={`/user/account`}><i class="fa-solid fa-circle-user"></i> Account</Link></li>
                                            <li onClick={()=> setMenuToggle(false)}><Link to={`/user/orders`}><i class="fa-solid fa-cash-register"></i> Orders</Link></li>
                                        </ul>
                                        <ul>
                                            <li><div className="logout-btn" onClick={() => setOpen(true)}><i class="fa-solid fa-arrow-right-from-bracket"></i>Log Out</div></li>
                                        </ul>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </>
                :null
            }
        
            
        

            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog variant="outlined" role="alertdialog">
                    <DialogTitle>
                        <WarningRoundedIcon />
                        Confirmation
                    </DialogTitle>
                    <Divider />
                    <DialogContent>
                        Are you sure you want to logout?
                    </DialogContent>
                    <DialogActions>
                        <Button variant="solid" color="danger" onClick={Logout}>
                            Logout
                        </Button>
                        <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                    </DialogActions>
                </ModalDialog>
            </Modal>

            </>
        )
    }
    
    
export default UserSideBar;