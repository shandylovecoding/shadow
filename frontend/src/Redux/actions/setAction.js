import axios from "axios";

export const ADD_SET = "ADD_SET";
export const EDIT_SET = "EDIT_SET";
export const DELETE_SET = "DELETE_SET";

export const ADD_BRIDGE_CLASSROOM_SET = "ADD_BRIDGE_CLASSROOM_SET";

export const addSet = (set) => async (dispatch) => {
    const { data } = await axios.post("http://localhost:8080/api/set", set)
    const newId = data[0]
    if (set.classroomId === null || set.classroomId === undefined) {
        dispatch({ type: ADD_SET, payload: { id: newId, description: set.desc, title: set.title } });
    } else {
        const bridge = await axios.post("http://localhost:8080/api/bridge", {
            type: set.type,
            classroomId: set.classroomId,
            setId: newId
        })
        const newBridge = bridge.data
        dispatch({ type: ADD_SET, payload: { id: newId, description: set.desc, title: set.title } });
        dispatch({
            type: ADD_BRIDGE_CLASSROOM_SET,
            payload: { id: { classroom_id: set.classroomId }, content: { set_id: newBridge[0] } }
        })
    }

}

export const editSet = (set) => async (dispatch) => {
    const {data} = await axios.put("http://localhost:8080/api/set", set) 
    dispatch({ type: EDIT_SET, payload: data});
}

export const deleteSet = (set) => async (dispatch) => {

    await axios.post("http://localhost:8080/api/set/delete", set)
    .then(() => {
        dispatch({ type: DELETE_SET, payload: { set_id: set.id } });
    })
}

export const addSetBridge = (set) => async (dispatch) => {
   
    const { bridge } = await axios.post("http://localhost:8080/api/bridge", {
        type: set.type,
        classroomId: set.classroomId,
        setId: set.setId,
    })
    const newBridge = bridge[0]
    dispatch({
        type: ADD_BRIDGE_CLASSROOM_SET,
        payload: { id: { classroom_id: set.classroomId }, content: { set_id: set.setId, newBridge: newBridge } }
    })
}