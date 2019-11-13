import React from 'react';
import {connect} from "react-redux";
import {Redirect, Route} from 'react-router-dom';
import { withRouter } from 'react-router';

const ProtectedRoute = ({ component: Component, isLoggedIn, ...props }) => {
    return (
        <Route
            {...props}
            render={props => (
                isLoggedIn ?
                    <Component {...props} /> :
                    <Redirect to='/login' />
            )}
        />
    );
}

const mapStateToProps = state => {
    return {
        isLoggedIn: !!state.currentUser.email,
    }
};

export default withRouter(connect(mapStateToProps)(ProtectedRoute));