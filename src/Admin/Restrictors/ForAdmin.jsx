import { useContext, useEffect } from "react";



var ForAdmin=(props)=>
    {

        useEffect(()=>
            {
                sessionStorage.setItem("uitype", "Admin");
            },[])

        return(
            <props.MyComp/>
        )
    }

export default ForAdmin;