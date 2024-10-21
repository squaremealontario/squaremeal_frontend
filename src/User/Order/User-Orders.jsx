
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { toast } from 'react-toastify';
import { useContext, useEffect, useRef, useState } from 'react';
import MyContext from '../../UserContext';
import { QRCodeCanvas } from 'qrcode.react';
import html2canvas from 'html2canvas';
import { Modal, ModalDialog } from '@mui/joy';
import { Link } from 'react-router-dom';


var UserOrders=()=>
{

    const [OrderData, setOrderData] = useState([]);
    const [DataStatus, setDataStatus] = useState('Loading...');
    const [OneOrderData, setOneOrderData] = useState(null);
    const {user,setUser} = useContext(MyContext);
    const [open, setOpen] = useState(false);
    const divRef = useRef(null);

    useEffect(()=>
    {
        if(user)
        {
            AllOrders();
        }
    }, [user])

    var AllOrders=async()=>
    {
        try
        {
            var Data = {
                _id:user._id,
            }
            const resp = await fetch(`${process.env.REACT_APP_APIURL}/my-orders`,
            {
                method:"post",
                body: JSON.stringify(Data),
                headers:{'Content-type':'application/json'}
            })
            if(resp.ok)
            {
                var result = await resp.json();
                if(result.statuscode===1)
                {
                    setOrderData(result.OrderData);
                }
                else if(result.statuscode===0)
                {
                    setOrderData([])
                    setDataStatus('No Order Record Found!');
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
            setDataStatus('No Order Record Found!');
        }
    }

    const QrDiv=()=>
    {
        return(
            <>
            <div style={{
                backgroundColor:'#fff',
                width:'max-content',
                padding:20,
                borderRadius: 8,
            }} ref={divRef}>
                <div>
                    <div style={{
                        fontSize: 24,
                        fontWeight: 700,
                        textAlign: 'center',
                        marginBottom: 10,
                        textTransform: 'uppercase'
                    }}>
                        Square Basket
                    </div>
                    <div style={{
                        fontSize: 20,
                        fontWeight: 600,
                        textAlign: 'center',
                        marginBottom: 10,
                    }}>
                        Order Completion Note
                    </div>
                    <div><span style={{ fontWeight: 600}}>Order ID:</span> {OneOrderData?._id}</div>
                    <div><span style={{ fontWeight: 600}}>Email:</span> {OneOrderData?.email}</div>
                    <div style={
                        {
                            marginBottom: 15
                        }
                    }><span style={{ fontWeight: 600}}>Order Date:</span> {
                        new Date(OneOrderData?.createdAt).toLocaleString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            second: 'numeric',
                            hour12: true
                        })}</div>
                        <div style={{
                            textAlign:'center'
                        }}>
                            <div style={{
                                fontWeight: 500,
                                marginBottom: 10
                            }}>
                                Order Completion QR Code
                            </div>
                            {
                                OneOrderData?.sessionId?
                                <>
                                <QRCodeCanvas style={{ textAlign: 'center'}} value={`${process.env.REACT_APP_SITE_URL}/scan/check-order/${OneOrderData?.sessionId}`} size={250}/>
                                </>
                                :
                                'No QR COde, please contact support team.'
                            }
                        
                        </div>
                    
                </div>
            </div>
            </>
        )
    }

    
    const downloadQR = async (orderId) => {

    const divElement = divRef.current;

    // Use html2canvas to take a snapshot of the div
    html2canvas(divElement).then((canvas) => {
      const imageUrl = canvas.toDataURL("image/jpeg", 1.0); // Convert to JPG with full quality (1.0)

      // Create an anchor element and trigger download
      const downloadLink = document.createElement("a");
      downloadLink.href = imageUrl;
      downloadLink.download = `${orderId}.jpg`; // Filename for the image as JPG
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    });
    };

    useEffect(()=>
    {
        if(OneOrderData)
        {
            setOpen(true)
            setTimeout(()=>
            {
                downloadQR(OneOrderData._id);
            }, 500)
        }
    }, [OneOrderData])

    return(
        <>

        
            <div className="the-user-account">
                <div className="inner-t-u-a">
                    <div className="inside-inner-t-u-a">
                        <div className="user-pro-inside">
                            <div className="mb-4">
                                <h3 className="the-user-pro-h">My Orders</h3>
                            </div>
                            {
                                OrderData?.length>0?
                                <>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 'max-content' }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Order Id</TableCell>
                                                <TableCell align='right'>Quantity</TableCell>
                                                <TableCell align='right'>Total Paid</TableCell>
                                                <TableCell align='right'>Order Status</TableCell>
                                                <TableCell align='right'>Date</TableCell>
                                                <TableCell align='right'>QR Code</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {OrderData.map((data, i) => (
                                                <TableRow
                                                    key={i}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell>
                                                        <Link to={`/user/order-detail/${data.sessionId}`} style={{ color: 'blue', cursor: 'pointer' }}>{data._id}</Link>
                                                    </TableCell>
                                                    <TableCell align='right'>{data.quantity}</TableCell>
                                                    <TableCell align='right'>{data.totalAmount}</TableCell>
                                                    <TableCell align='right'>{data.status}</TableCell>
                                                    <TableCell align='right'>{
                                                        new Date(data.createdAt).toLocaleString('en-US', {
                                                            month: 'long',
                                                            day: 'numeric',
                                                            year: 'numeric',
                                                            hour: 'numeric',
                                                            minute: 'numeric',
                                                            second: 'numeric',
                                                            hour12: true
                                                        })}</TableCell>
                                                    <TableCell align='right'>
                                                        <span style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}  onClick={()=> {
                                                        setOneOrderData(data);
                                                    }}>Download</span> </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                </>
                                :
                                <div className="no-data-found py-5">
                                    <h2 className='text-center'>
                                        {DataStatus}
                                    </h2>
                                </div>
                            }

                            
                        </div>
                        
                    </div>

                    <Modal open={open} onClose={() => {setOpen(false); setOneOrderData(null)}}>
                        <div style={{
                            height: '100%',
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 10
                        }}>
                            <div style={{
                        backgroundColor:'#fff',
                        minWidth: 320,
                        maxWidth:'max-content',
                        padding:20,
                        borderRadius: 8,
                    }} ref={divRef}>
                        <div>
                            <div style={{
                                fontSize: 24,
                                fontWeight: 700,
                                textAlign: 'center',
                                marginBottom: 10,
                                textTransform: 'uppercase'
                            }}>
                                Square Basket
                            </div>
                            <div style={{
                                fontSize: 20,
                                fontWeight: 600,
                                textAlign: 'center',
                                marginBottom: 10,
                            }}>
                                Order Completion Note
                            </div>
                            <div><span style={{ fontWeight: 600}}>Order ID:</span> {OneOrderData?._id}</div>
                            <div><span style={{ fontWeight: 600}}>Email:</span> {OneOrderData?.email}</div>
                            <div style={
                                {
                                    marginBottom: 15
                                }
                            }><span style={{ fontWeight: 600}}>Order Date:</span> {
                                new Date(OneOrderData?.createdAt).toLocaleString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    second: 'numeric',
                                    hour12: true
                                })}</div>
                                <div style={{
                                    textAlign:'center'
                                }}>
                                    <div style={{
                                        fontWeight: 500,
                                        marginBottom: 10
                                    }}>
                                        Order Completion QR Code
                                    </div>
                                    {
                                        OneOrderData?.sessionId?
                                        <>
                                        <QRCodeCanvas style={{ textAlign: 'center'}} value={`${process.env.REACT_APP_SITE_URL}/scan/check-order/${OneOrderData?.sessionId}`} size={250}/>
                                        </>
                                        :
                                        'No QR COde, please contact support team.'
                                    }
                                
                                </div>
                            
                        </div>
                    </div>  
                        </div>
                      
                    
                    </Modal>
                    
                    
                </div>
            </div>
        </>
    )
}

export default UserOrders;