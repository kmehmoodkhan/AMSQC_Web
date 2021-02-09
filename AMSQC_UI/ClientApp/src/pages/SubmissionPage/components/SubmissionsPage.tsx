import { Button } from 'antd';
import React from 'react';

type Props = {
    onSubmitSurvey: any;
    loading: boolean;
    isRectified: boolean;
};
export default function SubmissionsPage({ onSubmitSurvey, loading, isRectified }: Props) {
    return (
        <div className="page ">
            <div className="container-fluid">
                <div className="inspection-detail-flex">
                    <div className="block-section">
                        <div className="inspection-detail">
                            <div className="main-title"> Submit Data </div>
                            <p className={`info-text ${isRectified ? '' : 'color-red'}`}>
                                {isRectified && (
                                    <>
                                        I am satisfied this vehicle meets the
                                        <a
                                            href="/docs/Gemini-Quality-Charter-Inspection-Criteria.pdf'"
                                            target={'_blank'}
                                        >
                                            {' '}
                                            AMA Quality Inspection Criteria?{' '}
                                        </a>
                                        and is in a condition ready for presentation to the customer.
                                    </>
                                )}
                                {!isRectified && (
                                    <>
                                        Please address and rectify the items identified in the Corrective Action Request
                                        and re-audit.
                                    </>
                                )}
                            </p>
                            <div className="buttons" style={{ marginTop: '150px' }}>
                                <Button
                                    name="login"
                                    className="btn btn-primary btn-lg btn-wide"
                                    value="Submit"
                                    onClick={onSubmitSurvey}
                                    loading={loading}
                                >
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
