import React from 'react'
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Grid,
    Link,
    Typography,
    TextField,
    Button,
    Paper,
    Divider,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GroupIcon from '@mui/icons-material/Group';
import { API_URL } from '../configs';

// Define routes for different user roles
const sidebarRoutes = {
    coordinator: [
        {
            path: '/dashboard',
            name: 'Dashboard',
            icon: <DashboardIcon />
        },
        {
            path: '/create-challenge',
            name: 'Create Wellness Challenge',
            icon: <AddCircleIcon />
        },
        {
            path: '/view-challenge-list',
            name: 'View Challenge List',
            icon: <FormatListBulletedIcon />
        }
    ],
    student: [
        {
            path: '/dashboard',
            name: 'Dashboard',
            icon: <DashboardIcon />
        },
        {
            path: '/view-challenge-list',
            name: 'View Challenge List',
            icon: <FormatListBulletedIcon />
        },
        {
            path: '/joined-challenge',
            name: 'Joined Challenges',
            icon: <GroupIcon />
        }
    ]
};

function Sidebar() {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    
    // Get routes based on user role
    const routes = sidebarRoutes[user.role === 'coordinator' ? 'coordinator' : 'student'];
    
    return (
        <>
            <Grid container sx={{ 
                backgroundColor: '#E1F5FE', 
                width: '100%', 
                height: '100%',
                overflow: 'hidden'
            }} flexDirection={'column'}>
                <Grid
                    item
                    sx={{
                        backgroundColor: '#E0E0E0',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        py: 2,
                        flexShrink: 0
                    }}
                >
                    <Avatar
                        alt={`${user.first_name} ${user.last_name}`}
                        src={user.profile_image ? `${API_URL}${user.profile_image}` : null}
                        sx={{ width: 100, height: 100, mb: 2 }}
                    >
                        {!user.profile_image && <PersonIcon sx={{ fontSize: 60 }} />}
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 500 }} px={2}>
                        {`${user.first_name} ${user.last_name}`}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: 'gray' }} px={2}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Typography>
                </Grid>

                <Divider sx={{ mt: 0.5, color: 'black', flexShrink: 0 }} />

                <Grid
                    item
                    sx={{
                        backgroundColor: '#E1F5FE',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        px: 2,
                        gap: 2,
                        pt: 2,
                        flex: 1,
                        overflow: 'auto'
                    }}
                >
                    {routes.map((route, index) => (
                        <Button
                            key={index}
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={() => navigate(route.path)}
                            startIcon={route.icon}
                        >
                            {route.name}
                        </Button>
                    ))}
                </Grid>
            </Grid>
        </>
    )
}

export default Sidebar