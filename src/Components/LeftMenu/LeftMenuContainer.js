import React from "react";
import styles from "./leftMenu.module.css";
import {NavLink, Link} from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import {compose} from "redux";
import {connect} from "react-redux";
import {socket} from "./../../socket/SocketMy";
import {newMessageCountMenuChange} from "./LeftMenuAction";


export class LeftMenu extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.log('componentDidMount 222222222222222')

        socket.on("new_message_menu_socket_alert", () => {
            console.log("new_message_menu_socket_alert    URAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
            this.props.newMessageCountMenuChange(1)
        });
    }
    componentWillUnmount () {
        console.log('!!!!!!!!!!!!!!!!!componentWillUnmount))))))))))))))')
        socket.off("new_message_menu_socket_alert");
    }
    render() {
        return (
            <div className={styles.leftMenu_container}>
                <div>
                    <ul>
                        <li>
                            <NavLink className={styles.nav_a} to='/'><span
                                className={`${styles.icon} ${styles.home_icon} `}></span> <span className={styles.name}>Моя страница</span></NavLink>
                        </li>
                        <li>
                            <NavLink className={styles.nav_a} to="/friends"><span
                                className={`${styles.icon} ${styles.friends_icon} `}></span><span
                                className={styles.name}>Друзья</span></NavLink>
                        </li>
                        <li>
                            <NavLink className={styles.nav_a} to='/dialogs'><span
                                className={`${styles.icon} ${styles.dialogs_icon} `}></span><span
                                className={styles.name}>Сообщения
                                {this.props.countNewM>0?
                                <Badge className={styles.messageBadge} variant="primary">{this.props.countNewM}</Badge>
                                    :''}
                            </span></NavLink>
                        </li>
                        <li>
                            <NavLink className={styles.nav_a} to="/news"><span
                                className={`${styles.icon} ${styles.news_icon} `}></span><span
                                className={styles.name}>Новости</span></NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}


let mapStateToProps = (state) => {
    return {
        countNewM: state.leftMenu.countNewM
    }
}

export default compose(connect(mapStateToProps, {newMessageCountMenuChange}))(LeftMenu)

//export default LeftMenu;