import React from "react";
import styles from "./profile.module.css"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import {NavLink} from "react-router-dom";
import Posts from "./Posts/PostsContainer";
import GuestPosts from "./Posts/GusetPosts";
import {followFriendProfileThunk, getProfileByIdThunk, unFollowFriendProfileThunk, sendStatusProfileThunk, likePostProfileThunk, dislikePostProfileThunk} from "./../../redux/profileReducer";
import {compose} from "redux";
import {connect} from "react-redux";
import {FriendsBlock} from "./../Friends/FriendsBlock/FriendsBlock";
import {statusInputOpen, statusTextChange} from "./profileAction";
import Photos from "./../Photos/PhotosContainer"
import PhotosWindow from "./../Photos/PhotosWindowContainer"
import queryString from "query-string";
import PhotoWindow from "./../PhotoWindow/PhotoWindowContainer";
import {openAddPhotoWindow, OPEN_ADD_PHOTO_WINDOW, closeAddPhotoWindow, CLOSE_ADD_PHOTO_WINDOW} from "./../Photos/photosWindowAction"


class ProfileContainer extends React.Component{
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.log('getProfileByIdThunk ----------------')
        this.props.getProfileByIdThunk(this.props.userId)
    }
    componentDidUpdate() {
        if (this.props.profile.id_user!=this.props.userId) {
            this.props.getProfileByIdThunk(this.props.userId)
        }
    }

    render() {
        console.log(this.props)
        console.log(this.props.match)
        const queryParametrs = queryString.parse(this.props.location.search)
        console.log(queryParametrs)

        return (
            <>
            <div className={styles.fon}>
                   <Container className={styles.containerProfile} fluid>
                       <Row>
                           <Col md={4}>
                               <div className={styles.blockFon}>
                                    <NavLink  to={this.props.match.url+'?avatar=1'}>
                                        <div className={styles.imgBlock} style={{backgroundImage: `url(${this.props.profile.img})`}}></div>
                                    </NavLink>
                                   {!this.props.myPage?
                                       <div className={styles.button_block}>
                                           <NavLink className={styles.messageButton+' btn btn-primary'}  to={`/dialogs/${this.props.profile.id_user}`} >Написать сообщение</NavLink>
                                           {this.props.profile.follow?<>
                                                   <Dropdown   >
                                                       <DropdownButton className={styles.unFollowButton} variant="success" title="Вы подписаны">
                                                           <Dropdown.Item onClick={()=>{this.props.unFollowFriendProfileThunk(this.props.profile.id_user)}} >Отписаться</Dropdown.Item>
                                                       </DropdownButton>
                                                   </Dropdown>
                                               </>
                                               :
                                               <Button className={styles.followButton} onClick={()=>{this.props.followFriendProfileThunk(this.props.profile.id_user)}}>Подписаться</Button>
                                           }
                                       </div>
                                   :''}

                               </div>

                               <FriendsBlock friends={this.props.friends} followCount={this.props.profile.folowCount}></FriendsBlock>

                           </Col>
                           <Col md={8}>
                                <div className={styles.blockFon + ' ' + styles.flexblockFon }>
                                   <div className={styles.userInfo_block}>
                                       <p className={styles.userName}>{this.props.profile.name}</p>
                                       <div>
                                           {
                                               this.props.myPage==true?
                                                    this.props.statusOpen==true?
                                                       <div className={styles.statusBlock}>
                                                           <Form.Control onChange={this.props.statusTextChange} value={this.props.statusText} className={styles.inputStatus} type="text" placeholder="Изменить статус..." />
                                                           <Button variant="success" onClick={()=>{this.props.sendStatusProfileThunk(this.props.statusText)}}>Сохранить</Button>
                                                       </div>
                                                    :
                                                    <p onDoubleClick={this.props.statusInputOpen} className={styles.userStatus}>{this.props.statusText.length?this.props.statusText:'Измените статус..'}</p>
                                                :
                                                   this.props.statusText.length?
                                                        <p onDoubleClick={this.props.statusInputOpen} className={styles.userStatus}>{this.props.statusText.length?this.props.statusText:''}</p>
                                                   :<p></p>
                                           }

                                       </div>

                                       <span className={styles.razdelitel}></span>
                                       {this.props.profile.dateb||this.props.profile.school||this.props.profile.about?
                                       <Container className={styles.infoUserContainer} fluid>

                                               {this.props.profile.dateb?
                                                   <Row className={styles.listRow}>
                                                       <Col sm={4}><span className={styles.listHead}>День рождения:</span></Col>
                                                       <Col sm={8}><span className={styles.listText}>{this.props.profile.dateb}</span></Col>
                                                   </Row>
                                               :''}
                                               {this.props.profile.school?
                                               <Row className={styles.listRow}>
                                                   <Col sm={4}><span className={styles.listHead}>Место работы:</span></Col>
                                                   <Col sm={8}><span className={styles.listText}>{this.props.profile.school}</span></Col>
                                               </Row>
                                               :''}
                                                {this.props.profile.about?
                                               <Row className={styles.listRow}>
                                                   <Col sm={4}><span className={styles.listHead}>О себе:</span></Col>
                                                   <Col sm={8}><span className={styles.listText}>{this.props.profile.about}</span></Col>
                                               </Row>
                                               :''}


                                       </Container>
                                           :''}
                                   </div>
                                    <div className={styles.userInfo_counteri}>
                                        <NavLink to="/friends">
                                            <p className={styles.counterNumber}>{this.props.profile.folowCount}</p>
                                            <p className={styles.counterText}>Подписок</p>
                                        </NavLink>
                                        <NavLink to="/friends">
                                            <p className={styles.counterNumber}>{this.props.profile.folowerCount}</p>
                                            <p className={styles.counterText}>Подписчиков</p>
                                        </NavLink>
                                        <NavLink to="/photos">
                                            <p className={styles.counterNumber}>{this.props.profile.photosCount}</p>
                                            <p className={styles.counterText}>Фотографий</p>
                                        </NavLink>
                                        <NavLink to="/photos">
                                            <p className={styles.counterNumber}>{this.props.profile.postsCount}</p>
                                            <p className={styles.counterText}>Постов</p>
                                        </NavLink>
                                    </div>


                                </div>
                               {(this.props.photos.length>0 ||this.props.myPage) ?
                                    <Photos
                                        photos={this.props.photos}
                                        match={this.props.match}
                                        location={this.props.location}
                                        windowLoadOpen={this.props.windowLoadOpen}
                                        openAddPhotoWindow={this.props.openAddPhotoWindow}
                                        myPage={this.props.myPage}
                                    ></Photos>
                                :''}
                               {this.props.myPage?
                                    <PhotoWindow closeAddPhotoWindow={this.props.closeAddPhotoWindow}></PhotoWindow>
                                :''}

                                <Posts  posts={this.props.posts}
                                    profile={this.props.profile}
                                    myPage={this.props.myPage}
                                    likePostProfileThunk={this.props.likePostProfileThunk}
                                    dislikePostProfileThunk={this.props.dislikePostProfileThunk}
                                ></Posts>

                               {queryParametrs.photo&&this.props.isLoad==true?
                                   <PhotosWindow photos={this.props.photos}  queryParametrs={queryParametrs} location={this.props.location}></PhotosWindow>
                               :''}
                               {queryParametrs.avatar&&this.props.isLoad==true?
                                   <PhotosWindow photos={[{img: this.props.profile.img}]}  queryParametrs={queryParametrs} location={this.props.location}></PhotosWindow>
                                   :''}

                           </Col>
                       </Row>
                   </Container>
            </div>




        </>
        )
    }
}


let mapStateToProps = (state) => {
    return {
        myPage: state.profile.myPage,
        isLoad: state.profile.isLoad,
        profile: state.profile.profile,
        posts: state.profile.posts,
        photos: state.profile.photos,
        friends: state.profile.friends,
        statusText: state.profile.statusText,
        statusOpen: state.profile.statusOpen,
        currentText: state.profile.currentText,
        windowLoadOpen: state.photos.windowLoadOpen
    }
}

let mapStateDispatch = (dispatch) => {
    return {
        followFriendProfileThunk: (id_friend)=> {
            dispatch(followFriendProfileThunk(id_friend))
        },
        unFollowFriendProfileThunk: (id_friend)=> {
            dispatch(unFollowFriendProfileThunk(id_friend))
        },
        getProfileByIdThunk: (userId)=> {
            dispatch(getProfileByIdThunk(userId))
        },
        statusInputOpen: ()=> {
            dispatch(statusInputOpen())
        },
        statusTextChange: (text)=> {
            dispatch(statusTextChange(text.currentTarget.value))
        },
        sendStatusProfileThunk: (text)=> {
            dispatch(sendStatusProfileThunk(text))
        },
        likePostProfileThunk: (id_post, id_user)=> {
            dispatch(likePostProfileThunk(id_post, id_user))
        },
        dislikePostProfileThunk: (id_post, id_user)=> {
            dispatch(dislikePostProfileThunk(id_post, id_user))
        },
        openAddPhotoWindow: ()=> {
            dispatch(openAddPhotoWindow())
        },
        closeAddPhotoWindow: ()=> {
            dispatch(closeAddPhotoWindow())
        },


    }
}

export default  compose (
    connect(mapStateToProps,mapStateDispatch)
)(ProfileContainer)


