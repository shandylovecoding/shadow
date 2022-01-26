import React from 'react'
import { connect } from 'react-redux'
import { signUpThunk } from '../Redux/actions/loginboxAction'


class PureSignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            displayName: "",
            role: ""
        };
    }
    toggle() {
        this.props.handleshow()
    }

    onChangeField = (field, e) => {
        const state = {};
        state[field] = e.currentTarget.value;

        this.setState(state);
    }

    handleSignUpClick = (e) => {
        e.preventDefault();
        this.props.signupMDP(this.state.email, this.state.password, this.state.displayName, this.state.role)
        this.props.handleshow();
    };

    render() {
        return (
            <div className="offset-1 d-flex align-items-center w-50 h-200">
                <div className="card  bg-light rounded-lg border-0 p-3">
                    <div className="card-body bg-transparent border-0">
                        <form className="text-center" action="/signup" method="post">
                            <input type="text" onChange={this.onChangeField.bind(this, 'displayName')} name="displayName" className="form-control mb-4" placeholder="Username (for display only)" />
                            <input type="text" onChange={this.onChangeField.bind(this, 'email')} name="username" className="form-control mb-4" placeholder="Email" />
                            <input type="password" onChange={this.onChangeField.bind(this, 'password')} name="password" className="form-control mb-4" placeholder="Password" />
                            <select value={this.state.role} onChange={this.onChangeField.bind(this, 'role')} className="form-control mb-4">
                                <option >Please Select Role</option>
                                <option value="teacher">Teacher</option>
                                <option value="student">Student</option>
                            </select>
                            <button type="submit" className="btn btn-outline-dark waves-effect w-100 mb-2" onClick={this.handleSignUpClick}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor"
                                    className="bi bi-person-bounding-box" viewBox="0 0 16 17">
                                    <path
                                        d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z" />
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                </svg>&nbsp;
                                Signup</button>
                        </form>
                        <hr className="pt-2" />
                        <button onClick={() => { this.toggle() }} className="btn btn-outline-dark waves-effect w-100 mb-2">Back to Login</button>
                    </div>
                </div>
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        signupMDP: (email, password, displayName, role) => {
            dispatch(signUpThunk(email, password, displayName, role))
        }
    }
}

export const SignUp = connect(null, mapDispatchToProps)(PureSignUp)
