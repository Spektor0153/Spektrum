export const LOAD_NEWS_LIST_FROM_RSS = "LOAD_NEWS_LIST_FROM_RSS";
export const OPEN_NEWS_IN_WINDOW = "OPEN_NEWS_IN_WINDOW";
export const CLOSE_NEWS_IN_WINDOW = "CLOSE_NEWS_IN_WINDOW";
export const CHANGE_ACTIVE_PAGE = "CHANGE_ACTIVE_PAGE";
export const CLICK_POPULAR_TAG = "CLICK_POPULAR_TAG";

export const loadNewsListFromRss = (data) => {
    return {
        type: LOAD_NEWS_LIST_FROM_RSS,
        payload: data
    }
}

export const openNewsInWindow = (data) => {
    return {
        type: OPEN_NEWS_IN_WINDOW,
        payload: data
    }
}

export const closeNewsInWindow = (data) => {
    return {
        type: CLOSE_NEWS_IN_WINDOW,
        payload: data
    }
}

export const changeActivePage = (page) => {
    return {
        type: CHANGE_ACTIVE_PAGE,
        payload: page
    }
}

export const clickPopularTag = (tag) => {
    return {
        type: CLICK_POPULAR_TAG,
        payload: tag
    }
}
