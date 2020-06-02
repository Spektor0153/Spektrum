import React from "react";
import styles from './newsWindow.module.css';
import moment from "moment";

export const NewsWindow = (props) => {
    return (
        <div>
            <div  onClick={props.closeWindow} className={styles.newsWindow_shadow}></div>
            <div className={styles.newsWindow}>
                <div className={styles.closeButton_block}>
                        <div className={styles.closeButton_tab} onClick={props.closeWindow}>
                            <i className={`${styles.icon} ${styles.icon_cross}`}></i>
                        </div>
                </div>
                <div className={styles.newsWindow_fon}>
                    <div className={styles.newsWindow_container}>
                            <p className={styles.newsWindow_title}>{props.newsInWindow.title[0]}</p>
                            {props.newsInWindow['dc:creator']?<p className={styles.newsWindow_creator}>{props.newsInWindow['dc:creator'][0]}</p>:''}
                            {props.newsInWindow['dc:creator']&&props.newsInWindow.pubDate ? <p className={styles.newsList_date_razdel}> / </p>: ''}
                            {props.newsInWindow.pubDate ? <p className={styles.newsWindow_date}>{moment(props.newsInWindow.pubDate[0]).fromNow()}</p>: ''}

                            {props.newsInWindow.category?
                                <div className={styles.categoryBlock}>
                                    {props.newsInWindow.category.map( (el, i)=> {
                                    return <span key={i} className={styles.tagSpan}>#{el}</span>
                                })}
                                </div>: ''
                            }

                            {props.newsInWindow.enclosure ? <img src={props.newsInWindow.enclosure[0]['$'].url} className={styles.newsWindow_image} alt=""/>:''}

                            <div className={styles.newsWindow_descripton} dangerouslySetInnerHTML={{__html: props.newsInWindow.description[0]}} ></div>

                            <a href={props.newsInWindow.link[0]}
                               className={styles.visitWebsiteButton}
                               target="_blank" rel="noopener">
                                Visit Website
                            </a>
                    </div>
                </div>
            </div>
        </div>
)
}