import React from 'react';
import { connect } from 'react-redux'

//Component

// import FormSubmit from '../Component/formSubmit';
import { VideoRecorder } from '../Component/videorecorder';
import { VideoPlayer } from '../Component/videoplayer';
import { Transcript } from '../Component/transcript';

// import FlashcardFeedbacks from '../Component/flashcardFeedbacks';
import { DisplayFlashcardSubmissionModule } from '../Component/displayflashcardsubmission';
import { DisplayFlashcardFeedback } from '../Component/displayflashcardfeedback';
import { NewCommentModal } from '../Component/newcommentmodal';

//Actions
import { getdataThunk } from '../Redux/actions/action'
import { addSubmissionThunk } from '../Redux/actions/submissionAction';
import { addFeedbackThunk } from '../Redux/actions/feedbackAction'
import { deleteFeedbackThunk } from '../Redux/actions/feedbackAction'

//CSS
import classes from './ViewFlashcard.module.css'

class ViewFlashCard extends React.Component {
    constructor(props) {
        super(props)

        this.player = React.createRef();
        this.child = React.createRef()

        this.state = {
            title: "classroomTitle",
            read: "readonly",
            transcript: "",
            type: "flashcard",
            correctSet: [],
            show: Boolean(),
            timeStamp: "",
            submissionTime: "",
            recording: false,
            submissionRecording: "",
            submissionId: "",
            onClickShowRecorder: [],
            correctSubmission: [],
            correctFeedback: [],
            correctFlashcard: [],
        }
        this.handleRecording = this.handleRecording.bind(this);
        this.addFeedback = this.addFeedback.bind(this);

    }

    componentDidMount() {
        this.props.getdata({ email: localStorage.getItem('email') })
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.cards.flashcard.length > 0) {
            this.setState({
                correctFlashcard: this.props.cards.flashcard.filter(flash => flash.id === parseInt(this.props.match.params.id)),
                transcript: this.state.correctFlashcard.length > 0 && this.state.correctFlashcard[0].flashcardBody
            })
            const correctProps = nextProps.cards.flashcard.filter(filter => filter.id === parseInt(this.props.match.params.id))
            if (this.props.user.role === "teacher") {
                this.setState({
                    correctSubmission: correctProps[0].submission,
                    correctFeedback: correctProps[0].submission.filter(submission => submission.id === this.state.submissionId),
                });
            } else if (this.props.user.role === "student") {
                const student = correctProps[0].submission.filter(filter => filter.user_id === parseInt(this.props.user.id))
                this.setState({
                    correctSubmission: student,
                    correctFeedback: correctProps[0].submission.filter(submission => submission.id === this.state.submissionId)
                });
            }

        }
    }


    toggle() {
        this.setState({
            modal: !this.state.modal,
        });
    }

    handleshow() {
        this.setState((prevState) => {
            return {
                show: !prevState.show
            }
        });
    }


    handleRecording(record) {
        this.setState({
            submissionRecording: `https://${process.env.REACT_APP_AWS_BUCKET}.s3.ap-southeast-1.amazonaws.com/` + record
        })
    }

    getRecorderInitialState() {
        return { showRecorder: false };
    }

    onClickShowRecorder() {
        this.setState({
            showRecorder: true,
            showSubmissionViewer: false
        })
    }

    getSubmissionViewInitialState() {
        return {
            showSubmissionViewer: false,
        };
    }

    onClickShowSubmissionViewer(id) {
        const cooresFeed2 = this.props.cards.flashcard.filter((fc) => { return fc.id === parseInt(this.props.match.params.id) })
        const cooresFeed3 = cooresFeed2[0].submission.filter((sub) => { return sub.id === id })
        this.setState({
            showRecorder: false,
            showSubmissionViewer: true,
            submissionId: id,
            correctFeedback: cooresFeed3
        })
    }

    addSubmission(e) {
        e.preventDefault()
        this.props.addSubmission({
            type: this.state.type,
            email: localStorage.getItem('email'),
            flashcardId: this.state.correctFlashcard[0].id,
            flashcardSubmissionRecording: this.state.submissionRecording
        })
    }

    handleTimeStamp = (submissionTime) => {
        this.setState({
            submissionTime: submissionTime
        });
    }

    addTimeStamp() {
        const stamp = document.getElementById('submission').currentTime
        var m = Math.floor(stamp / 60);
        var s = Math.floor(stamp % 60);
        if (m.toString().length < 2) {
            m = '0' + m;
        }
        if (s.toString().length < 2) {
            s = '0' + s;
        }
        const timeStamp = (m + ':' + s)
        // this.props.time(timeStamp)
        this.setState({
            timeStamp: timeStamp
        })
    }

    addFeedback(type, email, flashcardSubmissionId, flashcardFeedbackBody, flashcardFeedbackTime) {
        this.props.addFeedbackThunk(type, email, flashcardSubmissionId, flashcardFeedbackBody, flashcardFeedbackTime)
    }
    handleDelete(id) {
        this.props.deleteFeedback({
            type: "flashcard",
            feedbackId: id,
            flashcard_id: parseInt(this.props.match.params.id),
            flashcardSubmission_id: this.state.correctFeedback[0].id
        })
    }
    render() {
        return (
            <div className="page">

                <div className={classes.viewflashcard}>
                    {/* 1st row: Header */}
                    <div className="col-8">
                        <h1>{this.state.correctFlashcard.length > 0 ? this.state.correctFlashcard[0].flashcardTitle : null}</h1>
                    </div>

                    {/* 2nd row: Transcript & Video Player */}
                    <div className="row d-flex p-4">
                        <div className="col-6">
                            {this.state.correctFlashcard.length > 0 ? <Transcript title={this.state} flashcardBody={this.state.correctFlashcard[0].flashcardBody} /> : null}
                        </div>
                        <div className="col-6">
                            <VideoPlayer dtype={"display"} src={this.state.correctFlashcard.length > 0 ? this.state.correctFlashcard[0].flashcardRecording : null} />
                        </div>
                    </div>

                    {/* 3rd row: Submission & Feedback & VideoRecorder / VideoPlayer */}
                    <div className="row d-flex pt-1 pb-1 pl-4 pr-4">
                        <div className="col-6">
                            {/* <div className="flex-col d-flex"> */}
                            <div className={classes.submissions}>
                                <h5>Submissions</h5>
                                <div className={classes.scrollsubmission}>
                                    <div onClick={() => { this.onClickShowRecorder() }} className={classes.scrollplusicon}>
                                        <i className="fas fa-plus"></i>
                                    </div>
                                    <DisplayFlashcardSubmissionModule subId={(id) => this.onClickShowSubmissionViewer(id)} submission={this.state.correctSubmission} addFeedback={this.addFeedback()} />
                                </div>
                            </div>

                            {this.state.showSubmissionViewer &&
                                <div className={classes.feedback}>
                                    <h5>Feedback</h5>
                                    <div className={classes.scrollfeedback}>

                                        <NewCommentModal location={this.props.location} create={this.state} toggle={() => this.toggle()} addFeedback={this.addFeedback} />

                                        <div className={classes.addcommentcontainer}>
                                            <div onClick={() => { this.addTimeStamp(); this.toggle(); }} className={classes.addcommentbox}>
                                                <div className={classes.addbtn}>
                                                    <i className="fas fa-plus" />
                                                </div>
                                                <div className="col-6 m-1 p-1 rounded-lg d-flex align-items-center justify-content-center">
                                                    <span>Add new comment</span>
                                                </div>
                                            </div>
                                        </div>
                                        {this.state.showSubmissionViewer ? <DisplayFlashcardFeedback state={this.state} feedback={this.state.correctFeedback} handleDelete={(e) => { this.handleDelete(e) }} /> : null}
                                    </div>
                                </div>
                            }

                        </div>

                        <div className="col-6">
                            {this.state.showRecorder && <VideoRecorder handleRecording={this.handleRecording} />}
                            {this.state.showSubmissionViewer && <VideoPlayer dtype={"submission"} create={this.state} src={this.state.correctFeedback[0].flashcardSubmissionRecording} />}
                            {this.state.showRecorder &&
                                <div className={classes.buttoncontainer}>
                                    <button onClick={(e) => { this.addSubmission(e) }}>Add Submission</button>
                                </div>
                            }

                        </div>
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
        addSubmission: (submission) => {
            dispatch(addSubmissionThunk(submission))
        },
        addFeedbackThunk: (type, email, flashcardSubmissionId, flashcardFeedbackBody, flashcardFeedbackTime) => {
            let feedback = {
                type: type,
                email: email,
                submissionId: flashcardSubmissionId,
                body: flashcardFeedbackBody,
                timestamp: flashcardFeedbackTime
            }
            dispatch(addFeedbackThunk(feedback))
        },
        deleteFeedback: (id) => {
            dispatch(deleteFeedbackThunk(id))
        }
    }
}


const connectedViewFlashCard = connect(mapStateToProps, mapDispatchToProps)(ViewFlashCard)
export { connectedViewFlashCard as ViewFlashCard };