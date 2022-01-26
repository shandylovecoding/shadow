import React from 'react';
import { connect } from 'react-redux'
import classes from './viewquizcardquestion.module.css'
class PureViewQuizcardQuestionModule extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tracking: [],
            questionNumId: 0,
            showSub: false,
            hideNext: false,
        }
    }

    onClickShowQuestionViewer(id) {
        this.setState({
            showQuestionViewer: true,
            questionNumId: id,
        })
    }

    handleAnswer(e, questionId, submission, marking) {
        if (this.state.tracking.indexOf(questionId) >= 0) {
            return
        } else {

            this.props.addAnswer(questionId, submission, marking)
            this.setState({
                tracking: this.state.tracking.concat(questionId),
                hideNext: true
            })
            if (marking) {
                e.target.style.background = "#F4FFB4"
            } else {
                e.target.style.background = '#FCDDEC'
            }
            if (this.state.questionNumId >= this.props.question.question.length - 1) {
                this.setState({
                    showSub: true,
                    hideNext: false,
                })
            }
        }
    }

    forward() {
        if (this.state.questionNumId === this.props.question.question.length - 2) {

            this.setState({
                hideNext: false,
                questionNumId: this.state.questionNumId + 1
            })
            return;
        } else {
            this.setState({
                hideNext: false,
                questionNumId: this.state.questionNumId + 1
            })
        }
    }

    render() {
        const { showSub, hideNext } = this.state
        return (
            <>
                <div className={classes.scrollicon} >
                    <div className="row" >
                        {this.props.question.question &&
                            this.props.question.question.length > 0 ?
                            this.props.question.question.map(
                                (question, i) => {
                                    if (i === 0) {
                                        return (
                                            <span key={i}
                                                style={{
                                                    background: this.state.tracking && this.state.tracking[i]
                                                        ? '#F6CA4E' : null,
                                                    color: this.state.tracking && this.state.tracking[i]
                                                        ? '#FFFFFF' : null
                                                }}>{i + 1}</span>
                                        )
                                    } else {
                                        return (
                                            <span key={i}
                                                style={{
                                                    background: this.state.tracking && this.state.tracking[i]
                                                        ? '#F6CA4E' : null,
                                                    color: this.state.tracking && this.state.tracking[i]
                                                        ? '#FFFFFF' : null
                                                }} >{i + 1}</span>
                                        )
                                    }
                                }
                            )
                            : null}
                    </div>
                    <div className="col col-4 ">
                        {showSub ? <button className={classes.viewsubmit} cards={this.props.cards} onClick={(e) => { this.props.navigate(e) }}>View Submission</button> : null}
                    </div>
                </div>
                <div className={classes.viewquizcardquestion}>

                    <div>
                        {/* List of words & recording */}
                        <div className={classes.questionframe}>
                            <div className="row d-flex ">
                                <div className="col col-12">
                                    <div className="row">
                                        {/* <div className="col col-8">
                                            <p>Question {this.state.questionNumId ? this.state.questionNumId + 1 : null}</p>
                                        </div> */}
                                    </div>
                                    {this.props.question.question &&
                                        this.props.question.question.length > 0 ?
                                        this.props.question.question.map((question, i) => {
                                            if (question.questionType === "multipleChoice" && i === this.state.questionNumId) {
                                                return (
                                                    <div key={i} className={classes.viewquizcardanswer}>
                                                        <div key={i} className="row">
                                                            <div className="col mt-2">
                                                                <div style={{ width: "100%" }}>{question.questionBody}</div>
                                                            </div>
                                                        </div>
                                                        <div className="row  pt-3">
                                                            <div className="col col-6">
                                                                <label htmlFor="A">Choice A</label>
                                                                <button className={classes.quizcardoptbtn} style={{ background: this.state.background }} onClick={(e) => { this.handleAnswer(e, question.id, "a", question.multipleChoiceAnswer === "a") }} type="text" name="A" id="A" >{question.multipleChoiceA}</button>
                                                            </div>
                                                            <div className="col col-6">
                                                                <label htmlFor="A">Choice B</label>
                                                                <button className={classes.quizcardoptbtn} style={{ background: this.state.background }} onClick={(e) => { this.handleAnswer(e, question.id, "b", question.multipleChoiceAnswer === "b") }} type="text" name="B" id="B" >{question.multipleChoiceB}</button>
                                                            </div>
                                                        </div>
                                                        <div className="row pt-5">
                                                            <div className="col col-6">
                                                                <label htmlFor="A">Choice C</label>
                                                                <button className={classes.quizcardoptbtn} style={{ background: this.state.background }} onClick={(e) => { this.handleAnswer(e, question.id, "c", question.multipleChoiceAnswer === "c") }} type="text" name="C" id="C" >{question.multipleChoiceC}</button>
                                                            </div>
                                                            <div className="col col-6">
                                                                <label htmlFor="A">Choice D</label>
                                                                <button className={classes.quizcardoptbtn} style={{ background: this.state.background }} onClick={(e) => { this.handleAnswer(e, question.id, "d", question.multipleChoiceAnswer === "d") }} type="text" name="D" id="D" >{question.multipleChoiceD}</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            } else if (question.questionType === "trueFalse" && i === this.state.questionNumId) {
                                                return (
                                                    <div key={i} className={classes.viewquizcardanswer}>
                                                        <div key={i} className="row">
                                                            <div style={{ width: "100%", margin: "20px" }} >{question.questionBody}</div>
                                                        </div>
                                                        <div className="row pt-3">
                                                            <div className="col col-6">
                                                                <button className={classes.quizcardoptbtn} style={{ background: this.state.border }} onClick={(e) => { this.handleAnswer(e, question.id, "true", question.trueFalseAnswer === "true") }} > True </button>
                                                            </div>
                                                            <div className="col col-6">
                                                                <button className={classes.quizcardoptbtn} style={{ background: this.state.border }} onClick={(e) => { this.handleAnswer(e, question.id, "false", question.trueFalseAnswer === "false") }} > False </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            return false
                                        }
                                        )
                                        : null
                                    }
                                </div>
                            </div>
                        </div>
                        <br />
                        {hideNext ? <div className="col-12 p-4">
                            <button className={classes.savebtn} onClick={(e) => { this.forward(e) }}>Save &amp; Next</button>
                        </div> : null}
                    </div>
                </div>
            </>
        )
    }
}
export const ViewQuizcardQuestionModule = connect(null, null)(PureViewQuizcardQuestionModule)

