import React from "react";
import styles from "./photos.module.css";
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle, faCloudDownloadAlt} from "@fortawesome/free-solid-svg-icons";

export default class PhotosContainer extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        console.log(this.props)

        return <div className={styles.fon}>
            <div className={styles.photoHead}>
                <p className={styles.photoHeadZag}>Фотографии {this.props.photos.length}</p>
                {this.props.myPage?
                    <FontAwesomeIcon  onClick={this.props.openAddPhotoWindow} className={styles.addPhotoIcon} icon={faPlusCircle}></FontAwesomeIcon>
                :''}
            </div>
            <div className={styles.containerPhotos}>

                    {
                        this.props.photos.map((photo,i)=>{
                            if (i<4) {
                                return <div key={i} className={styles.photoBlock}>
                                    <NavLink to={this.props.match.url+'?photo='+photo.id}>
                                        <div className={styles.photo} style={{backgroundImage: `url(${photo.img})`}}></div>
                                    </NavLink>
                                </div>
                            }
                        })
                    }
                    {this.props.photos.length==0?
                        <div onClick={this.props.openAddPhotoWindow} className={styles.emptyPhotoBlock}>
                            <FontAwesomeIcon   className={styles.emptyPhotoIcon} icon={faCloudDownloadAlt}></FontAwesomeIcon>
                            <p className={styles.emptyPhotoText}>Добавьте фотографии в альбом</p>
                        </div>
                    :''}
            </div>
        </div>
    }
}


