import React from 'react';
import {connect} from 'react-redux'
// Require Action
import { addCard } from '../Redux/actions/cardAction'
import { getdataThunk } from '../Redux/actions/action'
// Require Component
import { HeadingInput } from '../Component/headinginput';
import { VideoRecorder } from '../Component/videorecorder';
import { CreatequizcardQuestion } from '../Component/createquizcardQuestion';
import classes from './CreateQuizcard.module.css'


class CreateQuizcard extends React.Component {
    constructor(props){
        super(props)
        this.state={
            type: "quizcard",
            quizcardTitle: "",
            quizcardRecording: "",
            quizcardQuestion: [],
        }
    }
    componentDidMount(){
        this.props.getdata({ email: localStorage.getItem('email') })
    }
    handleHeading(title){
        this.setState({
            quizcardTitle: title
        })
    }
    handleRecording(record){
        this.setState({
            quizcardRecording: `https://${process.env.REACT_APP_AWS_BUCKET}.s3.ap-southeast-1.amazonaws.com/` + record
        })
    }
    addQuizCard(){
        this.props.addCard({
            email: localStorage.getItem('email'),
            type : this.state.type,
            quizcardTitle: this.state.quizcardTitle,
            quizcardRecording: this.state.quizcardRecording,
            quizcardQuestion: this.state.quizcardQuestion,
            setId: this.props.match.params.setId
        })
    }
    async navigateSet(e){
        e.preventDefault()
        await this.addQuizCard()
        this.props.history.push({
            pathname:`/viewset/${this.props.match.params.setId}`,
        })
    }
    addQuestion(e, question){
        e.preventDefault()
        if(question.questionType === 'multipleChoice' && question.questionBody !== "" && question.multipleChoiceAnswer !== ""){
            this.setState({
                quizcardQuestion: this.state.quizcardQuestion.concat(question)
            })
        } else if(question.questionType === 'trueFalse' && question.questionBody !== "" && question.trueFalseAnswer !== ""){
            this.setState({
                quizcardQuestion: this.state.quizcardQuestion.concat(question)
            })
        } else {
            alert("please fill in the required boxes")
        }
    }
    editQuestion(e, newQ){
        e.preventDefault();
        let shallowQuestions = [...this.state.quizcardQuestion]
        let question = shallowQuestions[newQ.currentQuestion]
        question = newQ
        shallowQuestions[newQ.currentQuestion] = question
        this.setState({
            quizcardQuestion: shallowQuestions
        })
    }
    logout = (e) => {
        e.preventDefault();
        this.props.logout()
    }
    render() {
        return (
            <div className="page">
                {/* Page Container */}
                <div className={classes.createquizcard}>
                    {/* Header Row */}
                    <div className={classes.header}>
                        <div className="row d-flex p-4">
                            <div className="col-8">
                                <HeadingInput card={this.state} handleHeading={(e)=>this.handleHeading(e)} heading={this.state}/>
                            </div>
                            <div className="col-4">
                                {/* <FormSubmit/> */}
                                <button cards={this.props.cards} onClick={(e)=>{this.navigateSet(e)}}>Create Card</button>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col col-6">
                            <VideoRecorder handleRecording={(e)=>this.handleRecording(e)}/>
                        </div>
                        <div className="col col-6">
                            <CreatequizcardQuestion questions={this.state.quizcardQuestion} edit={(e, i)=>this.editQuestion(e, i)} submit={(e, question)=> this.addQuestion(e, question)}/>
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
        addCard: (card) => {
            dispatch(addCard(card))
        },
        getdata: (email) => {
            dispatch(getdataThunk(email))
        }
    }
}


const connectedCreateQuizcard = connect(mapStateToProps, mapDispatchToProps)(CreateQuizcard)
export { connectedCreateQuizcard as CreateQuizcard };