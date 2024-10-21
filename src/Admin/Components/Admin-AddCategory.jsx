import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import $ from 'jquery';
import CloudUploadTwoToneIcon from '@mui/icons-material/CloudUploadTwoTone';
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select } from "@mui/material";
import { toast } from "react-toastify";
import MyContext from "../../UserContext";
import PrevLocation from "../../Previous-Path";



var AdminAddCategory=()=>
    {

        const [uploadImg, setuploadImg] = useState();
        const [Uploadable, setUploadable] = useState(false);
        const [fadeLoad,setFadeLoad] = useState("display-none");
        const [Title, setTitle] = useState();
        const [TheImg, setImg] = useState();
        const [Description, setDescription] = useState();
        const [CatActive, setCatActive] = useState(false);
        const {prevPath, setPrevPath} = useContext(PrevLocation);
        const [loadingRage,setloadingRage] = useState("display-none");
        const [ErrorActive,setErrorActive] = useState(false);
        const [Error,setError] = useState();
        const [ErrorDetail,setErrorDetail] = useState();
        const [orderForError,setOrderForError] = useState("display-none");
        const {user, setUser} = useContext(MyContext);
        const navigate = useNavigate();


        useEffect(()=>
        {
            if(uploadImg)
                {
                    var a = setloadingRage("display-block");
                    $("body").css("cursor", "wait");
                    $("#photo-upload-input").css("display", "none");
                    var dragTimer1 = window.setTimeout(function() {
                            $("#photo-upload-img").attr("src", URL.createObjectURL(uploadImg));
                            $("#photo-upload-img").css("visibility", "visible");
                            $("#dropzone").css("display", "none");
                            $("#supporter-view").css("filter", "none");
                            $("body").css("cursor", "default");
                            $("#photo-upload-input").css("display", "block");
                            setloadingRage("load-complete");
                      }, 1000);
                    var dragTimer2 = window.setTimeout(function() {
                            var d = setloadingRage("display-none");
                      }, 1100);
                    
                }
        },[uploadImg])

        var dragTimer;
        $(document).on('dragover', function(e) {
            var dt = e.originalEvent.dataTransfer;
            if (dt.types && (dt.types.indexOf ? dt.types.indexOf('Files') != -1 : dt.types.contains('Files'))) {
                $("#dropzone").css("display", "block");
                $("#supporter-view").css("filter", "blur(4px)");
                window.clearTimeout(dragTimer);
            }
            });
            $(document).on('dragleave', function(e) {
            dragTimer = window.setTimeout(function() {
                $("#dropzone").css("display", "none");
                $("#supporter-view").css("filter", "none");
            }, 500);
        });


        useEffect(()=>
        {
            if(!Title || !uploadImg || !Description)
                {
                    setUploadable(false)
                }
                else
                {
                    setUploadable(true)
                }
        }, [Title, uploadImg, Description])


        var SaveProduct = async () =>
        {
            var a = setloadingRage("display-block");
            var b = setFadeLoad("display-block");
            var myform = new FormData();
            myform.append("Title",Title);
            myform.append("Image",uploadImg);
            myform.append("Description",Description);
            myform.append("isActive",CatActive);
            myform.append("Uploader",user._id);
            try
            {
                const resp = await fetch(`${process.env.REACT_APP_APIURL}/add-category`,
                {
                    method:"post",
                    body: myform
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
                            toast.success(`Category Added Successfully`, {
                                position: "top-center"
                                });
                            navigate("/admin/product-category")
                        },300);
                    }
                    else
                    {
                        setloadingRage("load-complete");
                        var ce = setTimeout(function() {
                            var d = setloadingRage("display-none");
                            var e = setFadeLoad("display-none");
                            toast.error(`Upload Failed`, {
                            position: "top-center"
                            });
                        },300);
                    }
                }
            }
            catch
            {
                toast.error(`Upload Failed`, {
                    position: "top-center"
                    });
            }
        }


        const handleChange = (event) => {
            const selectedFile = event.target.files[0];
            const fileTypes = ['image/jpeg', 'image/png', 'image/webp'];
            const maxSize = 10 * 1024 * 1024; // 10 MB
        
            if (selectedFile && fileTypes.includes(selectedFile.type) && selectedFile.size <= maxSize) {
                const img = new Image();
                img.src = URL.createObjectURL(selectedFile);

                img.onload = () => {
                    if (img.width >= 500 && img.height >= 500) 
                    {
                        setuploadImg(event.target.files[0])
                    }
                    else
                    {
                        setuploadImg(null);
                        setErrorActive(true);
                        setError("Photo Pixels Error");
                        setErrorDetail("Minimum pixels requirment: 500 for width, 500 for height.");
                        setOrderForError('display-fixed');
                        $("#dropzone").css("display", "none");
                        $("#supporter-view").css("filter", "none");
                    }
                };
            } 
            else 
            {
                setuploadImg(null);
                setErrorActive(true);
                setError("File Error");
                setErrorDetail("File requirement: JPEG, PNG or WEBP upto 10 MB.");
                setOrderForError('display-fixed');
                $("#dropzone").css("display", "none");
                $("#supporter-view").css("filter", "none");
            }
          };

        var closeEnv =()=>
        {
            setOrderForError("display-none");
            setErrorActive(false);
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
                                            <button className="action-add-p-btn" onClick={SaveProduct}>Save</button>
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
                        <div className="the-form-add-pro mt-5 py-5">
                            <div className="inside-t-f-a-p">
                                <div class="form-floating mb-4">
                                    <input type="text" class="form-control" onChange={(e)=> setTitle(e.target.value)} id="floatingTitle" placeholder="Title" />
                                    <label htmlFor="floatingTitle">Category Name</label>
                                </div>
                                
                                <div className="for-photo-uploading mt-5">
                                    <div className="f-p-u-upper">
                                        <h5 className="mb-3">
                                            Photo
                                        </h5>
                                    </div>
                                    <div className="f-p-u-section">
                                        <div className="f-p-u-section-inside">
                                            <div className="f-p-u-drag-n-drop">
                                                <div className="f-p-u-dropbox position-relative">
                                                    <div className="flex justify-content-center align-items-center">
                                                        <h4>
                                                            Drop Image Here To Upload
                                                        </h4>
                                                        <h4>
                                                            or
                                                        </h4>
                                                        <h3>
                                                            Browse File
                                                        </h3>
                                                    </div>
                                                    <input id="photo-upload-input-tap" onChange={(e)=>handleChange(e)} type="file" accept=".jpg, .jpeg, .png, .webp"/>
                                                    <img id="photo-upload-img" src=""/>
                                                </div>
                                            </div>

                                            <div className="right-img-uploads-content">
                                                <div className="inn-r-i-u-c">
                                                    <h4>
                                                        Photos help customers decide what to order and can increase sales.
                                                    </h4>
                                                    <h5 className="full-guide-bold mt-4">
                                                        See full photo guidelines
                                                    </h5>

                                                    <h5 className="mt-4">
                                                        File requirement: JPEG, PNG or WEBP upto 10 MB.
                                                    </h5>
                                                    <h5>
                                                        Minimum pixels requirment: 500 for width, 500 for height.
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="for-photo-uploading mt-5">
                                    <div className="f-p-u-upper">
                                        <h5 className="mb-3">
                                            Description
                                        </h5>
                                        <textarea onChange={(e)=> setDescription(e.target.value)} placeholder="Enter description" rows={5}></textarea>
                                    </div>
                                </div>
                                    <div className="for-nl-forms grid mt-5 pt-4">
                                        <div className="f-p-u-upper">
                                            <h5 className="mb-3">
                                                Category Status
                                            </h5>
                                            <FormGroup >
                                                <FormControlLabel onChange={(e)=>{
                                                    if(e.target.checked)
                                                    {
                                                        setCatActive(true);
                                                    }
                                                    else
                                                    {
                                                        setCatActive(false);
                                                    }
                                                    }} control={<Checkbox />} label="Active" />
                                            </FormGroup>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="dropzone">
                <div className="env-for-dropzone">
                    <div className="inn-env-for-dropzone">
                        <div className="env-f-dz-body">
                            <CloudUploadTwoToneIcon></CloudUploadTwoToneIcon>
                            <h4>
                                Add Image
                            </h4>
                            <h6>
                                Drop JPEG, PNG or WEBP Image upto 10 MB.
                            </h6>
                            <h6>
                            Minimum pixels requirment: 550 for width, 440 for height.
                            </h6>
                        </div>
                    </div>
                </div>
                
                <input id="photo-upload-input" type="file" onChange={(e)=>handleChange(e)} accept=".jpg, .jpeg, .png, .webp"/>
            </div>

            <div className="loading-line">
                <div className={`loading-range ${loadingRage}`}>

                </div>
            </div>
            <div className={`fade-screen ${fadeLoad}`}>

            </div>

            <div className={`error-env ${orderForError}`} id="error-env">
            <div className="error-card-outside">
                <div className="error-card">
                    <div className="error-body-up">
                        <i class="fa-solid fa-x" onClick={()=> closeEnv()}></i>
                    </div>
                    <div className="error-detail text-center p-5">
                        <div className="error-icon">
                            <i class="fa-solid fa-circle-exclamation"></i>
                        </div>
                        <h3 className="mt-3 mb-2">
                            {Error}
                        </h3>
                        <p>
                            {ErrorDetail}
                        </p>
                    </div>
                </div>
            </div>
           
        </div>
            
            </>
        )
    }


    export default AdminAddCategory;