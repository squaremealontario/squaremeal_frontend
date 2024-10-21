import Footer from "../Footer";
import Header from "../Header";



var NormalLayout=(props)=>
{
    return(
        <>
        <Header/>
        <props.MyComp/>
        <Footer/>
        </>
    )
}

export default NormalLayout;