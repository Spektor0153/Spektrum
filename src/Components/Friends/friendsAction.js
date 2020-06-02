export const LOAD_FRIENDS = 'LOAD_FRIENDS';
export const SHOW_ALL_FRIENDS = 'SHOW_ALL_FRIENDS';
export const SHOW_FOLLOW_FRIENDS = 'SHOW_FOLLOW_FRIENDS';
export const FILTER_FRIENDS = 'FILTER_FRIENDS';
export const SHOW_FOLLOWER_FRIENDS = 'SHOW_FOLLOWER_FRIENDS';


export const friendsLoad = (friends) => {
    return {
        type: LOAD_FRIENDS,
        payload: friends
    }
}

export const showAllFriends = () => {
    return {
        type: SHOW_ALL_FRIENDS,
    }
}

export const showFollowFriends = () => {
    return {
        type: SHOW_FOLLOW_FRIENDS,
    }
}

export const showFollowerFriends = () => {
    return {
        type: SHOW_FOLLOWER_FRIENDS,
    }
}

export const filterFriends = (text) => {
    return {
        type: FILTER_FRIENDS,
        payload: text
    }
}