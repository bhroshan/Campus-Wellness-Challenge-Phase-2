import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getChallengeById } from '../features/challenges/challengeSlice';
import { Grid, Button, Box, Typography, Divider, CircularProgress } from '@mui/material';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { API_URL } from '../configs';

function ViewDetails() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();

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
                        </CardContent>
                    </Card>
                </Box>
            )}
        </>
    );
}

export default ViewDetails;
