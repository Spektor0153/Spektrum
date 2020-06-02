import {UPDATE_RSS_LIST,
    LOADER_NEWS_LIST_SHOW,
    SEARCH_RSS_TAG,
    EMPTY_SEARCH_INPUT,
    CHOSE_VALUE_SEARCH_INPUT,
    LEFT_COL_POSITION_CHANGE} from './leftColAction';
import {CLICK_POPULAR_TAG} from './../RightCol/RightColAction'

let defaultState = {
    rssArr: [],
    allTags: [],
    searchValue: '',
    openSearchDropDown: false,
    mob_colPosition: true
}

export const leftColReducer = (state= defaultState, action) => {
    switch (action.type) {
        case UPDATE_RSS_LIST: {
            var tagsSet = new Set();
            action.payload.forEach( (rss, i) => {
                if (rss.tags) {
                    rss.tags.forEach(tag => {
                        tagsSet.add(tag);
                    })
                }
            } );
            return {
                ...state,
                rssArr: [...action.payload.map(rssChanel =>{
                    return {...rssChanel, isShow: true}
                })],
                allTags: [...tagsSet].map(tag=>{
                    return {
                        tag: tag,
                        show: true,
                        tagHtml: tag
                    }
                })

            };
        }
        case SEARCH_RSS_TAG: {
            return {
                ...state,
                searchValue: action.payload,
                openSearchDropDown: action.payload.length==0?false:true,
                allTags: [...state.allTags.map(tag=>{
                    if (tag.tag.indexOf(action.payload)!=-1) {
                        return {...tag, tagHtml: tag.tag.replace(action.payload, '<strong>'+action.payload+'</strong>'), show: true}
                    } else {
                        return {...tag, tagHtml: tag.tag, show: false}
                    }
                })],
                rssArr: [...state.rssArr.map(rssChanel =>{
                    let isFind=false;
                    rssChanel.tags.forEach(tag=> {
                        if (tag.indexOf(action.payload)!=-1) {
                            isFind=true;
                        }
                    })
                    return {...rssChanel, isShow: isFind}
                })]
            }
        }
        case LOADER_NEWS_LIST_SHOW: {
            return {
                ...state,
                rssArr: state.rssArr.map((chanel, i)=>{
                    if (i==action.payload.activeChanel) {
                        return {...chanel, active: true}
                    } else return {...chanel, active: false}
                })
            }
        }
        case CLICK_POPULAR_TAG: {
            return {
                ...state,
                searchValue: action.payload,
                openSearchDropDown: false
            }
        }
        case EMPTY_SEARCH_INPUT: {
            return {
                ...state,
                searchValue: '',
                openSearchDropDown: false
            }
        }
        case CHOSE_VALUE_SEARCH_INPUT: {
            return {
                ...state,
                searchValue: action.payload,
                openSearchDropDown: false
            }
        }
        case LEFT_COL_POSITION_CHANGE: {
            return {
                ...state,
                mob_colPosition: !state.mob_colPosition
            }
        }
        default: return state;
    }
}

