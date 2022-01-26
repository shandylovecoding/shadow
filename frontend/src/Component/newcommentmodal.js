import React from 'react'
import { connect } from 'react-redux'

import { Modal, ModalHeader, ModalBody, Form, ModalFooter } from 'reactstrap';


class PureNewCommentModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            flashcardSubmissionBody: ""
        };
    }

    submit = (e) => {
        e.preventDefault();
      this.props.addFeedback(this.props.create.type, this.props.user.email, this.props.create.submissionId, this.state.flashcardSubmissionBody, this.props.create.timeStamp)
        this.setState({
            flashcardSubmissionBody:""
        })
    }

    onChangeField = (field, e) => {
        const state = {};
        state[field] = e.currentTarget.value;
        this.setState(state);
    }
            
    render() {
        return (
            <div>
                <Modal isOpen={this.props.create.modal} toggle={this.props.toggle}>
                    <ModalHeader toggle={this.toggle}>Add new comment @{this.props.create.timeStamp}</ModalHeader>
                    <ModalBody>
                        <Form>
                            <input
                                onChange={this.onChangeField.bind(this, this.props.create.timeStamp)}
                                value={this.props.create.timeStamp}
                                type="text"
                                className="form-control mb-4"
                                hidden={true} />

                            <input
                                onChange={this.onChangeField.bind(this, 'email')}
                                value={this.props.user.email}
                                type="text"
                                className="form-control mb-4"
                                hidden={true} />

                            <input
                                onChange={this.onChangeField.bind(this, "flashcardSubmissionBody")} value={this.state.flashcardSubmissionBody}
                                type="text"
                                className="form-control mb-4"
                                placeholder="Insert new comment." />
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <button onClick={(e) => { this.submit(e); this.props.toggle() }} type="submit" className="btn btn-outline-dark waves-effect w-100 mb-2"><div>Confirm</div></button>
                        <button onClick={(e) => { this.props.toggle() }} type="submit" className="btn btn-outline-danger waves-effect w-100 mb-2">Cancel</button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        user: state.userStore.user,
    }
}

// this.props.feedback.user_id,this.props.feedback.flashcardFeedbackBody, this.state.flashcardTitle

const mapDispatchToProps = dispatch => {
    return {
        // addFeedbackThunk: (type, email, flashcardSubmissionId, flashcardFeedbackBody, flashcardFeedbackTime) => {
        //     let feedback = {
        //         type: type,
        //         email: email,
        //         submissionId: flashcardSubmissionId,
        //         body: flashcardFeedbackBody,
        //         timestamp: flashcardFeedbackTime
        //     }
        //     dispatch(addFeedbackThunk(feedback))
        // },
    }
}


export const NewCommentModal = connect(mapStateToProps, mapDispatchToProps)(PureNewCommentModal)