


// import React, { useState } from 'react';
// import {
//     Box,
//     Button,
//     InputAdornment,
//     TextField,
//     Typography
// } from '@mui/material';
// import { SlCloudDownload } from 'react-icons/sl';
// import { useNavigate } from 'react-router-dom';

// const AddParticipant = () => {
//     const [inputValues, setInputValues] = useState(['']);
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

//     const handleFileInputChange = (index, event) => {
//         const file = event.target.files[0];
//         const newUploadFields = [...uploadFields];
//         newUploadFields[index] = file;
//         setUploadFields(newUploadFields);
//     };

//     const handleDragOver = (event) => {
//         event.preventDefault();
//     };

//     const handleDrop = (event) => {
//         event.preventDefault();
//         const itemType = event.dataTransfer.getData('text/plain');
//         if (itemType === 'textField') {
//             setInputValues([...inputValues, '']);
//         } else if (itemType === 'picture') {
//             setUploadFields([...uploadFields, null]);
//         } else {
//             const file = event.dataTransfer.files[0];
//             setSelectedFile(file);
//         }
//     };

//     const handleDropClick = (index) => {
//         const fileInput = document.getElementById(`fileInput-${index}`);
//         fileInput.click();
//     };

//     const handleFileUpload = () => {
//         // Implement file upload logic here
//         console.log('Uploaded file:', selectedFile);
//     };

//     const handleSubmit = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             const requests = [];

//             // Handle text fields
//             inputValues.forEach((value, index) => {
//                 const payload = {
//                     contest_id: contest_id,
//                     is_important: value.includes('*') ? "yes" : "no",
//                     label: value,
//                     name: value,
//                     required: true,
//                     type: "text"
//                 };

//                 requests.push(
//                     fetch('https://expoproject.saeedantechpvt.com/api/admin/form_fields', {
//                         method: 'POST',
//                         headers: {
//                             'Content-Type': 'application/json',
//                             Authorization: `Bearer ${token}`
//                         },
//                         body: JSON.stringify(payload)
//                     })
//                 );
//             });

//             // Handle file uploads
//             // uploadFields.forEach((file, index) => {
//             //     const payload = {
//             //         contest_id: contest_id,
//             //         is_important: "no",
//             //         label: `Upload ${index + 1}`,
//             //         name: `File ${index + 1}`,
//             //         required: true,
//             //         type: "file"
//             //     };

//             //     requests.push(
//             //         fetch('https://expoproject.saeedantechpvt.com/api/admin/form_fields', {
//             //             method: 'POST',
//             //             headers: {
//             //                 'Content-Type': 'application/json',
//             //                 Authorization: `Bearer ${token}`
//             //             },
//             //             body: JSON.stringify(payload)
//             //         })
//             //     );
//             // });

//             // Execute all requests concurrently
//             const responses = await Promise.all(requests);
//             const responseData = await Promise.all(responses.map(response => response.json()));
//             console.log('API responses:', responseData);
//             navigate('/admin/add-QR');
//             // Handle response and navigation logic here
//         } catch (error) {
//             console.error('Error submitting data:', error);
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
//                     Add Participant
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
//                                 onDragStart={(event) => event.dataTransfer.setData('text/plain', 'textField')}
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
//                                 onDragStart={(event) => event.dataTransfer.setData('text/plain', 'picture')}
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
//                         onDrop={handleDrop}
//                         onDragOver={handleDragOver}
//                     >
//                         {inputValues.map((inputValue, index) => (
//                             <TextField
//                                 key={index}
//                                 variant="outlined"
//                                 placeholder="Enter text"
//                                 value={inputValue}
//                                 onChange={(event) => handleInputChange(index, event)}
//                                 InputProps={{
//                                     endAdornment: (
//                                         <InputAdornment position="end">
//                                             <Button
//                                                 onClick={() => handleYesClick(index)}
//                                                 variant="contained"
//                                                 color="primary"
//                                                 size="small"
//                                                 sx={{ marginRight: '4px' }}
//                                             >
//                                                 Yes
//                                             </Button>
//                                             <Button
//                                                 onClick={() => handleNoClick(index)}
//                                                 variant="contained"
//                                                 color="secondary"
//                                                 size="small"
//                                             >
//                                                 No
//                                             </Button>
//                                         </InputAdornment>
//                                     )
//                                 }}
//                                 sx={{ width: '100%' }}
//                             />
//                         ))}
//                         {uploadFields.map((file, index) => (
//                             <Box
//                                 key={index}
//                                 sx={{
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
//                                     marginTop: '20px',
//                                     cursor: 'pointer'
//                                 }}
//                                 onClick={() => handleDropClick(index)}
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
//                             </Box>
//                         ))}
//                         <Box
//                             sx={{
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
//                                 cursor: 'pointer'
//                             }}
//                             onClick={() => handleDropClick(-1)}
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
//                         </Box>
//                         <Button
//                             variant="contained"
//                             color="primary"
//                             onClick={handleSubmit}
//                             sx={{ width: '100%', marginTop: '20px' }}
//                         >
//                             Next
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
    InputAdornment,
    TextField,
    Typography
} from '@mui/material';
import { SlCloudDownload } from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';

const AddParticipant = () => {
    const [inputValues, setInputValues] = useState(['']);
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

    const handleFileInputChange = (index, event) => {
        const file = event.target.files[0];
        const newUploadFields = [...uploadFields];
        newUploadFields[index] = file;
        setUploadFields(newUploadFields);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const itemType = event.dataTransfer.getData('text/plain');
        if (itemType === 'textField') {
            setInputValues([...inputValues, '']);
        } else if (itemType === 'picture') {
            setUploadFields([...uploadFields, null]);
        } else {
            const file = event.dataTransfer.files[0];
            setSelectedFile(file);
        }
    };

    const handleDropClick = (index) => {
        const fileInput = document.getElementById(`fileInput-${index}`);
        fileInput.click();
    };

    const handleFileUpload = () => {
        // Implement file upload logic here
        console.log('Uploaded file:', selectedFile);
    };

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem('token');
            const formData = [];

            // Handle text fields
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

            // Handle file uploads
            uploadFields.forEach((file, index) => {
                if (file) {
                    const field = {
                        contest_id: contest_id,
                        name: `File ${index + 1}`,
                        type: "file",
                        label: `Upload ${index + 1}`,
                        required: true,
                        is_important: false
                    };

                    formData.push(field);
                }
            });

            // Send formData to API endpoint
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
            console.log('Form data submitted successfully:', responseData);
            console.log(responseData, 'iddddddddddd')

            navigate('/admin/add-QR', { state: {contest_id } });
        } catch (error) {
            console.error('Error submitting data:', error);
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
                    Add Participant
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
                                onDragStart={(event) => event.dataTransfer.setData('text/plain', 'textField')}
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
                                onDragStart={(event) => event.dataTransfer.setData('text/plain', 'picture')}
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
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                    >
                        {inputValues.map((inputValue, index) => (
                            <TextField
                                key={index}
                                variant="outlined"
                                placeholder="Enter text"
                                value={inputValue}
                                onChange={(event) => handleInputChange(index, event)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Button
                                                onClick={() => handleYesClick(index)}
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                sx={{ marginRight: '4px' }}
                                            >
                                                Yes
                                            </Button>
                                            <Button
                                                onClick={() => handleNoClick(index)}
                                                variant="contained"
                                                color="secondary"
                                                size="small"
                                            >
                                                No
                                            </Button>
                                        </InputAdornment>
                                    )
                                }}
                                sx={{ width: '100%' }}
                            />
                        ))}
                        {uploadFields.map((file, index) => (
                            <Box
                                key={index}
                                sx={{
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
                                    marginTop: '20px',
                                    cursor: 'pointer'
                                }}
                                onClick={() => handleDropClick(index)}
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
                            </Box>
                        ))}
                        <Box
                            sx={{
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
                                cursor: 'pointer'
                            }}
                            onClick={() => handleDropClick(-1)}
                        >
                            <SlCloudDownload size={40} style={{ color: '#D90B0F' }} />
                            <Typography sx={{ fontSize: '13px', fontWeight: 600 }}>Drag here</Typography>
                            <Typography sx={{ color: '#676767', fontSize: '11px' }}>
                                Supported formats: Any image format, pdf, doc, docx, txt
                            </Typography>
                            <input
                                type="file"
                                id="fileInput-main"
                                onChange={(event) => handleFileInputChange(uploadFields.length, event)}
                                style={{ display: 'none' }}
                            />
                            {selectedFile && (
                                <Typography sx={{ fontSize: '12px', fontWeight: 600, marginTop: '10px' }}>
                                    Selected File: {selectedFile.name}
                                </Typography>
                            )}
                        </Box>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            sx={{ width: '100%', marginTop: '20px' }}
                        >
                            Next
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default AddParticipant;

