import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

    const host = "http://localhost:5000";

    const [creds, setcreds] = useState({ email: "", password: "" });

    const handleChangeCreds = (event) => {
        setcreds({ ...creds, [event.target.name]: event.target.value })
    };

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await fetch(host + "/auth/loginuser", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(creds)
        })
        const loginStatusDetails = await res.json();
        if (!loginStatusDetails.loginStatus)
            alert(loginStatusDetails.error);
        else {
            localStorage.setItem('token', loginStatusDetails.token);
            navigate('/');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Grid container justifyContent={'center'}>
                <Typography
                    variant="h3"
                    noWrap
                    component="a"
                    textAlign={'center'}
                    href="/login"
                    mt={2}
                    sx={{
                        display: { xs: 'flex', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    NoteIt!
                </Typography>
            </Grid>
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        onChange={handleChangeCreds}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        onChange={handleChangeCreds}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container justifyContent={'center'}>
                        <Link to="/signup" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default Login