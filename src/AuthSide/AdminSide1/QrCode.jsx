// import React, { useRef } from "react";
// import MyTextField from "../../page/components/MyTextField";
// import { Box, Typography } from "@mui/material";
// import MyButton from "../../page/components/MyButton";
// import { useNavigate } from "react-router";
// import QRCode from "qrcode.react";

// const QrCode = () => {
//   const navigate = useNavigate();
//   const qrRef = useRef();

//   const downloadQRCode = () => {
//     const canvas = qrRef.current.querySelector("canvas");
//     const pngUrl = canvas
//       .toDataURL("image/png")
//       .replace("image/png", "image/octet-stream");
//     let downloadLink = document.createElement("a");
//     downloadLink.href = pngUrl;
//     downloadLink.download = "qrcode.png";
//     document.body.appendChild(downloadLink);
//     downloadLink.click();
//     document.body.removeChild(downloadLink);
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         height: "80vh",
//         padding: "1rem 10%",
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           gap: "20px",
//           justifyContent: "center",
//           width: "400px",
//           margin: "0 auto",
//         }}
//       >
//         <Typography
//           sx={{
//             fontSize: "36px",
//             fontWeight: 700,
//             textAlign: "center",
//           }}
//         >
//           QR Code
//         </Typography>
//         <Typography
//           sx={{
//             color: "#949494",
//             fontSize: "16px",
//             fontWeight: 300,
//             textAlign: "center",
//           }}
//         >
//           Lorem ipsum dolor sit amet consectetur lorem ipsum dolor sit amet
//           consectetur lorem ipsum dolor sit amet.
//         </Typography>
//         <div
//           ref={qrRef}
//           style={{
//             height: "auto",
//             margin: "0 auto",
//             maxWidth: 224,
//             width: "100%",
//           }}
//         >
//           <QRCode
//             size={256}
//             style={{ height: "auto", maxWidth: "100%", width: "100%" }}
//             value="https://example.com" // Add your value here
//             viewBox={`0 0 256 256`}
//           />
//         </div>
//         <Box
//           sx={{ display: "flex", justifyContent: "space-between", gap: "20px" }}
//         >
//           <MyButton
//             onClick={downloadQRCode}
//             text="Save"
//             sx={{ width: "100%" }}
//             bgColor="#D37476"
//           />
//           <MyButton
//             onClick={() => navigate("/admin/signUp")}
//             text="Next"
//             sx={{ width: "100%" }}
//           />
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default QrCode;

import React, { useRef } from "react";
import { Box, Typography } from "@mui/material";
import MyButton from "../../page/components/MyButton";
import { useLocation, useNavigate } from "react-router";
import QRCode from "qrcode.react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const QrCode = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const id = state && state?.contest_id;

  const qrRef = useRef();
  const qrCodeUrl = `https://frontend.saeedantechpvt.com/admin/contest/${id}`;

  const downloadQRCode = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "qrcode.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const downloadPdf = async () => {
    const element = qrRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("qrcode.pdf");
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
        padding: "1rem 10%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          justifyContent: "center",
          width: "400px",
          margin: "0 auto",
        }}
      >
        <Typography
          sx={{
            fontSize: "36px",
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          QR Code
        </Typography>
        <Typography
          sx={{
            color: "#949494",
            fontSize: "16px",
            fontWeight: 300,
            textAlign: "center",
          }}
        >
          Scan this QR code to access the contest.
        </Typography>
        <div
          ref={qrRef}
          style={{
            height: "auto",
            margin: "0 auto",
            maxWidth: 224,
            width: "100%",
          }}
        >
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={qrCodeUrl}
            viewBox={`0 0 256 256`}
          />
        </div>
        <Box
          sx={{ display: "flex", justifyContent: "space-between", gap: "20px" }}
        >
       {/*<MyButton
            onClick={downloadQRCode}
            text="Save as PNG"
            sx={{ width: "100%" }}
          />  */}   
          <MyButton
            onClick={downloadPdf}
            text="Save as PDF"
            sx={{ width: "100%" }}
          />
          <MyButton
            onClick={() => navigate(`/add-judges`)}
            text="Next"
            sx={{ width: "100%" }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default QrCode;

