import React from 'react';
import { Box, Grid } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
            <Navbar />
            <Box sx={{ display: 'flex', flex: 1, height: 'calc(100vh - 64px)' }}>
                {/* Sidebar */}
                <Box sx={{
                    display: { xs: 'none', sm: 'block' },
                    flexShrink: 0,
                    position: 'sticky',
                    top: 0,
                    height: '100%',
                    overflow: 'hidden'
                }}>
                    <Sidebar />
                </Box>
                
                {/* Main Content */}
                <Box sx={{ 
                    flex: 1,
                    backgroundColor: '#EEEEEE',
                    height: '100%',
                    overflow: 'auto',
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