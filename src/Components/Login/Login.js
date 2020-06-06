import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {loginAuthThunk} from "./../../redux/loginReducer"
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import NavLink from "react-router-dom/NavLink";
import {Nav} from "react-bootstrap";
import styles from "./login.module.css";
import stylesUpload from "./../UploadForm/formUpload.module.css"


const required = value => value ? undefined : 'Обязательно для заполнения'

const maxLength = max => value =>  value && value.length > max ? `Не более ${max} символов` : undefined
const maxLength10 = maxLength(10)



const badCharArr = [`'`,`"`,`/`,`$`,`@`,`!`,`-`,"\\",`#`,`?`,`%`,`.`,`,`];
const badChar = value => value ? badCharArr.reduce( (acc, char)=> value.indexOf(char)!=-1 ? `Недопустимые символы ` : acc , undefined)  : undefined



const LoginForm = (props) => {
    return (

        <form onSubmit={props.handleSubmit}>
            <div className="form-group">
            <Field name="login" component={InputField} placeholder="Логин" type="text"  validate={[ required, maxLength10, badChar ]}></Field>
            </div>
            <div className="form-group">
            <Field name="password" component={InputField} placeholder="Пароль" type="password"  validate={[ required, maxLength10, badChar ]}></Field>
            </div>
            <hr/>
            <div className="form-group">
            <Button className={styles.loginButton} variant="dark"  type="submit">Войти</Button>
            </div>
        </form>
    )
}


export const InputField = ({input, meta, ...props}) => {
    return (
        <div>
            <Form.Control className={`${meta.error && meta.touched ? stylesUpload.hasError : ""}`} {...input} {...props}></Form.Control>
            {meta.error && meta.touched&& <div className={stylesUpload.error}>{meta.error}</div>}
        </div>
    )
}

 const LoginComponent = reduxForm({
    form: 'login'
})(LoginForm);


class Login extends React.Component {
    constructor() {
       // console.log(props)
        super();
        //  this.onSubmit.bind(this)
    }
    onSubmit = (data) => {
        console.log(data)
        // debugger
        this.props.loginAuthThunk(data.login, data.password, data.rememberMe);
    }
    render() {
        return (
            <div>
                <Card className={styles.card} >
                    <Card.Header className={styles.cardHeader} as="h5">
                        <Nav variant="tabs" defaultActiveKey="/">
                            <Nav.Item className={styles.navItem}>
                                <Nav.Link lassName={styles.authLink} href="/">Авторизация</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className={styles.navItem}>
                                <Nav.Link  className={styles.registrationLink} href="/registration">Регистрация</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text className={styles.cardText} >
                           Введи логин и пароль для авторизации или <NavLink to="/registration">зарегистрируйтесь</NavLink>

                        </Card.Text>
                        <LoginComponent onSubmit={this.onSubmit}></LoginComponent>
                    </Card.Body>
                </Card>

            </div>
        )
    }
}

export default connect(null, {loginAuthThunk})(Login);