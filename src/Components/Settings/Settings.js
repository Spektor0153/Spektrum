import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {mobileAnalyse} from "./../NavHead/NavHeadAction"
import MainLayer from './../MainLayer/MainLayer'

 class Settings extends React.Component {
        constructor(props) {
            super(props);
        }
        componentDidMount() {
            const hasWindow = typeof window !== 'undefined';
            const width = hasWindow ? window.innerWidth : null;
            console.log("width ==== " + width)
            this.props.mobileAnalyse(width)
        }
        render() {
            console.log(this.props)
            return (
                <>
                {this.props.settingsLoaded?
                    <MainLayer>
                    </MainLayer>:''}
                </>

            )
        }
}




        let mapStateToProps = (state) => {
            return {
                settingsLoaded: state.settings.settingsLoaded
            }
        }

        export default  connect(mapStateToProps,{mobileAnalyse})(Settings)