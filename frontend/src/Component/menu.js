import React from 'react'
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from "react-router-dom";
// Require Action
import { getdataThunk } from '../Redux/actions/action'
// Require Css
import classes from './menu.module.css'


class PureMenu extends React.Component {
    
    render() {
        return (
            <div className={classes.dropdown}>
                <ListGroup className={classes.dropdowncontent}>
                    <ListGroupItem action ><div className={classes.classroommenu}><i className="fas fa-archive"></i> Classroom</div></ListGroupItem>
                    {this.props.classrooms.map((classroom, i) => {
                        return (
                    <ListGroupItem key={i} data-key={classroom.id} tag="a" action onClick={()=>this.props.toggle()} ><Link to={'/viewclassroom/'+classroom.id} ><div data-key={classroom.id} className={classes.classroomlink}>{classroom.title}</div></Link></ListGroupItem>
                        )
                    })}
                    <ListGroupItem tag="a" href="#" action><div className={classes.setmenu}><i className="fas fa-layer-group" ></i> Set</div></ListGroupItem>
                    {this.props.sets.map((set, i) => {
                        return (
                    <ListGroupItem key={i} data-key={set.id} tag="a" action onClick={()=>this.props.toggle()} ><Link to={'/viewset/'+set.id} ><div className={classes.setlink}>{set.title}</div></Link></ListGroupItem>
                        )
                    })}
                </ListGroup>
            </div>
        )
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
        }
    }
}



export const Menu = connect(mapStateToProps, mapDispatchToProps)(PureMenu)