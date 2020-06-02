import React from "react";
import styles from "./news.module.css"
import stylesPost from "./../Profile/Posts/posts.module.css"
import {compose} from "redux";
import {connect} from "react-redux";
import {newsLoadThunk} from "./../../redux/newsReducer"
import NavLink from "react-router-dom/NavLink";
import PopoverStickOnHover from "./../Popover/PopoverStickOnHover"
import {likePostNewsThunk, dislikePostNewsThunk} from "./../../redux/newsReducer"

class NewsContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.log('NEWS componentDidMount')
        this.props.newsLoadThunk()
    }
    createPopover=(likesCount, likeUsers)=>{
        return  (
            <div  className={stylesPost.popover} >
                <div className={stylesPost.popoverContent} >
                    <p className={stylesPost.popoverTitle}>Понравилось {likesCount} людям</p>
                    <div className={stylesPost.popoverflex}>
                        {
                            likeUsers.map((user, i)=>{
                                return <NavLink key={i} to={`/profile/${user.id_user}`}><div className={stylesPost.popoverImg} style={{backgroundImage: `url(${user.img})`}} ></div></NavLink>
                            })

                        }
                    </div>
                </div>
            </div>
        );

    }
    render() {
        return  <div>

            {
                this.props.news.map(news=>{
                    // console.log(post)
                    return <div key={news.id}>
                        <div className={styles.newsFon}>
                            <div className={styles.post_head_flex}>
                                <div className={styles.post_head}>
                                    <NavLink to={`/profile/${news.id_user}`}>
                                        <div className={styles.imgRound} style={{backgroundImage: `url(${news.img})`}}></div>
                                    </NavLink>
                                    <div>
                                        <NavLink to={`/profile/${news.id_user}`}>
                                            <p className={styles.userName}>{news.name}</p>
                                        </NavLink>
                                        <p className={styles.datePost}>{news.dateCreate}</p>
                                    </div>
                                </div>

                            </div>
                            <div className={styles.postText_block} dangerouslySetInnerHTML={{__html: news.text}} />
                            <hr/>

                                <div className={stylesPost.clickBlockLike} onClick={(e) => {
                                    e.persist();
                                    news.myLike ? this.props.dislikePostNewsThunk(news.id) : this.props.likePostNewsThunk(news.id)
                                }}>
                                    <PopoverStickOnHover
                                        component={this.createPopover(news.likes, news.likeUsers)}
                                        placement="top"
                                        onMouseEnter={() => { }}
                                        delay={200}
                                        createPopover={news.likes>0?true:false}
                                    >
                                        <div className={stylesPost.likeBlock}
                                        >
                                            <div className={stylesPost.likeIcon+' '+ (news.myLike?stylesPost.likeIconActive:'')}></div>
                                            <span className={stylesPost.likeCount+' '+ (news.myLike?stylesPost.likeCountActive:'')}>{news.likes}</span>
                                        </div>
                                    </PopoverStickOnHover>
                                </div>

                        </div>


                    </div>
                })
            }




        </div>
    }
}


let mapStateToProps = (state) => {
    return {
        news: state.news.news,
        isLoad: state.news.isLoad,
    }
}


const mapStateDispatch = (dispatch) => {
    return {
        newsLoadThunk: ()=> {
            dispatch(newsLoadThunk())
        },
        likePostNewsThunk: (id_post)=> {
            dispatch(likePostNewsThunk(id_post))
        },
        dislikePostNewsThunk: (id_post)=> {
            dispatch(dislikePostNewsThunk(id_post))
        }

    }
}




export default  compose (
    connect(mapStateToProps,mapStateDispatch)
)(NewsContainer)