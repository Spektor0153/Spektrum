export const POSTS_LOAD = 'POSTS_LOAD';
export const TEXT_INPUT_CHANGE = 'TEXT_INPUT_CHANGE';

export const postsLoad = (posts) => {
    return {
        type: POSTS_LOAD,
        payload: posts
    }
}

export const textInputChange = (text) => {
    return {
        type: TEXT_INPUT_CHANGE,
        payload: text
    }
}



