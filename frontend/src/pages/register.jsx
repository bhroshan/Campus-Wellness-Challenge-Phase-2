import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Link,
    Paper,
    Divider,
    Radio,
    RadioGroup,
    TextField,
    Typography,
    IconButton
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Loading from '../components/Loading';

const Register = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        gender: '',
        role: '',
        password: '',
        confirmPassword: '',
        profile_image: null
    });

    const { first_name, last_name, email, gender, role, password, confirmPassword, profile_image } = formData
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    const navigate = useNavigate()
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isSuccess && user) {
            navigate('/dashboard');
        }
    }, [user, isError, isSuccess, message, navigate, dispatch, location])

    const onChange = (e) => {
        if (e.target.name === 'profile_image') {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.files[0]
            }))
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value
            }))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match')
        } else {
            // If there's a profile image, use FormData
            if (profile_image) {
                const formDataToSend = new FormData();
                formDataToSend.append('first_name', first_name);
                formDataToSend.append('last_name', last_name);
                formDataToSend.append('email', email);
                formDataToSend.append('gender', gender);
                formDataToSend.append('role', role);
                formDataToSend.append('password', password);
                formDataToSend.append('profile_image', profile_image);
                dispatch(register(formDataToSend));
            } else {
                // If no profile image, send regular JSON data
                const userData = {
                    first_name,
                    last_name,
                    email,
                    gender,
                    role,
                    password
                };
                dispatch(register(userData));
            }
        }
    };

    return (
        <Paper
            elevation={8}
            sx={{
                width: '100%',
                maxWidth: 800,
                height: 'auto',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 4,
                border: '3px solid gray',
                mx: 'auto',
                mt: 2,
                p: 4,
            }}
        >
            <Box sx={{ flex: 1 }}>
                <Box borderBottom={1} borderColor="grey.700" sx={{ mb: 3 }}>
                    <Typography
                        variant="h4"
                        sx={{
                            mb: 1,
                            fontSize: 27,
                            fontWeight: 450,
                            textAlign: 'center',
                            color: 'text.primary',
                            fontFamily: 'Roboto, sans-serif',
                            cursor: 'pointer',
                        }}
                        onClick={() => navigate('/')}
                    >
                        Campus Wellness Challenge Platform
                    </Typography>
                </Box>

                <Box sx={{ border: 1, borderColor: 'grey.700' }}>
                    <form onSubmit={handleSubmit} style={{ padding: '20px', margin: '10px' }}>
                        <Divider>
                            <Typography
                                variant="h1"
                                sx={{
                                    fontWeight: 300,
                                    fontSize: { xs: 18, sm: 24 },
                                    color: '',
                                    letterSpacing: 1,
                                    fontFamily: 'Roboto, sans-serif',
                                }}
                            >
                                Sign Up
                            </Typography>
                        </Divider>

                        <Grid container columnSpacing={17}>
                            {/* Profile Image Upload */}
                            <Grid item size={12}>
                                <Box pt={3} pb={0} sx={{ width: '100%', textAlign: 'center' }}>
                                    <input
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        id="profile-image-upload"
                                        type="file"
                                        name="profile_image"
                                        onChange={onChange}
                                    />
                                    <Box
                                        sx={{
                                            width: 150,
                                            height: 150,
                                            border: '2px dashed #ccc',
                                            borderRadius: '4px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            margin: '0 auto',
                                            cursor: 'pointer',
                                            '&:hover': {
                                                borderColor: 'primary.main',
                                            },
                                            position: 'relative',
                                            overflow: 'hidden'
                                        }}
                                        component="label"
                                        htmlFor="profile-image-upload"
                                    >
                                        {profile_image ? (
                                            <Box
                                                component="img"
                                                src={URL.createObjectURL(profile_image)}
                                                sx={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                        ) : (
                                            <>
                                                <PhotoCamera sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
                                                <Typography variant="body2" color="textSecondary">
                                                    Click to upload profile picture
                                                </Typography>
                                            </>
                                        )}
                                    </Box>
                                    {profile_image && (
                                        <Box sx={{ mt: 1 }}>
                                            <Typography variant="body2" color="textSecondary">
                                                {profile_image.name}
                                            </Typography>
                                            <Button
                                                size="small"
                                                color="error"
                                                onClick={() => setFormData(prev => ({ ...prev, profile_image: null }))}
                                                sx={{ mt: 1 }}
                                            >
                                                Remove
                                            </Button>
                                        </Box>
                                    )}
                                </Box>
                            </Grid>

                            {/* first_name field */}
                            <Grid item xs={12} sm={6}>
                                <Box p={4} pt={3} pb={0} sx={{ width: '100%' }}><TextField
                                    label="First Name"
                                    name='first_name'
                                    id='first_name'
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    required
                                    type="text"
                                    value={first_name}
                                    onChange={onChange}
                                /></Box>
                            </Grid>

                            {/* last_name field */}
                            <Grid item xs={12} sm={6}>
                                <Box p={4} pt={3} pb={0} sx={{ width: '100%' }}><TextField
                                    label="Last Name"
                                    name='last_name'
                                    id='last_name'
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    required
                                    type="text"
                                    value={last_name}
                                    onChange={onChange}
                                /></Box>
                            </Grid>

                            {/* Email field */}
                            <Grid item xs={12} sm={6}>
                                <Box p={4} pt={0} pb={0} sx={{ width: '100%' }}><TextField
                                    label="Email"
                                    id='email'
                                    name='email'
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    required
                                    type="email"
                                    value={email}
                                    onChange={onChange}
                                /></Box>
                            </Grid>

                            {/* Gender Radio Buttons */}
                            <Grid item xs={12} sm={6}>
                                <Box p={4} pt={1.5} pb={0} sx={{ width: '100%' }}><FormControl component="fieldset" required>
                                    <FormLabel component="legend">Gender</FormLabel>
                                    <RadioGroup
                                        row
                                        name="gender"
                                        id='gender'
                                        value={gender}
                                        onChange={onChange}
                                    >
                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                                        <FormControlLabel value="others" control={<Radio />} label="Others"/>
                                    </RadioGroup>
                                </FormControl></Box>
                            </Grid>

                            {/* password field */}
                            <Grid item xs={12} sm={6}>
                                <Box p={4} pt={0} pb={0} sx={{ width: '100%' }}><TextField
                                    label="Password"
                                    id='password'
                                    name='password'
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    required
                                    type="password"
                                    value={password}
                                    onChange={onChange}
                                /></Box>
                            </Grid>

                            {/* confirm_password field */}
                            <Grid item xs={12} sm={6}>
                                <Box p={4} pt={0} pb={0} sx={{ width: '100%' }}><TextField
                                    label="Confirm Password"
                                    id='confirmPassword'
                                    name='confirmPassword'
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    required
                                    type="password"
                                    value={confirmPassword}
                                    onChange={onChange}
                                /></Box>
                            </Grid>

                            {/* Role Radio Buttons */}
                            <Grid item xs={12} sm={6}>
                                <Box p={4} pt={1.5} pb={0} sx={{ width: '100%' }}><FormControl component="fieldset" required>
                                    <FormLabel component="legend">Role</FormLabel>
                                    <RadioGroup
                                        row
                                        name="role"
                                        id='role'
                                        value={role}
                                        onChange={onChange}
                                    >
                                        <FormControlLabel value="coordinator" control={<Radio />} label="Coordinator" />
                                        <FormControlLabel value="student" control={<Radio />} label="Student" />
                                    </RadioGroup>
                                </FormControl></Box>
                            </Grid>
                        </Grid>
                        {/* Sign Up Button */}
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                id='submit'
                                variant="contained"
                                fullWidth
                                startIcon={<PersonAddIcon />}
                                sx={{
                                    mt: 3,
                                    width: '630px',
                                    mx: 'auto',
                                    display: 'flex',
                                    alignItems: 'center',
                                    backgroundColor: "#424242",
                                    '&:hover': {
                                        backgroundColor: "black",
                                    }
                                }}
                            >
                                Register
                            </Button>
                        </Grid>
                        {/* Already have an account? */}
                        <Grid item xs={12} sx={{ mt: 2, textAlign: 'center' }}>
                            <Typography variant="body2" color="textSecondary">
                                Already have an account?{' '}
                                <Link href="/login" variant="body2" color="primary">
                                    Log In
                                </Link>
                            </Typography>
                        </Grid>
                    </form>
                </Box>
            </Box>
        </Paper>
    );
};

export default Register;
