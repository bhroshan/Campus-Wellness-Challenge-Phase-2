import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleLogout = () => {
		dispatch(logout());
	};

	return (
		<AppBar position="static" sx={{ backgroundColor: "#424242" }}>
			<Toolbar>
				<Typography
					variant="h6"
					component="div"
					sx={{ flexGrow: 1, cursor: "pointer" }}
					onClick={() => navigate("/")}
				>
					Campus Wellness Challenge
				</Typography>
				<Button onClick={handleLogout} startIcon={<ExitToAppIcon />} variant="outlined" color="inherit">
					Logout
				</Button>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
