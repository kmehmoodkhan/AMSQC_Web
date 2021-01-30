import React from 'react';
import { SubletCompletionStatus } from '../../../common/enum';

type Props = {
    setSubletCompleted: any;
};
export default function SubletRepairs({ setSubletCompleted }: Props) {
    return (
        <div className="page ">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-8 offset-lg-2">
                        <div className="block-section">
                            <div className="main-title"> Sublet Repairs </div>
                            <p className="info-text">
                                Have all sublet repairs been completed to an acceptable standard and free of any
                                defects?
                            </p>
                            <div className="buttons">
                                <button
                                    type="button"
                                    data-toggle="dropdown"
                                    className="btn btn-primary btn-lg btn-wide"
                                    onClick={() => setSubletCompleted(SubletCompletionStatus.Yes)}
                                >
                                    Yes
                                </button>
                                <button
                                    type="button"
                                    data-toggle="dropdown"
                                    className="btn btn-outline-danger btn-lg btn-wide"
                                    onClick={() => setSubletCompleted(SubletCompletionStatus.No)}
                                >
                                    No
                                </button>
                                <button
                                    type="button"
                                    data-toggle="dropdown"
                                    className="btn btn-secondary-outline btn-lg btn-wide"
                                    onClick={() => setSubletCompleted(SubletCompletionStatus.NA)}
                                >
                                    N/A
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
