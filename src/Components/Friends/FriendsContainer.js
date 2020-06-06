import React from "react";
import {getFriendsByTokenThunk, followFriendThunk, unFollowFriendThunk} from "./../../redux/friendsReducer";
import {compose} from "redux";
import {connect} from "react-redux";
import styles from "./friends.module.css";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import {Nav} from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import {showAllFriends, showFollowFriends, filterFriends, showFollowerFriends} from "./friendsAction";
import Form from "react-bootstrap/Form";
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faTrashAlt} from "@fortawesome/free-solid-svg-icons";

class FriendsContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.getFriendsByTokenThunk()
    }

    render() {

        return <div className={styles.friendsFon}>
            <Nav justify variant="tabs" defaultActiveKey="link-1" className={styles.friendNav}>
                <Nav.Item className={styles.itemFriendNav}>
                    <Nav.Link className={styles.itemFriendLink} onClick={this.props.showAllFriends} eventKey="link-1"><span className={styles.navName}>{!this.props.isMobile?'Все пользователи':'Люди'}</span><span><Badge className={styles.navBadge} variant="primary">{this.props.allFriendsCount}</Badge></span></Nav.Link>
                </Nav.Item>
                <Nav.Item className={styles.itemFriendNav}>
                    <Nav.Link className={styles.itemFriendLink} onClick={this.props.showFollowFriends} eventKey="link-2"><span className={styles.navName}>{!this.props.isMobile?'Подписки':'Подписки'}</span><span><Badge className={styles.navBadge} variant="primary">{this.props.followCount}</Badge></span></Nav.Link>
                </Nav.Item>
                <Nav.Item className={styles.itemFriendNav}>
                    <Nav.Link className={styles.itemFriendLink} onClick={this.props.showFollowerFriends} eventKey="link-3"><span className={styles.navName}>{!this.props.isMobile?'Подписчики':'Подписчики'}</span><span><Badge className={styles.navBadge} variant="primary">{this.props.followerCount}</Badge></span></Nav.Link>
                </Nav.Item>
            </Nav>
            <div className={styles.searchFormBlock}>
                <FontAwesomeIcon className={styles.searchIcon} icon={faSearch}></FontAwesomeIcon>
                <Form.Control onChange={this.props.filterFriends} value={this.props.searchInput} className={styles.inputFriendsSearch} type="text" placeholder=" Поиск друзей" />
            </div>
            {this.props.showFriends.map((friend, i) => {
                return <div key={friend.id} className={styles.friendblock}>
                    <div className={styles.friend_head_flex}>

                        <div className={styles.friend_head}>
                            <NavLink  to={"/profile/"+friend.id_user}>
                                <div className={styles.imgRoundFriend} style={{backgroundImage: `url(${friend.img})`}}></div>
                            </NavLink>
                            <div>
                                <NavLink className={styles.friendName} to={"/profile/"+friend.id_user}>{friend.name}</NavLink>

                                {this.props.isMobile?
                                     <div className={styles.button_block}>
                                         <NavLink to={"/dialogs/"+friend.id_user}>
                                             <Button className={styles.messageButton}  variant="outline-dark">{!this.props.isMobile?'Написать сообщение':'Сообщение'}</Button>
                                         </NavLink>
                                         {friend.follow?<>
                                             <Dropdown   >
                                                 <DropdownButton className={styles.unFollowButton} variant="success" title="Вы подписаны">
                                                     <Dropdown.Item onClick={()=>{this.props.unFollowFriendThunk(friend.id_user)}} >Отписаться</Dropdown.Item>
                                                 </DropdownButton>
                                             </Dropdown>
                                             </>
                                         :
                                             <Button className={styles.followButton} onClick={()=>{this.props.followFriendThunk(friend.id_user)}}>Подписаться</Button>
                                         }
                                     </div>
                                 :''}

                            </div>
                        </div>

                        {!this.props.isMobile?
                            <div className={styles.button_block}>
                                <NavLink to={"/dialogs/"+friend.id_user}>
                                    <Button className={styles.messageButton}  variant="outline-dark">{!this.props.isMobile?'Написать сообщение':'Сообщение'}</Button>
                                </NavLink>
                                {friend.follow?<>
                                    <Dropdown   >
                                        <DropdownButton className={styles.unFollowButton} variant="success" title="Вы подписаны">
                                            <Dropdown.Item onClick={()=>{this.props.unFollowFriendThunk(friend.id_user)}} >Отписаться</Dropdown.Item>
                                        </DropdownButton>
                                    </Dropdown>
                                    </>
                                    :
                                    <Button className={styles.followButton} onClick={()=>{this.props.followFriendThunk(friend.id_user)}}>Подписаться</Button>

                                }
                            </div>
                        :''}





                    </div>
                </div>

            })}

        </div>
    }

}

let mapStateToProps = (state) => {
    return {
        isLoad: state.friends.isLoad,
        friends: state.friends.friends,
        allFriendsCount: state.friends.allFriendsCount,
        searchInput: state.friends.searchInput,
        showFriends: state.friends.showFriends,
        followCount: state.friends.followFriends.length,
        followerCount: state.friends.followerFriends.length,
        isMobile: state.settings.isMobile
    }
}

const mapStateDispatch = (dispatch) => {
    return {
        getFriendsByTokenThunk: ()=> {
            dispatch(getFriendsByTokenThunk())
        },
        followFriendThunk: (id_friend)=> {
            dispatch(followFriendThunk(id_friend))
        },
        unFollowFriendThunk: (id_friend)=> {
            dispatch(unFollowFriendThunk(id_friend))
        },
        showAllFriends: ()=> {
            dispatch(showAllFriends())
        },
        showFollowFriends: ()=> {
            dispatch(showFollowFriends())
        },
        showFollowerFriends: ()=> {
            dispatch(showFollowerFriends())
        },
        filterFriends: (text)=> {
            dispatch(filterFriends(text.currentTarget.value))
        }


    }
}





export default  compose (
    connect(mapStateToProps,mapStateDispatch)
)(FriendsContainer)