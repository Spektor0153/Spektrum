export const UPDATE_RSS_LIST = "UPDATE_RSS_LIST";
export const LOAD_NEW_RSS = "LOAD_NEW_RSS";
export const LOADER_NEWS_LIST_SHOW = "LOADER_NEWS_LIST_SHOW";
export const SEARCH_RSS_TAG = "SEARCH_RSS_TAG";
export const EMPTY_SEARCH_INPUT = "EMPTY_SEARCH_INPUT";
export const CHOSE_VALUE_SEARCH_INPUT = "CHOSE_VALUE_SEARCH_INPUT";
export const LEFT_COL_POSITION_CHANGE = "LEFT_COL_POSITION_CHANGE";

export const updateRssList = (data) => {
    return {
        type: UPDATE_RSS_LIST,
        payload: data
    }
}

export const loadRssChanel = (data) => {
    return {
        type: LOAD_NEW_RSS,
        payload: data
    }
}

export const loaderNewsListShow = (status, activeChanel) => {
    return {
        type: LOADER_NEWS_LIST_SHOW,
        payload: {status: status, activeChanel: activeChanel}
    }
}

export const searchRssTag = (value) => {
    return {
        type: SEARCH_RSS_TAG,
        payload: value
    }
}


export const emptySearchInput = () => {
    return {
        type: EMPTY_SEARCH_INPUT,
        payload: ''
    }
}

export const choseValueSearchInput = (value) => {
    return {
        type: CHOSE_VALUE_SEARCH_INPUT,
        payload: value
    }
}

export const leftColPositionChange = () => {
    return {
        type: LEFT_COL_POSITION_CHANGE
    }
}

