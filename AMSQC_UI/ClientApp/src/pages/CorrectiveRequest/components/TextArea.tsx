import React from 'react';
import { DefaultAnswerIds, QuestionType } from '../../../common/enum';

type Props = {
    onAnswerChange: any;
    answer: any;
    question: any;
    registerFormRef: any;
    errors: any;
    getValue: any;
    hasRadioSibling: boolean;
    isRadioNo: boolean;
};
export default function CustomTextArea({
    onAnswerChange,
    question,
    registerFormRef,
    errors,
    getValue,
    isRadioNo,
    hasRadioSibling,
}: Props) {
    const fieldName = `textArea${question.questionId}`;
    const value =
        question.questionType == QuestionType.Select &&
        question.questionOptions.filter((item: any) => item.title.toLowerCase() === 'other').length > 0 &&
        question.questionOptions.filter((item: any) => item.title.toLowerCase() === 'other')[0].questionOptionId ==
            getValue(fieldName)
            ? ''
            : getValue(fieldName);

    return (
        <div className="form-group">
            <textarea
                rows={3}
                className="form-control"
                value={value}
                name={`textArea${question.questionId}`}
                onChange={() => {
                    onAnswerChange(
                        DefaultAnswerIds.TextAreaAnswerId,
                        question.parentQuestionId,
                        question.questionId,
                        getValue(fieldName),
                        question.questionType,
                    );
                }}
                ref={registerFormRef({ required: !(hasRadioSibling && isRadioNo), maxLength: 500 })}
            />
            {errors[fieldName] && errors[fieldName].type == 'required' && !(hasRadioSibling && isRadioNo) && (
                <div className="row alert alert-danger" style={{ paddingBottom: '5px', marginBottom: '5px' }}>
                    This field is required
                </div>
            )}
            {errors[fieldName] && errors[fieldName].type == 'maxLength' && (
                <div className="row alert alert-danger" style={{ paddingBottom: '5px', marginBottom: '5px' }}>
                    Your input must be less than 500 characters
                </div>
            )}
        </div>
    );
}
