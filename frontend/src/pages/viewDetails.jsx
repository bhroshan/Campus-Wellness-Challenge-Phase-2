import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
    getChallengeById, 
    markChallengeCompleted, 
    revertChallengeCompletion 
} from '../features/challenges/challengeSlice';
import { 
    Grid, 
    Button, 
    Box, 
    Typography, 
    Divider, 
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import LinkIcon from '@mui/icons-material/Link';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { API_URL } from '../configs';
import { toast } from 'react-toastify';

function ViewDetails() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { user } = useSelector((state) => state.auth);
    const [confirmDialog, setConfirmDialog] = useState(false);
    const { challenge, isLoading, isError, message, isSuccess } = useSelector(
        (state) => state.challenges
    );

    useEffect(() => {
        if (id) {
            dispatch(getChallengeById(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
    }, [isError, message]);

    const handleCompleteChallenge = async () => {
        try {
            await dispatch(markChallengeCompleted(id)).unwrap();
            toast.success('Challenge marked as completed!');
            setConfirmDialog(false);
        } catch (error) {
            toast.error(error || 'Failed to mark challenge as completed');
        }
    };

    const handleRevertCompletion = async () => {
        try {
            await dispatch(revertChallengeCompletion(id)).unwrap();
            toast.success('Challenge completion reverted!');
            setConfirmDialog(false);
        } catch (error) {
            toast.error(error || 'Failed to revert challenge completion');
        }
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

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (isError) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography color="error">{message}</Typography>
            </Box>
        );
    }

    const isCoordinator = user?.role === 'coordinator';
    const showResources = isCoordinator || challenge?.joined;

    return (
        <>
            {/* Header with Go Back and Completion Buttons */}
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                mb: 2,
                gap: 2
            }}>
                <Button
                    variant="contained"
                    startIcon={<AssignmentReturnIcon />}
                    onClick={() => navigate('/dashboard')}
                    sx={{
                        color: 'black',
                        backgroundColor: "#EEEEEE",
                        '&:hover': {
                            backgroundColor: "#BDBDBD",
                        },
                    }}
                >
                    Go Back
                </Button>

                {/* Completion Button for Students */}
                {!isCoordinator && challenge?.joined && (
                    <Box>
                        {challenge.completed ? (
                            <Button
                                variant="outlined"
                                color="error"
                                startIcon={<CancelIcon />}
                                onClick={() => setConfirmDialog(true)}
                                disabled={isLoading}
                            >
                                Mark as Not Completed
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                color="success"
                                startIcon={<CheckCircleIcon />}
                                onClick={() => setConfirmDialog(true)}
                                disabled={isLoading}
                            >
                                Mark as Completed
                            </Button>
                        )}
                    </Box>
                )}
            </Box>

            {/* Challenge Details */}
            <Box p={3}>
                <Divider>
                    <Typography
                        variant="h1"
                        sx={{
                            fontWeight: 300,
                            fontSize: { xs: 18, sm: 24 },
                            letterSpacing: 1,
                            fontFamily: 'Roboto, sans-serif',
                        }}
                    >
                        Challenge Details
                    </Typography>
                </Divider>
            </Box>

            {challenge && (
                <Box sx={{ p: 3 }}>
                    <Card>
                        {challenge.image && (
                            <CardMedia
                                component="img"
                                height="300"
                                image={`${API_URL}${challenge.image}`}
                                alt={challenge.title}
                                sx={{ objectFit: 'cover' }}
                            />
                        )}
                        <CardContent>
                            <Typography variant="h4" gutterBottom>
                                {challenge.title}
                            </Typography>
                            <Typography variant="h6" color="text.secondary" gutterBottom>
                                Description
                            </Typography>
                            <Typography variant="body1" paragraph>
                                {challenge.description}
                            </Typography>
                            <Typography variant="h6" color="text.secondary" gutterBottom>
                                Instructions
                            </Typography>
                            <Typography variant="body1" paragraph>
                                {challenge.instructions}
                            </Typography>

                            {/* Resources Section */}
                            {(challenge.resources?.pdfs?.length > 0 || 
                              challenge.resources?.images?.length > 0 || 
                              challenge.resources?.links?.length > 0) && (
                                <>
                                    <Typography variant="h6" color="text.secondary" gutterBottom sx={{ mt: 4 }}>
                                        Resources
                                    </Typography>
                                    {showResources ? (
                                        <Paper elevation={0} sx={{ bgcolor: 'background.default', p: 2, borderRadius: 2 }}>
                                            {/* PDFs */}
                                            {challenge.resources.pdfs?.length > 0 && (
                                                <Box sx={{ mb: 3 }}>
                                                    <Typography variant="subtitle1" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                                                        <PictureAsPdfIcon sx={{ mr: 1, color: 'error.main' }} />
                                                        PDF Documents
                                                    </Typography>
                                                    <List>
                                                        {challenge.resources.pdfs.map((pdf, index) => (
                                                            <ListItem 
                                                                key={index}
                                                                component="a"
                                                                href={`${API_URL}${pdf.path}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                sx={{ 
                                                                    borderRadius: 1,
                                                                    '&:hover': { 
                                                                        backgroundColor: 'action.hover',
                                                                        cursor: 'pointer'
                                                                    }
                                                                }}
                                                            >
                                                                <ListItemIcon>
                                                                    <PictureAsPdfIcon color="error" sx={{ fontSize: 40 }} />
                                                                </ListItemIcon>
                                                                <ListItemText 
                                                                    primary={pdf.name}
                                                                    primaryTypographyProps={{
                                                                        sx: { 
                                                                            color: 'text.primary',
                                                                            textDecoration: 'none'
                                                                        }
                                                                    }}
                                                                />
                                                            </ListItem>
                                                        ))}
                                                    </List>
                                                </Box>
                                            )}

                                            {/* Images */}
                                            {challenge.resources.images?.length > 0 && (
                                                <Box sx={{ mb: 3 }}>
                                                    <Typography variant="subtitle1" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                                                        <ImageIcon sx={{ mr: 1, color: 'primary.main' }} />
                                                        Images
                                                    </Typography>
                                                    <List>
                                                        {challenge.resources.images.map((image, index) => (
                                                            <ListItem 
                                                                key={index}
                                                                component="a"
                                                                href={`${API_URL}${image.path}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                sx={{ 
                                                                    borderRadius: 1,
                                                                    '&:hover': { 
                                                                        backgroundColor: 'action.hover',
                                                                        cursor: 'pointer'
                                                                    }
                                                                }}
                                                            >
                                                                <Box
                                                                    component="img"
                                                                    src={`${API_URL}${image.path}`}
                                                                    sx={{
                                                                        width: 60,
                                                                        height: 60,
                                                                        objectFit: 'cover',
                                                                        borderRadius: 1,
                                                                        mr: 2
                                                                    }}
                                                                />
                                                                <ListItemText 
                                                                    primary={image.name}
                                                                    primaryTypographyProps={{
                                                                        sx: { 
                                                                            color: 'text.primary',
                                                                            textDecoration: 'none'
                                                                        }
                                                                    }}
                                                                />
                                                            </ListItem>
                                                        ))}
                                                    </List>
                                                </Box>
                                            )}

                                            {/* Links */}
                                            {challenge.resources.links?.length > 0 && (
                                                <Box>
                                                    <Typography variant="subtitle1" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                                                        <LinkIcon sx={{ mr: 1, color: 'info.main' }} />
                                                        External Links
                                                    </Typography>
                                                    <List>
                                                        {challenge.resources.links.map((link, index) => (
                                                            <ListItem 
                                                                key={index}
                                                                sx={{ 
                                                                    borderRadius: 1,
                                                                    '&:hover': { 
                                                                        backgroundColor: 'action.hover',
                                                                        cursor: 'pointer'
                                                                    },
                                                                    flexDirection: 'column',
                                                                    alignItems: 'flex-start'
                                                                }}
                                                            >
                                                                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                                                    <ListItemIcon>
                                                                        <LinkIcon color="info" sx={{ fontSize: 40 }} />
                                                                    </ListItemIcon>
                                                                    <ListItemText 
                                                                        primary={
                                                                            <a 
                                                                                href={link.url}
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                                style={{ 
                                                                                    color: 'inherit',
                                                                                    textDecoration: 'none'
                                                                                }}
                                                                            >
                                                                                {link.title}
                                                                            </a>
                                                                        }
                                                                        secondary={link.url}
                                                                        primaryTypographyProps={{
                                                                            sx: { 
                                                                                color: 'text.primary',
                                                                                textDecoration: 'none'
                                                                            }
                                                                        }}
                                                                        secondaryTypographyProps={{
                                                                            sx: { 
                                                                                color: 'text.secondary',
                                                                                textDecoration: 'none'
                                                                            }
                                                                        }}
                                                                    />
                                                                </Box>
                                                                {isYouTubeUrl(link.url) && (
                                                                    <Box sx={{ width: '100%', mt: 2 }}>
                                                                        <iframe
                                                                            width="100%"
                                                                            height="315"
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
                                            )}
                                        </Paper>
                                    ) : (
                                        <Paper 
                                            elevation={0} 
                                            sx={{ 
                                                bgcolor: 'background.default', 
                                                p: 3, 
                                                borderRadius: 2,
                                                textAlign: 'center'
                                            }}
                                        >
                                            <Typography variant="body1" color="text.secondary" gutterBottom>
                                                Join this challenge to access the resources
                                            </Typography>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => navigate(`/join-challenge/${challenge._id}`)}
                                                sx={{ mt: 2 }}
                                            >
                                                Join Challenge
                                            </Button>
                                        </Paper>
                                    )}
                                </>
                            )}
                        </CardContent>
                    </Card>
                </Box>
            )}

            {/* Confirmation Dialog */}
            <Dialog
                open={confirmDialog}
                onClose={() => setConfirmDialog(false)}
            >
                <DialogTitle>
                    {challenge?.completed ? 'Revert Completion' : 'Mark as Completed'}
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        {challenge?.completed 
                            ? 'Are you sure you want to mark this challenge as not completed?'
                            : 'Are you sure you want to mark this challenge as completed?'}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDialog(false)}>Cancel</Button>
                    <Button 
                        onClick={challenge?.completed ? handleRevertCompletion : handleCompleteChallenge}
                        color={challenge?.completed ? "error" : "success"}
                        variant="contained"
                        disabled={isLoading}
                    >
                        {isLoading ? <CircularProgress size={24} /> : 'Confirm'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ViewDetails;
