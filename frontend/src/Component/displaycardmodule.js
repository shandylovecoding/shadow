import React from 'react';
import { connect } from 'react-redux'
// Require Action
import { getdataThunk } from '../Redux/actions/action'
import { addBridgeThunk } from '../Redux/actions/bridgeAction'
import { deleteCard } from '../Redux/actions/cardAction';
import { deleteBridgeThunk } from '../Redux/actions/bridgeAction';
// Require Css
import classes from './displaycardmodule.module.css'

class PureDisplayCardModule extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            correctExist: []
        }
    }
    componentDidMount(){
        this.verify()
    }
    verify(){
        if(this.props.display === "addExist"){
            const shallowCard = this.props.allCard
            const shallowBridge = this.props.correctSet[0]
            const onlyCard = {}
            if(shallowCard.flashcard.length > 0){
                onlyCard.onlyFlash = shallowCard.flashcard.filter(this.flashCompare(shallowBridge.bridge_flashcard))
            }
            if(shallowCard.quizcard.length > 0){
                onlyCard.onlyQuiz = shallowCard.quizcard.filter(this.quizCompare(shallowBridge.bridge_quizcard))
            }
            if(shallowCard.dictationcard.length > 0){
                onlyCard.onlyDict = shallowCard.dictationcard.filter(this.dictCompare(shallowBridge.bridge_dictationcard))
            }
            this.setState({
                correctExist: [onlyCard]
            })
        }
    }
    flashCompare(nextArr){
        return function(current){
            return nextArr.filter((next)=>{
                return next.flashcard_id === current.id
            }).length === 0
        }
    }
    quizCompare(nextArr){
        return function(current){
            return nextArr.filter((next)=>{
                return next.quizcard_id === current.id
            }).length === 0
        }
    }
    dictCompare(nextArr){
        return function(current){
            return nextArr.filter((next)=>{
                return next.dictationcard_id === current.id
            }).length === 0
        }
    }
    addFlashConnect(e){
        this.props.addBridge({
            type: "set_flashcard",
            setId: parseInt(this.props.match.params.id),
            flashcardId: e.target.attributes["data-key"].value
        })
    }
    addQuizConnect(e){
        this.props.addBridge({
            type: "set_quizcard",
            setId:  parseInt(this.props.match.params.id),
            quizcardId: e.target.attributes["data-key"].value
        })
    }
    addDictationcardConnect(e){
        this.props.addBridge({
            type: "set_dictationcard",
            setId:  parseInt(this.props.match.params.id),
            dictationcardId: e.target.attributes["data-key"].value
        })
    }
    deleteCard(e, cardId) {
        if(e.target.attributes['data-type'].value === "flashcard"){
            this.props.deleteCard({
                type: "flashcard",
                id: cardId,
            })
        } else if(e.target.attributes['data-type'].value === "quizcard"){
            this.props.deleteCard({
                type: "quizcard",
                id: cardId,
            })
        } else if(e.target.attributes['data-type'].value === "dictationcard"){
            this.props.deleteCard({
                type: "dictationcard",
                id: cardId,
            })
        }
        this.deleteBridge(e, cardId)
    }
    deleteBridge(e, cardId) {
        if(e.target.attributes['data-type'].value === "flashcard"){
            if(this.props.match.params.id !== undefined){
                this.props.deleteBridge({
                    type: "set_flashcard",
                    cardId: cardId,
                    setId: parseInt(this.props.match.params.id)
                })
            } else {
                this.props.deleteBridge({
                    type: "set_flashcard",
                    cardId: cardId
                })
            }
        } else if (e.target.attributes['data-type'].value === "quizcard"){
            if(this.props.match.params.id !== undefined){
                this.props.deleteBridge({
                    type: "set_quizcard",
                    cardId: cardId,
                    setId: parseInt(this.props.match.params.id)
                })
            } else {
                this.props.deleteBridge({
                    type: "set_quizcard",
                    cardId: cardId
                })
            }
        } else if (e.target.attributes['data-type'].value === "dictationcard"){
            if(this.props.match.params.id !== undefined){
                this.props.deleteBridge({
                    type: "set_dictationcard",
                    cardId: cardId,
                    setId: parseInt(this.props.match.params.id)
                })
            } else {
                this.props.deleteBridge({
                    type: "set_dictationcard",
                    cardId: cardId
                })
            }
        }
    }

    render() {
        return (
            <>
                {/* flashcard */}
                {this.props.allCard && this.props.allCard.flashcard.length > 0 && this.state.correctExist.length > 0 && this.state.correctExist[0].onlyFlash !== undefined ? this.state.correctExist[0].onlyFlash.map((card, i) => {
                    
                    //add exist
                    return (
                        <div key={i} data-key={card.id} data-del="" data-type="flashcard" className={classes.flashcard} onClick={(e)=>{ this.addFlashConnect(e); this.props.toggle(e) }}>
                            <h4 data-key={card.id} data-del="" data-type="flashcard">{card.flashcardTitle} </h4>
                            <p data-key={card.id} data-del="" data-type="flashcard">{card.flashcardBody}</p>
                        </div>
                    )
                }): 
                this.props.view && this.props.view.correctflashCard.length > 0 ? this.props.view.correctflashCard.map((card, i) => {
                    
                    //view set
                    return (
                        <div key={i} data-key={card.id} data-del="" data-type="flashcard" className={classes.flashcard} onClick={(e)=>{this.props.navigate(e)}}>

                            <h4 data-key={card.id} data-del="" data-type="flashcard">{card.flashcardTitle}</h4>
                            {this.props.user.role === "teacher" ?   <span data-del="delete" data-type="flashcard" onClick={(e)=>this.deleteBridge(e, card.id)} className={classes.deletebtn}><i data-del="delete" data-type="flashcard" className="fas fa-times"></i></span> : null}

                            <p data-key={card.id} data-del="" data-type="flashcard">{card.flashcardBody}</p>
                        </div>
                    )
                })
                : this.props.dash === "dashSet" && this.props.cards.flashcard && this.props.cards.flashcard.length > 0 ? this.props.cards.flashcard.map((card, i)=>{
                    
                    //dashboard
                    return (
                        <div key={i} data-key={card.id} data-del="" data-type="flashcard" className={classes.flashcard} onClick={(e)=>{this.props.navigate(e)}}>
                            <h4 data-key={card.id} data-del="" data-type="flashcard">{card.flashcardTitle} </h4>
                            {this.props.user.role === "teacher" ?  <span data-del="delete" data-type="flashcard" onClick={(e)=>this.deleteCard(e, card.id)} className={classes.deletebtn}><i data-del="delete" data-type="flashcard" className="fas fa-times"></i></span> : null}
                            <p data-key={card.id} data-del="" data-type="flashcard">{card.flashcardBody}</p>
                        </div>
                    )
                }) : null
                }

                {/* quizcard */}
                {this.props.allCard && this.props.allCard.quizcard.length > 0 && this.state.correctExist.length > 0 ? this.state.correctExist[0].onlyQuiz.map((card, i) => {
                    return (
                        <div key={i} data-key={card.id} data-del="" data-type="quizcard" className={classes.quizcard} onClick={(e)=>{ this.addQuizConnect(e);this.props.toggle(e) }}>
                            <h4 data-key={card.id} data-del="" data-type="quizcard">{card.quizcardTitle} </h4>
                        </div>
                    )
                }): 
                this.props.view && this.props.view.correctquizCard.length > 0 ? this.props.view.correctquizCard.map((card, i) => {
                    return (
                        <div key={i} data-key={card.id} data-del="" data-type="quizcard" className={classes.quizcard} onClick={(e)=>{this.props.navigate(e)}}>
                            <h4 data-key={card.id} data-del="" data-type="quizcard">{card.quizcardTitle}</h4>
                            {this.props.user.role === "teacher" ? <span data-del="delete" data-type="quizcard" onClick={(e)=>this.deleteBridge(e, card.id)} className={classes.deletebtn} ><i data-del="delete" data-type="quizcard" className="fas fa-times"></i></span> :null}

                        </div>
                    )
                })
                : this.props.dash === "dashSet" && this.props.cards.quizcard && this.props.cards.quizcard.length > 0 ? this.props.cards.quizcard.map((card, i)=>{
                    return (
                        <div key={i} data-key={card.id} data-del="" data-type="quizcard" className={classes.quizcard} onClick={(e)=>{this.props.navigate(e)}}>
                            <h4 data-key={card.id} data-del="" data-type="quizcard">{card.quizcardTitle} </h4>
                            {this.props.user.role === "teacher" ?  <span data-del="delete" data-type="quizcard"  onClick={(e)=>this.deleteCard(e, card.id)} className={classes.deletebtn}><i data-del="delete" data-type="quizcard" className="fas fa-times"></i></span> : null}
                        </div>
                    )
                }) : null
                }
                {/* dictationcard */}
                {this.props.allCard && this.props.allCard.dictationcard.length > 0 && this.state.correctExist.length > 0 ? this.state.correctExist[0].onlyDict.map((card, i) => {
                    return (
                        <div key={i} data-key={card.id} data-del="" data-type="dictationcard" className={classes.dictationcard} onClick={(e)=>{ this.addDictationcardConnect(e);this.props.toggle(e) }}>
                            <h4 data-key={card.id} data-del="" data-type="dictationcard">{card.dictationcardTitle}</h4>
                            <p data-key={card.id} data-del="" data-type="dictationcard">{card.dictationBody}</p>
                        </div>
                    )
                }): 
                this.props.view && this.props.view.correctdictationCard.length > 0 ? this.props.view.correctdictationCard.map((card, i) => {
                    return (
                        <div key={i} data-key={card.id} data-del="" data-type="dictationcard" className={classes.dictationcard} onClick={(e)=>{this.props.navigate(e)}}>


                            <h4 data-key={card.id} data-del="" data-type="dictationcard">{card.dictationcardTitle}</h4>

                            {this.props.user.role === "teacher" ? <span data-del="delete" data-type="dictationcard" onClick={(e)=>this.deleteBridge(e, card.id)} className={classes.deletebtn}><i data-del="delete" data-type="dictationcard" className="fas fa-times"></i></span> : null}

                            <p data-key={card.id} data-del="" data-type="dictationcard">{card.dictationBody}</p>
                        </div>
                    )
                })
                : this.props.dash === "dashSet" && this.props.cards.dictationcard && this.props.cards.dictationcard.length > 0 ? this.props.cards.dictationcard.map((card, i)=>{
                    return (
                        <div key={i} data-key={card.id} data-del="" data-type="dictationcard" className={classes.dictationcard} onClick={(e)=>{this.props.navigate(e)}}>
                            <h4 data-key={card.id} data-del="" data-type="dictationcard">{card.dictationcardTitle} </h4>
                            {this.props.user.role === "teacher" ? <span data-del="delete" data-type="dictationcard" onClick={(e)=>this.deleteCard(e, card.id)} className={classes.deletebtn}><i data-del="delete" data-type="dictationcard" onClick={(e)=>this.deleteCard(e, card.id)} className="fas fa-times"></i></span> : null}
                            <p data-key={card.id} data-del="" data-type="dictationcard">{card.dictationBody}</p>
                        </div>
                    )
                }) : null
                }
            </>

        );
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addBridge: (bridge) => {
            dispatch(addBridgeThunk(bridge))
        },
        getdata: (email) => {
            dispatch(getdataThunk(email))
        },
        deleteCard: (card) => {
            dispatch(deleteCard(card))
        },
        deleteBridge: (link) => {
            dispatch(deleteBridgeThunk(link))
        }
    }
}

export const DisplayCardModule = connect(null, mapDispatchToProps)(PureDisplayCardModule)
