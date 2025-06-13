import React from 'react';
import { Box, Grid } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <Box sx={{ display: 'flex', flex: 1 }}>
                {/* Sidebar */}
                <Box sm={3} sx={{
                    display: { xs: 'none', sm: 'block' },
                    flexShrink: 0
                }}>
                    <Sidebar />
                </Box>
                
                {/* Main Content */}
                <Box sx={{ 
                    flex: 1,
                    backgroundColor: '#EEEEEE',
                    minHeight: '100vh',
                    p: 3,
                    width: '100%'
                }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};

export default DashboardLayout; 