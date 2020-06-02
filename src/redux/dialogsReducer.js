import {instance} from "./../axios/axiosInstance"
import {DIALOGS_LOAD, dialogsLoad, MESSAGES_LOAD, messageLoad, messageInputChange, MESSAGE_INPUT_CHANGE, messageInputClear, MESSAGE_INPUT_CLEAR, MESSAGE_NEW_READ, messageNewRead, incomingMessageNewRead, INCOMING_MESSAGE_NEW_READ} from "./../Components/Dialogs/dialogsAction"

const defaultState = {
    isLoad: false,
    isMessage: false,
    id_room: 0,
    dialogs: [],
    inputText: '',
    searchText: '',
    messages: [],
    messageFriendId: 0,
    messageFriendName: '',
    messageFriendImg: ''
}


export const dialogsReducer = (state= defaultState, action) => {
    console.log(action)

    switch (action.type) {
        case DIALOGS_LOAD: {
            return {...state, dialogs: [...action.payload], messages: [], isLoad: true};
        }
        case MESSAGES_LOAD: {
            let sortMessages=[...action.payload.messages];
            console.log(sortMessages)

            for (let i=0; i<sortMessages.length; i++) {
                if (i==0) {sortMessages[i].showProfile=true; continue;}
                if (sortMessages[i].id_user==sortMessages[i-1].id_user) {
                    sortMessages[i].showProfile=false;
                } else {
                    sortMessages[i].showProfile=true;
                }
            }

            return {
                ...state,
                messages: [...sortMessages],
                id_room: action.payload.id_room,
                isMessage: true,
                messageFriendId: action.payload.profile.id_user,
                messageFriendName: action.payload.profile.name,
                messageFriendImg: action.payload.profile.img
            };
        }
        case MESSAGE_INPUT_CHANGE: {
            return {...state, inputText: action.payload};
        }
        case MESSAGE_INPUT_CLEAR: {
            return {...state, inputText: ''};
        }
        case MESSAGE_NEW_READ: {
            return {
                ...state ,
                messages: state.messages.map(message=>{
                    return {...message, read_message: (message.incomingMessage==0&&message.read_message==0)?1:message.read_message}
                })};
        }
        case INCOMING_MESSAGE_NEW_READ: {
            console.log(INCOMING_MESSAGE_NEW_READ);
            return {
                ...state ,
                messages: state.messages.map(message=>{
                    return {...message, read_message: (message.incomingMessage==1&&message.read_message==0)?1:message.read_message}
                })};
        }
        default: return state;
    }
}

export const getChatsThunk = () => {

    return (dispatch) =>{
        console.log('getChatsThunk');

        instance().get('/dialogs').then(response => {
            console.log(response);
            dispatch(dialogsLoad(response.data))
            dispatch(readIncomingNewMessageThunk())
        })
    }
}

export const getMessagesThunk = (userId) => {
    console.log('getMessagesThunk!!!!!!!!!!!!!!!!!!!!');
    return (dispatch) =>{
        console.log('getMessagesThunk');

        instance().get('/messages', {params: {userId: userId}}).then(response => {
            console.log(response);
            dispatch(messageLoad(response.data))
            dispatch(incomingMessageNewRead());
        })
    }
}

export const sendMessageThunk = ( id_room, id_friend, message) => {

    return (dispatch) =>{
        console.log('sendMessageThunk');

        instance().post('/sendMessage', {id_room: id_room, id_friend: id_friend, message: message}).then(response => {
            console.log(response);
            dispatch(messageLoad(response.data));
            dispatch(messageInputClear());
        })
    }
}

export const readNewMessageThunk = () => {
    return (dispatch) =>{
        console.log('readNewMessageThunk');
        setTimeout(()=>{
            dispatch(messageNewRead());
        }, 2000)

    }
}

export const readIncomingNewMessageThunk = () => {
    return (dispatch) =>{
        console.log('readIncomingNewMessageThunk');
        setTimeout(()=>{
            dispatch(incomingMessageNewRead());
        }, 2000)

    }
}
/*
export const getDialogsThunk = (userId) => {
    console.log('getMessagesThunk!!!!!!!!!!!!!!!!!!!!');
    return (dispatch) =>{
        console.log('getMessagesThunk');

        instance().get('/messages', {params: {userId: userId}}).then(response => {
            console.log(response);
            dispatch(messageLoad(response.data))
            dispatch(incomingMessageNewRead());
        })
    }
}
*/