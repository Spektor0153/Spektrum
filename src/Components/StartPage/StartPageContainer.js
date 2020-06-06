import React from "react";
import styles from "./startPage.module.css"
import Login from "./../Login/Login";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";



class StartPage extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div>
                <Container className={styles.startPage_container}>
                    <Row className={styles.startPage_row}>
                        <Col  md={{span:8, order: 'first'}}  xs={{order: 'last'}}>
                            <div className={styles.travolta_container}>
                                <p className={styles.travolta_zag}>Не можешь найти <span className={styles.dashed}>друзей?</span></p>
                                <p className={styles.travolta_text}>Так они уже здесь... Регистрируйся...</p>
                            <img className={styles.travolta_img} src="/gif-maker.gif" alt=""/>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className={styles.form_container}>
                                <Login></Login>
                            </div>
                        </Col>
                    </Row>

                </Container>

            </div>
        )
    }
}

export default StartPage;
