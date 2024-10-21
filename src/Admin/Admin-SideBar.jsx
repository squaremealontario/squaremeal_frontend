import { Link, useLocation, useNavigate } from "react-router-dom";
import $ from 'jquery';
import { useContext, useEffect, useState } from "react";
import PrevLocation from "../Previous-Path";
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { Button, DialogActions, DialogContent, DialogTitle, Divider, Modal, ModalDialog } from "@mui/joy";
import MyContext from "../UserContext";
import Cookies from "universal-cookie";



var AdminSideBar=()=>
{

    const location = useLocation();
    const [prevLoc, setprevLoc] = useState();
    const {prevPath, setPrevPath} = useContext(PrevLocation);
    const {user, setUser} = useContext(MyContext);
	const cookies = new Cookies();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    var ActiveClass=(e)=>
    {
        $(".inner-s-d-s-opts ul li a").removeClass("active");
        $(e.target).addClass("active");
    }

    var RemoveAllClass=()=>
    {
        $(".inner-s-d-s-opts ul li a").removeClass("active");
    }


    useEffect(()=>
    {
        $(`.inner-s-d-s-opts .upper-sidebtns li a`).removeClass('active');
        $(`.inner-s-d-s-opts .upper-sidebtns li a`).each(function() {
            if (this.href === window.location.href) {
                $(this).addClass('active');
            }
        });
    }, [location])

    useEffect(()=>
    {
        if(prevLoc)
            {
                var a = prevLoc;
                setPrevPath(a);
            }
        setprevLoc(window.location.href);
    }, [location])

    var Logout=async()=>
    {
		sessionStorage.clear();
		cookies.remove('authToken', { path: '/' });
        setUser(null);
		navigate("/");
    }

    return(
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
                                    <li onClick={(e)=> ActiveClass(e)}><Link to={`/admin/dashboard`}><i class="fa-solid fa-chart-line"></i> Dashboard</Link></li>
                                    <li onClick={(e)=> ActiveClass(e)}><Link to={`/`}><i class="fa-solid fa-circle-user"></i> Account</Link></li>
                                    <li onClick={(e)=> ActiveClass(e)}><Link to={`/admin/all-orders`}><i class="fa-solid fa-cash-register"></i> Orders</Link></li>
                                    <li onClick={(e)=> ActiveClass(e)}><Link to={`/admin/product-category`}><i class="fa-solid fa-list"></i> Category</Link></li>
                                    <li onClick={(e)=> ActiveClass(e)}><Link to={`/admin/products-listing`}><i class="fa-solid fa-clipboard-list"></i> Products</Link></li>
                                    <li onClick={(e)=> ActiveClass(e)}><Link to={`/admin/MyPosts`}><i class="fa-solid fa-upload"></i> Posts</Link></li>
                                    <li onClick={(e)=> ActiveClass(e)}><Link to={`/`}><i class="fa-regular fa-circle-question"></i> Help</Link></li>
                                    <li onClick={(e)=> ActiveClass(e)}><Link to={`/admin/settings`}><i class="fa-solid fa-gear"></i> Settings</Link></li>
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


export default AdminSideBar;