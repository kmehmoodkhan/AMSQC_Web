import React from 'react';
import SubQuestionContainer from '../containers/SubQuestionContainer';

type Props = {
    question: any;
    onAnswerChange: any;
    registerFormRef: any;
    errors: any;
    getValue: any;
    isRadioNo: boolean;
    hasRadioSibling: boolean;
};
export default function Question({
    question,
    onAnswerChange,
    registerFormRef,
    errors,
    getValue,
    hasRadioSibling,
    isRadioNo,
}: Props) {
    return (
        <div className="card">
            <div className="card-header">{question.title} </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table ">
                        <tbody>
                            {question.subQuestions.map((item: any) => (
                                <SubQuestionContainer
                                    key={item.questionId}
                                    question={item}
                                    onAnswerChange={onAnswerChange}
                                    registerFormRef={registerFormRef}
                                    errors={errors}
                                    getValue={getValue}
                                    hasRadioSibling={hasRadioSibling}
                                    isRadioNo={isRadioNo}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
