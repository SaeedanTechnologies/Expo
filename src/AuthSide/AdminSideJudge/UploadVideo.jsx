import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/system';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router';

const UploadBox = styled(Box)(({ theme }) => ({
  border: '2px dashed #d32f2f',
  borderRadius: '8px',
  padding: theme.spacing(4),
  textAlign: 'center',
  backgroundColor: '#fbe9e7',
  color: '#d32f2f',
  marginBottom: theme.spacing(2),
}));

const PreviewBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  textAlign: 'center',
}));

const UploadVideo = () => {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*,video/*,.pdf,.doc,.docx',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });
const navigate = useNavigate()
  const handleUpload = () => {
    // Handle the upload functionality here
    // alert('Files uploaded: ' + files.map(file => file.name).join(', '));
    navigate('/admin-operator')
  };

  const thumbs = files.map(file => (
    <PreviewBox key={file.name}>
      {file.type.startsWith('image/') && <img src={file.preview} alt={file.name} style={{ width: '200px', height: 'auto' }} />}
      {file.type.startsWith('video/') && <video src={file.preview} controls style={{ width: '200px', height: 'auto' }} />}
      <Typography variant="body2">{file.name}</Typography>
    </PreviewBox>
  ));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
    padding:'0rem 30%'
      }}
    >
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Upload Photo Or Video
      </Typography>
      <Typography variant="body1" gutterBottom>
        Lorem ipsum dolor sit amet consectetur lorem ipsum dolor sit amet consectetur lorem ipsum dolor sit amet
      </Typography>

      <Typography variant="subtitle1" gutterBottom sx={{ width: '100%', textAlign: 'left', fontWeight:600 }}>
        Upload Photo Or Video
      </Typography>
      <UploadBox {...getRootProps()}>
        <input {...getInputProps()} />
        <CloudUploadIcon sx={{ fontSize: 60 }} />
        <Typography variant="h6" gutterBottom>
          Drag & drop files or <a href="#" style={{ color: '#d32f2f', textDecoration: 'underline' }}>Browse</a>
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Supported formats: Any image format, pdf, doc, docs, or upload video for any format
        </Typography>
      </UploadBox>
      {thumbs}
      <Button sx={{width:'100%'}} variant="contained" color="error" size="large" onClick={handleUpload}>
        Upload
      </Button>
    </Box>
  );
};

export default UploadVideo;
