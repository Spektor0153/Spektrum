import React from "react";
import {connect} from "react-redux";
import StartPage from "./../StartPage/StartPageContainer";
import {NavHead} from "./..//NavHead/NavHead"
import LeftMenu from "./../LeftMenu/LeftMenuContainer"
import styles from "./mainLayer.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import {BrowserRouter, Route, Switch, withRouter} from "react-router-dom";
import ProfileContainer from "./../Profile/ProfileContainer";
import DialogsContainer from "./../Dialogs/DialogsContainer";
import {compose} from "redux";
import {getUserByTokenThunk, logOutAuthThunk,  } from "./../../redux/loginReducer";
import Friends from "./../Friends/FriendsContainer"
import Posts from "./../Profile/Posts/PostsContainer";
import GuestProfile from "./../Profile/GuestProfile";
import MessagesContainer from "./../Dialogs/Messages/MessagesContainer";
import NewsContainer from "./../News/NewsContainer";
import RegistrationContainer from "./../Registration/RegistrationContainer";
import UploadForm from "./../UploadForm/UploadForm"
import Redirect from "react-router-dom/Redirect";
import {socket} from "./../../socket/SocketMy";

class MainLayer extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.log('getUserByTokenThunk 222222222222222')
        if (this.props.token) {
            this.props.getUserByTokenThunk();
        }

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('componentDidUpdate 222222222222222')
        console.log(this.props)
        if (this.props.token&&this.props.isAuth===false) {
            this.props.getUserByTokenThunk();
        }
    }


    render() {

        return (
            <BrowserRouter>
            <div>

                        <NavHead  user={this.props.user} isAuth={this.props.isAuth} logOut={this.props.logOutAuthThunk}></NavHead>

                        {this.props.isAuth===true?
                        <Container className={styles.mainPage_container}>
                            <Row className={styles.mainPage_row}>
                                <Col md={3}>
                                    <LeftMenu></LeftMenu>
                                </Col>
                                <Col md={9}>
                                            <Switch>
                                                <Route exact path="/"
                                                       component={props => <ProfileContainer match={props.match} location={props.location} userId={ this.props.user.id_user}  /> }
                                                > </Route>
                                                <Route exact path="/dialogs" component={props => <DialogsContainer {...props} />} >
                                                </Route>
                                                {this.props.profileLoaded?
                                                    <Route exact path="/dialogs/:userId?" component={props => <MessagesContainer {...props} />} >
                                                    </Route>
                                                    :''}

                                                <Route path="/friends" component={props => <Friends {...props} />} >            </Route>
                                                <Route path="/news" component={props => <NewsContainer {...props} />} >          </Route>

                                                <Route path='/profile/:userId?' component={props => <ProfileContainer match={props.match} location={props.location} userId={props.match.params.userId} />}></Route>

                                                <Redirect to="/" />

                                            </Switch>

                                </Col>
                            </Row>
                        </Container>
                            :

                            <Switch>
                                <Route path="/registration">
                                    <div>

                                        <RegistrationContainer></RegistrationContainer>

                                    </div>
                                </Route>
                                {this.props.token ? '' :
                                    <StartPage></StartPage>
                                }

                            </Switch>
                        }






            </div>
            </BrowserRouter>

        )
    }

}

let mapStateToProps = (state) => {
    return {
        isAuth: state.authReducer.isAuth,
        user: state.authReducer.data,
        profileLoaded: state.authReducer.profileLoaded,
        token: state.authReducer.token
    }
}

export default  compose (
    connect(mapStateToProps,{getUserByTokenThunk, logOutAuthThunk})
)(MainLayer)

//export default (connect(mapStateToProps,{})(withRouter(MainLayer)));