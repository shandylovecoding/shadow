import axios from 'axios';

export const GETDATACLASSROOMS_SUCCESS = 'GETDATACLASSROOMS_SUCCESS';
export const GETDATASETS_SUCCESS = 'GETDATASETS_SUCCESS';
export const GETDATACARDS_SUCCESS = 'GETDATACARDS_SUCCESS';
export const GETDATATAGS_SUCCESS = 'GETDATATAGS_SUCCESS';
export const GETDATAUSER_SUCCESS = 'GETDATAUSER_SUCCESS';
export const GETDATACLASSROOMS_FAILURE = 'GETDATACLASSROOMS_FAILURE';
export const GETDATASETS_FAILURE = 'GETDATASETS_FAILURE';
export const GETDATACARDS_FAILURE = 'GETDATACARDS_FAILURE';
export const GETDATATAGS_FAILURE = 'GETDATATAGS_FAILURE';
export const GETDATAUSER_FAILURE = 'GETDATAUSER_FAILURE';

export function getdataThunk(email) {
  return (dispatch) => {
    return axios.post(`${process.env.REACT_APP_API_SERVER}/api/shadow`, email)
    .then(response => {
      if (response.data == null) {
        dispatch({type: GETDATACLASSROOMS_FAILURE});
        dispatch({type: GETDATASETS_FAILURE});
        dispatch({type: GETDATACARDS_FAILURE});
        dispatch({type: GETDATATAGS_FAILURE});
        dispatch({type: GETDATAUSER_FAILURE});
      } else {
        dispatch({type: GETDATACLASSROOMS_SUCCESS, payload: response.data.classrooms})
        dispatch({type: GETDATASETS_SUCCESS, payload: response.data.sets})
        dispatch({type: GETDATACARDS_SUCCESS, payload: response.data.cards})
        dispatch({type: GETDATATAGS_SUCCESS, payload: response.data.tags})
        dispatch({type: GETDATAUSER_SUCCESS, payload: response.data.user})
      }
    })
  }
}
