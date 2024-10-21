import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";

var QRGenerator=(props)=>
{
    return(
        <>
            <div style={{ textAlign: "center" }}>
                <div>
                    {
                        props.Code?
                        <>
                        <QRCodeCanvas
                            value={props.Code}
                            marginSize={'2'}
                            size={300} // Size of the QR code
                            bgColor={"#ffffff"} // Background color
                            fgColor={"#000000"} // Foreground color (QR code color)
                            level={"Q"} // Error correction level (L, M, Q, H)
                        />
                        </>
                        :
                        <svg className="pl mt-lg-4" width="240" height="240" viewBox="0 0 240 240">
                            <circle className="pl__ring pl__ring--a" cx="120" cy="120" r="105" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 660" strokeDashoffset="-330" strokeLinecap="round"></circle>
                            <circle className="pl__ring pl__ring--b" cx="120" cy="120" r="35" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 220" strokeDashoffset="-110" strokeLinecap="round"></circle>
                            <circle className="pl__ring pl__ring--c" cx="85" cy="120" r="70" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 440" strokeLinecap="round"></circle>
                            <circle className="pl__ring pl__ring--d" cx="155" cy="120" r="70" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 440" strokeLinecap="round"></circle>
                        </svg>
                    }
                        
                </div>
            </div>
        </>
    )
}

export default QRGenerator;