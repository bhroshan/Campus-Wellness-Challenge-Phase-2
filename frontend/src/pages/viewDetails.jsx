import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getChallengeById } from '../features/challenges/challengeSlice';
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
    Paper
} from '@mui/material';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import LinkIcon from '@mui/icons-material/Link';
import { API_URL } from '../configs';

function ViewDetails() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { user } = useSelector((state) => state.auth);

    const { challenge, isLoading, isError, message } = useSelector(
        (state) => state.challenges
    );

    useEffect(() => {
        if (id) {
            dispatch(getChallengeById(id));
        }
    }, [dispatch, id]);

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
            {/* Go Back Button */}
            <Button
                variant="contained"
                fullWidth
                startIcon={<AssignmentReturnIcon />}
                onClick={() => navigate('/dashboard')}
                sx={{
                    mx: 'auto',
                    display: 'flex',
                    color: 'black',
                    alignItems: 'center',
                    backgroundColor: "#EEEEEE",
                    '&:hover': {
                        backgroundColor: "#BDBDBD",
                    },
                }}
            >
                Go Back
            </Button>

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
                                                                    <PictureAsPdfIcon color="error" />
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
                                                                <ListItemIcon>
                                                                    <ImageIcon color="primary" />
                                                                </ListItemIcon>
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
                                                                component="a"
                                                                href={link.url}
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
                                                                    <LinkIcon color="info" />
                                                                </ListItemIcon>
                                                                <ListItemText 
                                                                    primary={link.title}
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
        </>
    );
}

export default ViewDetails;
