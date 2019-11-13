import React from 'react';
import Box from '@material-ui/core/Box';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/styles';
import { green } from '@material-ui/core/colors';
import {connect} from "react-redux";
import {userLoginFetch} from "../redux/actions";

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        padding: theme.spacing(3),
        margin: theme.spacing(2)
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 400
    },
    buttonClass: {
        color: 'white'
    }
}));

const theme = createMuiTheme({
    palette: {
        primary: green,
    },
});

const Login = ({ userLoginFetch }) => {
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();
    const classes = useStyles();
    const onSubmit = (e) => {
        e.preventDefault();
        userLoginFetch({ email: email, password: password })
    }

    const handleSetEmail = (event) => {
        setEmail(event.target.value);
    };
    const handleSetPassword = (event) => {
        setPassword(event.target.value);
    };

    return (
        <Box>
            <Container maxWidth='sm'>
                <Paper className={classes.container}>
                    <h1>Login</h1>
                    <form noValidate autoComplete="off" onSubmit={onSubmit}>
                        <TextField
                            id="outlined-email-input"
                            label="Email"
                            className={classes.textField}
                            type="email"
                            name="email"
                            autoComplete="off"
                            onChange={handleSetEmail}
                            value={email}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-password-input"
                            label="Password"
                            onChange={handleSetPassword}
                            className={classes.textField}
                            type="password"
                            autoComplete="off"
                            value={password}
                            margin="normal"
                            variant="outlined"
                        />
                        <ThemeProvider theme={theme}>
                            <Button variant="contained" color="primary" className={classes.buttonClass} type='submit' value="Submit">
                                Login
                            </Button>
                        </ThemeProvider>
                    </form>
                </Paper>
            </Container>
        </Box>
    );
};

const mapDispatchToProps = dispatch => ({
    userLoginFetch: userInfo => dispatch(userLoginFetch(userInfo))
})

export default connect(null, mapDispatchToProps)(Login);