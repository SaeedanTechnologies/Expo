import React from 'react'
import MyTextField from '../../page/components/MyTextField'
import { Box, Typography } from '@mui/material'
import MyButton from '../../page/components/MyButton'
import { useNavigate } from 'react-router'
// import QRCode from "react-qr-code";
import QRCode from 'qrcode.react';

const QrCode = () => {
    const navigate = useNavigate()

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '80vh',
            padding:'1rem 10%'
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                // alignItems: 'center',
                justifyContent: 'center',
                width: '400px',
                margin: '0 auto'
            }}>
                <Typography sx={{
                    fontSize: '36px',
                    fontWeight: 700,
                    textAlign: 'center'

                }}>
                    QR Code
                </Typography>
                <Typography sx={{
                    color: '#949494',
                    fontSize: '16px',
                    fontWeight: 300,
                    textAlign: 'center'
                }}>
                    Lorem ipsum dolor sit amet consectetur lorem ipsum dolor sit amet consectetur lorem ipsum dolor sit amet.
                </Typography>
                {/* <img src="/qrCode.png" alt="" style={{ height: '50vh' }} />
                 */}

                 <div style={{ height: "auto", margin: "0 auto", maxWidth: 224, width: "100%" }}>
      <QRCode
        size={256}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        // value={value}
        viewBox={`0 0 256 256`}
      />
    </div>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
                    <MyButton text="Save" sx={{ width: '100%' }} bgColor="#D37476" />
                    <MyButton onClick={() => navigate('/admin/signUp')} text="Next" sx={{ width: '100%' }} />

                </Box>
            </Box>

        </Box>
    )
}

export default QrCode