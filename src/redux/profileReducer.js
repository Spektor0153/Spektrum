import {instance, instance2} from "./../axios/axiosInstance"
import {PROFILE_LOAD, profileLoad,
    postsLoad, POSTS_LOAD,
    GUEST_PROFILE_FOLLOW, GUEST_PROFILE_UNFOLLOW,
    guestProfileFollow, guestProfileUnfollow,
    STATUS_OPEN, statusInputOpen,
    STATUS_TEXT_CHANGE, statusTextChange,
    photosLoad, PHOTO_LOAD
    /*postLike, POST_LIKE,
    postDislike, POST_DISLIKE*/
} from "./../Components/Profile/profileAction"

let defaultState = {
    myPage: true,
    isLoad: false,
    profile: {
        id: 1,
        email: null,
        login: null
    },
    posts: [],
    friends: [],
    photos: [],
    statusText: '',
    statusOpen: false
}

export const profileReducer = (state= defaultState, action) => {
    console.log(action)

    switch (action.type) {

        case PROFILE_LOAD: {
            return {
                ...state,
                profile: action.payload.profile,
                posts: action.payload.posts,
                friends: action.payload.friends,
                photos: action.payload.photos,
                myPage: action.payload.myPage,
                statusText: action.payload.profile.status?action.payload.profile.status:'',
                statusOpen: false,
                isLoad: true
            };
        }
        case POSTS_LOAD: {
            return {...state, posts: action.payload.posts};
        }
        case GUEST_PROFILE_FOLLOW: {
            return {...state, profile: {...state.profile, follow: 1 }};
        }
        case GUEST_PROFILE_UNFOLLOW: {
            return {...state, profile: {...state.profile, follow: 0 }};
        }
        case STATUS_OPEN: {
            return {...state, statusOpen: !state.statusOpen};
        }
        case STATUS_TEXT_CHANGE: {
            return {...state, statusText: action.payload};
        }
        case PHOTO_LOAD: {
            return {...state, photos: action.payload.photos};
        }


        default: return state;
    }
}


export const getProfileByIdThunk = (id_user) => {

    return (dispatch) =>{
        console.log('getProfileByIdThunk');

        instance().get('/getProfile', {params: {id_user: id_user}}).then(response => {
            console.log(response);
                dispatch(profileLoad(response.data))
        })
    }
}
export const getPostsByIdThunk = (id_user) => {

    return (dispatch) =>{
        console.log('getPostsByIdThunk');

        instance().get('/posts', {params: {id_user: id_user}}).then(response => {
            console.log(response);
            dispatch(postsLoad(response.data))
        })
    }
}

export const followFriendProfileThunk = (id_friend) => {
    return (dispatch) =>{
        console.log('followFriendProfileThunk');

        instance().post('/followFriend', {id_friend: id_friend}).then(response => {
            console.log(response);
            dispatch(guestProfileFollow())
        })
    }
}

export const unFollowFriendProfileThunk = (id_friend) => {
    return (dispatch) =>{
        console.log('unFollowFriendProfileThunk');

        instance().post('/unFollowFriend', {id_friend: id_friend}).then(response => {
            console.log(response);
            dispatch(guestProfileUnfollow())
        })
    }
}

export const sendStatusProfileThunk = (text) => {
    return (dispatch) =>{
        console.log('sendStatusProfileThunk');

        instance().post('/sendStatus', {text: text}).then(response => {
            console.log(response);

        })
        dispatch(statusInputOpen())
    }
}


export const likePostProfileThunk = (id_post, id_user) => {
    return (dispatch) =>{
        console.log('likePostProfileThunk');
        console.log(id_post);
        instance().post('/likePost', {id_post: id_post, id_user:  id_user}).then(response => {
            console.log(response);
            dispatch(postsLoad(response.data))
        })
    }
}

export const dislikePostProfileThunk = (id_post, id_user) => {
    return (dispatch) =>{
        console.log('dislikePostProfileThunk');

        instance().post('/dislikePost', {id_post: id_post, id_user:  id_user}).then(response => {
            console.log(response);
            dispatch(postsLoad(response.data))
        })
    }
}

