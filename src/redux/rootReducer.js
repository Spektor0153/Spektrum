import {combineReducers} from "redux";
//import {leftColReducer} from './../Components/LeftCol/leftColReducer'
//import {rightColReducer} from './../Components/RightCol/RightColReducer'
import {authReducer} from  './loginReducer'
import {postsReducer} from  './postsReducer'
import {friendsReducer} from "./friendsReducer";
import {profileReducer} from "./../redux/profileReducer";
import {dialogsReducer} from "./../redux/dialogsReducer";
import {newsReducer} from "./../redux/newsReducer";
import {photosWindowReducer} from "./../redux/photosWindowReducer";
import {leftMenuReducer} from "./../redux/leftMenuReducer"
import {settingsReducer} from "./../redux/settingsReducer"
/**/
import { reducer as formReducer } from 'redux-form';

export const  rootReducer = combineReducers({
    authReducer: authReducer,
    form: formReducer,
    posts: postsReducer,
    friends: friendsReducer,
    profile: profileReducer,
    dialogs: dialogsReducer,
    news: newsReducer,
    photos: photosWindowReducer,
    leftMenu: leftMenuReducer,
    settings: settingsReducer
});


