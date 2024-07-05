// import React, { useState } from 'react';
// import {
//     Box,
//     Button,
//     CircularProgress,
//     InputAdornment,
//     TextField,
//     Typography
// } from '@mui/material';
// import { SlCloudDownload } from 'react-icons/sl';
// import { useNavigate } from 'react-router-dom';
// import { FaArrowRight } from "react-icons/fa";
// import { enqueueSnackbar } from "notistack";


// const AddParticipant = () => {
//     const [loading, setLoading] = useState(false);
//     const [inputValues, setInputValues] = useState([]);
//     const [uploadFields, setUploadFields] = useState([]);
//     const [selectedFile, setSelectedFile] = useState(null);
  
//     const navigate = useNavigate();
//     const contest_id = localStorage.getItem('add_register_response');
//     const token = localStorage.getItem('token');

//     const handleInputChange = (index, event) => {
//         const newInputValues = [...inputValues];
//         newInputValues[index] = event.target.value;
//         setInputValues(newInputValues);
//     };

//     const handleYesClick = (index) => {
//         const newInputValues = [...inputValues];
//         if (!newInputValues[index].includes('*')) {
//             newInputValues[index] += '*';
//         }
//         setInputValues(newInputValues);
//     };

//     const handleNoClick = (index) => {
//         const newInputValues = [...inputValues];
//         newInputValues[index] = newInputValues[index].replace('*', '');
//         setInputValues(newInputValues);
//     };

//     const handleFileInputChange = async (index, event) => {
//         const file = event.target.files[0];
//         const reader = new FileReader();
//         reader.onloadend = () => {
//             const base64String = reader.result.split(",")[1]; 
//             setSelectedFile(base64String);
//         };
//         reader.readAsDataURL(file);
//     };

//     const handleDragOver = (event) => {
//         event.preventDefault();
//     };

//     const handleDrop = (event, itemType) => {
//         event.preventDefault();
//         if (itemType === 'textField') {
//             setInputValues([...inputValues, '']);
//         } else if (itemType === 'picture') {
//             setUploadFields([...uploadFields, null]);
//         } else {
//             const file = event.dataTransfer.files[0];
//             setSelectedFile(file);
//         }
//     };

//     const removeField = (index, type) => {
//         if (type === 'textField') {
//             const newInputValues = [...inputValues];
//             newInputValues.splice(index, 1);
//             setInputValues(newInputValues);
//         } else if (type === 'picture') {
//             const newUploadFields = [...uploadFields];
//             newUploadFields.splice(index, 1);
//             setUploadFields(newUploadFields);
//         }
//     };

//     const handleDropClick = (index) => {
//         const fileInput = document.getElementById(`fileInput-${index}`);
//         fileInput.click();
//     };

//     // const handleSubmit = async () => {
//     //   setLoading(true);

//     //     try {
//     //         const token = localStorage.getItem('token');
//     //         const formData = [];


//     //         inputValues.forEach((value, index) => {
//     //             const field = {
//     //                 contest_id: contest_id,
//     //                 name: `Field ${index + 1}`,
//     //                 type: "text",
//     //                 label: value,
//     //                 required: true,
//     //                 is_important: value.includes('*')
//     //             };

//     //             formData.push(field);
//     //         });


//     //         uploadFields.forEach((value, index) => {
//     //             const field = {
//     //                 contest_id: contest_id,
//     //                 name: `Field ${index + 1}`,
//     //                 type: "file",
//     //                 label: `Upload ${index + 1}`,
//     //                 required: true,
//     //                 is_important: 'imp'
//     //             };

//     //             formData.push(field);
//     //         });


//     //         const response = await fetch('https://expoproject.saeedantechpvt.com/api/admin/form_fields', {
//     //             method: 'POST',
//     //             headers: {
//     //                 'Content-Type': 'application/json',
//     //                 Authorization: `Bearer ${token}`
//     //             },
//     //             body: JSON.stringify({ formData })
//     //         });

//     //         if (!response.ok) {
//     //             throw new Error('Failed to submit form data');
//     //         }

//     //         const responseData = await response.json();
//     //         console.log('Form data submitted successfully:', responseData);

//     //         navigate('/admin/add-QR', { state: { contest_id } });
//     //     } catch (error) {
//     //   setLoading(false);

//     //         console.error('Error submitting data:', error);
//     //     }
//     // };


//     const handleSubmit = async () => {
//         setLoading(true);

//         try {
//             setLoading(true)
//             const token = localStorage.getItem('token');
//             const formData = [];

//             // Add the first TextField value explicitly as "name"
//             formData.push({
//                 contest_id: contest_id,
//                 name: "name", // Fixed value for the first TextField
//                 type: "text",
//                 label: "name", // You can change this label as needed
//                 required: true,
//                 is_important: false // Adjust as per your logic
//             });

//             // Add dynamic fields from inputValues
//             inputValues.forEach((value, index) => {
//                 const field = {
//                     contest_id: contest_id,
//                     name: `Field ${index + 1}`,
//                     type: "text",
//                     label: value,
//                     required: true,
//                     is_important: value.includes('*')
//                 };

//                 formData.push(field);
//             });

//             // Add upload fields from uploadFields (if needed)
//             uploadFields.forEach((value, index) => {
//                 const field = {
//                     contest_id: contest_id,
//                     name: `Field ${index + 1}`,
//                     type: "file",
//                     label: `Upload ${index + 1}`,
//                     required: true,
//                     is_important: 'imp' // Adjust as per your logic
//                 };

//                 formData.push(field);
//             });

//             const response = await fetch('https://expoproject.saeedantechpvt.com/api/admin/form_fields', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${token}`
//                 },
//                 body: JSON.stringify({ formData })
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to submit form data');
//             }

//             const responseData = await response.json();
//             console.log('Form data submitted successfully:', responseData);

//             navigate('/admin/add-QR', { state: { contest_id } });
//         } catch (error) {
//             setLoading(false);
//             console.error('Error submitting data:', error);
//         }finally{
//             setLoading(false)
//         }
//     };






//     return (
//         <Box
//             sx={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 minHeight: '80vh',
//                 padding: '0rem 5%'
//             }}
//         >
//             <Box
//                 sx={{
//                     display: 'flex',
//                     flexDirection: 'column',
//                     gap: '20px',
//                     justifyContent: 'center',
//                     margin: '0 auto',
//                     maxWidth: '600px',
//                     width: '100%'
//                 }}
//             >
//                 <Typography
//                     sx={{
//                         fontSize: '36px',
//                         fontWeight: 700,
//                         textAlign: 'center'
//                     }}
//                 >
//                     Add Registration Form
//                 </Typography>
//                 <Typography
//                     sx={{
//                         fontSize: '22px',
//                         fontWeight: 500,
//                         textAlign: 'center'
//                     }}
//                 >
//                     (Participants)
//                 </Typography>
//                 <Typography
//                     sx={{
//                         color: '#D90B0F',
//                         fontSize: '16px',
//                         fontWeight: 300,
//                         textAlign: 'center'
//                     }}
//                 >
//                     Note: You have an option to mark yes or no. If you click yes, that field will not be seen by the judge.
//                 </Typography>
//                 <Box
//                     sx={{
//                         display: 'flex',
//                         height: '100%',
//                         gap: '20px',
//                         flexWrap: 'wrap'
//                     }}
//                 >
//                     <Box
//                         flex={1}
//                         sx={{
//                             backgroundColor: '#F9FAFC',
//                             padding: '20px',
//                             borderRight: '1px solid #D8D8D8'
//                         }}
//                     >
//                         <Typography sx={{ fontWeight: 700, fontSize: '18px' }}>Field Selection</Typography>
//                         <Box sx={{ display: 'flex', gap: '10px', mt: '10px' }}>
//                             <Button
//                                 draggable
//                                 onDragStart={(event) => handleDrop(event, 'textField')}
//                                 sx={{
//                                     textTransform: 'none',
//                                     backgroundColor: '#F7F7F7',
//                                     border: '1px solid #D1D1D1',
//                                     borderRadius: '4px',
//                                     color: 'black',
//                                     padding: '5px 10px'
//                                 }}
//                             >
//                                 Text Field
//                             </Button>
//                             <Button
//                                 draggable
//                                 onDragStart={(event) => handleDrop(event, 'picture')}
//                                 sx={{
//                                     textTransform: 'none',
//                                     backgroundColor: '#F7F7F7',
//                                     border: '1px solid #D1D1D1',
//                                     borderRadius: '4px',
//                                     color: 'black',
//                                     padding: '5px 10px'
//                                 }}
//                             >
//                                 Picture
//                             </Button>

//                         </Box>
//                         <Typography sx={{ fontWeight: 500, fontSize: '16px', padding: '20px 10px', display: 'flex', alignItems: 'center' }}>Drag & Drop field from left to right <FaArrowRight /></Typography>
//                     </Box>
//                     <Box
//                         flex={1}
//                         sx={{
//                             padding: '16px',
//                             display: 'flex',
//                             alignItems: 'center',
//                             gap: '20px',
//                             flexDirection: 'column'
//                         }}
//                         onDrop={(event) => handleDrop(event, '')}
//                         onDragOver={handleDragOver}
//                     >

// <TextField

//                                     variant="outlined"

//                                     value='Name'

//                                     InputProps={{
//                                         endAdornment: (
//                                             <InputAdornment position="end">
//                                                 <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>



//                                                 </div>

//                                             </InputAdornment>
//                                         )
//                                     }}
//                                     sx={{ width: '100%' }}
//                                 />

//                         {inputValues.map((inputValue, index) => (
//                             <Box key={index} sx={{ marginBottom: '10px', position: 'relative' }}>
//                                 <TextField
//                                     key={index}
//                                     variant="outlined"
//                                     placeholder="Enter text"
//                                     value={inputValue}
//                                     onChange={(event) => handleInputChange(index, event)}
//                                     InputProps={{
//                                         endAdornment: (
//                                             <InputAdornment position="end">
//                                                 <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
//                                                     <button
//                                                         onClick={() => handleYesClick(index)}
//                                                         variant="contained"
//                                                         color="primary"
//                                                         size="small"
//                                                         style={{ padding: '5px 10px', backgroundColor: "green", border: 'none', borderRadius: '3px', color: 'white' }}
//                                                     >
//                                                         Yes
//                                                     </button>
//                                                     <button
//                                                         onClick={() => handleNoClick(index)}
//                                                         variant="contained"
//                                                         color="secondary"
//                                                         size="small"
//                                                         style={{ padding: '5px 10px', backgroundColor: "#c61013", border: 'none', borderRadius: '3px', color: 'white' }}
//                                                     >
//                                                         No
//                                                     </button>
//                                                     <button
//                                                         variant="outlined"
//                                                         color="error"
//                                                         size="small"
//                                                         onClick={() => removeField(index, 'textField')}
//                                                         style={{ padding: '5px 15px', backgroundColor: "transparent", border: '1px solid #c61013', borderRadius: '3px', color: '#c61013' }}
//                                                     >
//                                                         X
//                                                     </button>
//                                                 </div>

//                                             </InputAdornment>
//                                         )
//                                     }}
//                                     sx={{ width: '100%' }}
//                                 />
//                             </Box>
//                         ))}
//                         {uploadFields.map((file, index) => (
//                             <Box
//                                 key={index}
//                                 sx={{
//                                     marginBottom: '10px',
//                                     backgroundColor: '#FBF1F1',
//                                     border: '2px dashed #D90B0F',
//                                     borderRadius: '12px',
//                                     padding: '20px',
//                                     width: '95%',
//                                     display: 'flex',
//                                     flexDirection: 'column',
//                                     alignItems: 'center',
//                                     justifyContent: 'center',
//                                     gap: '5px',
//                                     textAlign: 'center',
//                                     minHeight: '150px',
//                                     cursor: 'pointer',
//                                     position: 'relative'
//                                 }}
//                             >
//                                 <SlCloudDownload size={40} style={{ color: '#D90B0F' }} />
//                                 <Typography sx={{ fontSize: '13px', fontWeight: 600 }}>Upload Picture</Typography>
//                                 <Typography sx={{ color: '#676767', fontSize: '11px' }}>
//                                     Supported formats: Any image format, pdf, doc, docx, txt
//                                 </Typography>
//                                 <input
//                                     type="file"
//                                     id={`fileInput-${index}`}
//                                     onChange={(event) => handleFileInputChange(index, event)}
//                                     style={{ display: 'none' }}
//                                 />
//                                 {file && (
//                                     <Typography sx={{ fontSize: '12px', fontWeight: 600, marginTop: '10px' }}>
//                                         Selected File: {file.name}
//                                     </Typography>
//                                 )}
//                                 <Button
//                                     variant="outlined"
//                                     color="error"
//                                     size="small"
//                                     onClick={() => removeField(index, 'picture')}
//                                     sx={{ position: 'absolute', top: '5px', right: '5px' }}
//                                 >
//                                     X
//                                 </Button>
//                             </Box>
//                         ))}
//                         {/* <Box
//                             sx={{
//                                 marginBottom: '10px',
//                                 backgroundColor: '#FBF1F1',
//                                 border: '2px dashed #D90B0F',
//                                 borderRadius: '12px',
//                                 padding: '20px',
//                                 width: '95%',
//                                 display: 'flex',
//                                 flexDirection: 'column',
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                                 gap: '5px',
//                                 textAlign: 'center',
//                                 minHeight: '150px',
//                                 cursor: 'pointer',
//                                 position: 'relative'
//                             }}
//                         >
//                             <SlCloudDownload size={40} style={{ color: '#D90B0F' }} />
//                             <Typography sx={{ fontSize: '13px', fontWeight: 600 }}>Drag here</Typography>
//                             <Typography sx={{ color: '#676767', fontSize: '11px' }}>
//                                 Supported formats: Any image format, pdf, doc, docx, txt
//                             </Typography>
//                             <input
//                                 type="file"
//                                 id="fileInput-main"
//                                 onChange={(event) => handleFileInputChange(uploadFields.length, event)}
//                                 style={{ display: 'none' }}
//                             />
//                             {selectedFile && (
//                                 <Typography sx={{ fontSize: '12px', fontWeight: 600, marginTop: '10px' }}>
//                                     Selected File: {selectedFile.name}
//                                 </Typography>
//                             )}
//                             <Button
//                                 variant="outlined"
//                                 color="error"
//                                 size="small"
//                                 onClick={() => setSelectedFile(null)}
//                                 sx={{ position: 'absolute', top: '5px', right: '5px' }}
//                             >
//                                 X
//                             </Button>
//                         </Box> */}
//                         <Button
//                             variant="contained"
//                             color="primary"
//                             onClick={handleSubmit}
//                             text={loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : "Next"}
//                             disabled={loading}
//                             sx={{ width: '100%', marginTop: '20px' }}
//                         >
//                         {loading ? <CircularProgress size={24} /> : "Next"}
//                         </Button>
//                     </Box>
//                 </Box>
//             </Box>
//         </Box>
//     );
// };

// export default AddParticipant;



import React, { useState } from 'react';
import {
    Box,
    Button,
    CircularProgress,
    InputAdornment,
    TextField,
    Typography
} from '@mui/material';
import { SlCloudDownload } from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";

const AddParticipant = () => {
    const [loading, setLoading] = useState(false);
    const [inputValues, setInputValues] = useState([]);
    const [uploadFields, setUploadFields] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();
    const contest_id = localStorage.getItem('add_register_response');
    const token = localStorage.getItem('token');

    const handleInputChange = (index, event) => {
        const newInputValues = [...inputValues];
        newInputValues[index] = event.target.value;
        setInputValues(newInputValues);
    };

    const handleYesClick = (index) => {
        const newInputValues = [...inputValues];
        if (!newInputValues[index].includes('*')) {
            newInputValues[index] += '*';
        }
        setInputValues(newInputValues);
    };

    const handleNoClick = (index) => {
        const newInputValues = [...inputValues];
        newInputValues[index] = newInputValues[index].replace('*', '');
        setInputValues(newInputValues);
    };

    const handleFileInputChange = async (index, event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result.split(",")[1]; // Base64 string of the file content
            setSelectedFile(base64String);
        };
        reader.readAsDataURL(file);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event, itemType) => {
        event.preventDefault();
        if (itemType === 'textField') {
            setInputValues([...inputValues, '']);
        } else if (itemType === 'picture') {
            setUploadFields([...uploadFields, null]);
        } else {
            const file = event.dataTransfer.files[0];
            setSelectedFile(file);
        }
    };

    const removeField = (index, type) => {
        if (type === 'textField') {
            const newInputValues = [...inputValues];
            newInputValues.splice(index, 1);
            setInputValues(newInputValues);
        } else if (type === 'picture') {
            const newUploadFields = [...uploadFields];
            newUploadFields.splice(index, 1);
            setUploadFields(newUploadFields);
        }
    };

    const handleDropClick = (index) => {
        const fileInput = document.getElementById(`fileInput-${index}`);
        fileInput.click();
    };

    const handleSubmit = async () => {
        setLoading(true);

        try {
            const formData = [];

            // Add the first TextField value explicitly as "name"
            formData.push({
                contest_id: contest_id,
                name: "name", // Fixed value for the first TextField
                type: "text",
                label: "name", // You can change this label as needed
                required: true,
                is_important: false // Adjust as per your logic
            });

            // Add dynamic fields from inputValues
            inputValues.forEach((value, index) => {
                const field = {
                    contest_id: contest_id,
                    name: `Field ${index + 1}`,
                    type: "text",
                    label: value,
                    required: true,
                    is_important: value.includes('*')
                };

                formData.push(field);
            });

            // Add upload fields from uploadFields (if needed)
            uploadFields.forEach((value, index) => {
                const field = {
                    contest_id: contest_id,
                    name: `Field ${index + 1}`,
                    type: "file",
                    label: `Upload ${index + 1}`,
                    required: true,
                    is_important: 'imp' // Adjust as per your logic
                };

                formData.push(field);
            });

            const response = await fetch('https://expoproject.saeedantechpvt.com/api/admin/form_fields', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ formData })
            });

            if (!response.ok) {
                throw new Error('Failed to submit form data');
            }

            const responseData = await response.json();
            console.log('Form data submitted successfully:', responseData);

            navigate('/admin/add-QR', { state: { contest_id } });
        } catch (error) {
            setLoading(false);
            console.error('Error submitting data:', error);
        }
    };

    const handleTouchStart = (event, itemType) => {
        event.preventDefault();
        if (itemType === 'textField' || itemType === 'picture') {
            // Additional touch start logic if needed
        }
    };

    const handleTouchEnd = (event, itemType) => {
        event.preventDefault();
        if (itemType === 'textField') {
            setInputValues([...inputValues, '']);
        } else if (itemType === 'picture') {
            setUploadFields([...uploadFields, null]);
        } else {
            const file = event.dataTransfer.files[0];
            setSelectedFile(file);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '80vh',
                padding: '0rem 5%'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    justifyContent: 'center',
                    margin: '0 auto',
                    maxWidth: '600px',
                    width: '100%'
                }}
            >
                <Typography
                    sx={{
                        fontSize: '36px',
                        fontWeight: 700,
                        textAlign: 'center'
                    }}
                >
                    Add Registration Form
                </Typography>
                <Typography
                    sx={{
                        fontSize: '22px',
                        fontWeight: 500,
                        textAlign: 'center'
                    }}
                >
                    (Participants)
                </Typography>
                <Typography
                    sx={{
                        color: '#D90B0F',
                        fontSize: '16px',
                        fontWeight: 300,
                        textAlign: 'center'
                    }}
                >
                    Note: You have an option to mark yes or no. If you click yes, that field will not be seen by the judge.
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        height: '100%',
                        gap: '20px',
                        flexWrap: 'wrap'
                    }}
                >
                    <Box
                        flex={1}
                        sx={{
                            backgroundColor: '#F9FAFC',
                            padding: '20px',
                            borderRight: '1px solid #D8D8D8'
                        }}
                    >
                        <Typography sx={{ fontWeight: 700, fontSize: '18px' }}>Field Selection</Typography>
                        <Box sx={{ display: 'flex', gap: '10px', mt: '10px' }}>
                            <Button
                                draggable
                                onDragStart={(event) => handleDrop(event, 'textField')}
                                onTouchStart={(event) => handleTouchStart(event, 'textField')}
                                onTouchEnd={(event) => handleTouchEnd(event, 'textField')}
                                sx={{
                                    textTransform: 'none',
                                    backgroundColor: '#F7F7F7',
                                    border: '1px solid #D1D1D1',
                                    borderRadius: '4px',
                                    color: 'black',
                                    padding: '5px 10px'
                                }}
                            >
                                Text Field
                            </Button>
                            <Button
                                draggable
                                onDragStart={(event) => handleDrop(event, 'picture')}
                                onTouchStart={(event) => handleTouchStart(event, 'picture')}
                                onTouchEnd={(event) => handleTouchEnd(event, 'picture')}
                                sx={{
                                    textTransform: 'none',
                                    backgroundColor: '#F7F7F7',
                                    border: '1px solid #D1D1D1',
                                    borderRadius: '4px',
                                    color: 'black',
                                    padding: '5px 10px'
                                }}
                            >
                                Picture
                            </Button>
                        </Box>
                        <Typography sx={{ fontWeight: 500, fontSize: '16px', padding: '20px 10px', display: 'flex', alignItems: 'center' }}>Drag & Drop field from left to right <FaArrowRight /></Typography>
                    </Box>
                    <Box
                        flex={1}
                        sx={{
                            padding: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '20px',
                            flexDirection: 'column'
                        }}
                        onDrop={(event) => handleDrop(event, '')}
                        onDragOver={handleDragOver}
                    >
                    <TextField

                                    variant="outlined"

                                    value='Name'

                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>



                                                </div>

                                            </InputAdornment>
                                        )
                                    }}
                                    sx={{ width: '100%' }}
                                />
                        {inputValues.map((inputValue, index) => (
                            <Box key={index} sx={{ marginBottom: '10px', position: 'relative' }}>
                                <TextField
                                    key={index}
                                    variant="outlined"
                                    placeholder="Enter text"
                                    value={inputValue}
                                    onChange={(event) => handleInputChange(index, event)}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                    <button
                                                        onClick={() => handleYesClick(index)}
                                                        variant="contained"
                                                        color="primary"
                                                        size="small"
                                                        style={{ padding: '5px 10px', backgroundColor: "green", border: 'none', borderRadius: '3px', color: 'white' }}
                                                    >
                                                        Yes
                                                    </button>
                                                    <button
                                                        onClick={() => handleNoClick(index)}
                                                        variant="contained"
                                                        color="secondary"
                                                        size="small"
                                                        style={{ padding: '5px 10px', backgroundColor: "#c61013", border: 'none', borderRadius: '3px', color: 'white' }}
                                                    >
                                                        No
                                                    </button>
                                                    <button
                                                        variant="outlined"
                                                        color="error"
                                                        size="small"
                                                        onClick={() => removeField(index, 'textField')}
                                                        style={{ padding: '5px 15px', backgroundColor: "transparent", border: '1px solid #c61013', borderRadius: '3px', color: '#c61013' }}
                                                    >
                                                        X
                                                    </button>
                                                </div>
                                            </InputAdornment>
                                        )
                                    }}
                                    sx={{ width: '100%' }}
                                />
                            </Box>
                        ))}
                        {uploadFields.map((file, index) => (
                            <Box
                                key={index}
                                sx={{
                                    marginBottom: '10px',
                                    backgroundColor: '#FBF1F1',
                                    border: '2px dashed #D90B0F',
                                    borderRadius: '12px',
                                    padding: '20px',
                                    width: '95%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '5px',
                                    textAlign: 'center',
                                    minHeight: '150px',
                                    cursor: 'pointer',
                                    position: 'relative'
                                }}
                            >
                                <SlCloudDownload size={40} style={{ color: '#D90B0F' }} />
                                <Typography sx={{ fontSize: '13px', fontWeight: 600 }}>Upload Picture</Typography>
                                <Typography sx={{ color: '#676767', fontSize: '11px' }}>
                                    Supported formats: Any image format, pdf, doc, docx, txt
                                </Typography>
                                <input
                                    type="file"
                                    id={`fileInput-${index}`}
                                    onChange={(event) => handleFileInputChange(index, event)}
                                    style={{ display: 'none' }}
                                />
                                {file && (
                                    <Typography sx={{ fontSize: '12px', fontWeight: 600, marginTop: '10px' }}>
                                        Selected File: {file.name}
                                    </Typography>
                                )}
                                <Button
                                    variant="outlined"
                                    color="error"
                                    size="small"
                                    onClick={() => removeField(index, 'picture')}
                                    sx={{ position: 'absolute', top: '5px', right: '5px' }}
                                >
                                    X
                                </Button>
                            </Box>
                        ))}
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            disabled={loading}
                            sx={{ width: '100%', marginTop: '20px' }}
                        >
                            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : "Next"}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default AddParticipant;
