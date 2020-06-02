import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import styles from "./photoWindow.module.css"
import {compose} from "redux";
import {connect} from "react-redux";
import { loadPhotoThunk} from "./../../redux/photosWindowReducer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCloudUploadAlt} from "@fortawesome/free-solid-svg-icons";




function PhotoWindow(props) {


    const [files, setFiles] = useState([]);
    const [check, checkForm] = useState(true);
    const {getRootProps, getInputProps} = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
            checkForm(true)
        }
    });

    const thumbs = files.map(file => (
        <div className={styles.thumb} key={file.name}>
            <div className={styles.thumbInner}>
                <img
                    src={file.preview}
                    className={styles.img}
                />
            </div>
        </div>
    ));

    let onSubmitPhoto = () => {
        if (files.length==0) {
            checkForm(false)
        } else {
            const fd = new FormData();
            files.map(file=>{
                fd.append("imageFile", file);
            })
            console.log(files)
            console.log(fd)
            props.loadPhotoThunk(fd)
            resetForm();
            props.closeAddPhotoWindow()
        }

    }

    useEffect(() => () => {
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    let resetForm = () => {setFiles([])} ;

    let onHideReset=()=>{
       props.closeAddPhotoWindow()
       resetForm();
   }

    return (
        <Modal show={props.windowLoadOpen}  centered onHide={onHideReset}>
            <Modal.Header closeButton>
                <Modal.Title className={styles.modalTitle} >Загрузка фотографий</Modal.Title>
            </Modal.Header>

            <Modal.Body  className={styles.modalAddBody}>


                <section className={styles.modalAddSection}>
                    <div {...getRootProps({className: `${styles.dropzone} ${!check?styles.errorDrop:''}` })}>
                        <input {...getInputProps()} />
                        <FontAwesomeIcon className={styles.uploadIcon} icon={faCloudUploadAlt}></FontAwesomeIcon>
                        <p>Кликните или перетащите <strong>несколько фотографий</strong> для  загрузки в альбом</p>
                    </div>
                    {check==false?
                    <p className={styles.errorText}>Выберите фотографии</p>
                        :''
                    }
                    <aside className={styles.thumbsContainer}>
                        {thumbs}
                    </aside>
                </section>


            </Modal.Body>

            <Modal.Footer>
                <Button onClick={onHideReset} variant="secondary">Закрыть</Button>
                <Button onClick={onSubmitPhoto} variant="primary" className={styles.sendButtonPhoto}>Загрузить фото</Button>
            </Modal.Footer>
        </Modal>


    );


}

let mapStateToProps = (state) => {
    return {
        windowLoadOpen: state.photos.windowLoadOpen

    }
}

let mapStateDispatch = (dispatch) => {
    return {
        loadPhotoThunk: (formData)=> {
            dispatch(loadPhotoThunk(formData))
        }
    }
}

export default  connect(mapStateToProps,mapStateDispatch)(PhotoWindow)
