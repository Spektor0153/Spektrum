import React from "react";
import styles from "./searchContainer.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {Form} from "react-bootstrap";


export const SearchContainer = (props) => {
    let onChangeSearch= (value) => {
        props.searchRssTag(value.currentTarget.value)
    }

    return (
        <div className={styles.inputContainer}>
            <div>
            {props.searchValue.length>0?
                <FontAwesomeIcon className={styles.closeIcon} icon={faTimesCircle} onClick={props.emptySearchInput}></FontAwesomeIcon>:''
            }

            <Form.Control className={styles.inputSearch} type="text" onChange={ onChangeSearch} value={props.searchValue} placeholder="Search by tags or website" />
            </div>
            <div  className={styles.liveSearch_block + ' ' + (!props.openSearchDropDown? styles.liveSearch_hide:'')}>
                <ul>
                    {props.allTags.map((tag,i)=>{
                        if (tag.show) {
                            return (
                                <li key={i} dangerouslySetInnerHTML={{__html: tag.tagHtml}} onClick={()=>{props.choseValueSearchInput(tag.tag)}}></li>
                            )
                        }
                    })}
                </ul>
                {props.allTags.filter(tag=>tag.show).length===0?
                    <div className={styles.emptySearch_dropdown}>
                        <p>Совпадений не найдено</p>
                    </div>:''
                }

            </div>
        </div>
    )
}

