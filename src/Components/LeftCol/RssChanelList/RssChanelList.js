import React from "react";
import styles from "./rssChanelList.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSadTear} from "@fortawesome/free-solid-svg-icons";

export const RssChanelList = (props)=> {
    var emptySearch_show =  true;
    return (
        <div className={styles.rssBlock}>

            {
                props.rssArr.map((el, i)=> {
                    if (el.isShow) {
                        emptySearch_show=false;
                        return (
                            <div key={i}
                                 className={styles.rssCardRow}
                                 onClick={() => props.onClickrssButton({link: el.link, activeChanel: i})}
                                 data-link={el.link}>
                                <div className={styles.rssCard + ' ' + ((el.active===true)?styles.activeChanel:'')}>
                                    <div className={styles.imageRss} style={{backgroundImage: `url(${el.image})`}}></div>
                                    <div className={styles.textBlockRss}>
                                        <p className={styles.rssName}>{el.name}</p>
                                        <p className={styles.rssWeb}>{el.web}</p>
                                    </div>
                                </div>

                            </div>
                        )
                    }
                })
            }
            {emptySearch_show?
                <div className={styles.emptySearch_rssList}>
                    <FontAwesomeIcon className={styles.emptyRssIcon} icon={faSadTear}></FontAwesomeIcon>
                    <p>Такого канала или тега<br></br> не найдено</p>
                </div>:''}
        </div>
    )
}