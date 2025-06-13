import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getChallengeById, updateChallenge } from '../features/challenges/challengeSlice';
import { toast } from 'react-toastify';
import {
    Box,
    Button,
    Grid,
    Paper,
    TextField,
    Typography,
    CircularProgress
} from "@mui/material";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { API_URL } from '../configs';

const EditChallenge = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { challenge, isLoading } = useSelector(state => state.challenges);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        instructions: "",
        challenge_image: null,
        existing_image: null
    });

    useEffect(() => {
        dispatch(getChallengeById(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (challenge && challenge._id === id) {
            setFormData({
                title: challenge.title || "",
                description: challenge.description || "",
                instructions: challenge.instructions || "",
                challenge_image: null,
                existing_image: challenge.image || null
            });
        }
    }, [challenge, id]);

    const { title, description, instructions, challenge_image, existing_image } = formData;

    const onChange = (e) => {
        if (e.target.name === 'challenge_image') {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.files[0],
                existing_image: null
            }))
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value
            }))
        }
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
        dispatch(updateChallenge({ id, challengeData: formDataToSend }))
            .unwrap()
            .then(() => {
                toast.success('Challenge updated successfully');
                navigate('/view-challenge-list');
            })
            .catch((error) => {
                toast.error(error || 'Failed to update challenge');
            });
    };

    if (isLoading && !challenge) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>;
    }

    return (
        <Box sx={{ width: "100%" }}>
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
                        Edit Wellness Challenge
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
                                    ) : existing_image ? (
                                        <Box
                                            component="img"
                                            src={`${API_URL}${existing_image}`}
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
                                {(challenge_image || existing_image) && (
                                    <Box sx={{ mt: 1 }}>
                                        <Typography variant="body2" color="textSecondary">
                                            {challenge_image ? challenge_image.name : 'Current Image'}
                                        </Typography>
                                        <Button
                                            size="small"
                                            color="error"
                                            onClick={() => setFormData(prev => ({ ...prev, challenge_image: null, existing_image: null }))}
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
                                Update
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
};

export default EditChallenge; 