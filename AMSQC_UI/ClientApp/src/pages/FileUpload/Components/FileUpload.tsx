import React from 'react';
import ErrorIcon from '../../../assets/images/icon-error.svg';

type Props = {
    fileSelectError: boolean;
    onFileUpload: any;
    fileRef: any;
};
export default function FileUpload({ fileSelectError, onFileUpload, fileRef }: Props) {
    return (
        <div className="page">
            <div className="container-fluid ">
                <div className="row">
                    <div className="col-lg-8 offset-lg-2">
                        <div className="block-section">
                            <div className="main-title"> Mapping Sheet </div>
                            <div className="sub-title">AMA Vehicle Mapping Sheet photo required.</div>
                            {fileSelectError && (
                                <div className="alert alert-danger text-center">
                                    <div className="message-icon">
                                        <img src={ErrorIcon} />
                                    </div>
                                    <strong>Error!</strong> Please select a photo to upload
                                </div>
                            )}
                            <div className="row justify-content-center">
                                <div className="col-lg-12 text-center">
                                    <div className="form-file">
                                        <div className="custom-file ">
                                            <input
                                                type="file"
                                                className="custom-file-input"
                                                id="customFile"
                                                ref={fileRef}
                                            />
                                            <label className="custom-file-label" htmlFor="customFile">
                                                Choose file
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="buttons">
                                <button
                                    type="button"
                                    data-toggle="dropdown"
                                    className="btn btn-primary btn-lg btn-wide"
                                    onClick={() => onFileUpload()}
                                >
                                    Upload
                                </button>
                                <button
                                    type="button"
                                    data-toggle="dropdown"
                                    className="btn btn-danger-outline btn-lg btn-wide"
                                    onClick={() => {}}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}