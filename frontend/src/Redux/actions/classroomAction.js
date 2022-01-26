import axios from "axios";

export const ADD_CLASSROOM = "ADD_CLASSROOM";
export const EDIT_CLASSROOM = "EDIT_CLASSROOM";
export const DELETE_CLASSROOM = "DELETE_CLASSROOM";

export const addClassroom = (classroom) => async (dispatch) => {

    const { data } = await axios.post("http://localhost:8080/api/classroom", classroom);
    const newId = data[0];
    dispatch({ type: ADD_CLASSROOM, payload: { id: newId, description: classroom.description, title: classroom.title } });
}

export const editClassroom = (classroom) => async (dispatch) => {

    await axios.put("http://localhost:8080/api/classroom", classroom)
        .then((response) => {
            dispatch({ type: EDIT_CLASSROOM, payload: response.data });
        })
}

export const deleteClassroom = (classroom) => async (dispatch) => {

    await axios.post("http://localhost:8080/api/classroom/delete", classroom)
        .then(() => {
            dispatch({ type: DELETE_CLASSROOM, payload: { classroom_id: classroom.id } });
        })
}
