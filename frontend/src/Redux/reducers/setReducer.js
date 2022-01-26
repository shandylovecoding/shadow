import { ADD_SET } from "../actions/setAction";
import { EDIT_SET } from "../actions/setAction";
import { DELETE_SET } from "../actions/setAction";
import { GETDATASETS_SUCCESS, GETDATASETS_FAILURE } from "../actions/action";
import { ADD_TAG_SET, DELETE_TAG_SET } from "../actions/tagAction";
import { ADD_BRIDGE_SET_FLASHCARD, ADD_BRIDGE_SET_QUIZCARD, ADD_BRIDGE_SET_DICTATIONCARD } from "../actions/bridgeAction";
import { DELETE_BRIDGE_SET_FLASHCARD, DELETE_BRIDGE_SET_QUIZCARD, DELETE_BRIDGE_SET_DICTATIONCARD } from "../actions/bridgeAction";

const initialState = {
    sets: []
};

export function setReducer(state = initialState, action){
    switch(action.type){
        case GETDATASETS_SUCCESS:
            return {
                ...state,
                loading: false,
                sets: action.payload
              };
        case GETDATASETS_FAILURE:
            return {
                ...state,
                loading: false,
                isAuthenticated: false
              };
        case ADD_SET:
            return {
                sets: [...state.sets, action.payload]
            };
        case EDIT_SET:
            return {
                sets: action.payload
            };
        case DELETE_SET:
            return {
                sets: state.sets.filter((set) => {
                    return set.id !== action.payload.set_id;
                })
            }
        case ADD_TAG_SET:
            return {
                sets: state.sets.map((set) => {
                    if(action.payload.id.set_id === set.id){
                        return {
                            ...set, tags:[...set.tags, action.payload.content]
                        }
                    }
                    return set
                })
            }
        case DELETE_TAG_SET:
            return{
                sets: state.sets.map((set) => {
                    if(action.payload.id.set_id === set.id){
                        return {
                            ...set, tags:set.tags.filter((tag) => tag.id !== action.payload.content.tagId)
                        }
                    }
                    return set
                })
            }
        case ADD_BRIDGE_SET_FLASHCARD:
                return {
                    sets: state.sets.map((set) => {
                        if(action.payload.id.set_id === set.id){
                            return {
                                ...set, bridge_flashcard:[...set.bridge_flashcard, action.payload.content]
                            }
                        }
                        return set
                    })
                }
        case ADD_BRIDGE_SET_QUIZCARD:
            return {
                sets: state.sets.map((set) => {
                    if(action.payload.id.set_id === set.id){
                        return {
                            ...set, bridge_quizcard:[...set.bridge_quizcard, action.payload.content]
                        }
                    }
                    return set
                })
            }
        case ADD_BRIDGE_SET_DICTATIONCARD:
            return {
                sets: state.sets.map((set) => {
                    if(action.payload.id.set_id === set.id){
                        return {
                            ...set, bridge_dictationcard:[...set.bridge_dictationcard, action.payload.content]
                        }
                    }
                    return set
                })
            }

        case DELETE_BRIDGE_SET_FLASHCARD:
            return{
                sets: state.sets.map((set) => {
                    if(action.payload.set_id !== undefined){
                        if(action.payload.set_id === set.id){
                            return {
                                ...set, bridge_flashcard:set.bridge_flashcard.filter((flashcard) => flashcard.flashcard_id !== action.payload.flashcard_id)
                            }
                        }
                        return set
                    } else {
                        return {
                            ...set, bridge_flashcard:set.bridge_flashcard.filter((flashcard) => flashcard.flashcard_id !== action.payload.flashcard_id)
                        }
                    }
                })
            }
        case DELETE_BRIDGE_SET_QUIZCARD:
            return{
                sets: state.sets.map((set) => {
                    if(action.payload.set_id !== undefined){
                        if(action.payload.set_id === set.id){
                                return {
                                ...set, bridge_quizcard:set.bridge_quizcard.filter((quizcard) => quizcard.quizcard_id !== action.payload.quizcard_id)
                            }
                        }
                        return set
                    } else {
                        return {
                            ...set, bridge_quizcard:set.bridge_quizcard.filter((quizcard) => quizcard.quizcard_id !== action.payload.quizcard_id)
                        } 
                    }
                })
            }
        case DELETE_BRIDGE_SET_DICTATIONCARD:
            return{
                sets: state.sets.map((set) => {
                    if(action.payload.set_id !== undefined){
                        if(action.payload.set_id === set.id){
                            return {
                                ...set, bridge_dictationcard:set.bridge_dictationcard.filter((dictationcard) => dictationcard.dictationcard_id !== action.payload.dictationcard_id)
                            }
                        }
                        return set
                    } else {
                        return {
                            ...set, bridge_dictationcard:set.bridge_dictationcard.filter((dictationcard) => dictationcard.dictationcard_id !== action.payload.dictationcard_id)
                        }
                    }
                })
            }
        default:
            return state;
        }
}