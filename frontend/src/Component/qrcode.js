import React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

import classes from './qrcode.module.css'

const QRCode = require('qrcode.react');

class PureQRModal extends React.Component {
    render() {

        let link = `http://172.20.10.8:3000/canvas/${this.props.userId.toString()}/${this.props.pageId}`
        return (
            <div>
                <Modal isOpen={this.props.modal.modal} toggle={this.props.toggle} >
                    <ModalHeader toggle={this.toggle}>Scan this to open the live canvas</ModalHeader>
                    <ModalBody>
                        <div className="row justify-content-center">
                            <div className={classes.qrcode}>
                            <QRCode value={link} />
                            </div>
                        </div>
                        <div className="row text-center">
                        <button onClick={(e) => {this.props.toggle(); this.props.navigate(e)}} className="btn btn-outline-dark waves-effect w-100 m-2">Done</button>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}


export const QRModal = connect(null, null)(PureQRModal)