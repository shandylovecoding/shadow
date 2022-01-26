import React from 'react';
import { connect } from 'react-redux'

import { LoginBox } from '../Component/loginbox'
import { SignUp } from '../Component/signupbox';

import classes from './Login.module.css'


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: Boolean(),
        };
        this.handleshow = this.handleshow.bind(this);
    }

    componentDidUpdate() {
        if (this.props.isAuthenticatedMSP === true) {
            this.props.history.push('/')
        }
    }
    
    handleshow() {
        this.setState((prevState) => {
            return {
                show: !prevState.show
            }
        });
    }


    render() {
        const { show } = this.state;
        return (
            <>
            <div className={classes.login}>
            <div className="row d-flex align-items-center">
                <div className="col p-5 d-flex align-items-center">
                        <div className="p-5 mx-5">
                            <div>
                                <p className={classes.landingLogo}>shadow.</p>
                                <p className={classes.landingdescription}>Simplifying the process of teaching students how to speak, listen and write second languages online.</p>
                            </div>
                        </div>
                    </div>
                <div className="col p-2 d-flex align-items-center justify-content-center">
                {!show ? <LoginBox nav={()=>this.navLogin()} handleshow={()=>this.handleshow()}/> : null}
                {show ? <SignUp handleshow={()=>this.handleshow()}/> : null}
                </div>
            </div>
            </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticatedMSP: state.authStore.isAuthenticated
    }
}



const connectedLogin = connect(mapStateToProps, null)(Login)
export { connectedLogin as Login };