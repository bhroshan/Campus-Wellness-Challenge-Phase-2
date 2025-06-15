import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { createChallenge } from '../features/challenges/challengeSlice';
import { toast } from 'react-toastify';
import {
    Box,
    Button,
    Grid,
    Paper,
    TextField,
    Typography,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Divider
} from "@mui/material";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';
import LinkIcon from '@mui/icons-material/Link';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';

const CreateChallenge = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        instructions: "",
        challenge_image: null,
        resources: {
            pdfs: [],
            images: [],
            links: []
        }
    });

    const [linkInput, setLinkInput] = useState({ title: '', url: '' });

    const { title, description, instructions, challenge_image, resources } = formData;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onChange = (e) => {
        if (e.target.name === 'challenge_image') {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.files[0]
            }))
        } else if (e.target.name === 'pdfs' || e.target.name === 'images') {
            setFormData((prevState) => ({
                ...prevState,
                resources: {
                    ...prevState.resources,
                    [e.target.name]: [...prevState.resources[e.target.name], ...Array.from(e.target.files)]
                }
            }))
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value
            }))
        }
    };

    const handleLinkInputChange = (e) => {
        setLinkInput({
            ...linkInput,
            [e.target.name]: e.target.value
        });
    };

    const addLink = () => {
        if (linkInput.title && linkInput.url) {
            setFormData((prevState) => ({
                ...prevState,
                resources: {
                    ...prevState.resources,
                    links: [...prevState.resources.links, { ...linkInput }]
                }
            }));
            setLinkInput({ title: '', url: '' });
        }
    };

    const removeResource = (type, index) => {
        setFormData((prevState) => ({
            ...prevState,
            resources: {
                ...prevState.resources,
                [type]: prevState.resources[type].filter((_, i) => i !== index)
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('title', title);
        formDataToSend.append('description', description);
        formDataToSend.append('instructions', instructions);
        if (challenge_image) {
            formDataToSend.append('challenge_image', challenge_image);
        }

        // Append resources
        resources.pdfs.forEach((file, index) => {
            formDataToSend.append(`pdfs`, file);
        });
        resources.images.forEach((file, index) => {
            formDataToSend.append(`images`, file);
        });
        formDataToSend.append('links', JSON.stringify(resources.links));

        dispatch(createChallenge(formDataToSend))
            .unwrap()
            .then(() => {
                toast.success('Challenge created successfully');
                navigate('/view-challenge-list');
            })
            .catch((error) => {
                toast.error(error || 'Failed to create challenge');
            });
    };

    // Helper function to check if URL is YouTube
    const isYouTubeUrl = (url) => {
        return url.includes('youtube.com/watch') || url.includes('youtu.be/');
    };

    // Helper function to extract YouTube video ID
    const getYouTubeVideoId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    return (
        <Box sx={{ width: "100%", py: 2 }}>
            <Button
                variant="contained"
                startIcon={<AssignmentReturnIcon />}
                onClick={() => navigate("/dashboard")}
                sx={{
                    mb: 2,
                    backgroundColor: "#EEEEEE",
                    color: "black",
                    "&:hover": {
                        backgroundColor: "#BDBDBD",
                    },
                }}
            >
                Go Back
            </Button>

            <Paper
                elevation={3}
                sx={{
                    p: 3,
                    borderRadius: 2,
                }}
            >
                <form onSubmit={handleSubmit}>
                    <Typography
                        variant="h5"
                        sx={{
                            mb: 3,
                            fontWeight: 500,
                            letterSpacing: 1,
                        }}
                    >
                        Create Wellness Challenge
                    </Typography>

                    <Grid
                        container
                        spacing={3}
                        flex={1}
                        flexDirection={"column"}
                    >
                        {/* Challenge Image Upload */}
                        <Grid item xs={12}>
                            <Box sx={{ width: '100%', textAlign: 'center' }}>
                                <input
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="challenge-image-upload"
                                    type="file"
                                    name="challenge_image"
                                    onChange={onChange}
                                />
                                <Box
                                    sx={{
                                        width: 150,
                                        height: 150,
                                        border: '2px dashed #ccc',
                                        borderRadius: '4px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto',
                                        cursor: 'pointer',
                                        '&:hover': {
                                            borderColor: 'primary.main',
                                        },
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}
                                    component="label"
                                    htmlFor="challenge-image-upload"
                                >
                                    {challenge_image ? (
                                        <Box
                                            component="img"
                                            src={URL.createObjectURL(challenge_image)}
                                            sx={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                    ) : (
                                        <>
                                            <PhotoCamera sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
                                            <Typography variant="body2" color="textSecondary">
                                                Click to upload challenge image
                                            </Typography>
                                        </>
                                    )}
                                </Box>
                                {challenge_image && (
                                    <Box sx={{ mt: 1 }}>
                                        <Typography variant="body2" color="textSecondary">
                                            {challenge_image.name}
                                        </Typography>
                                        <Button
                                            size="small"
                                            color="error"
                                            onClick={() => setFormData(prev => ({ ...prev, challenge_image: null }))}
                                            sx={{ mt: 1 }}
                                        >
                                            Remove
                                        </Button>
                                    </Box>
                                )}
                            </Box>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Title"
                                name="title"
                                id="title"
                                variant="outlined"
                                fullWidth
                                required
                                value={title}
                                onChange={onChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Description"
                                name="description"
                                id="description"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                required
                                value={description}
                                onChange={onChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Instructions"
                                id="instructions"
                                name="instructions"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={3}
                                required
                                value={instructions}
                                onChange={onChange}
                            />
                        </Grid>

                        {/* Resources Section */}
                        <Grid item xs={12}>
                            <Typography variant="h6" sx={{ mb: 2 }}>Resources</Typography>
                            
                            {/* PDF Upload */}
                            <Box sx={{ mb: 3 }}>
                                <input
                                    accept="application/pdf"
                                    style={{ display: 'none' }}
                                    id="pdf-upload"
                                    type="file"
                                    name="pdfs"
                                    multiple
                                    onChange={onChange}
                                />
                                <Button
                                    variant="outlined"
                                    component="label"
                                    htmlFor="pdf-upload"
                                    startIcon={<PictureAsPdfIcon />}
                                    sx={{ mb: 2 }}
                                >
                                    Upload PDFs
                                </Button>
                                <List>
                                    {resources.pdfs.map((file, index) => (
                                        <ListItem 
                                            key={index}
                                            sx={{ 
                                                '&:hover': { 
                                                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                                    cursor: 'pointer'
                                                }
                                            }}
                                        >
                                            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                                <PictureAsPdfIcon sx={{ mr: 2, color: 'error.main', fontSize: 40 }} />
                                                <ListItemText 
                                                    primary={
                                                        <a 
                                                            href={URL.createObjectURL(file)} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            style={{ 
                                                                color: 'inherit', 
                                                                textDecoration: 'none',
                                                                display: 'block',
                                                                width: '100%'
                                                            }}
                                                        >
                                                            {file.name}
                                                        </a>
                                                    }
                                                />
                                            </Box>
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" onClick={() => removeResource('pdfs', index)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>

                            {/* Image Upload */}
                            <Box sx={{ mb: 3 }}>
                                <input
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="image-upload"
                                    type="file"
                                    name="images"
                                    multiple
                                    onChange={onChange}
                                />
                                <Button
                                    variant="outlined"
                                    component="label"
                                    htmlFor="image-upload"
                                    startIcon={<ImageIcon />}
                                    sx={{ mb: 2 }}
                                >
                                    Upload Images
                                </Button>
                                <List>
                                    {resources.images.map((file, index) => (
                                        <ListItem 
                                            key={index}
                                            sx={{ 
                                                '&:hover': { 
                                                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                                    cursor: 'pointer'
                                                }
                                            }}
                                        >
                                            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                                <Box
                                                    component="img"
                                                    src={URL.createObjectURL(file)}
                                                    sx={{
                                                        width: 60,
                                                        height: 60,
                                                        objectFit: 'cover',
                                                        borderRadius: 1,
                                                        mr: 2
                                                    }}
                                                />
                                                <ListItemText 
                                                    primary={
                                                        <a 
                                                            href={URL.createObjectURL(file)} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            style={{ 
                                                                color: 'inherit', 
                                                                textDecoration: 'none',
                                                                display: 'block',
                                                                width: '100%'
                                                            }}
                                                        >
                                                            {file.name}
                                                        </a>
                                                    }
                                                />
                                            </Box>
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" onClick={() => removeResource('images', index)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>

                            {/* Links */}
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="subtitle1" sx={{ mb: 2 }}>Add Links</Typography>
                                <Grid container spacing={2} sx={{ mb: 2 }}>
                                    <Grid item xs={12} sm={5}>
                                        <TextField
                                            label="Link Title"
                                            name="title"
                                            value={linkInput.title}
                                            onChange={handleLinkInputChange}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={5}>
                                        <TextField
                                            label="URL"
                                            name="url"
                                            value={linkInput.url}
                                            onChange={handleLinkInputChange}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={2}>
                                        <Button
                                            variant="contained"
                                            onClick={addLink}
                                            startIcon={<LinkIcon />}
                                            fullWidth
                                            sx={{ height: '100%' }}
                                        >
                                            Add
                                        </Button>
                                    </Grid>
                                </Grid>
                                <List>
                                    {resources.links.map((link, index) => (
                                        <ListItem 
                                            key={index}
                                            sx={{ 
                                                '&:hover': { 
                                                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                                    cursor: 'pointer'
                                                },
                                                flexDirection: 'column',
                                                alignItems: 'flex-start'
                                            }}
                                        >
                                            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                                <LinkIcon sx={{ mr: 2, color: 'info.main', fontSize: 40 }} />
                                                <ListItemText 
                                                    primary={
                                                        <a 
                                                            href={link.url} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            style={{ 
                                                                color: 'inherit', 
                                                                textDecoration: 'none',
                                                                display: 'block',
                                                                width: '100%'
                                                            }}
                                                        >
                                                            {link.title}
                                                        </a>
                                                    }
                                                    secondary={link.url}
                                                />
                                                <IconButton edge="end" onClick={() => removeResource('links', index)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Box>
                                            {isYouTubeUrl(link.url) && (
                                                <Box sx={{ width: '100%', mt: 2 }}>
                                                    <iframe
                                                        width="100%"
                                                        height="200"
                                                        src={`https://www.youtube.com/embed/${getYouTubeVideoId(link.url)}`}
                                                        title={link.title}
                                                        frameBorder="0"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                        style={{ borderRadius: '8px' }}
                                                    />
                                                </Box>
                                            )}
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                sx={{
                                    backgroundColor: "#424242",
                                    "&:hover": {
                                        backgroundColor: "black",
                                    },
                                }}
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
};

export default CreateChallenge;
