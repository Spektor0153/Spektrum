import {authOn, authOff, AUTH_ON, AUTH_OFF, REGISTRATION_REDIRECT, registrationRedirect, NEW_MESSAGE_COUNT_MENU_CHANGE, newMessageCountMenuChange, AUTH_TOKEN_ON, authTokenOn} from './../Components/Login/loginAction';
import {stopSubmit} from "redux-form";
import {instance, instance2, instanceMulti} from "./../axios/axiosInstance"
import {socket} from "./../socket/SocketMy"
import axios from 'axios';
import {MESSAGES_LOAD} from "./../Components/Dialogs/dialogsAction";

let defaultState = {
    isAuth: false,
    resultCode: 0,
    token: (localStorage.token?localStorage.token:null),
    profileLoaded: false,
    registrationRedirect: false,
    data: {
        id: 1,
        email: null,
        login: null
    }
}

export const authReducer = (state= defaultState, action) => {
    console.log(action)

    switch (action.type) {
        case AUTH_ON: {

            return {...state, data: {...action.payload}, isAuth: true, profileLoaded: true, token: (localStorage.token?localStorage.token:null), registrationRedirect: false};
        }
        case AUTH_OFF: {
            return {...state, isAuth: false, token: null};
        }
        case AUTH_TOKEN_ON: {
            return {...state, token: action.payload.token}
        }
        case REGISTRATION_REDIRECT: {
            return {...state, registrationRedirect: true, token: action.payload.token};
        }

       /* case MESSAGES_LOAD: {
            return {...state, data: {...state.data, countNewM: action.payload.countNewM}};
        }*/


        default: return state;
    }
}


export const loginAuthThunk = (login, password, rememberMe) => {
    console.log(`Bearer ${localStorage.token}`);
    return (dispatch) =>{
        console.log('loginAuthThunk');


        instance().post(`/api/auth`, {login: login, password: password,rememberMe: rememberMe}).then(response => {
            console.log(response);
            if (response.data.id) {
                localStorage.setItem("token", response.data.token)
                //dispatch(authTokenOn(response.data))
            } else {
                let action = stopSubmit("login", {login: "login is wrong", password: "password is wrong"});
                dispatch(action);
            }
            console.log(instance)
            instance().get('/user', { headers: {  'Authorization': `Bearer ${response.data.token}`}}).then(response => {
                console.log(response);
                if (response.data.id) {
                    dispatch(authOn(response.data))
                }
            })

        });
    }
}

export const getUserByTokenThunk = () => {
    console.log(`Bearer ${localStorage.token}`);

    return (dispatch) =>{
        console.log('getUserByTokenThunk');

        instance().get('/user').then(response => {
            console.log(response);
            if (response.data.id) {
                socket.emit('socketAuth', response.data.id_user)
                dispatch(authOn(response.data))
            }
        })
    }
}


export const logOutAuthThunk = () => {
    console.log('logOutAuthThunk')
    return (dispatch) =>{

        dispatch(authOff())
        localStorage.removeItem('token');

       /* instance().delete(`/auth/login`, ).then(response => {
            console.log(response);

            dispatch(authOff(response.data))



        });*/
    }
}



export const registrationThunk = (formData) => {
    console.log('registrationThunk')
    console.log(formData)
    return (dispatch) =>{
        //dispatch(authOff({}))

        instanceMulti.post(`/registration`, formData).then(response => {
            console.log(response);

            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                dispatch(registrationRedirect(response.data))
            } else {
               alert('ERROR')
            }
            console.log('ЧТО ТО НЕ ТАККККККККККК');
        //    dispatch(authOff(response.data))



        });
    }
}