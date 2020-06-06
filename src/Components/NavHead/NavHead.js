import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {Link} from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./navHead.module.css";
import {connect} from "react-redux";
import {compose} from "redux";
import {mobileAnalyse} from "./NavHeadAction"

//export const NavHead = (props) => {
    class NavHead extends React.Component {
        constructor(props) {
            super(props);
        }
        render() {
            console.log(this.props)
            return (

                <Navbar className={styles.navHeadAbsolute} bg="dark" variant="dark">
                    <Container>
                        <div className={styles.rowNav}>
                            <Col className={styles.colNav}>
                                <div className={styles.containerNav}>

                                    <Navbar.Brand href="/">SpekTrum</Navbar.Brand>
                                    <Nav className="mr-auto"></Nav>

                                    <div className={styles.userBlockFlex}>
                                        {this.props.isAuth ?
                                            <>
                                            {!this.props.isMobile?
                                                <div className={styles.imgBlock}
                                                     style={{backgroundImage: `url(${this.props.user.img})`}}></div>
                                                :''}
                                                <Dropdown className={styles.dropDown}>
                                                    <Dropdown.Toggle as={CustomToggle}>
                                                        {this.props.user.name}
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item onClick={this.props.logOut}
                                                                       eventKey="1">Выход</Dropdown.Item>

                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </>
                                            : ''}
                                    </div>
                                </div>
                            </Col>
                        </div>
                    </Container>
                </Navbar>
            )
        }
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



        let mapStateToProps = (state) => {
            return {
                isMobile: state.settings.isMobile
            }
        }

        export default  connect(mapStateToProps,{mobileAnalyse})(NavHead)