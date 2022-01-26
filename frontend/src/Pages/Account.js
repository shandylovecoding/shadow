import React from 'react';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';

import {logoutNowThunk} from '../Redux/actions/loginboxAction'
import { getdataThunk } from '../Redux/actions/action'

import { IconUpdateModal } from '../Component/iconupdatemodal';
import { PasswordEditModal } from '../Component/passwordeditmodal';
import { DisplayNameEditModal } from '../Component/displaynameeditmodal';
import { EmailEditModal } from '../Component/emaileditmodal';

import classes from './Account.module.css'
import dummyAvatar from '../Component/dummy-avatar.jpeg'

class Account extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            modal: false,
            type: "",
            iconModal: false,
            displayNameModal: false,
            emailModal: false,
            passwordModal: false,
            selectedFile: null,
        };
    }

    componentDidMount() {
        this.props.getdata({ email: localStorage.getItem('email') })
    }

    logout = (e) => {
        e.preventDefault();
        this.props.logout()
    }

    icontoggle() {
        this.setState({
            iconModal: !this.state.iconModal,
        });
    }


    passwordtoggle() {
        this.setState({
            passwordModal: !this.state.passwordModal,
        });
    }

    emailtoggle() {
        this.setState({
            emailModal: !this.state.emailModal,
        });
    }

    displayNametoggle() {
        this.setState({
            displayNameModal: !this.state.displayNameModal,
        });
    }

    render() {  

        return (
            <div className="page">
            {/* Navbar */}
                {/* <NavBar history={this.props.history}/> */}
            <div className={classes.account}>

                <div className="row p-4">
                <h1>Account</h1>
               </div>

                <div className="row p-4">
                    <div className="col-4 d-flex justify-content-center">
                        <div onClick={() => this.icontoggle()} className={classes.icon}> 
                        <IconUpdateModal upload={this.state} user={this.props.user} toggle={() => this.icontoggle()}/>
                    {this.props.user.picture === null ? <img src={dummyAvatar} alt="Avatar"></img> : <img src={this.props.user.picture} alt="Avatar"></img>}
                    </div>
                    </div>

                    <div className="col-8">
                        <table>
                            <tbody>
                            <tr>
                                <th>Role</th>
                                <td>{this.props.user.role}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <th>Username</th>
                                <td>{this.props.user.displayName}</td>
                                <td><button onClick={() => this.displayNametoggle()}>Change username</button></td>
                                <DisplayNameEditModal update={this.state} user={this.props.user} toggle={()=> this.displayNametoggle()}/>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>{this.props.user.email}</td>
                                <td><button onClick={() => this.emailtoggle()}>Change email</button></td>
                                <EmailEditModal update={this.state} user={this.props.user} toggle={()=> this.emailtoggle()}/>
                            </tr>
                            <tr>
                                <th>Tier</th>
                                <td>{this.props.user.tier}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <th>Password</th>
                                <td>*******</td>
                                <td><button onClick={() => this.passwordtoggle()}>Change password</button></td>
                                <PasswordEditModal update={this.state} user={this.props.user} toggle={()=> this.passwordtoggle()}/>
                            </tr>
                            <tr onClick={this.logout}> 
                            <th> <Link to="/login">Logout</Link></th>
                            <td></td>
                            <td></td>
                            </tr>
                            </tbody>
                        </table>    
                    </div>
                </div>

            </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userStore.user,
        classrooms: state.classroomStore.classrooms,
        sets: state.setStore.sets,
        cards: state.cardStore.card,
        tags: state.tagStore.tags,
    }
}

const mapDispatchToProps  = dispatch => {
    return {
        getdata: (email) => {
            dispatch(getdataThunk(email))
        },
        logout: () => {
            dispatch(logoutNowThunk())
        }
    }
}

const connectedAccount= connect(mapStateToProps, mapDispatchToProps)(Account)
export { connectedAccount as Account };