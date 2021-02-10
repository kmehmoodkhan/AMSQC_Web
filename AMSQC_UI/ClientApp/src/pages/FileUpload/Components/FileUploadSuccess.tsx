import React from 'react';
import SuccessIcon from '../../../assets/images/icon-success.svg';

type Props = {
    onContinue: any;
};
export default function FileUploadSuccess({ onContinue }: Props) {
    return (
        <div className="page ">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-8 offset-lg-2">
                        <div className="block-section">
                            <div className="main-title"> Mapping Sheet </div>
                            <div className="sub-title">AMA Vehicle Mapping Sheet photo required.</div>
                            <div className="alert alert-success text-center">
                                <div className="message-icon">
                                    <img src={SuccessIcon} />
                                </div>
                                File uploaded successfully
                            </div>
                            <div className="buttons">
                                <button type="button" className="btn btn-primary btn-lg btn-wide" onClick={onContinue}>
                                    Continue
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
