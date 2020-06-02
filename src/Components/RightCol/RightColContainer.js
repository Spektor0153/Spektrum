import React from "react";
import {socket} from "./../../global/header";
import {loadNewsListFromRss,
     openNewsInWindow,
     closeNewsInWindow,
     changeActivePage,
     clickPopularTag } from './RightColAction';
import {connect} from "react-redux";
import {NewsList} from "./NewsList/NewsList";
import {LoaderRSS} from "./../LoaderRSS/LoaderRSS"
import {NewsWindow} from "./NewsWindow/NewsWindow";
import {PopularTags} from "./PopularTags/PopularTags";
import {searchRssTag, leftColPositionChange} from "./../LeftCol/leftColAction";
import styles from "./rightCol.module.css";

class RightColContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    getData = data => {
        if (data!=null) {
            this.props.loadNewsListFromRss(data)
        }
    }
    componentDidMount() {
        var state_current = this;
        socket.on("send_rss_chanel_data", (data)=>{
            state_current.getData(data);
        });

    }
    componentWillUnmount() {
        socket.off("get_data");
    }

    render() {
        return (
            <div className={styles.right_col_layer_rss_info} >
                {this.props.RSSListIsLoading ?
                    <LoaderRSS></LoaderRSS> :
                    <div>
                        {this.props.startPageShow ?
                            <PopularTags popularTags={this.props.popularTags}  clickPopularTag={this.props.clickPopularTag}></PopularTags>
                            :
                            < NewsList rssNewsList={this.props} newsClick={this.props.openNewsInWindow} mainImage={this.props.image} changePage={this.props.changeActivePage}></NewsList>
                        }
                        {this.props.windowRssOpen ? <NewsWindow closeWindow={this.props.closeNewsInWindow} newsInWindow={this.props.newsInWindow} ></NewsWindow>:''}

                    </div>
                }
            </div>
        )
    }
}


const mapStateToProps = (state)=> {
    return {
        windowRssOpen: state.rssNewsList.windowRssOpen,
        rssNewsList: state.rssNewsList.rssNewsList,
        description: state.rssNewsList.description,
        image: state.rssNewsList.image,
        title: state.rssNewsList.title,
        RSSListIsLoading: state.rssNewsList.RSSListIsLoading,
        newsInWindow: state.rssNewsList.newsInWindow,
        activePage: state.rssNewsList.activePage,
        countInPage: state.rssNewsList.countInPage,
        newsCount: state.rssNewsList.newsCount,
        popularTags: state.rssNewsList.popularTags,
        startPageShow: state.rssNewsList.startPageShow
    }
};


const dispatchCallback = (dispatch) => {
    return {
        loadNewsListFromRss: (data)=> {
            dispatch(loadNewsListFromRss(data));
        },
        openNewsInWindow: (data)=> {
            document.body.classList.add('body_window_open');
            dispatch(openNewsInWindow(data));
        },
        closeNewsInWindow: ()=> {
            document.body.classList.remove('body_window_open');
            dispatch(closeNewsInWindow());
        },
        changeActivePage: (page)=> {
            dispatch(changeActivePage(page));
        },
        clickPopularTag: (tag)=>{
            dispatch(searchRssTag(tag))
            dispatch(clickPopularTag(tag));
            dispatch(leftColPositionChange());
        }

    }
}

export default connect(mapStateToProps, dispatchCallback)(RightColContainer);

