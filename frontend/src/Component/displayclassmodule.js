import React from 'react';
import { connect } from 'react-redux'
// import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';

// import { EditPopUp } from './editmodal';

import { deleteSharingThunk } from '../Redux/actions/sharingAction';
import { deleteClassroom } from '../Redux/actions/classroomAction';
import classes from './displayclassmodule.module.css'

class PureDisplayClassModule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            editModal: false,
            type: "",
            classroomId: "",
            dashSet: "dashSet",
        };
    }

    changeTypeClass() {
        this.setState({
            type: "class"
        })
    }

    editToggle(){
        this.setState({
            editModal: !this.state.editModal
        })
    }

    deleteClassroom(classroomId) {
        if(this.props.user.role === "teacher"){
            // this.props.deleteSharingThunk({
            //     sharedId: this.props.user.id,            //     classroomId: classroomId
            // })
            this.props.deleteClassroom({
                id: classroomId,
            })
        } else if (this.props.user.role === "student"){
            this.props.deleteSharingThunk({
                sharedId: this.props.user.id,
                classroomId: classroomId
            })
        }
    }
    
    render() {
        return (
            <>
                {this.props.classrooms && this.props.classrooms.length > 0 && this.props.classrooms[0] !== 0 ? this.props.classrooms.map((classroom, i) => {
                    return (
                            <div key={i} data-key={classroom.id} className={classes.classroom} onClick={(e) => { this.props.navigate(e, classroom.id) }}>
                                <div className="row">
                                    <div data-key={classroom.id} className="col-11">
                                    <h4 data-key={classroom.id} className={classes.title}>{classroom.title}</h4>
                                    </div>
    
                                    {this.props.user.role === "teacher" ? 
                                    <span data-key="delete" className={classes.deletebtn}><i data-key="delete" onClick={() => this.deleteClassroom(classroom.id)} className="fas fa-times"></i></span>
                                    : null}
    
                                </div>
                                <p data-key={classroom.id}>{classroom.description}</p>
                                <div data-key={classroom.id}>
                                    {classroom.tag && classroom.tag.length > 0 ? classroom.tags.map((tag, j) => {
                                        return (
                                            <span key={j} className="pl-3 pr-3 p-1 rounded-pill bg-dark text-light">#{tag.body}</span>
                                        )
                                    }) : null}
                                </div>
    
                            </div>
                    )
                        
                        
                }) : null}
            </>

        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteClassroom: (classroom) => {
            dispatch(deleteClassroom(classroom))
        },
        deleteSharingThunk: (classroom) => {
            dispatch(deleteSharingThunk(classroom))
        }
    }
}

export const DisplayClassModule = connect(null, mapDispatchToProps)(PureDisplayClassModule)