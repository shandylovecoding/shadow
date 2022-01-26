import { ADD_CLASSROOM } from "../actions/classroomAction";
import { EDIT_CLASSROOM } from "../actions/classroomAction";
import { DELETE_CLASSROOM } from "../actions/classroomAction";
import { GETDATACLASSROOMS_SUCCESS, GETDATACLASSROOMS_FAILURE } from "../actions/action";
import { ADD_TAG_CLASSROOM, DELETE_TAG_CLASSROOM } from "../actions/tagAction";
import { ADD_SHARING, DELETE_SHARING } from "../actions/sharingAction";

import { DELETE_BRIDGE_CLASSROOM_SET } from "../actions/bridgeAction";
import { ADD_BRIDGE_CLASSROOM_SET } from "../actions/setAction";


const initialState = {
    classrooms: []
};

export function classroomReducer(state = initialState, action){
    switch(action.type){
        case GETDATACLASSROOMS_SUCCESS:
            return {
                ...state,
                loading: false,
                classrooms: action.payload
              };
        case GETDATACLASSROOMS_FAILURE:
            return {
                ...state,
                loading: false,
                isAuthenticated: false
              };
        case ADD_CLASSROOM:
            return {
                classrooms: [...state.classrooms, action.payload]
            };
        case EDIT_CLASSROOM:
           
            return{
                classrooms: action.payload
            }
        case DELETE_CLASSROOM:
            return {
                classrooms: state.classrooms.filter((classroom) => {
                    return classroom.id !== action.payload.classroom_id;
                })
            }
        case ADD_TAG_CLASSROOM:
            return {
                classrooms: state.classrooms.map((classroom) => {
                    if(action.payload.id.classroom_id === classroom.id){
                        return {
                            ...classroom, tags:[...classroom.tags, action.payload.content]
                        }
                    }
                    return classroom
                })
            }

        case DELETE_TAG_CLASSROOM:
            return{
                classrooms: state.classrooms.map((classroom) => {
                    if(action.payload.id.classroom_id === classroom.id){
                        return {
                            ...classroom, tags:classroom.tags.filter((tag) => tag.id !== action.payload.content.tagId)
                        }
                    }
                    return classroom
                })
            }
        case ADD_SHARING:
            return {
                classrooms: action.payload
            }

        case DELETE_SHARING:
            return{
                classrooms: state.classrooms.map((classroom) => {
                    if(action.payload.classroom_id === classroom.id){
                        return {
                            ...classroom, shared:classroom.shared.filter((shared) => shared.id !== action.payload.id)
                        }
                    }
                    return classroom
                })
            }
        case ADD_BRIDGE_CLASSROOM_SET:
            return {
                classrooms: state.classrooms.map((classroom) => {
                    if(action.payload.id.classroom_id === classroom.id){
                        return {
                            ...classroom, bridge:[...classroom.bridge, action.payload.content]
                        }
                    }
                    return classroom
                })
            }
        case DELETE_BRIDGE_CLASSROOM_SET:
            if(action.payload.classroom_id !== undefined){
                return{
                    classrooms: state.classrooms.map((classroom) => {
                        if(action.payload.classroom_id === classroom.id){
                            return {
                                ...classroom, bridge:classroom.bridge.filter((bridges) => bridges.set_id !== action.payload.set_id)
                            }
                        }
                        return classroom
                    })
                }
            } else {
                return{
                    classrooms: state.classrooms.map((classroom) => {
                        return {
                            ...classroom, bridge:classroom.bridge.filter((bridges) => bridges.set_id !== action.payload.set_id)
                        }
                    })
                }
            }
            

        default:
            return state;
        }
}