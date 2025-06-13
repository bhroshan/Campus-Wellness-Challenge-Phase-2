import React from "react";
import { Box, Button, Typography, Grid, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Home = () => {
	const { isAuthenticated } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	return (
		<Box
			sx={{
				minHeight: "100vh",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: "#E1F5FE", // Optional background color
				textAlign: "center",
				padding: 2,
			}}
		>
			<Typography variant="h3" fontWeight="bold" gutterBottom>
				Campus Wellness Challenge Platform
			</Typography>

			<Divider my={2} minheight={5} />

			<Grid container spacing={2} justifyContent="center">
				{isAuthenticated ? (
					<>
						<Grid item>
							<Button
								variant="outlined"
								component={Link}
								to="/dashboard"
								color="primary"
								size="large"
							>
								Dashboard
							</Button>
						</Grid>
						<Grid item>
							<Button
								variant="outlined"
								onClick={() => dispatch(logout())}
								color="primary"
								size="large"
							>
								Logout
							</Button>
						</Grid>
					</>
				) : (
					<>
						<Grid item>
							<Button
								variant="outlined"
								component={Link}
								to="/login"
								color="primary"
								size="large"
							>
								LOGIN
							</Button>
						</Grid>
						<Grid item>
							<Button
								variant="outlined"
								component={Link}
								to="/register"
								color="primary"
								size="large"
							>
								Register
							</Button>
						</Grid>
					</>
				)}
			</Grid>
		</Box>
	);
};

export default Home;
