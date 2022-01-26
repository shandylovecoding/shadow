import React from 'react';
import { connect } from 'react-redux'
// Require Action
import { getdataThunk } from '../Redux/actions/action'
import { deleteTag } from '../Redux/actions/tagAction';
import { editSet } from '../Redux/actions/setAction';


// Require Component
import { DisplayCardModule } from '../Component/displaycardmodule';
import { DisplaySetTag } from '../Component/displaysettag'

// Require Modal Component
import { NewTagPopUp } from '../Component/newtagmodal';
import { AddnewPopUp } from '../Component/addnewmodal'

// Require Css
import classes from './ViewSet.module.css'

class ViewSet extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectModal: false,
            modal: false,
            type: "",
            tagModal: false,
            shareModal: false,
            correctflashCard: [],
            correctquizCard: [],
            correctdictationCard: [],
            correctSet: this.props.sets.filter(set => set.id === parseInt(this.props.match.params.id)),
            correctTag: []
        }
    }

    async componentDidMount() {
        await this.props.getdata({ email: localStorage.getItem('email') })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.props.getdata({ email: localStorage.getItem("email") });
        }
    }

    async componentWillReceiveProps(nextProps) {
        await this.setState({
            correctSet: nextProps.sets.filter(set => set.id === parseInt(this.props.match.params.id))
        })
        // await this.getSet()

        if (this.state.correctSet[0] !== undefined) {
            const correctFlashs = nextProps.sets.filter(filter => filter.id === this.state.correctSet[0].id)
            if (correctFlashs[0] !== undefined && correctFlashs[0].bridge_flashcard !== undefined) {
                if (correctFlashs[0].bridge_flashcard.length >= 0) {
                    let nextflash = await correctFlashs[0].bridge_flashcard.map((changed) => {
                        const newestState = nextProps.cards.flashcard.filter(nFlashcard => nFlashcard.id === changed.flashcard_id)
                        return newestState[0]
                    });
                    if (nextflash[0] !== undefined) {
                        this.setState({
                            correctflashCard: nextflash,
                        });
                    } else {
                        this.setState({
                            correctflashCard: [],
                        });
                    }
                }
            }
            const correctQuizs = nextProps.sets.filter(filter => filter.id === this.state.correctSet[0].id)
            if (correctQuizs[0] !== undefined && correctQuizs[0].bridge_quizcard !== undefined) {
                if (correctQuizs[0].bridge_quizcard.length >= 0) {
                    let nextquiz = await correctQuizs[0].bridge_quizcard.map((changed) => {
                        const newestState = nextProps.cards.quizcard.filter(nQuizcard => nQuizcard.id === changed.quizcard_id)
                        return newestState[0]
                    });
                    if (nextquiz[0] !== undefined) {
                        this.setState({
                            correctquizCard: nextquiz,
                        });
                    } else {
                        this.setState({
                            correctquizCard: [],
                        });
                    }
                }
            }
            const correctDicts = nextProps.sets.filter(filter => filter.id === this.state.correctSet[0].id)
            if (correctDicts[0] !== undefined && correctDicts[0].bridge_dictationcard !== undefined) {
                if (correctDicts[0].bridge_dictationcard.length >= 0) {
                    let nextdictation = await correctDicts[0].bridge_dictationcard.map((changed) => {
                        const newestState = nextProps.cards.dictationcard.filter(nDictcard => nDictcard.id === changed.dictationcard_id)
                        if (newestState[0] !== undefined) {
                            return newestState[0]
                        }
                        return false
                    });
                    if (nextdictation[0] !== undefined) {
                        this.setState({
                            correctdictationCard: nextdictation,
                        });
                    } else {
                        this.setState({
                            correctdictationCard: []
                        })
                    }
                }
            }
            const correctProps = nextProps.sets.filter(filter => this.state.correctSet[0].id === filter.id)
            if (correctProps[0] !== undefined) {
                this.setState({
                    title: correctProps[0].title,
                    description: correctProps[0].description,
                    correctTag: correctProps[0].tags,
                })
            }
        }
    }
    toggle() {
        this.setState({
            modal: !this.state.modal,
        });
    }

    tagToggle() {
        this.setState({
            tagModal: !this.state.tagModal
        })
    }

    shareToggle() {
        this.setState({
            shareModal: !this.state.shareModal
        })
    }


    selectToggle() {
        this.setState({
            selectModal: !this.state.selectModal,
        });
    }

    changeTypeSet() {
        this.setState({
            type: "set"
        })
    }

    navigateCard(e) {
        if (e.target.attributes["data-del"].value === "delete") {
            return
        } else if (e.target.attributes["data-type"].value === "flashcard") {
            this.props.history.push({
                pathname: `/viewflashcard/${e.target.attributes["data-key"].value}`
            })
        } else if (e.target.attributes["data-type"].value === "quizcard") {
            this.props.history.push({
                pathname: `/viewquizcard/${e.target.attributes["data-key"].value}`
            })
        } else if (e.target.attributes["data-type"].value === "dictationcard") {
            this.props.history.push({
                pathname: `/viewdictationcard/${e.target.attributes["data-key"].value}`
            })
        }
    }
    navigateNewFlashcard(e) {
        this.props.history.push({
            pathname: `/createflashcard/${this.props.match.params.id}`,
            state: {
                set: this.state.correctSet
            }
        }
        )
    }

    navigateNewQuizcard(e) {
        this.props.history.push({
            pathname: `/createquizcard/${this.props.match.params.id}`,
            state: {
                set: this.state.correctSet
            }
        }
        )
    }

    navigateNewDictationcard(e) {
        this.props.history.push({
            pathname: `/createdictationcard/${this.props.match.params.id}`,
            state: {
                set: this.state.correctSet
            }
        }
        )
    }

    getSet() {
        this.setState({
            correctTag: this.state.correctSet[0].tags
        })
        if (this.state.correctSet[0].bridge_flashcard != null && this.state.correctSet[0].bridge_flashcard.length > 0) {
            const flash = this.state.correctSet[0].bridge_flashcard.map((flashCard) => {
                const newestState = this.props.cards.flashcard.filter(card => card.id === flashCard.flashcard_id)
                return newestState[0]
            });
            this.setState({
                correctflashCard: flash
            })
        } else {
            return null
        }
        if (this.state.correctSet[0].bridge_quizcard != null) {
            const quiz = this.state.correctSet[0].bridge_quizcard.map((quizCard) => {
                const newestState = this.props.cards.quizcard.filter(card => card.id === quizCard.quizcard_id)
                return newestState[0]
            });
            this.setState({
                correctquizCard: quiz
            })
        } else {
            return null
        }
        if (this.state.correctSet[0].bridge_dictationcard != null) {
            const dictation = this.state.correctSet[0].bridge_dictationcard.map((dictationCard) => {
                const newestState = this.props.cards.dictationcard.filter(card => card.id === dictationCard.dictationcard_id)
                return newestState[0]
            });
            this.setState({
                correctdictationCard: dictation
            })
        } else {
            return null
        }
    }

    deleteTag(tagId) {
        this.props.deleteTag({
            type: "set",
            tagId: tagId,
            setId: this.state.correctSet[0].id
        })
    }

    handleChange(e) {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }

    editHeading() {
        this.props.editSet({
            email: this.props.user.email,
            title: this.state.title,
            description: this.state.description,
            setId: this.state.correctSet[0].id
        })

    }

    render() {


        return (
            <div className="page">
                <div className={classes.viewset}>
                    <div className="row d-flex p-4">
                        {/* <div className="col-8"> */}
                        {this.props.user.role === "teacher" ?

                            <div className="col-8">
                                <input type="text" name="title" value={this.state.title || ''} onChange={(e) => { this.handleChange(e) }} onBlur={() => { this.editHeading() }} className={classes.editTitle} />
                                <input type="text" name="description" value={this.state.description || ''} onChange={(e) => { this.handleChange(e) }} onBlur={() => { this.editHeading() }} className={classes.editDescription} />
                            </div>
                            :
                            <div className="col-8">
                                <h1>{this.state.title}</h1>
                                <h6>{this.state.description}</h6>
                            </div>
                        }
                        {/* </div> */}
                    </div>


                    <div className="row d-flex pl-4 pr-4 ml-3">
                        <DisplaySetTag tags={this.state.correctTag} deleteTag={(tagId) => { this.deleteTag(tagId) }} />
                        <NewTagPopUp addTag={this.state} location={this.state.correctSet[0]} toggle={() => this.tagToggle()} />
                        <span className="d-inline-flex">
                            {this.props.user.role === "teacher" ? <button onClick={() => { this.tagToggle(); this.changeTypeSet() }} className={classes.addtagbutton}><i className="fas fa-plus"></i></button> : null}
                        </span>
                    </div>

                    <div className="row d-flex mt-4 m-3">
                        <AddnewPopUp 
                        match={this.props.match} 
                        create={this.state} 
                        navigateNewFlashcard={(e) => { this.navigateNewFlashcard(e) }} 
                        navigateNewQuizcard={(e) => { this.navigateNewQuizcard(e) }} 
                        navigateNewDictationcard={(e) => { this.navigateNewDictationcard(e) }} 
                        correctSet={this.state.correctSet}
                        allCard={this.props.cards} 
                        toggle={() => this.toggle()} />
                        
                        {this.props.user.role === "teacher" ? <div onClick={() => { this.changeTypeSet(); this.toggle(); }} className={classes.card}>
                            <div className={classes.addbtn}>
                                <i className="fas fa-plus" />
                            </div>
                            <div className="m-2 p-4 rounded-lg d-flex align-items-center">
                                <span>Add new or exist card</span>
                            </div>
                        </div> : null}

                        <DisplayCardModule user={this.props.user} view={this.state} match={this.props.match}
                            correctSet={this.state.correctSet} set={this.props.sets} navigate={(e) => this.navigateCard(e)} />
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
        deleteTag: (tag) => {
            dispatch(deleteTag(tag))
        },
        editSet: (editHeading) => {
            dispatch(editSet(editHeading))
        }
    }
}

const connectedViewSet = connect(mapStateToProps, mapDispatchToProps)(ViewSet)
export { connectedViewSet as ViewSet };