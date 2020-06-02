import {POSTS_LOAD, postsLoad, TEXT_INPUT_CHANGE} from "./../Components/Profile/Posts/postsAction"
import {instance, instanceMulti} from "./../axios/axiosInstance"

const defaultState = {
    isLoad: false,
    posts: [],
    inputText: ''
}


export const postsReducer = (state= defaultState, action) => {
    console.log(action)

    switch (action.type) {
       /* case POSTS_LOAD: {
            return {...state, posts: [...action.payload], isLoad: true, inputText: ''};
        }*/
        case TEXT_INPUT_CHANGE: {
            return {...state, inputText: action.payload};
        }
        default: return state;
    }
}


export const getPostsByUserThunk = () => {

    return (dispatch) =>{
        console.log('getPostsByUserThunk');

        instance().get('/posts').then(response => {
            console.log(response);
                dispatch(postsLoad(response.data))
        })
    }
}

export const sendPostThunk11 = (text) => {

    return (dispatch) =>{
        console.log('sendPostThunk');
        console.log(text);
        instance().post('/sendPosts', {text: text}).then(response => {
            console.log(response);
            dispatch(postsLoad(response.data))
        })
    }
}

export const sendPostThunk2 = (text) => {

    return (dispatch) =>{
        console.log('sendPostThunk2');
        console.log(text);
        instance().post('/sendPosts', {text: text}).then(response => {
            console.log(response);
            dispatch(postsLoad(response.data))
        })
    }
}


export const sendPostThunk = (formData) => {
    console.log('sendPostThunk')
    console.log(formData)
    return (dispatch) =>{
        //dispatch(authOff({}))

        instanceMulti.post(`/sendPosts`, formData).then(response => {
            console.log(response);
            dispatch(postsLoad(response.data))

        });
    }
}

export const deletePostThunk = (id) => {

    return (dispatch) =>{
        console.log('deletePostThunk');
        console.log(id);
        instance().post('/deletePost', {id: id}).then(response => {
            console.log(response);
            dispatch(postsLoad(response.data))
        })
    }
}