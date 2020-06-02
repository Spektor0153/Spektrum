export const NEW_MESSAGE_COUNT_MENU_CHANGE = 'NEW_MESSAGE_COUNT_MENU_CHANGE';

export const newMessageCountMenuChange = (countMessages) => {
    return {
        type: NEW_MESSAGE_COUNT_MENU_CHANGE,
        payload: countMessages
    }
}