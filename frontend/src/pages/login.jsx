import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../features/auth/authSlice';
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
import LoginIcon from '@mui/icons-material/Login';
import bannerImage from './images/banner.jpg';
import Loading from '../components/Loading';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isSuccess && user) {
            navigate('/dashboard');
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch, location]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const userData = {
            email,
            password,
        };

        dispatch(login(userData));
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Box
            width={1}
            height={1}
            sx={{
                height: '95vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5',
            }}
        >
            <Paper elevation={8} sx={{ width: 1150, height: 500, display: 'flex', borderRadius: 4, border: '3px solid gray' }}>
                {/* Left Side - Avatar Banner */}
                <Grid
                    width={2 / 4}
                    item
                    xs={6}
                    sx={{
                        backgroundColor: 'primary.light',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderTopLeftRadius: 16,
                        borderBottomLeftRadius: 16,
                    }}
                >
                    <img
                        src={bannerImage}
                        alt="Login banner"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderTopLeftRadius: 12, borderBottomLeftRadius: 12 }}
                    />
                </Grid>

                {/* Right Side - Login Form */}
                <Grid
                    width={2 / 4}
                    item
                    xs={7}
                    sx={{
                        p: 4,
                        m: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        border: '1px solid gray',
                        borderRadius: '5px',
                    }}
                >
                    {/* Title */}
                    <Box borderBottom={1} borderColor='grey.700' sx={{ mb: 5 }}>
                        <Typography
                            variant="h4"
                            sx={{
                                mb: 1,
                                fontSize: 27,
                                fontWeight: 450,
                                textAlign: 'center',
                                color: 'primary.gray',
                                fontFamily: 'Roboto, sans-serif',
                                cursor: 'pointer'
                            }}
                            onClick={() => navigate('/')}
                        >
                            Campus Wellness Challenge Platform
                        </Typography>
                    </Box>

                    {/* Login Title */}
                    <Divider sx={{ marginBottom: 2 }}>
                        <Typography
                            variant="h1"
                            sx={{
                                fontWeight: 300,
                                fontSize: { xs: 18, sm: 21 },
                                color: '',
                                letterSpacing: 1,
                                fontFamily: 'Roboto, sans-serif',
                            }}
                        >
                            Log In
                        </Typography>
                    </Divider>

                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField
                            label="Email"
                            name="email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
                            type="email"
                            value={email}
                            onChange={onChange}
                        />
                        <TextField
                            label="Password"
                            name="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
                            type="password"
                            value={password}
                            onChange={onChange}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            startIcon={<LoginIcon />}
                            sx={{
                                width: '420px',
                                mx: 'auto',
                                display: 'flex',
                                alignItems: 'center',
                                mt: 3,
                                backgroundColor: "#424242",
                                '&:hover': {
                                    backgroundColor: "black",
                                }
                            }}
                        >
                            Login
                        </Button>

                        {/* Register link */}
                        <Typography
                            variant="body2"
                            sx={{ mt: 2, textAlign: 'center' }}
                        >
                            Don't have an account?{' '}
                            <Link href="/register" variant="body2" color="primary">
                                Sign Up
                            </Link>
                        </Typography>
                    </Box>
                </Grid>
            </Paper>
        </Box>
    );
};

export default Login;
