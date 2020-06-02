import React from "react";
import {connect} from "react-redux";
import {getChatsThunk, getMessagesThunk, sendMessageThunk, readNewMessageThunk} from "./../../../redux/dialogsReducer"
import {compose} from "redux";
import styles from "./../dialogs.module.css";
import Badge from "react-bootstrap/Badge";
import {NavLink} from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {MESSAGE_INPUT_CHANGE, messageInputChange, incomingMessageNewRead} from "./../dialogsAction";
import {socket} from "./../../../socket/SocketMy"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faEnvelopeOpenText} from "@fortawesome/free-solid-svg-icons";
import {Field, Form, reduxForm} from "redux-form";
import FormBootstrap from "react-bootstrap/Form";

const required = value => value ? undefined : 'Обязательно для заполнения'
const badCharArr = [`'`,`"`,`/`,`$`,`@`,`!`,`-`,"\\",`#`,`?`,`%`,`.`,`,`];
const badChar = value => value ? badCharArr.reduce( (acc, char)=> value.indexOf(char)!=-1 ? `Недопустимые символы ` : acc , undefined)  : undefined



export class MessagesContainer extends React.Component {
    constructor(props) {
        super(props);
        this.messagesEndRef = React.createRef();
    }



    componentDidMount() {
        console.log('!!!!!!!!!!!!!!!!!componentDidMount')

        console.log(this.props)
        this.props.getMessagesThunk(this.props.match.params.userId)
       // this.scrollToBottom()
       // this.props.readNewMessageThunk()
        this.props.incomingMessageNewRead()
        this.scrollToBottom()
        socket.on("new_message_socket_alert", (data)=>{
            console.log("new_message_socket_alert    URAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
            this.props.getMessagesThunk(this.props.match.params.userId)
        });

        socket.on("read_you_message_socket", (data)=>{
            console.log("read_you_message_socket    #################################");
            this.props.readNewMessageThunk()
        });

    }
    componentWillUnmount () {
        console.log('!!!!!!!!!!!!!!!!!componentWillUnmount))))))))))))))')
        socket.off("new_message_socket_alert");
        socket.off("read_you_message_socket");
    }
    componentDidUpdate () {
        this.scrollToBottom()
    }
    scrollToBottom = () => {
        this.messagesEndRef.current.scrollIntoView()
    }
    render() {
        return <div className={styles.messageFon}>
            <div className={styles.messageHeaderBlock}>
                <NavLink to="/dialogs"  className={styles.backLink} >  <FontAwesomeIcon  className={styles.leftIcon} icon={faChevronLeft}></FontAwesomeIcon> Назад</NavLink>
                <NavLink to={"/profile/"+this.props.messageFriendId}  className={styles.profileLink} >{this.props.messageFriendName}</NavLink>
                <NavLink to={"/profile/"+this.props.messageFriendId}>
                    <div className={styles.imgRoundHead} style={{backgroundImage: `url(${this.props.messageFriendImg})`}}></div>
                </NavLink>

            </div>







            <div className={styles.messagesFon}>

            {this.props.messages.map((message,i)=>{
                    return <div key={i} >
                    {message.showProfile?
                        <div key={i} className={styles.messageBlockProfile + ' ' + (message.readMessage==0?styles.incomingDialogBlock:'')}>
                            <div className={styles.dialog_head_flex}>

                                    <div className={styles.imgRoundDialog} style={{backgroundImage: `url(${(message.id_user!=this.props.myId)?this.props.messageFriendImg:this.props.img})`}}></div>

                                    <div className={styles.dialog_rightCol}>
                                        <div className={styles.dialog_rightCol_top}>
                                            <p className={styles.dialogdName}>{(message.id_user!=this.props.myId)?this.props.messageFriendName:this.props.name}</p>
                                            <p className={styles.dialogDate}>{message.datesend}</p>
                                        </div>
                                        <div className={styles.dialog_rightCol_bottom}>

                                            <p className={styles.messageBlockTextFull + ' ' + (message.read_message==0?styles.dialogMyMessage_gray:'')}>{message.message}</p>
                                        </div>
                                    </div>

                            </div>
                        </div>
                        :
                        <div key={i} className={styles.messageBlock + ' ' + (message.readMessage==0?styles.incomingDialogBlock:'')}>
                            <div className={styles.dialog_head_flex}>
                                <div className={styles.dialog_rightCol}>
                                    <div className={styles.dialog_rightCol_top}>
                                        <p className={styles.messageBlockTextFull + ' ' + (message.read_message==0?styles.dialogMyMessage_gray:'')}>{message.message}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    </div>
                })}

                <div ref={this.messagesEndRef} />
            </div>





            <div className={styles.messageFooterBlock}>

                <MessageFormRedux {...this.props}></MessageFormRedux>


            </div>



        </div>
    }
}

let mapStateToProps = (state) => {
    return {
        messages: state.dialogs.messages,
        id_room:  state.dialogs.id_room,
        inputText: state.dialogs.inputText,
        myId: state.authReducer.data.id,
        name: state.authReducer.data.name,
        img: state.authReducer.data.img,
        messageFriendName: state.dialogs.messageFriendName,
        messageFriendImg: state.dialogs.messageFriendImg,
        messageFriendId: state.dialogs.messageFriendId,
    }
}

let mapStateDispatch = (dispatch) => {
    return {
        getChatsThunk: ()=>{
            dispatch(getChatsThunk())
        },
        getMessagesThunk: (id_user)=> {
            dispatch(getMessagesThunk(id_user))
        },
        messageInputChange: (text)=> {
            dispatch(messageInputChange(text.currentTarget.value))
        },
        sendMessageThunk: (id_room, id_friend, message)=> {
            dispatch(sendMessageThunk(id_room, id_friend, message))
        },
        readNewMessageThunk: () => {
            dispatch(readNewMessageThunk())
        },
        incomingMessageNewRead: () => {
            console.log('dispatch(incomingMessageNewRead())')
            dispatch(incomingMessageNewRead())
        }

    }
}

const renderField = ({ input, label, type, meta: { touched, error, warning }, ...test }) => {
    console.log(input);
    console.log(test)
  return  <div className={styles.flexInput}>
        <FormBootstrap.Control autoComplete="off"  value={input.value} className={`${styles.inputMessage} ${error && touched ? styles.hasError : ""}`} {...input} placeholder={label} type={type}/>
    </div>
}

let MessageForm = (props)=> {

    let onSubmitForm = () => {
        console.log('onSubmitForm')
        props.sendMessageThunk(props.id_room, props.messageFriendId, props.inputText)
        props.reset()
    }

    return  <Form onSubmit={props.handleSubmit(onSubmitForm) }>
        <Row className={styles.rowPosts}>
            <Col md={9}>
                <div className={styles.flexBlock_post}>
                    <Field component="input" type="text"  onChange={props.messageInputChange} value={props.inputText} className={styles.inputMessage}  name="message"  component={renderField} label="Напишите сообщение"  validate={[ required, badChar ]} />
                </div>
            </Col>

            <Col  md={3}>
                <Button className={styles.sendMessageButton}  variant="dark" type="submit">Отправить</Button>
            </Col>
        </Row>
    </Form>

}

let MessageFormRedux= reduxForm({ form: "PostForm" })(MessageForm);

export default compose(connect(mapStateToProps, mapStateDispatch))(MessagesContainer)