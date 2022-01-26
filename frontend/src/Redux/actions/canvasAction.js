import axios from "axios";

export const SUBMIT_CANVAS = "SUBMIT_CANVAS";

export const submitCanvas = (data) => async (dispatch) => {
    const config = {
        headers: { 'Content-Type': 'multipart/form-data' }
    }
    return axios.post("http://localhost:8080/api/upload/canvas", data, config)
    .then(response => {
    })
}