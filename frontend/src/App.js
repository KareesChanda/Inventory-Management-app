import React, { useEffect } from 'react';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import {Link, Redirect, Route, Switch} from 'react-router-dom';
import { getProfileFetch, logoutUser } from "./redux/actions";
import { connect } from 'react-redux';
import Dashboard from './pages/Dashboard'
import { withRouter } from 'react-router';
import ProtectedRoute from './ProtectedRoute';
import UnprotectedRoute from './UnprotectedRoute';
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    register: {
        textDecoration: 'none',
        color: 'white'
    }
}));

function App({getProfileFetch, logoutUser, currentUser}) {
    const classes = useStyles();
    useEffect(()=> {
        getProfileFetch()
    }, [getProfileFetch]);

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        logoutUser();
    };

  return (
      <div className="App">
          <AppBar position="static">
              <Toolbar>
                  <Typography variant="h6" className={classes.title}>
                      Inventory Management System
                  </Typography>
                  {!currentUser.email
                      ? <Link to="/register" className={classes.register}>
                          <Button color="inherit">Register</Button>
                      </Link>
                      : <Button onClick={handleLogout} color="inherit">Logout</Button>
                  }
              </Toolbar>
          </AppBar>
          <Switch>
              <UnprotectedRoute path="/register" component={Register}/>
              <UnprotectedRoute path="/login" component={Login}/>
              <ProtectedRoute path="/" component={Dashboard}/>
          </Switch>
      </div>
  );
}

const mapDispatchToProps = dispatch => ({
    getProfileFetch: () => dispatch(getProfileFetch()),
    logoutUser: () => dispatch(logoutUser())
});

const mapStateToProps = state => ({
    currentUser: state.currentUser
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
