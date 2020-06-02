import {instance} from "./../axios/axiosInstance"
import {NEWS_LOAD} from "./../Components/News/newsAction"
import {newsLoad} from "./../Components/News/newsAction"

const defaultState = {
    isLoad: false,
    countNewsInPart: 10,
    countNewsAll: 0,
    news: [],
    inputText: ''
}


export const newsReducer = (state= defaultState, action) => {
    console.log(action)

    switch (action.type) {
        case NEWS_LOAD: {
            return {...state, news: [...action.payload.posts], isLoad: true, inputText: ''};
        }

        default: return state;
    }
}

export const newsLoadThunk = () => {

    return (dispatch) =>{
        console.log('newsLoadThunk');
        instance().get('/news').then(response => {
            console.log(response);
            dispatch(newsLoad(response.data))
        })
    }
}

export const likePostNewsThunk = (id_post) => {
    return (dispatch) =>{
        console.log('likePostNewsThunk');
        console.log(id_post);
        instance().post('/likePostNews', {id_post: id_post}).then(response => {
            console.log(response);
            dispatch(newsLoad(response.data))
        })
    }
}

export const dislikePostNewsThunk = (id_post) => {
    return (dispatch) =>{
        console.log('dislikePostNewsThunk');

        instance().post('/dislikePostNews', {id_post: id_post}).then(response => {
            console.log(response);
            dispatch(newsLoad(response.data))
        })
    }
}