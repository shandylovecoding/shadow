import React from 'react';
import { connect } from 'react-redux'
// Require Action
import { addCard } from '../Redux/actions/cardAction'
import { getdataThunk } from '../Redux/actions/action'
// Require Component
import { HeadingInput } from '../Component/headinginput';
import { VideoRecorder } from '../Component/videorecorder';
import { Transcript } from '../Component/transcript';
// Require Css
import classes from './CreateFlashcard.module.css'

class CreateFlashcard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            type:"flashcard",
            flashcardTitle: "",
            flashcardBody:"Insert a transcript here",
            flashcardRecording:"",
            setId: "",
        }
        this.handleHeading = this.handleHeading.bind(this);
        this.handleTranscript = this.handleTranscript.bind(this);
        this.handleRecording = this.handleRecording.bind(this);
    }
    componentDidMount() {
        this.props.getdata({ email: localStorage.getItem('email')})
    }


    handleHeading(title){
        this.setState({
            flashcardTitle: title
        })
    }

    handleTranscript(body){
        this.setState({
            flashcardBody: body
        })
    }

    handleRecording(record){
        this.setState({
            flashcardRecording: `https://${process.env.REACT_APP_AWS_BUCKET}.s3.ap-southeast-1.amazonaws.com/` + record
        })
    }
    
    addFlashCard(){
      this.props.addCard({
                email: localStorage.getItem('email'),
                type : this.state.type,
                flashcardTitle: this.state.flashcardTitle,
                flashcardBody: this.state.flashcardBody,
                flashcardRecording: this.state.flashcardRecording,
                setId: parseInt(this.props.match.params.setId)
            })
       
    }

    async navigateSet(e){
        e.preventDefault()
        await this.addFlashCard()
        this.props.history.push({
            pathname:`/viewset/${this.props.match.params.setId}`,
        })
    }
    render() {

        return (
            <div className="page">
                {/* Page Container */}
                <div className={classes.createflashcard}>
                    {/* Header Row */}
                    <div className="row d-flex p-4">
                        <div className="col-8">
                            <HeadingInput card={this.state} handleHeading={this.handleHeading} heading={this.state}/>
                        </div>
                        <div className="col-4">
                            {/* <FormSubmit/> */}
                            <button cards={this.props.cards} onClick={(body)=>{this.navigateSet(body)}}>Create Card</button>
                        </div>
                    </div>

                    {/* Video & Transcript row */}
                    <div className="row d-flex p-4">
                        <div className="col-6">
                        <VideoRecorder handleRecording={this.handleRecording}/>
                        </div>
                        <div className="col-6">
                        <Transcript title={this.state} handleTranscript={this.handleTranscript} />
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


const connectedCreateFlashcard = connect(mapStateToProps, mapDispatchToProps)(CreateFlashcard)
export { connectedCreateFlashcard as CreateFlashcard };