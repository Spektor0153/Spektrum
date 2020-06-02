import React from "react";
import styles from './popularTags.module.css'

export const PopularTags = (props)=> {
    return (
        <div className="list-card">
            <p className={styles.popularTags_h}>Popular Tags:</p>
            <div className="row">
                {
                    props.popularTags.map((tag, i) => {
                        return (
                            <div key={i} className="col-xs-12 col-md-3 m-b-1">
                                <div className={styles.topic_card} onClick={()=>{props.clickPopularTag(tag.name)}}>
                                    <div className={styles.card_header}>#{tag.name}</div>
                                    <div className={styles.card_footer}>
                                        <div className={styles.topic_visual} style={{backgroundImage: `url(${tag.image})`}} ></div>
                                        <div className={styles.card_text}>{tag.text}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}