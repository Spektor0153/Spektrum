import React from "react";
import ProfileContainer from "./ProfileContainer";
import {getProfileByIdThunk, followFriendProfileThunk, unFollowFriendProfileThunk} from "./../../redux/profileReducer"
import {compose} from "redux";
import {connect} from "react-redux";

class GuestProfile extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.log(this.props.match.params.userId)
        this.props.getProfileByIdThunk(this.props.match.params.userId)
    }

    render() {
        console.log(this.props)
        return   <>
            <ProfileContainer
                followFriendProfileThunk={this.props.followFriendProfileThunk}
                unFollowFriendProfileThunk={this.props.unFollowFriendProfileThunk}
                user={this.props.user}
                showFollowButton = {true}
                userId={this.props.match.params.userId}
            ></ProfileContainer>
            </>

    }
}

let mapStateToProps = (state) => {
    return {
        isLoad: state.profile.isLoad,
        user: state.profile.user
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
        }


    }
}

export default  compose (
    connect(mapStateToProps,mapStateDispatch)
)(GuestProfile)