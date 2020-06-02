import React from "react";
import {connect} from "react-redux";
import {getChatsThunk} from "./../../redux/dialogsReducer"
import {compose} from "redux";
import styles from "./dialogs.module.css";
import {NavLink} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Badge from "react-bootstrap/Badge";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faEnvelopeOpenText} from "@fortawesome/free-solid-svg-icons";
import {socket} from "./../../socket/SocketMy";

export class DialogsContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.log('!!!!!!!!!!!!!!!!!componentDidMount')
        this.props.getChatsThunk()

        socket.on("new_dialog_message_socket_alert", () => {
            console.log("new_dialog_message_socket_alert    URAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
            this.props.getChatsThunk()
        });


       socket.on("read_you_dialog_socket", () => {
            console.log("read_you_dialog_socket    #################################");
           this.props.getChatsThunk()
        });
    }
    componentWillUnmount () {
        console.log('!!!!!!!!!!!!!!!!!componentWillUnmount))))))))))))))')
        socket.off("new_dialog_message_socket_alert");
        socket.off("read_you_dialog_socket");
    }


    render() {
        console.log(this.props)
        return <div className={styles.dialogFon}>
            {this.props.dialogs.length==0?
                <div className={styles.emptyBlock}>
                    <FontAwesomeIcon  className={styles.noIcon} icon={faEnvelopeOpenText}></FontAwesomeIcon>
                    <p className={styles.emptyBlockText}>У вас пока нет диалогов. Начните общение с поиска <NavLink to="/friends">друзей</NavLink></p>
                </div>:''
            }
            {this.props.dialogs.map((dialog, i)=>{

                return <NavLink className={styles.linkDialog} to={"/dialogs/"+dialog.id_friend}>


                <div key={i} className={styles.dialogBlock + ' ' + (dialog.countNewM!=0?styles.incomingDialogBlock:'')}>


                            <div >
                                <div className={styles.imgRoundDialog} style={{backgroundImage: `url(${dialog.img})`}}></div>
                                <div className={styles.dialog_rightCol}>
                                    <div className={styles.dialog_rightCol_top}>
                                    <p className={styles.dialogdName}>{dialog.name}</p>
                                    <p className={styles.dialogDate}>{dialog.datesend}</p>
                                    </div>
                                    <div className={styles.dialog_rightCol_bottom}>
                                        {dialog.id_friend==dialog.id_author?
                                            <p className={styles.dialogMessage}>{dialog.message}</p>
                                            :<div className={styles.myMessage_block}>
                                                <div className={styles.myMessage_imgRound} style={{backgroundImage: `url(${this.props.img})`}}></div>

                                                <p className={styles.dialogMyMessage + ' ' + (dialog.read_message==0?styles.dialogMyMessage_gray:'')}>{dialog.message}</p>
                                            </div>
                                        }
                                        {dialog.countNewM!=0?
                                            <p className={styles.dialogBadgeBlock}>
                                                <Badge className={styles.messageBadge} variant="primary">{dialog.countNewM}</Badge>
                                            </p>:''
                                        }
                                    </div>

                                </div>
                            </div>



                </div>


                </NavLink>
            })}
        </div>
    }
}

let mapStateToProps = (state) => {
    return {
        dialogs: state.dialogs.dialogs,
        name: state.authReducer.data.name,
        img: state.authReducer.data.img
    }
}

let mapStateDispatch = (dispatch) => {
    return {
        getChatsThunk: ()=>{
            dispatch(getChatsThunk())
        }
    }
}

export default compose(connect(mapStateToProps, mapStateDispatch))(DialogsContainer)