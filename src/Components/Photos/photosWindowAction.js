export const OPEN_PHOTO_WINDOW = 'OPEN_PHOTO_WINDOW';
export const CLOSE_PHOTO_WINDOW = 'CLOSE_PHOTO_WINDOW';
export const LOAD_PHOTOS_WINDOW = 'LOAD_PHOTOS_WINDOW';
export const CHANGE_PHOTO = 'CHANGE_PHOTO';
export const OPEN_ADD_PHOTO_WINDOW = 'OPEN_ADD_PHOTO_WINDOW';
export const CLOSE_ADD_PHOTO_WINDOW = 'CLOSE_ADD_PHOTO_WINDOW';

export const openPhotoWindow = () => {
    return {
        type: OPEN_PHOTO_WINDOW
    }
}

export const closePhotoWindow = () => {
    return {
        type: CLOSE_PHOTO_WINDOW
    }
}

export const loadPhotosWindow = (photos, id_photo) => {
    return {
        type: LOAD_PHOTOS_WINDOW,
        payload: {photos: photos, id_photo: id_photo}
    }
}

export const changePhoto = (photoNumber) => {
    return {
        type: CHANGE_PHOTO,
        payload: photoNumber
    }
}

export const openAddPhotoWindow = () => {
    return {
        type: OPEN_ADD_PHOTO_WINDOW
    }
}

export const closeAddPhotoWindow = () => {
    return {
        type: CLOSE_ADD_PHOTO_WINDOW
    }
}