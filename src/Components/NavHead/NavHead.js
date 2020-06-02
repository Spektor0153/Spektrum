import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {Link} from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./navHead.module.css";

export const NavHead = (props) => {
    console.log(props)
    return (

        <Navbar className={styles.navHeadAbsolute}  bg="dark" variant="dark">
            <Container>
                <Row className={styles.rowNav}>
                    <Col>
                        <div className={styles.containerNav}>

                        <Navbar.Brand href="/">SpekTrum</Navbar.Brand>
                        <Nav className="mr-auto"></Nav>

                        <div className={styles.userBlockFlex}>
                            {props.isAuth?
                                <>
                                <div className={styles.imgBlock} style={{backgroundImage: `url(${props.user.img})`}}></div>
                                <Dropdown className={styles.dropDown}>
                                    <Dropdown.Toggle as={CustomToggle} >
                                        {props.user.name}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu >
                                        <Dropdown.Item onClick={props.logOut} eventKey="1">Выход</Dropdown.Item>

                                    </Dropdown.Menu>
                                </Dropdown>
                                </>
                            :''}
                        </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Navbar>
    )
}



const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a href="" className={styles.dropDownLink} ref={ref}  onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}>
        {children}
         <span> &#x25bc;</span>
    </a>
));



