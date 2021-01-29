import React from 'react';

type Props = {
    selectedNo: boolean;
    onConfirmationAction: any;
};
export default function Confirmations({ selectedNo, onConfirmationAction }: Props) {
    return (
        <>
            {!selectedNo && (
                <div className="page ">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-8 offset-lg-2">
                                <div className="block-section">
                                    <div className="main-title"> Mapping Sheet </div>
                                    <div className="sub-title">AMA Vehicle Mapping Sheet photo required.</div>
                                    <p className="info-text">Has the AMA Vehicle Mapping Sheet been completed? </p>
                                    <div className="buttons">
                                        <button
                                            type="button"
                                            className="btn btn-primary btn-lg btn-wide"
                                            onClick={() => onConfirmationAction(true)}
                                        >
                                            Yes
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-danger-outline btn-lg  btn-wide"
                                            onClick={() => onConfirmationAction(false)}
                                        >
                                            No
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {selectedNo && (
                <div className="page ">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-8 offset-lg-2">
                                <div className="block-section">
                                    <div className="main-title"> Mapping Sheet </div>
                                    <div className="sub-title">AMA Vehicle Mapping Sheet photo required.</div>
                                    <p className="info-text">
                                        {' '}
                                        Please complete the AMA Vehicle Mapping Sheet before commencing inspection.{' '}
                                    </p>
                                    <div className="buttons">
                                        <button
                                            type="button"
                                            data-toggle="dropdown"
                                            className="btn btn-primary btn-lg btn-wide"
                                            onClick={() => onConfirmationAction(true)}
                                        >
                                            Ok
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
