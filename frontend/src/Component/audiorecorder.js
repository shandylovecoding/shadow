import React from 'react';
import { connect } from 'react-redux';
import { addAudioRecordingThunk } from '../Redux/actions/recordingAction';
import { v4 as uuidv4 } from 'uuid';
import { Button } from 'reactstrap';

class PureAudioRecorder extends React.Component {
    stream
    constructor(props) {
        super(props)

        this.state = {
            show: Boolean(),
            recording: false,
            preview: "",
            start: false,
            end: false,
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

    handlePreview(audioURL) {
        this.setState({
            preview: audioURL
        })
    }

    async start() {
        this.stream = await navigator.mediaDevices.getUserMedia({
            video: false,
            audio: true
        })

        this.audio.srcObject = this.stream;
        this.audio.play()
            .catch((err) => {
            });

        // init recording
        this.mediaRecorder = new MediaRecorder(this.stream, {
            mimeType: 'audio/webm'
        });
        // init data storage for audio chunks
        this.chunks = [];
        // listen for data from media recorder
        this.mediaRecorder.ondataavailable = e => {
            if (e.data && e.data.size > 0) {
                this.chunks.push(e.data);
            }
        };

        this.setState({
            start: true
        })
    }

    startRecording(e) {
        e.preventDefault();
        // wipe old data chunks
        this.chunks = [];
        // start recorder with 10ms buffer
        this.mediaRecorder.start(10);
        // say that we're recording
        this.setState({
            recording: true,
            start: false,
            end: true
        });
    }

    stopRecording(e) {
        e.preventDefault();
        // stop the recorder
        this.mediaRecorder.stop();
        // say that we're not recording
        this.setState({
            recording: false,
            end: false
        });
        // save the audio to memory
        this.upload()
        this.stream.getTracks().forEach(function (track) {
            if ((track.readyState === 'live' && track.kind === 'audio') || (track.readyState === 'live' && track.kind === 'audio')) {
                track.stop()
            }
        })
    }

    async upload() {
        await this.handleshow()
        const blob = new Blob(this.chunks, {
            type: 'audio/webm'
        });
        let fileName = uuidv4()

        let formData = new FormData();
        formData.append("file", blob, fileName)

        const audioURL = window.URL.createObjectURL(blob);

        this.props.handleRecording(fileName)

        // append audioURL to list of saved audios for rendering
        const preview = document.getElementById(`${this.props.yek}`);
        preview.setAttribute("src", audioURL)



        // Upload to S3
        this.props.audiorecordingMDP(formData)
    }

    render() {
        const { show, start, end } = this.state;
        return (
            <div className="d-inline-flex justify-content-between ">
                <div className="flex-col d-flex justify-content-center align-items-center" id="audioSubmission">
                    {show ? <audio ref={a => { this.audio = a }} className="bg-dark" id="audio" autoPlay={true} muted ></audio> : null}

                    {!show ? <audio ref={b => { this.player = b }} controls id={this.props.yek} src="" autoPlay={true}></audio> : null}
                </div>
                <div className="row flex-row flex-nowrap">
                    <div className="p-3 ">
                        {!show ? <Button outline color="warning" className="rounded-pill border border-warning bg-transparent p-2" id="start" title="Start Feed" onClick={() => { this.start(); this.handleshow() }}>
                            Open Mic</Button> : null}
                        {show && start ? <Button outline color="warning" className="rounded-pill border border-warning bg-transparent p-2" id="startRecording"
                            title="Start Recording" onClick={e => this.startRecording(e)}>Start</Button> : null}
                        {show && end ? <Button outline color="warning" className="rounded-pill border border-warning bg-transparent p-2" id="stopRecording"
                            title="Stop Recording" onClick={e => this.stopRecording(e)}>Stop</Button> : null}
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
        audiorecordingMDP: (formData) => {

            dispatch(addAudioRecordingThunk(formData))
        }
    }
}

export const AudioRecorder = connect(mapStateToProps, mapDispatchToProps)(PureAudioRecorder)