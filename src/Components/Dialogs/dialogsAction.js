export const DIALOGS_LOAD = 'DIALOGS_LOAD';
export const MESSAGES_LOAD = 'MESSAGES_LOAD';
export const MESSAGE_INPUT_CHANGE = 'MESSAGE_INPUT_CHANGE';
export const MESSAGE_INPUT_CLEAR = 'MESSAGE_INPUT_CLEAR';
export const MESSAGE_NEW_READ = 'MESSAGE_NEW_READ';
export const INCOMING_MESSAGE_NEW_READ = 'INCOMING_MESSAGE_NEW_READ';


export const dialogsLoad = (chats) => {
    return {
        type: DIALOGS_LOAD,
        payload: chats
    }
}

export const messageLoad = (messages) => {
    return {
        type: MESSAGES_LOAD,
        payload: messages
    }
}

export const messageInputChange = (text) => {
    return {
        type: MESSAGE_INPUT_CHANGE,
        payload: text
    }
}

export const messageInputClear = () => {
    return {
        type: MESSAGE_INPUT_CLEAR,
    }
}

export const messageNewRead = () => {
    return {
        type: MESSAGE_NEW_READ,
    }
}

export const incomingMessageNewRead = () => {
    return {
        type: INCOMING_MESSAGE_NEW_READ,
    }
}