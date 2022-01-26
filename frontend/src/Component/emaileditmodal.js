import React from 'react'
import { connect } from 'react-redux'
import { Modal, ModalHeader, ModalBody, Form, ModalFooter } from 'reactstrap';

import { editUserEmailThunk } from '../Redux/actions/userAction';

class PureEmailEditModal extends React.Component {
    constructor(props){
        super(props);
        this.state={
            emailModal: false,
            email: "",
        }
    }

    onChangeField = (field, e) => {
        const state = {};
        state[field] = e.currentTarget.value;
        this.setState(state);
    }

    update = (e) => {
        e.preventDefault();
        this.props.editEmail(this.props.user.id, this.state.email)
    }

render(){
    return(
        <Modal isOpen={this.props.update.emailModal} toggle={()=>{this.props.toggle()}}>
        <ModalHeader> Edit Email </ModalHeader>
        <ModalBody>
            <Form>
                <input type="text" placeholder="Change Email" value={this.state.email} onChange={this.onChangeField.bind(this, 'email')} className="form-control mb-4"/>
                </Form>
                <ModalFooter>
                        {this.state.email !== "" && this.state.email.includes("@") && this.state.email.includes(".") ? <button onClick={(e)=>{this.update(e); this.props.toggle()}} type="submit" className="btn btn-outline-dark waves-effect w-100 mb-2">Update</button> : <button type="submit" className="btn btn-outline-dark waves-effect w-100 mb-2" disabled>Update</button>}
                        <button onClick={()=>{this.props.toggle()}} type="submit" className="btn btn-outline-danger waves-effect w-100 mb-2">Cancel</button>
                    </ModalFooter>
      
        </ModalBody>
      </Modal>
    )
}
} 

const mapDispatchToProps = dispatch => {
    return {
        editEmail: (userId, email) => {
            let userEmail = {
                id: userId,
                email: email
            }
            dispatch(editUserEmailThunk(userEmail))
        }
    }
}

export const EmailEditModal = connect(null, mapDispatchToProps)(PureEmailEditModal)