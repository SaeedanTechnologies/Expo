import React, { useState } from 'react';
import { Box, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/system';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fileUpload } from '../../store/actions/authActions'; // Assuming this is your Redux action to handle file upload

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
  const dispatch = useDispatch();
  const admin_id = useSelector(state => state?.admin?.user?.id);
  const [file, setFile] = useState(null); // Change to single file state

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*,video/*',
    onDrop: acceptedFiles => {
      // Set only the first file from acceptedFiles array
      if (acceptedFiles && acceptedFiles.length > 0) {
        const selectedFile = acceptedFiles[0];
        setFile(Object.assign(selectedFile, {
          preview: URL.createObjectURL(selectedFile)
        }));
      }
    }
  });

  const navigate = useNavigate();
  
const contest_id = 105

const handleUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('admin_id', admin_id);
      formData.append('contest_id', contest_id); // Append admin_id to formData
      dispatch(fileUpload({ formData })); // Pass formData directly
    }
  };

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        padding: isSmall ? '0rem 10%' : '0rem 30%'
      }}
    >
      <Typography variant="h4" fontWeight={600} gutterBottom sx={{ textAlign: 'center' }}>
        Upload Photo Or Video
      </Typography>
      <Typography variant="body1" gutterBottom>
        Lorem ipsum dolor sit amet consectetur lorem ipsum dolor sit amet consectetur lorem ipsum dolor sit amet
      </Typography>

      <Typography variant="subtitle1" gutterBottom sx={{ width: '100%', textAlign: 'left', fontWeight: 600 }}>
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
      {file && (
        <PreviewBox>
          {file.type.startsWith('image/') && (
            <img src={file.preview} alt={file.name} style={{ width: '200px', height: 'auto' }} />
          )}
          {file.type.startsWith('video/') && (
            <video src={file.preview} controls style={{ width: '200px', height: 'auto' }} />
          )}
          <Typography variant="body2">{file.name}</Typography>
        </PreviewBox>
      )}
      <Button sx={{ width: '100%' }} variant="contained" color="error" size="large" onClick={handleUpload}>
        Upload
      </Button>
    </Box>
  );
};

export default UploadVideo;
