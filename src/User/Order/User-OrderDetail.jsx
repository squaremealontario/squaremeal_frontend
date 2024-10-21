import { Box, FormControl, InputLabel, MenuItem, Paper, Select, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PaymentIcon from '@mui/icons-material/Payment';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";



var UserOrderDetail=()=>
{


	const sessionId  = useParams().id;
    const [orderData, setOrderData] = useState([]);
    const [productData, setProductData] = useState([]);
    const [userData, setUserData] = useState([]);

    useEffect(()=>
    {
        if(sessionId)
        {
            fetchOrder();
        }
    }, [sessionId])
    
    var fetchOrder=async()=>
        {
            var sentdata = {axs:sessionId}
                var resp = await fetch(`${process.env.REACT_APP_APIURL}/scan/order`,
                {
                    method:"post",
                    body:JSON.stringify(sentdata),
                    headers:{'Content-type':'application/json'}
                })
        
                if(resp.ok)
                {
                    var result = await resp.json();
                    if(result.statuscode===1)
                    {
                        setOrderData(result.order);
                        setProductData(result.product);
                        setUserData(result.customer);
                    }
                }
                else
                {
                    
                }
        }

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));
      


    return(
        <>
            <div className="order-compleeion-page py-4">
                <div className="container">
                    <div className="inner-o-c-p py-md-5 px-md-5 py-4 px-3">
                        <div className="uppermost-o-c-p">
                            <div className="left-u-m-o-c-p">
                                <h6>Order ID: #{orderData?._id}</h6>
                                <h6>Order Status: {orderData?.status}</h6>
                                <p>Order Date: {
                                new Date(orderData.createdAt).toLocaleString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    second: 'numeric',
                                    hour12: true
                                })}</p>
                            </div>
                        </div>

                        <div className="up-o-c-p my-lg-5 my-md-5 my-5">
                            <div className="o-c-p-card">
                                <h3 className="o-c-p-headings"><AccountCircleIcon/> Customer</h3>
                                {
                                    userData?.usertype=='Student'?
                                    <>
                                    <h6>First Name: <span>{userData.FirstName}</span></h6>
                                    <h6>Last Name: <span>{userData.LastName?userData.LastName:'None'}</span></h6>
                                    <h6>Email: <span>{userData.email}</span></h6>
                                    <h6>User Type: <span>{userData.usertype}</span></h6>
                                    </>
                                    :
                                    <>
                                    <h6>Name: <span>{userData.name}</span></h6>
                                    <h6>Email: <span>{userData.email}</span></h6>
                                    <h6>User Type: <span>{userData.usertype}</span></h6>
                                    </>
                                }
                                
                            </div>
                            <div className="o-c-p-card">
                                <h3 className="o-c-p-headings"><ShoppingCartOutlinedIcon/> Order Info</h3>
                                <h6>Sub Total: <span>${orderData?.subTotal}</span></h6>
                                <h6>Service Fee: <span>${orderData?.serviceFee}</span></h6>
                                <h6>Tax Amount: <span>${orderData?.tax}</span></h6>
                                <h6>Total Paid: <span>${orderData?.totalAmount}</span></h6>
                            </div>
                            <div className="o-c-p-card">
                                <h3 className="o-c-p-headings"><PaymentIcon/> Payment Info</h3>
                                {
                                    orderData?.payment?.method=='card'?
                                    <>
                                    <h6>{orderData.payment.card.brand} Card: <span>**** **** {orderData.payment.card.last4}</span></h6>
                                    <h6>Card Holder: <span>{orderData.payment.card.cardholder_name}</span></h6>
                                    <h6>Email: <span>{orderData.email}</span></h6>
                                    <h6>Status: <span>{orderData?.payment?.status}</span></h6>
                                    </>
                                    :
                                    orderData?.payment?.method=='ideal'?
                                    <>
                                    <h6>Bank: <span>{orderData?.payment?.ideal.bank}</span></h6>
                                    <h6>BIC: <span>{orderData?.payment?.ideal.bic}</span></h6>
                                    <h6>Status: <span>{orderData?.payment?.status}</span></h6>
                                    </>
                                    :
                                    <>
                                    <h6>Payment Method: <span>{orderData?.payment?.method}</span></h6>
                                    <h6>Status: <span>{orderData?.payment?.status}</span></h6>
                                    </>
                                }
                                
                            </div>
                        </div>

                        <div className="the-o-c-table">
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 'max-content' }} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>Product</StyledTableCell>
                                            <StyledTableCell align="right">$ Price</StyledTableCell>
                                            <StyledTableCell align="right">Quantity</StyledTableCell>
                                            <StyledTableCell align="right">$ Total</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {orderData?.items?.map((data,i) => (
                                            <StyledTableRow key={i}>
                                                <StyledTableCell scope="row">
                                                <img className="the-o-c-p-img" src={`/ProductUploads/${productData[i].Image}`} alt="" /> {productData[i].Title}
                                                </StyledTableCell>
                                                <StyledTableCell align="right">{data.price}</StyledTableCell>
                                                <StyledTableCell align="right">x {data.quantity}</StyledTableCell>
                                                <StyledTableCell align="right">{parseFloat(data.price) * parseFloat(data.quantity)}</StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserOrderDetail;