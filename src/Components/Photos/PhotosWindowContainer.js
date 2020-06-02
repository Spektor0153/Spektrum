import React from "react";
import styles from "./photos.module.css";
import "./photosWindow.css"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {NavLink, Route} from "react-router-dom";
import queryString from "query-string";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {openPhotoWindow, closePhotoWindow, loadPhotosWindow, changePhoto} from "./photosWindowAction"

import {compose} from "redux";
import {connect} from "react-redux";
import Redirect from "react-router-dom/Redirect";
import {withRouter} from 'react-router-dom'
import Carousel from "react-bootstrap/Carousel";

class PhotosContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.log(this.props)
        if (this.props.queryParametrs.photo) {
            this.props.loadPhotosWindow(this.props.photos, this.props.queryParametrs.photo)
        }
        if (this.props.queryParametrs.avatar) {
            this.props.loadPhotosWindow(this.props.photos, this.props.queryParametrs.avatar)
        }
        this.props.openPhotoWindow()

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(this.props)
        if (this.props.queryParametrs.photo!=this.props.currentImg) {
            this.props.loadPhotosWindow(this.props.photos, this.props.queryParametrs.photo)
        }
       console.log('componentDidUpdate PHOTTTTTTTTTTTTOOOOOOOOOOOOOOOOOOOOS')
        // this.props.openPhotoWindow()
    }
    closeWindowHistory = (url)=> {
        this.props.history.push(url)
        //<Redirect to="/" push={true} />
    }
    imageChange = (selectedIndex, e) => {
      console.log(selectedIndex, e)
        //this.props.history.push(url)
        if (this.props.queryParametrs.photo) {
            this.props.history.push(this.props.location.pathname + '?photo=' + this.props.photos[selectedIndex].id)
        }
        //this.props.changePhoto(selectedIndex)
    }

    render() {
        console.log(this.props)


        return <div className={styles.fon}>

            <Modal className={styles.modalPhotoContent} show={this.props.myPage} onHide={()=>{this.closeWindowHistory(this.props.location.pathname)}} dialogClassName={styles.modalPhoto}>

                <Modal.Body className={styles.modalPhotoBody}>




                        <Container fluid={true} className={styles.container}>
                            <Row className={styles.row}>
                                <Col md={9} className={styles.photoCol}>
                                    <Carousel interval={null} activeIndex={this.props.currentImgNumber} onSelect={(...event)=>{this.imageChange(...event)}}>
                                        {
                                            this.props.photos.map((photo, i)=>{
                                                return <Carousel.Item>
                                                    <img
                                                        className={styles.windowImg}
                                                        src={`${photo.img}`}
                                                    />

                                                </Carousel.Item>
                                            })
                                        }
                                    </Carousel>
                                </Col>
                                <Col md={3} className={styles.rightCol}>
                                    <div className={styles.rightColBlock}>
                                        <div className={styles.rigthHeader}>
                                            <div className={styles.authorImg} style={{backgroundImage: `url(${this.props.profile.img})`}}></div>
                                            <div>
                                                <p className={styles.authorName}>{this.props.profile.name}</p>
                                                <p className={styles.authorDate}>{this.props.currentDate}</p>
                                            </div>
                                        </div>
                                        <div className={styles.rigthBody}>
                                            <p className={styles.descriptionText}>{this.props.currentText}</p>

                                        </div>
                                        <div className={styles.windowCross} onClick={()=>{this.closeWindowHistory(this.props.location.pathname)}}>
                                        </div>

                                    </div>
                                </Col>
                            </Row>
                        </Container>




                </Modal.Body>

            </Modal>




        </div>
    }
}


let mapStateToProps = (state) => {
    return {
        myPage: state.photos.windowOpen,
        //photos: state.profile.photos,
        currentImg: state.photos.currentImg,
        photosCount: state.photos.photosCount,
        currentImgNumber: state.photos.currentImgNumber,
        currentDate: state.photos.currentDate,
        currentText: state.photos.currentText,
        profile: state.profile.profile
    }
}

let mapStateDispatch = (dispatch) => {
    return {
        openPhotoWindow: ()=> {
            dispatch(openPhotoWindow())
        },
        closePhotoWindow: ()=> {
            dispatch(closePhotoWindow())
        },
        loadPhotosWindow: (photos, id_photo)=> {
            dispatch(loadPhotosWindow(photos, id_photo))
        },
        changePhoto: (numberSlider)=> {
            dispatch(changePhoto(numberSlider))
        },
    }
}

export default  compose (
    connect(mapStateToProps,mapStateDispatch), withRouter
)(PhotosContainer)
