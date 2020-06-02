import {OPEN_PHOTO_WINDOW, openPhotoWindow, CLOSE_PHOTO_WINDOW, closePhotoWindow, LOAD_PHOTOS_WINDOW, loadPhotosWindow, CHANGE_PHOTO, changePhoto, CLOSE_ADD_PHOTO_WINDOW, OPEN_ADD_PHOTO_WINDOW } from "./../Components/Photos/photosWindowAction"
import {instanceMulti} from "./../axios/axiosInstance";
import {photosLoad} from "./../Components/Profile/profileAction";

const defaultState = {
    windowOpen: false,
    currentImg: 0,  //id
    currentImgNumber: 0, //массив
    photosCount: 0,
    photos: [],
    currentDate: '',
    currentText: '',
    windowLoadOpen: false,
}


export const photosWindowReducer = (state= defaultState, action) => {
    console.log(action)

    switch (action.type) {
        case OPEN_PHOTO_WINDOW: {
            return {...state,  windowOpen: true};
        }
        case CLOSE_PHOTO_WINDOW: {
            return {...state, windowOpen: false, currentImg: 0 };
        }
        case LOAD_PHOTOS_WINDOW: {
            var currentImgNumber=0;
            var currentDate='';
            var currentText='';
            action.payload.photos.map((photo, i)=>{
                if (photo.id==action.payload.id_photo) {
                    currentImgNumber=i;
                    currentDate=photo.dateCreate;
                    currentText=photo.text;
                }
            })};

            return {...state,
                currentImg: action.payload.id_photo,
                photos: [...action.payload.photos],
                photosCount: action.payload.photos.length,
                currentImgNumber: currentImgNumber,
                currentDate: currentDate,
                currentText: currentText
        }
        case CHANGE_PHOTO: {
            var currentImg=0;
            console.log(state)
            state.photos.map((photo, i)=>{
                if (photo.id==action.payload) {
                    currentImg=photo.id;
                }
            })
            return {...state, currentImgNumber: action.payload, currentImg: state.photos[action.payload].id};
        }
        case OPEN_ADD_PHOTO_WINDOW: {
            return {...state,  windowLoadOpen: true};
        }
        case CLOSE_ADD_PHOTO_WINDOW: {
            return {...state, windowLoadOpen: false };
        }
        default: return state;
    }
}




export const loadPhotoThunk = (formData) => {
    console.log('loadPhotoThunk')
    return (dispatch) =>{
        instanceMulti.post(`/loadPhoto`, formData).then(response => {
            console.log(response);
            dispatch(photosLoad(response.data))
        });
    }
}