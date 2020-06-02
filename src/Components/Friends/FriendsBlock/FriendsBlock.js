import React from "react";
import styles from "./../friends.module.css"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavLink from "react-router-dom/NavLink";


export const FriendsBlock = (props) => {
    return  <div className={styles.blockFon}>
        <p className={styles.friendBlock_header}>Подписки <span className={styles.badge}>{props.followCount}</span></p>
        <div>
            <Container className={styles.smFriendContainer}>
                <Row>
                    {props.friends.map((friend, i) => {
                        return <Col className={styles.friendIconCol} key={i} md="4">
                            <div>
                                <NavLink className={styles.smFriendLink} to={`/profile/${friend.id_user}`}>
                                    <div className={styles.smFriendImg} style={{backgroundImage: `url(${friend.img})`}}></div>
                                    <p className={styles.smFriendName}>{friend.name}</p>
                                </NavLink>

                            </div>
                        </Col>

                    })
                    }
                    {props.followCount==0?
                        <Col md="12">
                        <p className={styles.emptyText}>Начните поиск  <NavLink className={styles.emptyTextLink} to='/friends'>друзей здесь</NavLink></p>
                        </Col>
                        :''
                    }
                </Row>
            </Container>
        </div>
    </div>
}