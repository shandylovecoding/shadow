import React from 'react'
import { connect } from 'react-redux'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
// Require Action
import { getdataThunk } from "../Redux/actions/action"
// Require Component
import { DisplaySetModule } from '../Component/displaysetmodule'
import { DisplayCardModule } from './displaycardmodule';



class PureModel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            type: ""
        };
    }
    toggle() {
        this.setState({
            modal: !this.state.modal,
        });
    }
    changeTypeClass() {
        this.setState({
            type: "class"
        })
    }
    changeTypeSet() {
        this.setState({
            type: "set"
        })
    }

    render() {
        return (

            <Modal size="lg" isOpen={this.props.create.modal} toggle={this.props.toggle}>
                <ModalHeader >Add Exist {this.props.create.type === "class" ? "Set" : this.props.create.type === "set" ? "Card" : "Classroom"}</ModalHeader>
                <ModalBody>
                    <div className="row d-flex justify-content-center align-items-center">
                        {this.props.create.type === "class" ? 
                        <DisplaySetModule user={this.props.user} display="addExist" match={this.props.match} correctClass={this.props.correctClass} sets={this.props.sets} toggle={this.props.toggle}/> 
                        :
                        <DisplayCardModule  user={this.props.user} display="addExist" match={this.props.match} correctSet={this.props.correctSet} allCard={this.props.allCard} connect={(e)=>this.connect(e)} toggle={this.props.toggle}/>
                        }
                    </div>
                </ModalBody>
            </Modal>
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



export const AddExistPopUp = connect(mapStateToProps, mapDispatchToProps)(PureModel)