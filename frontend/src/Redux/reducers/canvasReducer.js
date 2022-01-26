//DO WE NEED TO SEND CANVAS DATA TO REDUX THO??

import { SUBMIT_CANVAS } from "../actions/canvasAction";

const initialState = {
    canvasData: []
};

export function canvasReducer(state = initialState, action){
    switch(action.type){
        case SUBMIT_CANVAS:
            return {
                canvasData: [...state.canvasData, action.payload]
            };
        default:
            return state;
        }
}