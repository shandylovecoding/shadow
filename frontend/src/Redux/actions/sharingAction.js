import axios from "axios";

export const ADD_SHARING = "ADD_SHARING";
export const DELETE_SHARING = "DELETE_SHARING";

export const addSharingThunk = (sharing) => async (dispatch) => {
    return axios.post("http://localhost:8080/api/sharing", sharing)
    .then((response) => {

        dispatch({
                type: ADD_SHARING,
                payload: response.data
            })
    })
}

export const deleteSharingThunk = (sharing) => async (dispatch) => {
    await axios.post("http://localhost:8080/api/sharing/del", sharing)
    dispatch({
                type: DELETE_SHARING,
                payload: {id: sharing.sharedId, classroom_id: sharing.classroomId}
            })
    
  
}