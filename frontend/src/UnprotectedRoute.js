import React from 'react';
import {connect} from "react-redux";
import {Redirect, Route} from 'react-router-dom';
import { withRouter } from 'react-router';

const UnprotectedRoute = ({ component: Component, isLoggedIn, ...props }) => {
    console.log(isLoggedIn);
    return (
        <Route
            {...props}
            render={props => (
                !isLoggedIn ?
                    <Component {...props} /> :
                    <Redirect to='/' />
            )}
        />
    );
}

const mapStateToProps = state => {
    console.log(state);
    return {
        isLoggedIn: !!state.currentUser.email,
    }
};

export default withRouter(connect(mapStateToProps)(UnprotectedRoute));