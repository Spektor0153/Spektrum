import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from "react-bootstrap";
import style from './mainLayot.module.css'
import LeftCol from './../LeftCol/LeftCol'
import RightColContainer from "./../RightCol/RightColContainer";
import {leftColPositionChange} from "./../LeftCol/leftColAction"
import {connect} from "react-redux";

let MainContainer = (props) => {
    return <div>
        <div className={style.left_col + ' ' + (props.mob_colPosition?style.fixed:'')}>

            <div onClick={props.leftColPositionChange}  className={style.closeButton_block}>
                <div className={style.closeButton_tab}>
                    <i className={style.icon}></i></div>
            </div>

            <LeftCol></LeftCol>

        </div>
        <div className={style.right_col}>
            <div className={props.mob_colPosition?style.mob_shadow_active:''}></div>
            <Container>
                <Row>
                    <Col md={12}>
                        <RightColContainer></RightColContainer>
                    </Col>
                </Row>
            </Container>
        </div>


    </div>
}

const mapStateToProps = (state) => {
    return {
        mob_colPosition: state.rssArr.mob_colPosition
    }
}

const dispatchCallback = (dispatch) => {
    return {
        leftColPositionChange: ()=>{
            dispatch(leftColPositionChange());
        }
    }
}

export default connect(mapStateToProps, dispatchCallback)(MainContainer);
