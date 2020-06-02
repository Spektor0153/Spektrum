import React from 'react';
import {socket} from "./../../global/header";
import {updateRssList,
    loaderNewsListShow,
    searchRssTag,
    emptySearchInput,
    choseValueSearchInput,
    leftColPositionChange} from './leftColAction';
import {connect} from "react-redux";
import styles from './leftCol.module.css';
import {SearchContainer} from "./SearchContainer/SearchContainer";
import {RssChanelList} from "./RssChanelList/RssChanelList";


class LeftCol extends React.Component{
    constructor(props) {
        super(props);
        this.onClickrssButton.bind(this)
    }
    getData = data => {
        this.props.updateRssList(data)
    }
    componentDidMount() {
        var state_current = this;
        socket.emit("initial_data");
        socket.on("get_initial_data", (data)=>{
            state_current.getData(data);
        });
    }
    componentWillUnmount() {
        socket.off("get_data");
    }
    onClickrssButton = (data) => {
        socket.emit('get_rss_chanel_data', data.link )
        this.props.loaderNewsListShow(true, data.activeChanel)

    }

    render() {
        return (
            <div className={styles.left_col_layer}>
                <h1 className={styles.h_main} onClick={()=>{ window.location.reload()}}>- RSS Reader -</h1>
                <SearchContainer
                    choseValueSearchInput={this.props.choseValueSearchInput}
                    allTags={this.props.allTags}
                    emptySearchInput={this.props.emptySearchInput}
                    searchRssTag={this.props.searchRssTag}
                    searchValue={this.props.searchValue}
                    openSearchDropDown={this.props.openSearchDropDown}
                ></SearchContainer>

                <RssChanelList rssArr={this.props.rssArr} onClickrssButton={this.onClickrssButton}></RssChanelList>

            </div>
        )
    }
}


const mapStateToProps = (state)=> {
    return {
        rssArr: state.rssArr.rssArr,
        allTags: state.rssArr.allTags,
        searchValue: state.rssArr.searchValue,
        openSearchDropDown: state.rssArr.openSearchDropDown

    }
};


const dispatchCallback = (dispatch) => {
    return {
        updateRssList: (data)=> {
            dispatch(updateRssList(data));
        },
        loaderNewsListShow: (status, activeChanel)=> {
            dispatch(loaderNewsListShow(status, activeChanel))
            dispatch(leftColPositionChange())
        },
        searchRssTag: (value) => {
            dispatch(searchRssTag(value))
        },
        emptySearchInput: () => {
            dispatch(searchRssTag(''))
            dispatch(emptySearchInput())
        },
        choseValueSearchInput: (value) => {
            dispatch(searchRssTag(value))
            dispatch(choseValueSearchInput(value))
        }
    }
}

export default connect(mapStateToProps, dispatchCallback)(LeftCol);

