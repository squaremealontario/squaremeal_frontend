import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import MyContext from "../UserContext"
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { Button, DialogActions, DialogContent, DialogTitle, Divider, Modal, ModalDialog } from "@mui/joy";



var ShowCase=(props)=>
{
    return(
        <>
        <div className="mt-4 row">
        <div className="col-lg-6 col-12 mb-lg-0 mb-2 t-u-a-info-cards">
            <h4 className="mb-lg-3 mb-2">First Name</h4>
            {
                props.data?
                <>
                    <h4 className="W500">{props.data.FirstName?props.data.FirstName:'Null'}</h4>
                </>:
                <div class="card m-0">
                    <div class="card__skeleton card__username"></div>
                </div>
            }
        </div>
        <div className="col-lg-6 col-12 mb-lg-0 mb-2 t-u-a-info-cards">
            <h4 className="mb-lg-3 mb-2">Last Name</h4>
            {
                props.data?
                <>
                    <h4 className="W500">{props.data.LastName?props.data.LastName:'Null'}</h4>
                </>
                :
                <div class="card m-0">
                    <div class="card__skeleton card__username"></div>
                </div>

            }
        </div>
        </div>
        <div className="mt-lg-4 mt-0 row">
        <div className="col-lg-6 col-12 mb-lg-0 mb-2 t-u-a-info-cards">
            <h4 className="mb-lg-3 mb-2">Humber Email</h4>
            {
                props.data.email?
                <>
            <h4 className="W500">{props.data.email}</h4>
                </>
                :
                <div class="card m-0">
                    <div class="card__skeleton card__username"></div>
                </div>

            }
        </div>
        <div className="col-lg-6 col-12 mb-lg-0 mb-2 t-u-a-info-cards">
            <h4 className="mb-lg-3 mb-2">User Status</h4>
            {
                props.data.usertype?
                <>
            <h4 className="W500">{props.data.usertype}</h4>
                </>
                :
                <div class="card m-0">
                    <div class="card__skeleton card__username"></div>
                </div>

            }
        </div>
        </div>
        </>
    )
}

var UpdateForm=(props)=>
{
    const [NewFName, setNEwFName] = useState('');
    const [NewLName, setNewLName] = useState('');

    useEffect(()=>
    {
        if(props.data)
        {
            setNEwFName(props.data.FirstName);
            setNewLName(props.data.LastName);
        }
    }, [props.data])


    var UpdateSave=async()=>
    {
        props.UpdateFunction(NewFName, NewLName);
        props.setOpen(false)
    }

    return(
        <>
        <div className="mt-4 row">
        <div className="col-lg-6 col-12 mb-lg-0 mb-2 t-u-a-info-cards">
            <h4 className="mb-lg-3 mb-2">First Name</h4>
            {
                props.data?
                <>
                    <input type="text" defaultValue={props.data.FirstName} onChange={(e)=> setNEwFName(e.target.value)} name="FirstName" id="FirstName" />
                </>:
                <div class="card m-0">
                    <div class="card__skeleton card__username"></div>
                </div>
            }
        </div>
        <div className="col-lg-6 col-12 mb-lg-0 mb-2 t-u-a-info-cards">
            <h4 className="mb-lg-3 mb-2">Last Name</h4>
            {
                props.data?
                <>
                <input type="text" defaultValue={props.data.LastName} onChange={(e)=> setNewLName(e.target.value)} name="LastName" id="LastName" />
                </>
                :
                <div class="card m-0">
                    <div class="card__skeleton card__username"></div>
                </div>

            }
        </div>
        </div>
        <div className="mt-lg-4 mt-0 row">
        <div className="col-lg-6 col-12 mb-lg-0 mb-2 t-u-a-info-cards">
            <h4 className="mb-lg-3 mb-2">Humber Email</h4>
            {
                props.data.email?
                <>
            <h4 className="W500">{props.data.email}</h4>
                </>
                :
                <div class="card m-0">
                    <div class="card__skeleton card__username"></div>
                </div>

            }
        </div>
        <div className="col-lg-6 col-12 mb-lg-0 mb-2 t-u-a-info-cards">
            <h4 className="mb-lg-3 mb-2">User Status</h4>
            {
                props.data.usertype?
                <>
            <h4 className="W500">{props.data.usertype}</h4>
                </>
                :
                <div class="card m-0">
                    <div class="card__skeleton card__username"></div>
                </div>

            }
        </div>
        </div>

        
        <Modal open={props.open} onClose={() => props.setOpen(false)}>
                <ModalDialog variant="outlined" role="alertdialog">
                    <DialogTitle>
                        <WarningRoundedIcon />
                        Confirmation
                    </DialogTitle>
                    <Divider />
                    <DialogContent>
                        Do you really want to update your data?
                    </DialogContent>
                    <DialogActions>
                        <Button variant="solid" color="danger" onClick={UpdateSave}>
                            Save
                        </Button>
                        <Button variant="plain" color="neutral" onClick={() => props.setOpen(false)}>
                            Cancel
                        </Button>
                    </DialogActions>
                </ModalDialog>
            </Modal>
        </>
    )
}

var UserAccount=(props)=>
{

    const [editMode, setEditMode] = useState(false);
    const [UserData, setUserData] = useState([]);
    const {user,setUser} = useContext(MyContext);
    const [open, setOpen] = useState(false);
    const [UpdateStatus, setUpdateStatus] = useState(false);
    const [fadeLoad,setFadeLoad] = useState("display-flex");
    const [loadingRage,setloadingRage] = useState("display-block");
    const EditModeOn=()=> {setEditMode(true)};
    const EditModeOff=()=> {setEditMode(false)};

    useEffect(()=>
    {
        if(user)
        {
            fetchUserData();
        }
    }, [user])


    var UpdateUserInfo=async(Fname, Lname)=>
    {
        setUpdateStatus(true);
        try
        {
            var registerData = {
                _id:user._id,
                FirstName:Fname,
                LastName:Lname
            }
            const resp = await fetch(`${process.env.REACT_APP_APIURL}/update-user`,
            {
                method:"post",
                body: JSON.stringify(registerData),
                headers:{'Content-type':'application/json'}
            })
            if(resp.ok)
            {
                var result = await resp.json();
                if(result.statuscode===1)
                {
                    fetchUserData();
                    var ce = setTimeout(function() {
                        var d = setloadingRage("display-none");
                        var e = setFadeLoad("display-none");
                        setUpdateStatus(false);
                        toast.success('Data updated successfully',
                            {
                                position:'top-center'
                            }
                        );
                        setEditMode(false);
                    },600);
                }
                else
                {
                    toast.error('Request Denied! something went wrong.',
                        {
                            position:'top-center'
                        }
                    );
                }
            }
        }
        catch
        {
            toast.error('Error! something went wrong.',
                {
                    position:'top-center'
                }
            );
        }
    }

    var fetchUserData=async()=>
    {
        try
        {
            var data = {_id:user._id}
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/getUser`,
            {
                method:"post",
                body:JSON.stringify(data),
                headers:{'Content-type':'application/json'}
            })
    
            if(resp.ok)
            {
                var result = await resp.json();
                if(result.statuscode===1)
                {
                    setUserData(result.UData);
                }
                else
                {
                    setUserData([]);
                }
            }
            else
            {
                toast.error('Error! something went wrong.',
                {
                    position:'top-center'
                }
            );
            }
        }
        catch
        {
            toast.error('Error! something went wrong.',
                {
                    position:'top-center'
                }
            );
        }
    }

    return(
        <>

        <div className="the-user-account">
            <div className="inner-t-u-a">
                <div className="inside-inner-t-u-a">
                    <div className="user-pro-inside">
                        <div className="mb-4">
                            <h3 className="the-user-pro-h">My Profile</h3>
                        </div>
                        <div className="the-u-pro-card p-4 position-relative">
                            <div className="the-sm-heading">
                                <h4>Personal Information</h4>
                            </div>
                            <div className="t-u-a-info">
                                {
                                    UserData.length>0?
                                    <>
                                    {
                                        editMode?<UpdateForm open={open} UpdateFunction={(Fname, Lname)=>{
                                             UpdateUserInfo(Fname, Lname)
                                            }} setOpen={(e)=> setOpen(e)} data={UserData[0]}/>:
                                        <ShowCase data={UserData[0]}/>
                                    }
                                    </>
                                    :
                                    editMode?<UpdateForm data={UserData} UpdateFunction={(Fname, Lname)=>{
                                        UpdateUserInfo(Fname, Lname)
                                       }}/>:
                                        <ShowCase data={UserData}/>
                                }
                            </div>
                            {
                                editMode?
                                <>
                                <div className="t-u-a-upperbtns-sec">
                                    <div className="t-u-a-upbtn" onClick={EditModeOff}>
                                    <i className="fa-solid fa-ban"></i> Cancel
                                    </div>
                                    <div className="t-u-a-upbtn bg-red" onClick={()=> setOpen(true)}>
                                    <i className="fa-regular fa-floppy-disk"></i> Save
                                    </div>
                                </div>
                                </>
                                :
                                <>
                                <div className="u-a-info-edit" onClick={EditModeOn}>
                                <i className="fa-regular fa-pen-to-square"></i> Edit
                                </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>


        {
            UpdateStatus?
            <>
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
            </>:null
        }

        </>
    )
}


export default UserAccount;