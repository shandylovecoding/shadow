import React from 'react';
import { connect } from 'react-redux'

// Require Action
import { getdataThunk } from '../Redux/actions/action'

// import HeadingInput from '../Component/headingInput';
// import Table from '../Component/Table';

import classes from './ViewQuizcardSubmission.module.css'

class ViewQuizcardSubmission extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            type: "quizcard",
            correctSet: [],
            show: Boolean(),
            timeStamp: "",
            submissionTime: "",
            submissionId: "",
            correctSubmission: [],
            correctQuizcard: [],
            submissionArray: []
        }
    }

    async componentDidMount() {
        await this.props.getdata({ email: localStorage.getItem("email") })
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.cards.quizcard.length > 0) {
            this.setState({
                correctQuizcard: this.props.cards.quizcard.filter(flash => flash.id === parseInt(this.props.match.params.id))
            })
            const correctProps = nextProps.cards.quizcard.filter(filter => filter.id === parseInt(this.props.match.params.id))

            // const correctSub = this.state.correctQuizcard[0] && 
            //     this.state.correctQuizcard[0].question.length > 0
            //     ? this.state.correctQuizcard[0].question.map((question,i) => {
            //         return (
            //             question.submission.filter(sub => sub.user_id === question)
            //         )
            //     }) : null

            this.setState({
                correctSubmission: correctProps[0].submission,
            });
        }
    }

    logout = (e) => {
        e.preventDefault();
        this.props.logout()
    }
    render() {


        return (
            <div className="page">
                {/* <NavBar/> */}

                <div className={classes.viewquizcardsubmission}>
                    {/* 1st row: Header */}
                    <div className="row d-flex p-4">
                        <div className="col-8">
                            <h1>{this.state.correctQuizcard.length > 0 && this.state.correctQuizcard[0].quizcardTitle}</h1>
                        </div>
                    </div>

                    <div className="row d-flex p-4">
                        <div className="col">
                            <table>
                                <tbody>

                                    <tr>
                                        <th><br></br></th>
                                        <th>Correct Answer</th>
                                        {this.state.correctQuizcard[0] &&
                                            this.state.correctQuizcard[0].question.length > 0
                                            ? this.state.correctQuizcard[0].question[0].submission.map((submission, i) => {
                                                return (
                                                    <th data-key={i}>{submission.displayName}</th>
                                                )
                                            }) : null
                                        }
                                    </tr>

                                    {this.state.correctQuizcard[0] &&
                                        this.state.correctQuizcard[0].question.length > 0
                                        ? this.state.correctQuizcard[0].question.map((question, i) => {
                                            return (
                                                <tr data-key={i}>
                                                    <th>Question {i+1}</th>
                                                    <td>{question.questionType === "multipleChoice"
                                                        ? question.multipleChoiceAnswer :
                                                        question.questionType === "trueFalse"
                                                            ? question.trueFalseAnswer : null}</td>

                                                    {question.submission.map((sub, index) => {
                                                        return <td style={{
                                                            background:
                                                                // question.questionType === "multipleChoice" 
                                                                sub.quizcardQuestionSubmission === question.multipleChoiceAnswer || sub.quizcardQuestionSubmission === question.trueFalseAnswer
                                                                    ? "#F4FFB4" : "#FCDDEC"
                                                        }} >
                                                            {sub.quizcardQuestionSubmission}
                                                        </td>
                                                    })}
                                                </tr>
                                            )
                                        }) : null
                                    }

                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        email: state.authStore.email,
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
    }
}


const connectedViewQuizcardSubmission = connect(mapStateToProps, mapDispatchToProps)(ViewQuizcardSubmission)
export { connectedViewQuizcardSubmission as ViewQuizcardSubmission };