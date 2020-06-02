import {instance} from "./../axios/axiosInstance"
import {LOAD_FRIENDS, friendsLoad, SHOW_ALL_FRIENDS, showAllFriends, SHOW_FOLLOW_FRIENDS, showFollowFriends, FILTER_FRIENDS, showFollowerFriends, SHOW_FOLLOWER_FRIENDS} from "./../Components/Friends/friendsAction";

let defaultState = {
    friends: [],
    followFriends: [],
    followerFriends: [],
    showFriends: [],
    isLoad: false,
    allFriendsCount: 0,
    searchInput: '',
    typeShow: 'allFriends'
}


export const friendsReducer = (state= defaultState, action) => {
    console.log(action)

    switch (action.type) {
        case LOAD_FRIENDS: {
            let showFriends=[]

            console.log(state.typeShow)
            switch (state.typeShow) {
                case 'allFriends': showFriends=[...action.payload]; break;
                case 'followFriends': showFriends=[...action.payload.filter(friend=>friend.follow)]; break;
                case 'followerFriends': showFriends=[...action.payload.filter(friend=>friend.follower)]; break;
                default: showFriends=[...action.payload]; break;
            }
            return {
                ...state,
                friends: [...action.payload],
                showFriends: [...showFriends.filter(friend=>friend.name.toLowerCase().indexOf(state.searchInput) != -1)],
                followFriends: [...action.payload.filter(friend=>friend.follow)],
                followerFriends: [...action.payload.filter(friend=>friend.follower)],
                allFriendsCount: action.payload.length,
                isLoad: true,
               // typeShow: 'allFriends'
            };
        }
        case SHOW_FOLLOW_FRIENDS: {
            return {
                ...state,
                searchInput: '',
                showFriends: [...state.followFriends],
                typeShow: 'followFriends'
            };
        }
        case SHOW_FOLLOWER_FRIENDS: {
            return {
                ...state,
                searchInput: '',
                showFriends: [...state.followerFriends],
                typeShow: 'followerFriends'
            };
        }
        case SHOW_ALL_FRIENDS: {
            return {
                ...state,
                searchInput: '',
                showFriends: [...state.friends],
                typeShow: 'allFriends'
            };
        }
        case FILTER_FRIENDS: {
            return {
                ...state,
                searchInput: action.payload,
                showFriends: [...state.friends.filter(friend=>friend.name.toLowerCase().indexOf(action.payload) != -1)]
            };
        }
        default: return state;
    }
}


export const getFriendsByTokenThunk = () => {
    return (dispatch) =>{
        console.log('getFriendsByTokenThunk');

        instance().get('/getFriends').then(response => {
            console.log(response);
                dispatch(friendsLoad(response.data))
        })
    }
}


export const followFriendThunk = (id_friend) => {
    return (dispatch) =>{
        console.log('followFriendThunk');

        instance().post('/followFriendPage', {id_friend: id_friend}).then(response => {
            console.log(response);
            dispatch(friendsLoad(response.data))
        })
    }
}

export const unFollowFriendThunk = (id_friend) => {
    return (dispatch) =>{
        console.log('unFollowFriendThunk');

        instance().post('/unFollowFriendPage', {id_friend: id_friend}).then(response => {
            console.log(response);
            dispatch(friendsLoad(response.data))
        })
    }
}
