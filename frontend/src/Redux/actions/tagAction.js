import axios from "axios";

export const ADD_TAG = "ADD_TAG";
export const ADD_TAG_CLASSROOM = "ADD_TAG_CLASSROOM";
export const ADD_TAG_SET = "ADD_TAG_SET";

export const DELETE_TAG = "DELETE_TAG";
export const DELETE_TAG_CLASSROOM = "DELETE_TAG_CLASSROOM";
export const DELETE_TAG_SET = "DELETE_TAG_SET";

export const addTag = (tag) => async (dispatch) => {

    const { data } = await axios.post(`http://localhost:8080/api/tag/`, tag)

    dispatch({ type: ADD_TAG, payload: { tagId: data, tagBody: tag.tagBody } });

    if (tag.type === "class") {

        dispatch({ type: ADD_TAG_CLASSROOM, payload: { id: { classroom_id: tag.classroomId }, content: { id: data, body: tag.tagBody } } });
    }
    if (tag.type === "set") {
        dispatch({ type: ADD_TAG_SET, payload: { id: { set_id: tag.setId }, content: { id: data, body: tag.tagBody } } });
    }

}


export const deleteTag = (tag) => async (dispatch) => {

    await axios.post(`http://localhost:8080/api/tag/deltag`, tag)
    dispatch({ type: DELETE_TAG, payload: { tagId: tag.tagId ,  classroomId : tag.classroomId} });
    if (tag.type === "class") {
        dispatch({ type: DELETE_TAG_CLASSROOM, payload: { id: { classroom_id: tag.classroomId }, content: { tagId: tag.tagId, tagBody: tag.tagBody } } });
    }
    if (tag.type === "set") {
        dispatch({ type: DELETE_TAG_SET, payload: { id: { set_id: tag.setId }, content: { tagId: tag.tagId, tagBody: tag.tagBody } } });
    }

}

