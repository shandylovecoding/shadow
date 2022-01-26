import axios from "axios";

export const ADD_BRIDGE_CLASSROOM_SET = "ADD_BRIDGE_CLASSROOM_SET";
export const ADD_BRIDGE_SET_DICTATIONCARD = "ADD_BRIDGE_SET_DICTATIONCARD";
export const ADD_BRIDGE_SET_FLASHCARD = "ADD_BRIDGE_SET_FLASHCARD";
export const ADD_BRIDGE_SET_QUIZCARD = "ADD_BRIDGE_SET_QUIZCARD";

export const DELETE_BRIDGE_CLASSROOM_SET = "DELETE_BRIDGE_CLASSROOM_SET";
export const DELETE_BRIDGE_SET_DICTATIONCARD = "DELETE_BRIDGE_SET_DICTATIONCARD";
export const DELETE_BRIDGE_SET_FLASHCARD = "DELETE_BRIDGE_SET_FLASHCARD";
export const DELETE_BRIDGE_SET_QUIZCARD = "DELETE_BRIDGE_SET_QUIZCARD";

export const addBridgeThunk = (bridge) => async (dispatch) => {
    return axios.post("http://localhost:8080/api/bridge", bridge)
    .then(response => {
        if (bridge.type === "classroom_set") {
            dispatch({
                type: ADD_BRIDGE_CLASSROOM_SET,
                payload: {id:{classroom_id: parseInt(bridge.classroomId)}, content:{set_id: parseInt(bridge.setId)}}
            })
        } else if (bridge.type === "set_dictationcard") {
            dispatch({
                type: ADD_BRIDGE_SET_DICTATIONCARD,
                payload: {id:{set_id: bridge.setId}, content:{dictationcard_id: parseInt(bridge.dictationcardId)}}
            })
        } else if (bridge.type === "set_flashcard") {
            dispatch({
                type: ADD_BRIDGE_SET_FLASHCARD,
                payload: {id:{set_id: bridge.setId}, content:{flashcard_id: parseInt(bridge.flashcardId)}}
            })
        } else if (bridge.type === "set_quizcard") {
            dispatch({
                type: ADD_BRIDGE_SET_QUIZCARD,
                payload: {id:{set_id: bridge.setId}, content:{quizcard_id: parseInt(bridge.quizcardId)}}
            })
        } else {
        }
    })
}

export const deleteBridgeThunk = (bridge) => async (dispatch) => {
    return axios.post("http://localhost:8080/api/bridge/delete", bridge)
    .then(response => {
        if (bridge.type === "classroom_set") {
            if(bridge.classroomId === "" || bridge.classroomId === undefined){
                dispatch({
                    type: DELETE_BRIDGE_CLASSROOM_SET,
                    payload: {set_id: bridge.setId}
                })
            } else {
                dispatch({
                    type: DELETE_BRIDGE_CLASSROOM_SET,
                    payload: {classroom_id: parseInt(bridge.classroomId), set_id: bridge.setId}
                })
            }
        } else if (bridge.type === "set_dictationcard") {
            dispatch({
                type: DELETE_BRIDGE_SET_DICTATIONCARD,
                payload: {set_id: bridge.setId, dictationcard_id: bridge.cardId}
            })
        } else if (bridge.type === "set_flashcard") {
            dispatch({
                type: DELETE_BRIDGE_SET_FLASHCARD,
                payload: {set_id: bridge.setId, flashcard_id: bridge.cardId}
            })
        } else if (bridge.type === "set_quizcard") {
            dispatch({
                type: DELETE_BRIDGE_SET_QUIZCARD,
                payload: {set_id: bridge.setId, quizcard_id: bridge.cardId}
            })
        }
    })
}