import axios from "axios";

//export const ADD_FEEDBACK_DICTATIONCARD = "ADD_FEEDBACK_DICTATIONCARD";
export const ADD_FEEDBACK_FLASHCARD = "ADD_FEEDBACK_FLASHCARD";

export const EDIT_FEEDBACK_DICTATIONCARD = "EDIT_FEEDBACK_DICTATIONCARD"

export const DELETE_FEEDBACK_DICTATIONCARD = "DELETE_FEEDBACK_DICTATIONCARD";
export const DELETE_FEEDBACK_FLASHCARD = "DELETE_FEEDBACK_FLASHCARD";

export const addFeedbackThunk = (feedback) => async (dispatch) => {
    return axios.post("http://localhost:8080/api/card/submission/feedback", feedback)
    .then((data) => {        
        if (feedback.type === "dictationcard") {
            // dispatch({
            //     type: ADD_FEEDBACK_DICTATIONCARD,
            //     payload: {user_id: data.data.user_id, displayName: data.data.displayName, picture: data.data.picture, dictationcard_id: data.data.dictationcard_id, dictationcardSubmission_id: data.data.dictationcardSubmissionId, dictationcardFeedback_id: data.data.dictationcardFeedbackId, dictationcardFeedbackBody: data.data.dictationcardFeedbackBody}
            // })
        } else if (feedback.type === "flashcard") {
            dispatch({
                type: ADD_FEEDBACK_FLASHCARD,
                payload: {user_id: data.data.user_id, displayName: data.data.displayName, picture: data.data.picture, flashcard_id: data.data.flashcard_id, flashcardSubmission_id: data.data.flashcardSubmissionId, flashcardFeedback_id: data.data.flashcardFeedbackId, flashcardFeedbackBody: data.data.flashcardFeedbackBody, flashcardFeedbackTime: data.data.flashcardFeedbackTime}
            })
        }
    })
}

export const editFeedbackThunk = (feedback) => async (dispatch) => {
    return axios.put("http://localhost:8080/api/card/submission/feedback", feedback)
    .then((data) => {
        if (feedback.type === "dictationcard") {
            dispatch({
                type: EDIT_FEEDBACK_DICTATIONCARD,
                payload: {user_id: data.data.user_id, displayName: data.data.displayName, picture: data.data.picture, dictationcard_id: feedback.cardId, dictation_id:data.data.dictation_id, dictationSubmission_id: data.data.dictationSubmissionId, dictationFeedback_id: data.data.dictationFeedbackId, dictationFeedbackBody: data.data.dictationFeedbackBody}
            })
        } else {
        }
    })
}

export const deleteFeedbackThunk = (feedback) => async (dispatch) => {
    return axios.post("http://localhost:8080/api/card/submission/delfeedback", feedback)
    .then(response => {
        if (feedback.type === "dictationcard") {
            dispatch({
                type: DELETE_FEEDBACK_DICTATIONCARD,
                payload: {dictationcard_id: feedback.dictationcard_id, dictationcardSubmission_id: feedback.dictationcardSubmissionId, dictationcardFeedback_id: feedback.dictationcardFeedbackId}
            })
        } else if (feedback.type === "flashcard") {
            dispatch({
                type: DELETE_FEEDBACK_FLASHCARD,
                payload: {flashcard_id: feedback.flashcard_id, flashcardSubmission_id: feedback.flashcardSubmission_id, flashcardFeedback_id: feedback.feedbackId}
            })
        }
    })
}