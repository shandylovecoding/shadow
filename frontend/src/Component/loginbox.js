import React from 'react'
import { connect } from 'react-redux'
import { loginUserThunk , loginFacebookThunk } from '../Redux/actions/loginboxAction'

class PureLoginBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }

   
    onChangeField = (field, e) => {
        const state = {};
        state[field] = e.currentTarget.value;
        this.setState(state);
    }

    toggle(){
        this.props.handleshow()
    }

    async login(e){
        e.preventDefault();
        await this.props.loginMDP(this.state.email, this.state.password)
        // this.props.nav(e)
    };

    componentClicked() {
        return null;
    }

    responseFacebook = (userInfo) => {
        if (userInfo.accessToken) {
            this.props.loginFacebookMDP(userInfo.accessToken);
        }
        return null;
    }
    render() {
        return (

            
            <div className=" offset-1 d-flex align-items-center w-50 h-200">
                    <div className="card  bg-light rounded-lg border-0 p-3 w-100">
                        <div className="card-body bg-transparent border-0 align-middle">
                            {/* <a href="/auth/gmail">
                                <button type="button" className="btn btn-outline-dark waves-effect w-100 mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        className="bi bi-envelope" viewBox="0 0 16 16">
                                        <path
                                            d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383l-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z" />
                                    </svg>&nbsp; Login With Gmail</button>
                            </a>
                            <FacebookLogin
                                cssClass="btnFacebook"
                                appId={process.env.REACT_APP_FACEBOOK_APP_ID || ''}
                                autoLoad={true}
                                fields="name,email,picture"
                                onClick={this.componentClicked}
                                callback={this.responseFacebook}
                                icon={<i className="fa fa-facebook" ></i>}
                                textButton="&nbsp;&nbsp;Login With Facebook"
                            /> */}
                            {/* <hr className="pt-2" /> */}
                            <form className="text-center" >
                                <input onChange={this.onChangeField.bind(this, 'email')} value={this.state.email} type="text" name="username" className="form-control mb-4" placeholder="Email" />
                                <input onChange={this.onChangeField.bind(this, 'password')} value={this.state.password} type="password" name="password" className="form-control" placeholder="Password" />
                                <br />
                                <button onClick={(e)=>this.login(e)} type="submit" className="btn btn-outline-dark waves-effect w-100 mb-2">Login</button>
                            </form>
                            <hr className="pt-2" />
                                <button  onClick={()=>{this.toggle()}} type="button" className="btn btn-outline-dark waves-effect w-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor"
                                        className="bi bi-person-bounding-box" viewBox="0 0 16 17">
                                        <path
                                            d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z" />
                                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                    </svg>&nbsp; Signup </button>
                        </div>
                    </div>
                </div>
            
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticatedMSP: state.authStore.isAuthenticated
    }
}
const mapDispatchToProps = dispatch => {
    return {
        loginMDP: (email, password) => {
            dispatch(loginUserThunk(email, password))
        },
        loginFacebookMDP: (accessToken) => {
            dispatch(loginFacebookThunk(accessToken))
        }
    }
}


export const LoginBox = connect(mapStateToProps, mapDispatchToProps)(PureLoginBox)
