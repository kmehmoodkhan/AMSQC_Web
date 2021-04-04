import React from 'react';

type Props = {
    onBack: any;
    answers: any;
};
export default function ReportAnswers({ answers, onBack }: Props) {
    return (
        <div className="page">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-6 offset-lg-3">
                        <div className="block-section1">
                            <div className={`inspection-detail category${answers.category} `}>
                                <div className="main-title">
                                    Category <span className="category-name">{answers.category}</span> Inspection
                                </div>
                                <div className="qoute-text">
                                    Quote Number:<b> {answers.quoteDetailId} </b>
                                </div>
                                <div className="sub-title2">
                                    {' '}
                                    <a href={answers.mappingSheet} target="_blank">
                                        Mapping Sheet{' '}
                                    </a>{' '}
                                </div>
                                <div className="card " style={{ maxWidth: '100%' }}>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <th>Repair Type</th>
                                                    <th className="text-center1">Pass</th>
                                                </thead>
                                                <tbody>
                                                    {answers.categoryQuestions.map((x: any) => {
                                                        return (
                                                            <tr>
                                                                <td>
                                                                    <div className="name"> {x.question} </div>
                                                                </td>
                                                                <td className="text-center1">
                                                                    <div className="answer-value"> {x.answer} </div>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br /> <br />
                            {answers.CARQuestions.length > 0 && (
                                <div className="action-details ">
                                    <div className="sub-title3"> Corrective Action Request </div>

                                    <div className="card">
                                        <div className="card-body">
                                            <div className="table-responsive">
                                                <table className="table ">
                                                    <tbody>
                                                        {answers.categoryQuestions.map((x: any) => {
                                                            return (
                                                                <tr>
                                                                    <td>
                                                                        <div className="name">{x.question}</div>
                                                                    </td>
                                                                    <td>
                                                                        {x.subQuestions.length > 1 && (
                                                                            <ul className="list">
                                                                                {x.subQuestions.map((y: any) => {
                                                                                    return (
                                                                                        <li>
                                                                                            {y.question} - {y.answer}
                                                                                        </li>
                                                                                    );
                                                                                })}
                                                                            </ul>
                                                                        )}
                                                                        {x.subQuestions.length == 1 && <>{x.answer}</>}
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="buttons">
                                <button
                                    type="button"
                                    data-toggle="dropdown"
                                    className="btn btn-lg btn-danger-outline btn-wide"
                                    onClick={onBack}
                                >
                                    Back
                                </button>
                                <button
                                    type="button"
                                    data-toggle="dropdown"
                                    className="btn btn-primary btn-lg btn-wide "
                                >
                                    Print
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
