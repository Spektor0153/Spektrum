export const NEWS_LOAD = 'NEWS_LOAD';

export const newsLoad = (news) => {
    return {
        type: NEWS_LOAD,
        payload: news
    }
}