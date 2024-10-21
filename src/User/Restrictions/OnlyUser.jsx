import { useContext, useEffect, useState } from "react";
import MyContext from "../../UserContext";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";



var OnlyUser=(props)=>
    {

        const {user} = useContext(MyContext)
        const [fadeLoad,setFadeLoad] = useState("display-flex");
        const cookies = new Cookies();
        var cookieToken = cookies.get("authToken");
        const navigate = useNavigate();

        useEffect(()=>
            {
                if(cookieToken)
                {
                    const decodedToken = jwtDecode(cookieToken);
                    console.log(decodedToken.usertype)
                    if(decodedToken.usertype!="Student")
                    {
                        if(props.Redirect=="Login")
                        {
                            navigate('/Login');
                        }
                        else
                        {
                            navigate('/');
                        }
                    }
                }
                else
                {
                    navigate('/');
                }
            },[cookieToken])

        return(

            <>
                
                {
                    user?.usertype=='Student'?
                    <>
                    <props.MyComp/></>
                    :
                    <div className={`fade-screen overlap-take ${fadeLoad}`}>
                        <svg className="pl" width="240" height="240" viewBox="0 0 240 240">
                            <circle className="pl__ring pl__ring--a" cx="120" cy="120" r="105" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 660" strokeDashoffset="-330" strokeLinecap="round"></circle>
                            <circle className="pl__ring pl__ring--b" cx="120" cy="120" r="35" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 220" strokeDashoffset="-110" strokeLinecap="round"></circle>
                            <circle className="pl__ring pl__ring--c" cx="85" cy="120" r="70" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 440" strokeLinecap="round"></circle>
                            <circle className="pl__ring pl__ring--d" cx="155" cy="120" r="70" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 440" strokeLinecap="round"></circle>
                        </svg>
                    </div>
                }
                
            </>
        )
    }

export default OnlyUser;