import React from 'react';
import InspectionQuestion from '../../Shared/Components/InspectionQuestion';

type Props = {
    questions: any;
    onOptionChange: any;
    quoteNo: any;
    onNext: any;
};
export default function CategoryOneInspection({ quoteNo, questions, onOptionChange, onNext }: Props) {
    return (
        <div className="page">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-8 offset-lg-2">
                        <div className="block-section">
                            <div className="inspection-detail category1 ">
                                <div className="main-title">
                                    Category <span className="category-name">1</span> Inspection{' '}
                                </div>
                                <div className="qoute-text ">
                                    Quote Number:<b> {quoteNo} </b>
                                </div>
                                <p className="info-text">
                                    Have the below stages of the repair process been carried out as per the{' '}
                                    <a href=""> AMA Quality Inspection Criteria? </a>
                                </p>

                                <div className="card ">
                                    <div className="card-body  ">
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <th>Repair Type</th>
                                                    <th>Answer</th>
                                                </thead>
                                                <tbody>
                                                    {questions.map((item: any) => (
                                                        <InspectionQuestion
                                                            question={item.question}
                                                            questionId={item.questionId}
                                                            answer={item.answer}
                                                            onOptionChange={onOptionChange}
                                                            key={item.questionId}
                                                        />
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                <div className="buttons">
                                    <button
                                        type="button"
                                        data-toggle="dropdown"
                                        className="btn btn-primary btn-lg btn-wide"
                                        onClick={onNext}
                                    >
                                        Next
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
