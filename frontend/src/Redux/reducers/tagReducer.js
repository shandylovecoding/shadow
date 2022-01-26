import { ADD_TAG } from "../actions/tagAction";
import { DELETE_TAG } from "../actions/tagAction";
import { GETDATATAGS_SUCCESS, GETDATATAGS_FAILURE } from "../actions/action";

const initialState = {
    tags: [],
};

export function tagReducer(state = initialState, action){
    switch(action.type){
        
        //Initial get
        case GETDATATAGS_SUCCESS:
            return {
              ...state,
              loading: false,
              tags: action.payload
            };
        case GETDATATAGS_FAILURE:
            return {
              ...state,
              loading: false,
              isAuthenticated: false
            };
        
        case ADD_TAG:
                return {
                    tags: [...state.tags, action.payload]
                };
            
        case DELETE_TAG:
            var newTags = state.tags;

            for (let i=0; i<newTags.length; i++){
                if(action.payload.tagId === newTags[i].tagId){

                    newTags.splice(i, 1);
                    break;
                }
            }
            return {
                tags: newTags
            }
            
        default:
            return state;
        }
}