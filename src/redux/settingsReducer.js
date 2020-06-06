import {MOBILE_ANALYSE} from "./../Components/NavHead/NavHeadAction";

let defaultState = {
    isMobile: false,
    settingsLoaded: false
}

export const settingsReducer = (state= defaultState, action) => {
    console.log(action)
    console.log('settingsReducer ____________________________________________________')

    switch (action.type) {
        case MOBILE_ANALYSE: {

            return {...state, isMobile: action.payload>999?false:true, settingsLoaded: true};
        }

        default: return state;
    }
}

