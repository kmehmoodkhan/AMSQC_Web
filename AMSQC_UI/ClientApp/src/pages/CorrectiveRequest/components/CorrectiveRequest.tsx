import React from 'react';
import Question from './Question';

type Props = {
    questions: any;
    onAnswerChange: any;
    submitResponses: any;
    showSublet: boolean;
};
export default function CorrectiveRequest({ questions, onAnswerChange, submitResponses, showSublet }: Props) {
    return (
        <div className="page ">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-8 offset-lg-2">
                        <div className="block-section">
                            <div className="action-details box1">
                                <div className="main-title mb-5"> Corrective Action Request</div>

                                {questions
                                    .filter((item: any) => !item.isSubletQuestion)
                                    .map((item: any) => (
                                        <Question
                                            onAnswerChange={onAnswerChange}
                                            question={item}
                                            key={item.questionId}
                                        />
                                    ))}
                                <br />
                                {showSublet && (
                                    <>
                                        <div className="inspection-detail">
                                            <div className="qoute-text"> Sublet Section</div>
                                        </div>
                                        {questions
                                            .filter((item: any) => item.isSubletQuestion)
                                            .map((item: any) => (
                                                <Question
                                                    onAnswerChange={onAnswerChange}
                                                    question={item}
                                                    key={item.questionId}
                                                />
                                            ))}
                                        <br />
                                    </>
                                )}
                                <p className="info-text"> Has the defect been rectified? </p>

                                <div className="buttons">
                                    <button
                                        type="button"
                                        data-toggle="dropdown"
                                        className="btn btn-primary btn-lg btn-wide "
                                        onClick={() => submitResponses(true)}
                                    >
                                        Yes{' '}
                                    </button>
                                    <button
                                        type="button"
                                        data-toggle="dropdown"
                                        className="btn btn-lg btn-danger-outline btn-wide "
                                        onClick={() => submitResponses(false)}
                                    >
                                        No
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
