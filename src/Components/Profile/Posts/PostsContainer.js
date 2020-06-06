import React from "react";
import styles from "./posts.module.css";
import {sendPostThunk, deletePostThunk}  from "./../../../redux/postsReducer";
import {compose} from "redux";
import {connect} from "react-redux";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { textInputChange} from "./postsAction";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import NavLink from "react-router-dom/NavLink";
import PopoverStickOnHover from "./../../Popover/PopoverStickOnHover"
import PostForm from "./../../UploadForm/PostForm";

class Posts extends React.Component {
    constructor(props) {
        super(props);
    }


    createPopover=(likesCount, likeUsers)=>{
        return  (
            <div  className={styles.popover} >
                <div className={styles.popoverContent} >
                    <p className={styles.popoverTitle}>Понравилось {likesCount} людям</p>
                    <div className={styles.popoverflex}>
                        {
                            likeUsers.map((user, i)=>{
                                return <NavLink key={i} to={`/profile/${user.id_user}`}><div className={styles.popoverImg} style={{backgroundImage: `url(${user.img})`}} ></div></NavLink>
                            })
                            
                        }
                    </div>
                </div>
            </div>
        );

    }
    render() {
        console.log(this.props)

        return (
            <div>

                {this.props.myPage?
                <div className={styles.fon}>
                    <div>

                        <PostForm profileImg={this.props.profile.img} sendPostThunk={this.props.sendPostThunk} isMobile={this.props.isMobile}></PostForm>


                    </div>
                </div>
                :''}

                <div className={styles.postHeadTop_block}>
                    <p  className={styles.postHeadTop_button}>Все записи</p>
                </div>

                <div className={styles.postContainer}>
                    {
                        this.props.posts.map(post=>{
                           // console.log(post)
                            return    <div  key={post.id} className={styles.fon}>
                                    <div className={styles.post_head_flex}>
                                        <div className={styles.post_head}>
                                            <div className={styles.imgRound} style={{backgroundImage: `url(${this.props.profile.img})`}}></div>
                                            <div>
                                                <p className={styles.userName}>{this.props.profile.name}</p>
                                                <p className={styles.datePost}>{post.dateCreate}</p>
                                            </div>
                                        </div>
                                        {this.props.myPage?

                                            <FontAwesomeIcon onClick={()=>{this.props.deletePostThunk(post.id)}} className={styles.trashIcon} icon={faTrashAlt}></FontAwesomeIcon>
                                        :''}

                                    </div>
                                    <div className={styles.postText_block} dangerouslySetInnerHTML={{__html: post.text}}>

                                    </div>
                                    <hr/>
                                <div className={styles.clickBlockLike} onClick={(e) => {
                                    e.persist();
                                    post.myLike ? this.props.dislikePostProfileThunk(post.id, this.props.profile.id_user) : this.props.likePostProfileThunk(post.id, this.props.profile.id_user)
                                }}>
                                <PopoverStickOnHover
                                    component={this.createPopover(post.likes, post.likeUsers)}
                                    placement="top"
                                    onMouseEnter={() => { }}
                                    delay={200}
                                    createPopover={post.likes>0?true:false}
                                >
                                    <div className={styles.likeBlock}
                                    >
                                        <div className={styles.likeIcon+' '+ (post.myLike?styles.likeIconActive:'')}></div>
                                        <span className={styles.likeCount+' '+ (post.myLike?styles.likeCountActive:'')}>{post.likes}</span>
                                    </div>
                                </PopoverStickOnHover>
                                </div>
                                </div>

                        })
                    }
                    {
                        this.props.posts.length==0?
                            <div className={styles.emptyMessage_block}>
                                <img src="/no_posts.png" className={styles.emptyMessage_img}/>
                                <p className={styles.emptyMessage_text}>На стене пока нет ни одной записи</p>
                            </div>
                            :''
                    }
                </div>


            </div>
        )}
}

let mapStateToProps = (state) => {
    return {
        isLoad: state.posts.isLoad,
        inputText: state.posts.inputText,
        isMobile: state.settings.isMobile
    }
}

const mapStateDispatch = (dispatch) => {
    return {
        textInputChange: (text)=> {
            dispatch(textInputChange(text.currentTarget.value))
        },
        sendPostThunk: (post) => {
            console.log(post)
            dispatch(sendPostThunk(post))
        },
        deletePostThunk: (id) => {
            console.log(id)
            dispatch(deletePostThunk(id))
        }
    }
}





export default  compose (
    connect(mapStateToProps,mapStateDispatch)
)(Posts)
