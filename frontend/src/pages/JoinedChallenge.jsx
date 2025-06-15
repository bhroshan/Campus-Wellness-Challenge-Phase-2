import { Grid, Button, Box, CircularProgress, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import { getJoinedChallenges, leaveChallenge } from '../features/challenges/challengeSlice';
import ChallengeCard from '../components/ChallengeCard';
import { toast } from 'react-toastify';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function JoinedChallenge() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { myJoinedChallenges, isLoading, isError, message } = useSelector(
        (state) => state.challenges
    );

    useEffect(() => {
        dispatch(getJoinedChallenges());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
    }, [isError, message]);

    const handleLeaveChallenge = (id) => {
        if (window.confirm('Are you sure you want to leave this challenge?')) {
            dispatch(leaveChallenge(id))
                .unwrap()
                .then(() => {
                    toast.success('Successfully left the challenge!');
                    // Refresh the joined challenges list
                    dispatch(getJoinedChallenges());
                })
                .catch((error) => {
                    toast.error(error);
                });
        }
    };

    const handleViewDetails = (id) => {
        navigate(`/view-details/${id}`);
    };

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
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
                    }
                }}
            >
                Go Back
            </Button>

            {myJoinedChallenges.length === 0 ? (
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    height: '70vh',
                    flexDirection: 'column',
                    gap: 2
                }}>
                    <Typography variant="h5" color="text.secondary">
                        You haven't joined any challenges yet
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/view-challenge-list')}
                    >
                        Browse Challenges
                    </Button>
                </Box>
            ) : (
                <Grid container spacing={3} p={5} justifyContent="start">
                    {myJoinedChallenges.map((challenge) => (
                        <Grid item sm={6} md={4} key={challenge._id} sx={{ display: 'flex', justifyContent: 'start' }}>
                            <ChallengeCard
                                challenge={challenge}
                                onViewDetails={handleViewDetails}
                                onAction={handleLeaveChallenge}
                                actionLabel="Leave Challenge"
                                actionColor="error"
                                icon={<ExitToAppIcon />}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
        </>
    );
}

export default JoinedChallenge;