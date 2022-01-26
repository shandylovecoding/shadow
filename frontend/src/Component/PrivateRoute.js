import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux'

const PurePrivateRoute = ({ component, isAuthenticated, ...rest }) => {
    const Component = component;

    if (Component != null) {
        return (
            <Route {...rest} render={(props) => (
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }} />
                )
            )} />
        )
    } else {
        return null;
    }
};

const PrivateRoute = connect((state) => ({
    isAuthenticated: state.authStore.isAuthenticated
}))(PurePrivateRoute);

export default PrivateRoute