import React from "react";
import styles from "./posts.module.css";
import {compose} from "redux";
import {connect} from "react-redux";
import {getPostsByIdThunk} from "./../../../redux/profileReducer"


class GustPosts extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.log(this.props)
        this.props.getGuestPostsByIdThunk(this.props.userId);
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <div className={styles.postHeadTop_block}>
                    <p  className={styles.postHeadTop_button}>Все записи</p>
                </div>
                <div className={styles.postContainer}>
                {
                    this.props.posts.map(post=>{
                        // console.log(post)
                        return <div key={post.id} className={styles.fon}>
                                <div className={styles.post_head_flex}>
                                    <div className={styles.post_head}>
                                        <div className={styles.imgRound} style={{backgroundImage: `url(${this.props.user.img})`}}></div>
                                        <div>
                                            <p className={styles.userName}>{this.props.user.name}</p>
                                            <p className={styles.datePost}>{post.dateCreate}</p>
                                        </div>
                                    </div>

                                </div>
                                <div className={styles.postText_block}>
                                    {post.text}
                                </div>
                                <hr/>
                                <div>
                                    <span className={styles.likesCount}>{post.likes}</span>
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
        posts: state.guestProfile.posts,
        user: state.guestProfile.data
    }
}

const mapStateDispatch = (dispatch) => {
    return {
        getPostsByIdThunk: (userId)=> {
            dispatch(getPostsByIdThunk(userId))
        },

    }
}





export default  compose (
    connect(mapStateToProps,mapStateDispatch)
)(GustPosts)
