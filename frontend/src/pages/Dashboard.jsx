import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box, Typography, Grid, CircularProgress } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDashboardStats, resetDashboard } from '../features/challenges/dashboardSlice';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupIcon from '@mui/icons-material/Group';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingActionsIcon from '@mui/icons-material/PendingActions';

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
        <Box sx={{ width: '100%', maxWidth: '100%' }}>
            {/* Home Info Box */}
            <Box
                sx={{
                    backgroundColor: 'white',
                    p: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 4,
                    borderRadius: 1,
                    width: '100%'
                }}
            >
                <Typography
                    variant="h6"
                    sx={{ fontWeight: 280, letterSpacing: 1 }}
                >
                    Dashboard
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
            <Box sx={{ 
                display: 'flex', 
                gap: 3, 
                width: '100%',
                flexWrap: 'wrap'
            }}>
                {user?.role === 'student' && stats && (
                    <>
                        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' } }}>
                            <Card sx={{ 
                                backgroundColor: '#6366f1',
                                borderRadius: 3,
                                height: '140px',
                                width: '100%',
                                transition: 'all 0.3s ease-in-out',
                                cursor: 'pointer',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                border: 'none',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: '0 8px 30px rgba(0,0,0,0.15)'
                                }
                            }}>
                                <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <Box>
                                            <Typography variant="h3" sx={{ color: 'white', fontWeight: 'bold', mb: 0.5 }}>
                                                {stats.totalChallenges}
                                            </Typography>
                                            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.9rem' }}>
                                                Available Challenges
                                            </Typography>
                                        </Box>
                                        <Box sx={{ 
                                            backgroundColor: 'rgba(255,255,255,0.2)', 
                                            borderRadius: '50%', 
                                            p: 1.5,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <EmojiEventsIcon sx={{ fontSize: 28, color: 'white' }} />
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' } }}>
                            <Card sx={{ 
                                backgroundColor: '#10b981',
                                borderRadius: 3,
                                height: '140px',
                                width: '100%',
                                transition: 'all 0.3s ease-in-out',
                                cursor: 'pointer',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                border: 'none',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: '0 8px 30px rgba(0,0,0,0.15)'
                                }
                            }}>
                                <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <Box>
                                            <Typography variant="h3" sx={{ color: 'white', fontWeight: 'bold', mb: 0.5 }}>
                                                {stats.joinedCount}
                                            </Typography>
                                            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.9rem' }}>
                                                Joined Challenges
                                            </Typography>
                                        </Box>
                                        <Box sx={{ 
                                            backgroundColor: 'rgba(255,255,255,0.2)', 
                                            borderRadius: '50%', 
                                            p: 1.5,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <AssignmentTurnedInIcon sx={{ fontSize: 28, color: 'white' }} />
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' } }}>
                            <Card sx={{ 
                                backgroundColor: '#3b82f6',
                                borderRadius: 3,
                                height: '140px',
                                width: '100%',
                                transition: 'all 0.3s ease-in-out',
                                cursor: 'pointer',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                border: 'none',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: '0 8px 30px rgba(0,0,0,0.15)'
                                }
                            }}>
                                <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <Box>
                                            <Typography variant="h3" sx={{ color: 'white', fontWeight: 'bold', mb: 0.5 }}>
                                                {stats.completedCount}
                                            </Typography>
                                            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.9rem' }}>
                                                Completed Challenges
                                            </Typography>
                                        </Box>
                                        <Box sx={{ 
                                            backgroundColor: 'rgba(255,255,255,0.2)', 
                                            borderRadius: '50%', 
                                            p: 1.5,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <CheckCircleIcon sx={{ fontSize: 28, color: 'white' }} />
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' } }}>
                            <Card sx={{ 
                                backgroundColor: '#f59e0b',
                                borderRadius: 3,
                                height: '140px',
                                width: '100%',
                                transition: 'all 0.3s ease-in-out',
                                cursor: 'pointer',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                border: 'none',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: '0 8px 30px rgba(0,0,0,0.15)'
                                }
                            }}>
                                <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <Box>
                                            <Typography variant="h3" sx={{ color: 'white', fontWeight: 'bold', mb: 0.5 }}>
                                                {stats.pendingCount}
                                            </Typography>
                                            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.9rem' }}>
                                                Pending Challenges
                                            </Typography>
                                        </Box>
                                        <Box sx={{ 
                                            backgroundColor: 'rgba(255,255,255,0.2)', 
                                            borderRadius: '50%', 
                                            p: 1.5,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <PendingActionsIcon sx={{ fontSize: 28, color: 'white' }} />
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    </>
                )}
                {user?.role === 'coordinator' && stats && (
                    <>
                        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' } }}>
                            <Card sx={{ 
                                backgroundColor: '#6366f1',
                                borderRadius: 3,
                                height: '140px',
                                width: '100%',
                                transition: 'all 0.3s ease-in-out',
                                cursor: 'pointer',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                border: 'none',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: '0 8px 30px rgba(0,0,0,0.15)'
                                }
                            }}>
                                <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <Box>
                                            <Typography variant="h3" sx={{ color: 'white', fontWeight: 'bold', mb: 0.5 }}>
                                                {stats.myChallengesCount}
                                            </Typography>
                                            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.9rem' }}>
                                                My Challenges
                                            </Typography>
                                        </Box>
                                        <Box sx={{ 
                                            backgroundColor: 'rgba(255,255,255,0.2)', 
                                            borderRadius: '50%', 
                                            p: 1.5,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <EmojiEventsIcon sx={{ fontSize: 28, color: 'white' }} />
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' } }}>
                            <Card sx={{ 
                                backgroundColor: '#10b981',
                                borderRadius: 3,
                                height: '140px',
                                width: '100%',
                                transition: 'all 0.3s ease-in-out',
                                cursor: 'pointer',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                border: 'none',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: '0 8px 30px rgba(0,0,0,0.15)'
                                }
                            }}>
                                <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <Box>
                                            <Typography variant="h3" sx={{ color: 'white', fontWeight: 'bold', mb: 0.5 }}>
                                                {stats.activeParticipants}
                                            </Typography>
                                            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.9rem' }}>
                                                Active Participants
                                            </Typography>
                                        </Box>
                                        <Box sx={{ 
                                            backgroundColor: 'rgba(255,255,255,0.2)', 
                                            borderRadius: '50%', 
                                            p: 1.5,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <GroupIcon sx={{ fontSize: 28, color: 'white' }} />
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' } }}>
                            <Card sx={{ 
                                backgroundColor: '#3b82f6',
                                borderRadius: 3,
                                height: '140px',
                                width: '100%',
                                transition: 'all 0.3s ease-in-out',
                                cursor: 'pointer',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                border: 'none',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: '0 8px 30px rgba(0,0,0,0.15)'
                                }
                            }}>
                                <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <Box>
                                            <Typography variant="h3" sx={{ color: 'white', fontWeight: 'bold', mb: 0.5 }}>
                                                {stats.completedChallenges}
                                            </Typography>
                                            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.9rem' }}>
                                                Completed by Participants
                                            </Typography>
                                        </Box>
                                        <Box sx={{ 
                                            backgroundColor: 'rgba(255,255,255,0.2)', 
                                            borderRadius: '50%', 
                                            p: 1.5,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <CheckCircleIcon sx={{ fontSize: 28, color: 'white' }} />
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' } }}>
                            <Card sx={{ 
                                backgroundColor: '#f59e0b',
                                borderRadius: 3,
                                height: '140px',
                                width: '100%',
                                transition: 'all 0.3s ease-in-out',
                                cursor: 'pointer',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                border: 'none',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: '0 8px 30px rgba(0,0,0,0.15)'
                                }
                            }}>
                                <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <Box>
                                            <Typography variant="h3" sx={{ color: 'white', fontWeight: 'bold', mb: 0.5 }}>
                                                {stats.pendingChallenges}
                                            </Typography>
                                            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.9rem' }}>
                                                Pending by Participants
                                            </Typography>
                                        </Box>
                                        <Box sx={{ 
                                            backgroundColor: 'rgba(255,255,255,0.2)', 
                                            borderRadius: '50%', 
                                            p: 1.5,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <PendingActionsIcon sx={{ fontSize: 28, color: 'white' }} />
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    </>
                )}
            </Box>
        </Box>
    );
};

export default Dashboard;
