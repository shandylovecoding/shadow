import React from 'react';
import { connect } from 'react-redux'
import { Modal, ModalHeader, ModalBody} from 'reactstrap';

import classes from './selectcardmodal.module.css'

class PureSelectCardModal extends React.Component{

    render() {
        return (
            <div>
                <Modal isOpen={this.props.selectCard.selectModal} toggle={this.props.toggle} >
                    <ModalHeader toggle={this.toggle}> Select a card type </ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <div className={classes.flashcard}>
                                <button onClick={(e)=>{this.props.navigateNewFlashcard(e)}}>
                                    <div className={classes.title}>Flashcard</div>
                                    <div className={classes.description}>Shadow to improve speaking</div>
                                </button>
                            </div>

                            <div className={classes.quizcard}>
                                <button onClick={(e)=>{this.props.navigateNewQuizcard(e)}}>
                                    <div className={classes.title}>Quizcard</div>
                                    <div className={classes.description}>Listen and test your knowledge</div>
                                </button>
                            </div>

                            <div className={classes.dictationcard}>
                                <button onClick={(e)=>{this.props.navigateNewDictationcard(e)}}>
                                    <div className={classes.title}>Dictationcard</div>
                                    <div className={classes.description}>How do you spell...?</div>
                                </button>
                            </div>

                        </div>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}


export const SelectCardPopUp = connect(null, null)(PureSelectCardModal)