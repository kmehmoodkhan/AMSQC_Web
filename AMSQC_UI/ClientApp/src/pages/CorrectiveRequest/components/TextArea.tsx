import React from 'react';
import { DefaultAnswerIds } from '../../../common/enum';

type Props = {
    onAnswerChange: any;
    answer: any;
    question: any;
    registerFormRef: any;
    errors: any;
};
export default function CustomTextArea({ onAnswerChange, answer, question, registerFormRef, errors }: Props) {
    const fieldName = `question${question.questionId}`;
    return (
        <div className="form-group">
            <textarea
                rows={1}
                className="form-control"
                value={answer}
                name={`question${question.questionId}`}
                onChange={(e) => {
                    onAnswerChange(
                        question.answer == DefaultAnswerIds.OtherAnswerId
                            ? question.answer
                            : DefaultAnswerIds.TextAreaAnswerId,
                        question.parentQuestionId,
                        question.questionId,
                        e.target.value,
                        question.questionType,
                    );
                }}
                ref={registerFormRef({ required: true })}
            />
            {errors[fieldName] && (
                <div className="row alert alert-danger" style={{ paddingBottom: '5px', marginBottom: '5px' }}>
                    This field is required
                </div>
            )}
        </div>
    );
}
