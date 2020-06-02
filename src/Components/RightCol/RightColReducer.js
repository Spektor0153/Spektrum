import {LOAD_NEWS_LIST_FROM_RSS, OPEN_NEWS_IN_WINDOW, CLOSE_NEWS_IN_WINDOW, CHANGE_ACTIVE_PAGE} from './RightColAction';
import {LOADER_NEWS_LIST_SHOW} from "./../LeftCol/leftColAction";

let defaultState = {
    startPageShow: true,
    windowRssOpen: false,
    RSSListIsLoading: false,
    rssNewsList: [],
    title: '',
    image: '',
    description: '',
    newsInWindow: [],
    activePage: 1,
    countInPage: 10,
    newsCount: 0,
    popularTags: [
        {name: 'tech',
            text: 'Featuring Techrocks',
            image: 'https://storage.googleapis.com/site-assets/SuVNv49GjB8JEEZDkmqcWXnXGtrIYbrPuhwZXO7gpfU_visual-160f9dccf78'
        }, {
            name: 'marketing',
            text: 'Featuring Маркетинг Buzz',
            image: 'https://storage.googleapis.com/site-assets/44Nd-GLxPRhQVxZwhnWC7jLCO0-eNk9AmHfkEwITC_0_svisual-1688175fd8a'
        }, {
            name: 'design',
            text: 'Featuring Дизайн',
            image: 'https://storage.googleapis.com/site-assets/c4MplJbQ4NNv5xHR2HvrXUJAjDdw_JqzA0CX1HnfChQ_visual-162b991db01'
        }, {
            name: 'business',
            text: 'Featuring БИЗНЕС Online',
            image: 'https://storage.googleapis.com/site-assets/jDQOHJwg5a0bN_jP5XnbGy2xOtMoCKU31BCV9BmAYRc_visual-16c9def59fc'
        }, {
            name: 'food',
            text: 'Featuring Foodclub — кулинарные рецепты с пошаговыми фотографиями',
            image: 'https://storage.googleapis.com/site-assets/AJGy2vof4AyPnUvhuRlqzzUnbhJpIYevIcDoS9xV0hM_visual-15e372aa182'
        }, {
            name: 'news',
            text: 'Featuring Актуальные новости ',
            image: 'https://storage.googleapis.com/site-assets/1pnxohmBFGyoRaAeYThiLrVG-26TVdOb2ZqOF6GQ0yQ_svisual-1541438b87b'
        }, {
            name: 'startups',
            text: 'Featuring 500 Startups',
            image: 'https://storage.googleapis.com/site-assets/R8fHgtW40P5vBift927QqfkMcStaU73iWIRpgYfF4PM_visual-167cfe53dc2'
        }, {
            name: 'photography',
            text: 'Featuring photo – Простые фокусы',
            image: 'https://storage.googleapis.com/site-assets/tWZlrjzUIWHwMZZFBR3_uy3-jbT9zjP27bkR3mUDzzY_visual-168ffe119e3'
        }, {
            name: 'gaming',
            text: 'Featuring Gaming Days, блог о видеоиграх',
            image: 'https://storage.googleapis.com/site-assets/7lGy57YDV90AQ0rZQqhylGClbBng67Y3Z4iGj3Sv7-I_svisual-16f2abd92d8'
        }, {
            name: 'cars',
            text: 'Featuring Cars RSS',
            image: 'https://storage.googleapis.com/site-assets/3m_oHdBL82diz5gMkHWnaUmQ28FPSw5IKdtE9AbYCww_svisual-16266ea16a6'
        }
    ],
    defaultImg: "https://storage.googleapis.com/site-assets/AJGy2vof4AyPnUvhuRlqzzUnbhJpIYevIcDoS9xV0hM_visual-15e372aa182"
}

export const rightColReducer = (state= defaultState, action) => {
    switch (action.type) {
        case LOAD_NEWS_LIST_FROM_RSS: {
            return {
                ...state,
                RSSListIsLoading: false,
                startPageShow: false,
                rssNewsList: action.payload.rss.channel[0].item ?  action.payload.rss.channel[0].item: [],
                description: action.payload.rss.channel[0].description[0],
                image: action.payload.rss.channel[0].image? action.payload.rss.channel[0].image[0].url[0]: state.defaultImg,
                title: action.payload.rss.channel[0].title[0],
                newsCount: action.payload.rss.channel[0].item ? action.payload.rss.channel[0].item.length : 0,
                activePage: 1
            };
        }
        case LOADER_NEWS_LIST_SHOW: {
            return {
                ...state,
                RSSListIsLoading: true
            }
        }
        case OPEN_NEWS_IN_WINDOW: {
            return {
                ...state,
                newsInWindow: {
                    ...state.rssNewsList[action.payload],
                    image: state.rssNewsList[action.payload].enclosure ? state.rssNewsList[action.payload].enclosure[0] : state.rssNewsList.image },
                windowRssOpen: true
            }
        }
        case CLOSE_NEWS_IN_WINDOW: {
            return {
                ...state,
                newsInWindow: {},
                windowRssOpen: false
            }
        }
        case CHANGE_ACTIVE_PAGE: {
            return {
                ...state,
                activePage: action.payload
            }
        }

        default: return state;
    }
}