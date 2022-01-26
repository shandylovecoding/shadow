import React from 'react';
import { connect } from 'react-redux'

import { Modal, ModalHeader, ModalBody, Form, ModalFooter } from 'reactstrap';
import { editFeedbackThunk } from '../Redux/actions/feedbackAction'

class PureFeedbackModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            body: "",
        }
    }

    componentWillReceiveProps() {
            if (this.props.feedback.feedbackBody) {
                this.setState({
                    body: this.props.feedback.feedbackBody
                })
            } else {
                return
            }
    }

    onChangeField = (field, e) => {
        const state = {};
        state[field] = e.currentTarget.value;
        this.setState(state);
    }

    clearInput = () => {
        this.setState({
            body: ""
        })
    }

    submitFeedback(e) {
        e.preventDefault();
        this.props.editFeedback(this.props.user.email, this.props.feedback.correctDictationcard[0].id, this.props.feedback.feedbackId, this.state.body)
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.feedback.feedbackModal} toggle={this.props.toggle}>
                    <ModalHeader toggle={this.toggle}> Add/Edit Feedback </ModalHeader>
                    <ModalBody>
                        <Form>
                            <input onChange={this.onChangeField.bind(this, 'body')} value={this.state.body} type="text" className="form-control mb-4" placeholder="Add/Edit Feedback..."/>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <button onClick={(e) => {this.props.toggle(); this.clearInput(); this.submitFeedback(e)}} type="submit" className="btn btn-outline-dark waves-effect w-100 mb-2">Submit</button>
                        <button onClick={()=>{this.props.toggle()}} type="submit" className="btn btn-outline-danger waves-effect w-100 mb-2">Cancel</button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

const mapDispatchToProps  = dispatch => {
    return {
        editFeedback: (email, dictationcardId, dictationFeedbackId, dictationFeedbackBody) => {
            let feedback = {
                type: "dictationcard",
                cardId: dictationcardId,
                email: email,
                dictationFeedbackId: dictationFeedbackId,
                dictationFeedbackBody: dictationFeedbackBody
            }
            dispatch(editFeedbackThunk(feedback))
        },

    }
}

export const FeedbackPopUp = connect(null, mapDispatchToProps)(PureFeedbackModal)