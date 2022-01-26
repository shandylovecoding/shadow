import React from 'react';
import {connect} from 'react-redux'

class PureVideoPlayer extends React.Component {
    
    constructor(props) {
        super(props)
        this.player = React.createRef() 
    }


    render() {
        return (

            <div className="d-flex justify-content-center align-top" style={{minHeight:"100%", minWidth:"100%"}}>
                <video ref={v => { this.player = v }} key={this.props.src} id={this.props.dtype} controls allowFullScreen>
                <source src={this.props.src} type="video/mp4"/>
                </video>
            </div>
                   
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticatedMSP: state.authStore.isAuthenticated
    }
}

export const VideoPlayer = connect(mapStateToProps, null)(PureVideoPlayer)