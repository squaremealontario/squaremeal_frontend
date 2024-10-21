import { useEffect, useState } from "react";
import UserHeader from "../User/User-Header";
import UserSideBar from "../User/User-SideBar";


var UserLayout=(props)=>
{

    const [width, setWidth] = useState();

    useEffect(() => {
        // Function to handle window resize
        const handleResize = () => {
          if (window.innerWidth <= 992) { // Example for small screen width
            setWidth('sm');
          } else {
            setWidth('lg');
          }
        };
    
        // Set initial maxItems based on the current window width
        handleResize();
    
        // Add event listener to listen for window resize
        window.addEventListener("resize", handleResize);
    
        // Clean up event listener on component unmount
        return () => window.removeEventListener("resize", handleResize);
      }, []);


    return(
        <>
        <UserHeader screenWidth={width} />
        <props.MyComp screenWidth={width}/>
        <UserSideBar screenWidth={width} />
        </>
    )
}

export default UserLayout;