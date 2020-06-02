import {stopSubmit} from "redux-form";
import {instance, instance2, instanceMulti} from "./../axios/axiosInstance"
import {socket} from "./../socket/SocketMy"
import axios from 'axios';
import {MESSAGES_LOAD} from "./../Components/Dialogs/dialogsAction";
import {NEW_MESSAGE_COUNT_MENU_CHANGE} from "./../Components/LeftMenu/LeftMenuAction"
import {AUTH_ON} from "./../Components/Login/loginAction";

let defaultState = {
    countNewM: 0
}

export const leftMenuReducer = (state= defaultState, action) => {
    console.log(action)
    console.log('leftMenuReducer ____________________________________________________')

    switch (action.type) {
        case AUTH_ON: {
            return {...state, countNewM: action.payload.countNewM?action.payload.countNewM:0};
        }
        case MESSAGES_LOAD: {
            return {...state, countNewM: action.payload.countNewM?action.payload.countNewM:0};
        }
        case NEW_MESSAGE_COUNT_MENU_CHANGE: {

            return {...state, countNewM: parseInt(state.countNewM) + action.payload};
        }
        default: return state;
    }
}

