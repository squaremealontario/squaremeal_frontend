import AdminHeader from "../Admin/Admin-Header";
import AdminSideBar from "../Admin/Admin-SideBar";



var AdminLayout=(props)=>
{
    return(
        <>
        <AdminHeader />
        <props.MyComp/>
        <AdminSideBar />
        </>
    )
}

export default AdminLayout;