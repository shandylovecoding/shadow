import { GETDATAUSER_SUCCESS, GETDATAUSER_FAILURE } from "../actions/action";
import { EDIT_USER_DISPLAYNAME, EDIT_USER_EMAIL, UPLOAD_PICTURE } from "../actions/userAction";

const initialState = {
    user: [],
};

export function userReducer(state = initialState, action){
    switch(action.type){
        
        //Initial get
        case GETDATAUSER_SUCCESS:
            return {
              ...state,
              loading: false,
              user: action.payload
            };
          case GETDATAUSER_FAILURE:
            return {
              ...state,
              loading: false,
              isAuthenticated: false
            };
          case EDIT_USER_DISPLAYNAME:
            return {
              ...state,
              user: {
                ...state.user,
                displayName: action.payload.displayName}
            }
            case EDIT_USER_EMAIL:
              return {
                ...state,
                user: {
                  ...state.user,
                  email: action.payload.email}
              }
              case UPLOAD_PICTURE:
                return {
                  ...state,
                  user: {
                    ...state.user,
                    picture: action.payload.picture
                  }
                }
        
        default:
            return state;
        }
}