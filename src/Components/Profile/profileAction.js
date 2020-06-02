export const PROFILE_LOAD = 'PROFILE_LOAD';
export const POSTS_LOAD = 'POSTS_LOAD';
export const GUEST_PROFILE_FOLLOW = 'GUEST_PROFILE_FOLLOW';
export const GUEST_PROFILE_UNFOLLOW = 'GUEST_PROFILE_UNFOLLOW';
export const STATUS_OPEN = 'STATUS_OPEN';
export const STATUS_TEXT_CHANGE = 'STATUS_TEXT_CHANGE';
export const PHOTO_LOAD = 'PHOTO_LOAD';
/*
export const POST_LIKE = 'POST_LIKE';
export const POST_DISLIKE = 'POST_DISLIKE';
*/
export const profileLoad = (profile) => {
    return {
        type: PROFILE_LOAD,
        payload: profile
    }
}

export const postsLoad = (posts) => {
    return {
        type: POSTS_LOAD,
        payload: posts
    }
}

export const guestProfileFollow = () => {
    return {
        type: GUEST_PROFILE_FOLLOW,
       // payload: id_user
    }
}

export const guestProfileUnfollow = () => {
    return {
        type: GUEST_PROFILE_UNFOLLOW,
     //   payload: id_user
    }
}
export const statusInputOpen = () => {
    return {
        type: STATUS_OPEN,
        //   payload: id_user
    }
}

export const statusTextChange = (text) => {
    return {
        type: STATUS_TEXT_CHANGE,
        payload: text
    }
}
export const photosLoad = (photos) => {
    return {
        type: PHOTO_LOAD,
        payload: photos
    }
}

/*
export const postLike = (id_post) => {
    return {
        type: POST_LIKE,
        payload: id_post
    }
}

export const postDislike = (id_post) => {
    return {
        type: POST_DISLIKE,
        payload: id_post
    }
}*/