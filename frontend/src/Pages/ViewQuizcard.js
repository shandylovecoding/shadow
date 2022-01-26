import React from 'react';
import { connect } from 'react-redux'
//Component
import { ViewQuizcardQuestionModule } from '../Component/viewquizcardquestion';
import { VideoPlayer } from '../Component/videoplayer';
//Actions
import { getdataThunk } from '../Redux/actions/action'
import { addSubmissionThunk } from '../Redux/actions/submissionAction';
//CSS
import classes from './ViewQuizcard.module.css'
class ViewQuizcard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            type: "quizcard",
            correctQuizcard: [],
            correctQuestion: [],
            quizcardQuestionSubmission: [],
            showQuizcardQuestion: true,
        }
    }
    componentDidMount() {
        this.props.getdata({ email: localStorage.getItem('email') })
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.cards.quizcard.length > 0) {
            this.setState({
                correctQuizcard: this.props.cards.quizcard.filter(quiz => quiz.id === parseInt(this.props.match.params.id))
            })
            const correctProps = nextProps.cards.quizcard.filter(filter => filter.id === parseInt(this.props.match.params.id))
            this.setState({
                correctQuestion: correctProps[0]
            })
        }
    }
    onClickViewQuizcardQuestion() {
        this.setState({
            showQuizcardQuestion: true,
        })
    }

    addAnswer(questionId, submission, marking) {

        this.props.submitAnswer({
            email: localStorage.getItem('email'),
            type: this.state.type,
            quizcardQuestionSubmission: { questionId: questionId, submission: submission },
            quizcardQuestionMarking: marking,
            quizcardId: parseInt(this.props.match.params.id)
        })
    }

    async navigateSubmission(e) {
        e.preventDefault()
        this.props.history.push({
            pathname: `/viewquizcardSubmission/${this.props.match.params.id}`,
        })
    }
    render() {


        return (
            <div>
                <div className={classes.viewquizcard}>
                    {/* 1st row: Header */}
                    <div className="row d-flex p-4">
                        <h1>{this.state.correctQuizcard.length > 0 ? this.state.correctQuizcard[0].quizcardTitle : null}</h1>
                    </div>

                    <div className="row d-flex p-4">
                        <div className="col-6">
                            {this.state.showQuizcardQuestion &&
                                <div >
                                    <VideoPlayer src={this.state.correctQuestion.quizcardRecording} />
                                </div>
                            }
                        </div>
                        {this.state.showQuizcardQuestion &&
                            <div className="col col-6">
                                <ViewQuizcardQuestionModule question={this.state.correctQuestion} submissions={this.state.quizcardQuestionSubmission} addAnswer={(questionId, submission, marking) => this.addAnswer(questionId, submission, marking)} navigate={(e) => this.navigateSubmission(e)} />
                            </div>
                        }
                    </div>
                        <div className="row d-flex p-4">
                            {!this.state.showQuizcardQuestion &&
                                <div className="col col-12 d-flex justify-content-center align-items-center">
                                    <div onClick={() => { this.onClickViewQuizcardQuestion() }} className={classes.startbtncontainer}>
                                        <span className={classes.startbtn}> Start Quiz</span>
                                    </div>
                                </div>}
                        </div>
                 
                 
                </div>
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
        },
        submitAnswer: (submission) => {
            dispatch(addSubmissionThunk(submission))
        },
    }
}
const connectedViewQuizcard = connect(mapStateToProps, mapDispatchToProps)(ViewQuizcard)
export { connectedViewQuizcard as ViewQuizcard };