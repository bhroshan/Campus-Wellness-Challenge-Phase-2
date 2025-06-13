import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box, Typography, Grid, CircularProgress } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDashboardStats, resetDashboard } from '../features/challenges/dashboardSlice';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupIcon from '@mui/icons-material/Group';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { stats, isLoading, isError, message } = useSelector((state) => state.dashboard);

    useEffect(() => {
        if (user?.role) {
            dispatch(fetchDashboardStats(user.role));
        }
        return () => {
            dispatch(resetDashboard());
        };
    }, [dispatch, user?.role]);

    if (isLoading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}><CircularProgress /></Box>;
    }
    if (isError) {
        return <Box sx={{ color: 'red', textAlign: 'center', mt: 4 }}>{message}</Box>;
    }

    return (
        <Box sx={{ width: '100%' }}>
            {/* Dashboard Title */}
            <Box sx={{ mb: 3 }}>
                <Typography
                    variant="h5"
                    sx={{ fontWeight: 330, letterSpacing: 1 }}
                >
                    Dashboard
                </Typography>
            </Box>

            {/* Home Info Box */}
            <Box
                sx={{
                    backgroundColor: 'white',
                    p: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 4,
                    borderRadius: 1
                }}
            >
                <Typography
                    variant="h6"
                    sx={{ fontWeight: 280, letterSpacing: 1 }}
                >
                    Home
                </Typography>
                <Box sx={{
                    display: 'flex',
                    gap: 4,
                    alignItems: 'center',
                }}>
                    <Typography
                        variant="h6"
                        sx={{ fontWeight: 280, letterSpacing: 1 }}
                    >
                        {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{ fontWeight: 280, letterSpacing: 1 }}
                    >
                        {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </Typography>
                </Box>
            </Box>

            {/* Card Box */}
            <Grid container spacing={6}>
                {user?.role === 'student' && stats && (
                    <>
                        <Grid item xs={12} md={6}>
                            <Card sx={{ backgroundColor: '#BDBDBD', borderRadius: 2, height: '100%' }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <EmojiEventsIcon fontSize="large" color="primary" />
                                        <Typography variant="h4" sx={{ color: 'black', mb: 1 }}>
                                            {stats.totalChallenges}
                                        </Typography>
                                    </Box>
                                    <Typography variant="h6" sx={{ color: 'black' }}>
                                        Available Challenges
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card sx={{ backgroundColor: '#BDBDBD', borderRadius: 2, height: '100%' }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <AssignmentTurnedInIcon fontSize="large" color="success" />
                                        <Typography variant="h4" sx={{ color: 'black', mb: 1 }}>
                                            {stats.joinedCount}
                                        </Typography>
                                    </Box>
                                    <Typography variant="h6" sx={{ color: 'black' }}>
                                        Joined Challenges
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </>
                )}
                {user?.role === 'coordinator' && stats && (
                    <>
                        <Grid item xs={12} md={4}>
                            <Card sx={{ backgroundColor: '#BDBDBD', borderRadius: 2, height: '100%' }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <EmojiEventsIcon fontSize="large" color="primary" />
                                        <Typography variant="h4" sx={{ color: 'black', mb: 1 }}>
                                            {stats.myChallengesCount}
                                        </Typography>
                                    </Box>
                                    <Typography variant="h6" sx={{ color: 'black' }}>
                                        My Challenges
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Card sx={{ backgroundColor: '#BDBDBD', borderRadius: 2, height: '100%' }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <GroupIcon fontSize="large" color="secondary" />
                                        <Typography variant="h4" sx={{ color: 'black', mb: 1 }}>
                                            {stats.activeParticipants}
                                        </Typography>
                                    </Box>
                                    <Typography variant="h6" sx={{ color: 'black' }}>
                                        Active Participants
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </>
                )}
            </Grid>
        </Box>
    );
};

export default Dashboard;
