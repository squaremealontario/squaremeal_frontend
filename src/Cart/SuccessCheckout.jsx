import { useContext, useEffect, useState } from "react";
import QRGenerator from "../Tool-Components/QRGenerator";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import MyContext from "../UserContext";
import { toast } from "react-toastify";



var SuccessCheckout=()=>
{
	const sessionId  = useParams().query;
    const {user, setUser} = useContext(MyContext);
    const [fadeLoad,setFadeLoad] = useState("display-flex");
    const [authCode, setAuthCode] = useState(2);
    const [errorHandler, setErrorHandler] = useState(404);
    const navigate = useNavigate();

    useEffect(()=>
    {
        if(sessionId && user)
        {
            confirmSession();
        }
    }, [sessionId, user])

    
            
    var confirmSession=async()=>
    {
        try
        {
            var orderData = {abc:user._id, xyz:sessionId}
            let pollingInterval = 2000; // Poll every 2 seconds
            let pollingTimeout = 10000; // Stop polling after 10 seconds

            let pollingCount = 0;
            let maxPollingAttempts = pollingTimeout / pollingInterval;

            let pollForOrderStatus = setInterval(async() => {
                pollingCount++;
                
                var resp = await fetch(`${process.env.REACT_APP_APIURL}/auth-success-session`,
                    {
                        method:"post",
                        body:JSON.stringify(orderData),
                        headers:{'Content-type':'application/json'}
                    })
            
                    if(resp.ok)
                    {
                        var result = await resp.json();
                        if(result.statuscode===1)
                        {
                            setAuthCode(result.statuscode);
                            var ce = setTimeout(function() {
                                var e = setFadeLoad("display-none");
                                clearInterval(pollForOrderStatus);
                            },600);
                        }
                        else if(result.statuscode===2)
                        {
                            var e = setFadeLoad("display-none");
                            clearInterval(pollForOrderStatus);
                            navigate(`/*`)
                        }
                        else if(result.statuscode===0)
                        {
                            if(pollingCount >= maxPollingAttempts)
                            {
                                var ce = setTimeout(function() {
                                    var e = setFadeLoad("display-none");
                                    navigate(`/`)
                                    clearInterval(pollForOrderStatus);
                                    setErrorHandler(404);
                                },600);
                            }
                            else
                            {
                                try
                                {
                                    var sData = {xyz:sessionId}
                                    var resp = await fetch(`${process.env.REACT_APP_APIURL}/auth-order-session`,
                                        {
                                            method:"post",
                                            body:JSON.stringify(sData),
                                            headers:{'Content-type':'application/json'}
                                        })
                                
                                        if(resp.ok)
                                        {
                                            var result = await resp.json();
                                            if(result.statuscode===0)
                                            {
                                                var e = setFadeLoad("display-none");
                                                clearInterval(pollForOrderStatus);
                                                navigate(`/*`)
                                            }
                                        }
                                }
                                catch
                                {
                                    var e = setFadeLoad("display-none");
                                    clearInterval(pollForOrderStatus);
                                    navigate(`/*`)
                                }
                            }
                        }
                    }
                    else if (pollingCount >= maxPollingAttempts)
                    {
                        var ce = setTimeout(function() {
                            var e = setFadeLoad("display-none");
                            navigate(`/`)
                            clearInterval(pollForOrderStatus);
                            setErrorHandler(404);
                        },600);
                    }
            }, pollingInterval);

        }
        catch
        {
            var e = setFadeLoad("display-none");
            setErrorHandler(404);
        }
        
            
    }

    return(
        <>
    

            {
                authCode==2?
                <>
                <div className={`fade-screen overlap-take ${fadeLoad}`}>
                    <div>
                    <svg className="pl" width="240" height="240" viewBox="0 0 240 240">
                        <circle className="pl__ring pl__ring--a" cx="120" cy="120" r="105" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 660" strokeDashoffset="-330" strokeLinecap="round"></circle>
                        <circle className="pl__ring pl__ring--b" cx="120" cy="120" r="35" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 220" strokeDashoffset="-110" strokeLinecap="round"></circle>
                        <circle className="pl__ring pl__ring--c" cx="85" cy="120" r="70" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 440" strokeLinecap="round"></circle>
                        <circle className="pl__ring pl__ring--d" cx="155" cy="120" r="70" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 440" strokeLinecap="round"></circle>
                    </svg>
                    </div>
                    
                    <h3 className="mt-4">Please Wait! Don't leave the page.</h3>
                </div>
                </>
                :
                authCode==0?
                <>
                </>
                :authCode==1?
                <>
                <div className="the-success-page container py-4">
                    <div className="the-thanks t-s-p">
                        <img className="e-receipt-img" src="/img/email.png" alt="" />
                        <h3 className="mt-lg-4 thanks-tt-s-p">Thank you, enjoy !</h3>
                        <p className="the-para">We've sent the e-receipt at your Humber email</p>
                    </div>
                    <div className="the-qr-receipt text-center mt-lg-5">
                        <h5>You can show this QR Code to get your order.</h5>
                        <QRGenerator Code={`${process.env.REACT_APP_SITE_URL}/scan/check-order/${sessionId}`}/>
                    </div>
                </div>
                </>
                :null
            }

        </>
    )
}


export default SuccessCheckout;