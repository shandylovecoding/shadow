import React from 'react';
import io from 'socket.io-client';

import { submitCanvas } from "../Redux/actions/canvasAction";
import { connect } from "react-redux";

import classes from './canvas.module.css'

class PureCanvas extends React.Component {

    timeout;

    ctx;
    isDrawing = false;

    constructor(props) {
        super(props);

        if (this.props.userId) {
            this.room = this.props.userId + "-" + this.props.dictationId
        } else {
            this.room = this.props.match.params.userId.toString() + "-" + this.props.match.params.canvasId.toString();
        }


        this.socket = io.connect("http://172.20.10.8:8080");
        this.socket.emit("newUser", this.room)
        this.socket.on("clear", () => {
            var canvas = document.querySelector('#board');
            var ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        });

        this.socket.on("canvas-data", function (data) {
            var root = this;
            var interval = setInterval(function () {
                if (root.isDrawing) return;
                root.isDrawing = true;
                clearInterval(interval);
                var image = new Image();
                var canvas = document.querySelector('#board');
                var ctx = canvas.getContext('2d');
                image.onload = function () {
                    ctx.drawImage(image, 0, 0);

                    root.isDrawing = false;
                };
                image.src = data;
            }, 10)
        })

    }

    // componentDidUpdate(){
    //     this.socket.disconnect()
    //     this.socket = io.connect("http://localhost:8080");
    //     if(this.props.questionId === undefined){
    //         this.room = this.props.userId + "-" + this.props.dictationId+ "-" + 1
    //     } else{
    //         this.room = this.props.userId + "-" + this.props.dictationId +"-" + this.props.questionId
    //     }

    //     this.socket.emit("newUser", this.room)
    //     this.drawOnCanvas();
    // }

    componentDidMount() {
        this.drawOnCanvas();

    }


    drawOnCanvas() {
        var room = this.room;
        var canvas = document.querySelector('#board');
        this.ctx = canvas.getContext('2d');
        var ctx = this.ctx;

        var sketch = document.querySelector('#board');
        var sketch_style = getComputedStyle(sketch);
        canvas.width = parseInt(sketch_style.getPropertyValue('width'));
        canvas.height = parseInt(sketch_style.getPropertyValue('height'));
        // var widthRatio = 5
        // canvas.width = canvas.height * widthRatio;
        var drawing = false;
        var current = {}


        canvas.addEventListener('mousedown', onMouseDown, false);
        canvas.addEventListener('mouseup', onMouseUp, false);
        canvas.addEventListener('mouseout', onMouseUp, false);
        canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);

        //Touch support for mobile devices
        canvas.addEventListener('touchstart', onMouseDown, false);
        canvas.addEventListener('touchend', onMouseUp, false);
        canvas.addEventListener('touchcancel', onMouseUp, false);
        canvas.addEventListener('touchmove', throttle(onMouseMove, 10), false);

        function onMouseDown(e) {
            e.preventDefault();
            e.stopPropagation();
            drawing = true;
            current.x = e.offsetX || e.touches[0].clientX;
            current.y = e.offsetY || e.touches[0].clientY;
        }

        function onMouseUp(e) {
            if (!drawing) { return; }
            drawing = false;

            // drawLine(current.x, current.y, e.offsetX || e.touches[0].clientX, e.offsetY || e.touches[0].clientY, current.color, true);
        }


        function onMouseMove(e) {
            e.preventDefault();
            e.stopPropagation();

            if (!drawing) { return; }
            drawLine(current.x, current.y, e.offsetX || e.touches[0].clientX, e.offsetY || e.touches[0].clientY, current.color, true);
            current.x = e.offsetX || e.touches[0].clientX;
            current.y = e.offsetY || e.touches[0].clientY;
        }
        function throttle(callback, delay) {
            var previousCall = new Date().getTime();
            return function () {
                var time = new Date().getTime();

                if ((time - previousCall) >= delay) {
                    previousCall = time;
                    callback.apply(null, arguments);
                }
            };
        }

        var root = this;
        //onPaint
        var drawLine = function (x0, y0, x1, y1) {


            ctx.beginPath();
            ctx.moveTo(x0, y0);
            ctx.lineTo(x1, y1);
            ctx.stroke();
            ctx.closePath();


            var base64ImageData = canvas.toDataURL("image/png");
            root.socket.emit("canvas-data", room, base64ImageData);

        };


    }
    clearcanvas() {
        var canvas = document.querySelector('#board');
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var base64ImageData = canvas.toDataURL("image/png");
        this.socket.emit("clear", this.room, base64ImageData);
    }



    render() {

        return (
            <div className="container">
                <div className="row">
                    
                    {/* <div className="sketch" id="sketch"> */}
                    <canvas className={classes.responsivecanvas }style={{width: 950 ,  height: 480}} id="board" ></canvas>
                    {/* </div> */}
                </div>
                <div className="row d-flex justify-content-end mt-2">
                    {/* <div className="col"> */}
                    {/* <div className={classes.clearbtn}> */}
                    <button className={classes.clearbtn}  onClick={() => this.props.clearcanvas ? this.props.clearcanvas() : this.clearcanvas()} > Clear </button>
                    {/* </div> */}
                    {/* </div> */}


                    {/* <button onClick={() => this.submit()}> Submit </button> */}
                </div>

            </div>
        )
    }

}


const mapDispatchToProps = (dispatch) => {
    return {
        submitMDP: (data) => {
            dispatch(submitCanvas(data))
        }

    }
}



export const Canvas = connect(null, mapDispatchToProps)(PureCanvas)