import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {registrationThunk} from "./../../redux/loginReducer"
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import styles from "./../StartPage/startPage.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import UploadImageForm from "./../UploadForm/UploadForm";
import { withRouter } from "react-router";
import {compose} from "redux";




class Registration extends React.Component {
    constructor(props) {
        // console.log(props)
        super(props);
    }
    onSubmit = (data) => {
        console.log(data)
       // this.props.loginAuthThunk(data.login, data.password, data.rememberMe);
    }
    onChangeFile = (e) => {
        console.log(e)
    }
    componentDidMount() {
        if (this.props.registrationRedirect) {
            this.props.history.push('/')
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.registrationRedirect) {
            this.props.history.push('/')
        }
    }

    render() {
        return (
            <Container className={styles.startPage_container}>
                <Row className={styles.startPage_row}>
                    <Col md={12}>
                        <div className={styles.form_container}>



                                <Card className={styles.card}>
                                    <Card.Header className={styles.headReg} as="h5">Регистрация пользователя</Card.Header>
                                    <Card.Body>

                                        <UploadImageForm registrationThunk={this.props.registrationThunk}></UploadImageForm>

                                    </Card.Body>
                                </Card>



                        </div>

                    </Col>

                </Row>

            </Container>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        registrationRedirect: state.authReducer.registrationRedirect,

    }
}

export default compose (connect(mapStateToProps, {registrationThunk}),withRouter)(Registration);
//export default connect(mapStateToProps, {registrationThunk})(Registration);