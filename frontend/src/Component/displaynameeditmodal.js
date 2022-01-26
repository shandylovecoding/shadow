import React from 'react'
import { connect } from 'react-redux'
import { Modal, ModalHeader, ModalBody, Form, ModalFooter } from 'reactstrap';

import { editUserDisplayNameThunk } from '../Redux/actions/userAction';

class PureDisplayNameEditModal extends React.Component {
    constructor(props){
        super(props);
        this.state={
            displayNameModal: false,
            displayName: "",
        }
    }

    onChangeField = (field, e) => {
        const state = {};
        state[field] = e.currentTarget.value;
        this.setState(state);
    }

    update = (e) => {
        e.preventDefault();
        this.props.editDisplayName(this.props.user.id, this.state.displayName)
    }

render(){
    return(
        <Modal isOpen={this.props.update.displayNameModal} toggle={()=>{this.props.toggle()}}>
        <ModalHeader> Edit Username </ModalHeader>
        <ModalBody>
            <Form>
                <input type="text" placeholder="Change Username" value={this.state.displayName} onChange={this.onChangeField.bind(this, 'displayName')} className="form-control mb-4"/>
                </Form>
                <ModalFooter>
                        {this.state.displayName !== "" ? <button onClick={(e)=>{this.update(e); this.props.toggle()}} type="submit" className="btn btn-outline-dark waves-effect w-100 mb-2">Update</button> : <button type="submit" className="btn btn-outline-dark waves-effect w-100 mb-2" disabled>Update</button>}
                        <button onClick={()=>{this.props.toggle()}} type="submit" className="btn btn-outline-danger waves-effect w-100 mb-2">Cancel</button>
                    </ModalFooter>
      
        </ModalBody>
      </Modal>
    )
}
} 

const mapDispatchToProps = dispatch => {
    return {
        editDisplayName: (userId, displayName) => {
            let userDisplayName = {
                id: userId,
                displayName: displayName
            }
            dispatch(editUserDisplayNameThunk(userDisplayName))
        }
    }
}

export const DisplayNameEditModal = connect(null, mapDispatchToProps)(PureDisplayNameEditModal)