
import {
    ADD_DICTATIONCARD,
    ADD_FLASHCARD,
    ADD_QUIZCARD
} from "../actions/cardAction";
import {
    EDIT_DICTATIONCARD,
    EDIT_FLASHCARD,
    EDIT_QUIZCARD
} from "../actions/cardAction";
import {
    DELETE_DICTATIONCARD,
    DELETE_FLASHCARD,
    DELETE_QUIZCARD
} from "../actions/cardAction";
import {
    GETDATACARDS_SUCCESS,
    GETDATACARDS_FAILURE
} from "../actions/action"

import{
    ADD_FEEDBACK_DICTATIONCARD,
    ADD_SUBMISSION_DICTATIONCARD,
    ADD_SUBMISSION_FLASHCARD,
    ADD_SUBMISSION_QUIZCARD,
    DELETE_SUBMISSION_DICTATIONCARD,
    DELETE_SUBMISSION_FLASHCARD,
    DELETE_SUBMISSION_MULTIPLECHOICE,
    DELETE_SUBMISSION_TRUEFALSE
} from "../actions/submissionAction"

import {
  
    ADD_FEEDBACK_FLASHCARD,
    EDIT_FEEDBACK_DICTATIONCARD,
    DELETE_FEEDBACK_DICTATIONCARD,
    DELETE_FEEDBACK_FLASHCARD
} from "../actions/feedbackAction"


const initialState = {
    loading: false,
    card: {
        flashcard: [],
        quizcard: [],
        dictationcard: []
    }
};

export function cardReducer(state = initialState, action) {
    switch (action.type) {
        case GETDATACARDS_SUCCESS:
            return {
                ...state,
                loading: false,

                    card: action.payload
            };

        case GETDATACARDS_FAILURE:
            return {
                ...state,
                loading: false,

                    isAuthenticated: false
            };
        case ADD_DICTATIONCARD:
            return {
                card: {
                    ...state.card,
                    dictationcard: [...state.card.dictationcard, action.payload]
                }
            };

        case ADD_FLASHCARD:
            return {
                card: {
                    ...state.card,
                    flashcard: [...state.card.flashcard, action.payload]
                }
            };

        case ADD_QUIZCARD:
            return {
                card: {
                    ...state.card,
                    quizcard: [...state.card.quizcard, action.payload]
                }
            };

        case EDIT_DICTATIONCARD:
            var newCard = action.payload.content;
            var newArray = state.card.dictationcard.filter((dictationcard) => dictationcard.dictationcard_id !== newCard.dictationcard_id);
            newArray.push(newCard)
            return {
                card: {
                    ...state.card,
                    dictationcard: newArray
                }
            }

        case EDIT_FLASHCARD:
            var newFlashcard = action.payload.content;
            var newFlashcardArray = state.card.flashcard.filter((flashcard) => flashcard.flashcard_id !== newFlashcard.flashcard_id);
            newFlashcardArray.push(newFlashcard)
            return {
                card: {
                    ...state.card,
                    flashcard: newFlashcardArray
                }
            }

        case EDIT_QUIZCARD:
            var newQuizcard = action.payload.content;
            var newQuizcardArray = state.card.quizcard.filter((quizcard) => quizcard.quizcard_id !== newQuizcard.quizcard_id);
            newArray.push(newQuizcard)
            return {
                card: {
                    ...state.card,
                    quizcard: newQuizcardArray
                }
            }


        case DELETE_DICTATIONCARD:
            return {
                card: {
                    ...state.card,
                    dictationcard: state.card.dictationcard.filter((dictationcard) => dictationcard.id !== action.payload.dictationcard_id)
                }
            };
        case DELETE_FLASHCARD:
            return {
                card: {
                    ...state.card,
                    flashcard: state.card.flashcard.filter((flashcard) => flashcard.id !== action.payload.flashcard_id)
                }
            };
        case DELETE_QUIZCARD:
            return {
                card: {
                    ...state.card,
                    quizcard: state.card.quizcard.filter((quizcard) => quizcard.id !== action.payload.quizcard_id)
                }
            };
        case ADD_SUBMISSION_FLASHCARD:
            action.payload.feedback = []
            return {
                card:{
                    ...state.card,
                    flashcard: state.card.flashcard.map((flashcard) => {
                        if(flashcard.id === action.payload.flashcard_id){
                            return {
                                ...flashcard,
                                submission:[...flashcard.submission, action.payload]
                            }
                        }
                        return flashcard
                    })
                }
            }
        case ADD_SUBMISSION_DICTATIONCARD:
            return {
                card:{
                    ...state.card,
                    dictationcard: state.card.dictationcard.map((dictationcard) => {
                        if(dictationcard.id === action.payload.dictationcard_id){
                            dictationcard.questions.map((question) => {
                            if(question.id === action.payload.dictation_id){
                            return {
                                ...question,
                                submission:[...question.submission, action.payload]
                            }
                        }
                        return question
                    })
                }
                    return dictationcard
                    })
                }
            }

        case ADD_SUBMISSION_QUIZCARD:
            return {
                card:{
                    ...state.card,
                    quizcard: state.card.quizcard.map((quizcard) => {
                        if(quizcard.id === action.payload.quizcard_id){
                            quizcard.question.map((question)=>{
                                if(question.id === action.payload.question_id){
                                    return {
                                        ...question,
                                        submission:[...question.submission, action.payload]
                                    }
                                }
                                return question
                            })
                        }
                        return quizcard
                    })
                }
            }
    
        case DELETE_SUBMISSION_FLASHCARD:
            return {
                card:{
                    ...state.card,
                    flashcard: state.card.flashcard.map((flashcard) => {
                        if(flashcard.flashcard_id === action.payload.flashcard_id){
                            return{
                                ...flashcard,
                                submission: flashcard.submission.filter((submission) => submission.flashcardSubmission_id !== action.payload.flashcardSubmission_id)
                            }
                        }
                        return flashcard
                    })
                }
            }
        
        case DELETE_SUBMISSION_DICTATIONCARD:
            return {
                card:{
                    ...state.card,
                    dictationcard: state.card.dictationcard.map((dictationcard) => {
                        if(dictationcard.dictationcard_id === action.payload.dictationcard_id){
                            return{
                                ...dictationcard,
                                submission: dictationcard.submission.filter((submission) => submission.dictationcardSubmission_id !== action.payload.dictationcardSubmission_id)
                            }
                        }
                        return dictationcard;
                    })
                }
            }

        case DELETE_SUBMISSION_MULTIPLECHOICE:
            return {
                card:{
                    ...state.card,
                    flashcard: state.card.flashcard.multipleChoice.map((multipleChoice) => {
                        if(multipleChoice.multipleChoice_id === action.payload.multipleChoice_id){
                            return {
                                ...multipleChoice,
                                submission: multipleChoice.submission.filter((submission) => submission.multipleChoiceSubmission_id !== action.payload.multipleChoiceSubmission_id)
                            }
                        }
                        return multipleChoice
                    })
                }
            }

        case DELETE_SUBMISSION_TRUEFALSE:
            return {
                card:{
                    ...state.card,
                    flashcard: state.card.flashcard.trueFalse.map((trueFalse) => {
                        if(trueFalse.trueFalse_id === action.payload.trueFalse_id){
                            return{
                                ...trueFalse,
                                submission: trueFalse.submission.filter((submission) => submission.trueFalseSubmission_id !== action.payload.trueFalseSubmission_id)
                            }
                        }
                        return trueFalse
                    })
                }
            }
        
        case ADD_FEEDBACK_FLASHCARD:
            return {
                card:{
                    ...state.card,
                    flashcard: state.card.flashcard.map((flashcard) => {

                        if(flashcard.id === action.payload.flashcard_id){
                            return {
                                ...flashcard,
                                submission: flashcard.submission.map((submission) => {
                                    if(submission.id === action.payload.flashcardSubmission_id){
                                        return {
                                            ...submission, 
                                            feedback: [...submission.feedback, action.payload]
                                        }
                                    }
                                    return submission                                 
                                })
                            }
                        }
                        return flashcard
                    })
                }
            }

        case ADD_FEEDBACK_DICTATIONCARD:
            return {
                card:{
                    ...state.card,
                    dictationcard: state.card.dictationcard.map((dictationcard) => {
                        if(dictationcard.id === action.payload.dictationcard_id){
                            return {
                                ...dictationcard,
                                questions: dictationcard.questions.map((question) => {
                                    if(question.id === action.payload.dictation_id){
                                        return {
                                            ...question, 
                                            submission: question.submission.map((submission) => {
                                                return {
                                                    ...submission,
                                                    feedback: action.payload
                                                } 
                                            })
                                        }
                                    }
                                  return question
                                })
                            }
                        }
                        return dictationcard
                    })
                }
            }
        
            case EDIT_FEEDBACK_DICTATIONCARD:
                return {
                    card:{
                        ...state.card,
                        dictationcard: state.card.dictationcard.map((dictationcard) => {
                            if(dictationcard.id === action.payload.dictationcard_id){
                                return {
                                    ...dictationcard,
                                    questions: dictationcard.questions.map((question) => {
                                        if(question.id === action.payload.dictation_id) {
                                            return {
                                                ...question,
                                                submission: question.submission.map((submission) => {
                                                    if(submission.id === action.payload.dictationSubmission_id){
                                                        return {
                                                            ...submission, 
                                                            feedback: [action.payload]
                                                        }
                                                    }
                                                  return submission
                                                })
                                            }
                                        }
                                        return question
                                    })
                                }
                            }
                            return dictationcard
                        })
                    }
                }

        case DELETE_FEEDBACK_FLASHCARD:
            return {
                card:{
                    ...state.card,
                    flashcard: state.card.flashcard.map((flashcard) => {
                        if(flashcard.id === action.payload.flashcard_id){
                            return {
                                ...flashcard,
                                submission: flashcard.submission.map((submission) => {
                                    if(submission.id === action.payload.flashcardSubmission_id){
                                        return {
                                            ...submission, 
                                            feedback: submission.feedback.filter((feedback) => feedback.flashcardFeedback_id !== action.payload.flashcardFeedback_id )
                                        }
                                    }
                                    return submission
                                  
                                })
                            }
                        }
                        return flashcard
                    })
                }
            }

        case DELETE_FEEDBACK_DICTATIONCARD:
            return {
                card:{
                    ...state.card,
                    dictationcard: state.card.dictationcard.map((dictationcard) => {
                        if(dictationcard.dictationcard_id === action.payload.dictationcard_id){
                            return {
                                ...dictationcard,
                                submission: dictationcard.submission.map((submission) => {
                                    if(submission.dictationcardSubmission_id === action.payload.dictationcardSubmission_id){
                                        return {
                                            ...submission, 
                                            feedback: submission.feedback.filter((feedback) => feedback.dictationcardFeedback_id !== action.payload.dictationcardFeedback_id )
                                        }
                                    }
                                    return submission
                                  
                                })
                            }
                        }
                        return dictationcard
                    })
                }
            }

        default:
            return state;
    }

}