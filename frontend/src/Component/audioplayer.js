import React from 'react';
import {connect} from 'react-redux'


class PureAudioPlayer extends React.Component {
    
    constructor(props) {
        super(props)
        this.player = React.createRef()
        this.state={
            src: ""
        }
    }

    componentWillReceiveProps(nextProps){
        this.player.load();
    }
    render() {
        return (

            <div className="d-flex justify-content-center">
                <audio ref={v => { this.player = v }} controls >
                {/* pass audio URL into src from page */}
                <source src={this.props.src} type="audio/mp3"/>
                </audio>
            </div>
                   
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticatedMSP: state.authStore.isAuthenticated
    }
}

export const AudioPlayer = connect(mapStateToProps, null)(PureAudioPlayer)