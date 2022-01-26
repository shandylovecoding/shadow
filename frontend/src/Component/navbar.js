import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
// Require Action
import { getdataThunk } from '../Redux/actions/action'
import { logoutNowThunk } from '../Redux/actions/loginboxAction'
// Require Component
import { Menu } from '../Component/menu'
// Require Css
import classes from './navbar.module.css'
import { SearchPopUp } from './searchmodal';
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import dummyAvatar from './dummy-avatar.jpeg'


class PureNavBar extends React.Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
      };
    constructor(props) {
        super(props);
        this.state = {
            menuModal: false,
            searchModal: false,
            type: ""
        };
    }

    menuToggle() {
        this.setState({
            menuModal: !this.state.menuModal
        })
    }

    searchToggle() {
        this.setState({
            searchModal: !this.state.searchModal
        })
    }
    navigate(e){
        this.props.history.push(`/viewclassroom/${e.target.attributes["data-key"].value}`)
    }
    logout = (e) => {
        e.preventDefault();
        this.props.logout()
    }
    
    render() {
        console.log(this.props.user)
        return (
            <div className={classes.header}>
                    <ul className={classes.menu}>
                        <li>
                            <button onClick={() => { this.menuToggle() }}><i className="fas fa-bars"></i></button>
                            {this.state.menuModal ? <Menu classroom={this.props.classrooms} sets={this.props.sets} navigateMenu={(e)=>{this.navigate(e)}} toggle={()=>this.menuToggle()}/> : null}
                        </li>
                        <li>
                            {this.props.user.role === "teacher" ? <Link to='/' className={classes.logo}>shadow</Link> : <Link to='/' className={classes.logo} >shadow <span style={{fontWeight: "normal"}}>student</span></Link>}
                        </li>
                        <li className={classes.right}>
                            <button onClick={() => { this.searchToggle() }}><i className="fas fa-search"></i></button>
                            <SearchPopUp tags={this.props.tags} search={this.state} toggle={() => this.searchToggle()}/>
                        </li>
                        <li className={classes.right}> 
                            {this.props.user.picture === null ? <button  className={classes.icon}><Link to="/account"><img src={dummyAvatar} alt="Avatar"></img></Link></button> 
                            : <button  className={classes.icon}><Link to="/account"><img src={this.props.user.picture} alt="Avatar"></img></Link></button>}
                        </li>
                    </ul>
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
const mapDispatchToProps = dispatch => {
    return {
                    getdata: (email) => {
                    dispatch(getdataThunk(email))
                },
        logout: () => {
                    dispatch(logoutNowThunk())
                }
    }
}


const PureNavBarNav = withRouter(PureNavBar);

export const NavBar = connect(mapStateToProps, mapDispatchToProps)(PureNavBarNav)