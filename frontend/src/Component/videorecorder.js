import React from 'react';
import {connect} from 'react-redux';
import { addVideoRecordingThunk} from '../Redux/actions/recordingAction'
import { v4 as uuidv4 } from 'uuid';

class PureVideoRecorder extends React.Component {
    stream
    constructor(props){
        super(props)
        this.state = {
            show: Boolean(),
            recording: false,
            preview: "",
            showStart: false,
            showStop: false,
        };
        this.handleshow = this.handleshow.bind(this);
    }

    handleshow() {
        this.setState((prevState) => {
            return {
                show: !prevState.show
            }
        });
    }

    handlePreview(videoURL){
        this.setState({
            preview: videoURL
        })
    }

    async start() {
        this.stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        })

        this.video.srcObject = this.stream;
        this.video.play()
        .catch((err) => {
        });

        // init recording
        this.mediaRecorder = new MediaRecorder(this.stream, {
            mimeType: 'video/webm'
        });
        // init data storage for video chunks
        this.chunks = [];
        // listen for data from media recorder
        this.mediaRecorder.ondataavailable = e => {
            if (e.data && e.data.size > 0) {
                this.chunks.push(e.data);
            }
        };
        this.setState({
            showStart:true
        })
    }

    startRecording(e) {
        this.setState({
            showStart: false,
            showStop: true
        })
        e.preventDefault();
        // wipe old data chunks
        this.chunks = [];
        // start recorder with 10ms buffer
        this.mediaRecorder.start(10);
        // say that we're recording
        this.setState({ 
            recording: true 
        });
    }

    stopRecording(e) {
        e.preventDefault();
        // stop the recorder
        this.mediaRecorder.stop();
        // say that we're not recording
        this.setState({ recording: false });
        // save the video to memory
        this.upload()
        this.stream.getTracks().forEach(function (track) {
            if ((track.readyState === 'live' && track.kind === 'audio') || (track.readyState === 'live' && track.kind === 'video')) {
                track.stop()
            }
        })
        this.setState({
            showStop: false
        })
    }

    async upload() {
        await this.handleshow()
        const blob = new Blob(this.chunks, {
            type: 'video/webm'
        });
        let fileName = uuidv4()

        let formData = new FormData();
        formData.append("file", blob, fileName)

        const videoURL = window.URL.createObjectURL(blob);
        this.props.handleRecording(fileName)

        // append videoURL to list of saved videos for rendering
        const preview = document.getElementById('preview');
        preview.setAttribute("src", videoURL)

        // Upload to S3
        this.props.videorecordingMDP(formData)
    }

    render() {
        const { show, showStart, showStop } = this.state;
        return (
            <div>
            <div className="flex-col d-flex justify-content-center" id="videoSubmission">
                {show ? <video ref={a => { this.video = a }} className="bg-dark" id="video" autoPlay={true} muted="muted" ></video> : null}

                {!show ? <video ref={b => { this.player = b }} controls id="preview" src="" autoPlay={true} muted="muted"  ></video> : null}
            </div>
            <div className="row flex-row flex-nowrap">
                <div className="p-3 ml-auto mr-auto ">
                    {!show ? <span className="rounded-pill border border-warning bg-transparent p-2" id="start" title="Start Feed" onClick={() => { this.start(); this.handleshow() }}><i
                        className="fas fa-power-off"></i></span> : null}
                    {show && showStart ? <span className="rounded-pill border border-warning bg-transparent p-2" id="startRecording"
                        title="Start Recording" onClick={e => this.startRecording(e)}><i className="fas fa-circle"></i></span> : null}
                    {show && showStop ? <span className="rounded-pill border border-warning bg-transparent p-2" id="stopRecording"
                        title="Stop Recording" onClick={e => this.stopRecording(e)}><i className="fas fa-stop"></i></span> : null}
                </div>
            </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        email: state.authStore.email,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        videorecordingMDP: (formData) => {
                   
            dispatch(addVideoRecordingThunk(formData))
        }
    }
}
export const VideoRecorder = connect(mapStateToProps, mapDispatchToProps)(PureVideoRecorder)