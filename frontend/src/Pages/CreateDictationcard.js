import React from 'react';
import { connect } from 'react-redux'

// Require Action
import { addCard } from '../Redux/actions/cardAction'
import { getdataThunk } from '../Redux/actions/action'

import { HeadingInput } from '../Component/headinginput';
// import FormSubmit from '../Component/formSubmit';
// import DictationQuestionsCreate from '../Component/DictationQuestionsCreate';
import { DisplayEntries } from '../Component/displayentries'


import classes from './CreateDictationcard.module.css'

class CreateDictationcard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            type: "dictationcard",
            dictationcardTitle: "",
            dictationcardBody: "",
            dictationRecording: "",
            setId: "",
            items: [],
        }
        this.handleHeading = this.handleHeading.bind(this);
        this.handleRecording = this.handleRecording.bind(this);
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }
    componentDidMount() {
        this.props.getdata({ email: localStorage.getItem('email') })
    }


    handleHeading(title) {
        this.setState({
            dictationcardTitle: title
        })
    }

    handleRecording(key, fileName) {
        var filteredItems = this.state.items.filter(function (item) {
            return (item.key !== key);
        });
        var changedItem = this.state.items.filter(function (item) {
            return (item.key === key);
        });

        changedItem[0].dictationRecording = `https://${process.env.REACT_APP_AWS_AUDIO_BUCKET}.s3.ap-southeast-1.amazonaws.com/` + fileName;
        this.setState({
            items: filteredItems.concat(changedItem)
        })
    }

    addItem(e) {
        e.preventDefault();
        if (this._inputElement.value !== "") {
            var newItem = {
                dictationBody: this._inputElement.value,
                key: Date.now(),
                dictationRecording: ""
            };
        };

        this._inputElement.value = "";
        this.setState((prevState) => {
            return {
                items: prevState.items.concat(newItem)
            };
        });
    }


    deleteItem(key) {
        var filteredItems = this.state.items.filter(function (item) {
            return (item.key !== key);
        });

        this.setState({
            items: filteredItems
        });
    }
    
    addDictationCard() {
        this.props.addCard({
            email: localStorage.getItem('email'),
            type: this.state.type,
            dictationcardTitle: this.state.dictationcardTitle,
            dictationcardRecording: this.state.dictationRecording,
            dictation: this.state.items,
            setId: parseInt(this.props.match.params.setId)
        })
    }

    async navigateSet(e) {
        e.preventDefault()
        this.addDictationCard()
        this.props.history.push({
            pathname: `/viewset/${this.props.match.params.setId}`,
        })
    }
    render() {

        return (

            <div className="page">
                {/* Page Container */}
                <div className={classes.createdictationcard}>
                    {/* Header Row */}
                    <div className="row d-flex p-4">
                        <div className="col-8">
                            <HeadingInput card={this.state} handleHeading={this.handleHeading} heading={this.state} />
                        </div>
                        <div className="col-4">
                            {/* <FormSubmit/> */}
                            <div className={classes.createbtn}>
                                <button cards={this.props.cards} onClick={(e) => { this.navigateSet(e) }} >Create Card</button>
                            </div>
                        </div>
                    </div>

                    {/* List of words & recording */}
                    <div className={classes.listframe}>
                        <div className="row d-flex p-4">
                            <div className="col col-12">
                                <h4>List of words</h4>
                            </div>

                            <div className="col col-12">
                                <form onSubmit={this.addItem}>
                                    <input ref={(a) => this._inputElement = a} placeholder="Add a word"></input>
                                    <span className={classes.additembtn}>
                                        <button type="submit">
                                            <i className="fas fa-plus"></i>
                                        </button>
                                    </span>

                                </form>
                            </div>

                            <div className="col col-12">
                                <DisplayEntries handleRecording={(key, fileName) => this.handleRecording(key, fileName)} entries={this.state.items} delete={this.deleteItem} />
                            </div>

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


const connectedCreateDictationcard = connect(mapStateToProps, mapDispatchToProps)(CreateDictationcard)
export { connectedCreateDictationcard as CreateDictationcard };