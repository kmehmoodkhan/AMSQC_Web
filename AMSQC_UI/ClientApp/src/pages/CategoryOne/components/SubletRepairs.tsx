import { Button } from 'antd';
import React from 'react';
import { SubletCompletionStatus } from '../../../common/enum';

type Props = {
    setSubletCompleted: any;
    subletCompletion: SubletCompletionStatus;
    loading: boolean;
};

export default function SubletRepairs({ setSubletCompleted, subletCompletion, loading }: Props) {
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
                                <Button
                                    name="yes"
                                    className="btn btn-primary btn-lg btn-wide"
                                    value="Submit"
                                    onClick={() => setSubletCompleted(SubletCompletionStatus.Yes)}
                                    loading={loading && subletCompletion == SubletCompletionStatus.Yes}
                                    disabled={loading && subletCompletion != SubletCompletionStatus.Yes}
                                >
                                    Yes
                                </Button>
                                <Button
                                    name="yes"
                                    className="btn btn-outline-danger btn-lg btn-wide"
                                    value="Submit"
                                    onClick={() => setSubletCompleted(SubletCompletionStatus.No)}
                                    loading={loading && subletCompletion == SubletCompletionStatus.No}
                                    disabled={loading && subletCompletion != SubletCompletionStatus.No}
                                >
                                    No
                                </Button>
                                <Button
                                    name="yes"
                                    className="btn btn-secondary-outline btn-lg btn-wide"
                                    value="Submit"
                                    onClick={() => setSubletCompleted(SubletCompletionStatus.NA)}
                                    loading={loading && subletCompletion == SubletCompletionStatus.NA}
                                    disabled={loading && subletCompletion != SubletCompletionStatus.NA}
                                >
                                    N/A
                                </Button>
                                {/* <button
                                    type="button"
                                    className="btn btn-primary btn-lg btn-wide"
                                    onClick={() => setSubletCompleted(SubletCompletionStatus.Yes)}
                                >
                                    Yes
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline-danger btn-lg btn-wide"
                                    onClick={() => setSubletCompleted(SubletCompletionStatus.No)}
                                >
                                    No
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary-outline btn-lg btn-wide"
                                    onClick={() => setSubletCompleted(SubletCompletionStatus.NA)}
                                >
                                    N/A
                                </button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
