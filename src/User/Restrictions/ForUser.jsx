import { useContext, useEffect } from "react";



var ForUser=(props)=>
    {

        useEffect(()=>
            {
                sessionStorage.setItem("uitype", "Student");
            },[])

        return(
            <>
            </>
        )
    }

export default ForUser;