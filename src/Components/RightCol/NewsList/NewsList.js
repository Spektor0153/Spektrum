import React from "react";
import moment from "moment";
import Pagination from "react-bootstrap/Pagination";
import styles from './newsList.module.css'

export const NewsList = (props) =>{
    let newListNews;
    if (props.rssNewsList.rssNewsList.length>0) {
        newListNews = props.rssNewsList.rssNewsList.map((news, key) => {
            if ((props.rssNewsList.activePage-1)*props.rssNewsList.countInPage<key&&key<props.rssNewsList.activePage*props.rssNewsList.countInPage) {
                return (
                    <div key={key} onClick={() => {
                        props.newsClick(key)
                    }} className={styles.newsList_row}>
                        {news.enclosure ? <div className={styles.newsListImg} style={{backgroundImage: `url(${news.enclosure[0]['$'].url})`}}></div> :
                            <div className={styles.newsListImg} style={{backgroundImage: `url(${props.mainImage})`}}></div>}
                        <div className={styles.newsList_content}>
                            <p className={styles.newsList_name}>{news.title[0]}</p>

                            {news['dc:creator'] ? <p className={styles.newsList_author}>by {news['dc:creator'][0]['_']||news['dc:creator'][0]}</p> : ''}
                            {news['dc:creator'] && news.pubDate ? <p className={styles.newsList_date_razdel}> / </p> : ''}
                            {news.pubDate ?
                                <p className={styles.newsList_pubDate}>{moment(news.pubDate[0]).fromNow()}</p> : ''}

                            <div className={styles.newsList_description}  dangerouslySetInnerHTML={{__html: news.description[0]}}></div>
                        </div>
                    </div>
                )
            }
        })

    }

    let itemsPage = [];
    for (let number = 1; number <= props.rssNewsList.newsCount/props.rssNewsList.countInPage; number++) {
        itemsPage.push(
            <Pagination.Item onClick={()=> {props.changePage(number)}}  key={number} active={number === props.rssNewsList.activePage} >
                {number}
            </Pagination.Item>,
        );
    }

    return (
        <div>
            <div className={styles.right_col_layer_rss_info_block}>
                <img className={styles.newsList_main_img} src={props.rssNewsList.image} alt=""/>
                <div>
                    <p className={styles.newsList_main_h}>{props.rssNewsList.title}</p>
                    <p className={styles.newsList_main_description}>{props.rssNewsList.description}</p>
                </div>
            </div>
            {newListNews}
            <Pagination className={styles.pagination}  size="sm">{itemsPage}</Pagination>
        </div>
    )

}