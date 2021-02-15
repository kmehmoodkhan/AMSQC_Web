import React from 'react';
import { DefaultAnswerIds } from '../../../common/enum';

type Props = {
    question: any;
    onAnswerChange: any;
    answer: any;
    registerFormRef: any;
    errors: any;
};
export default function TextBoxAnswer({ answer, question, onAnswerChange, registerFormRef, errors }: Props) {
    const fieldName = `question${question.questionId}`;
    return (
        <div className="form-group">
            <input
                type={question.title && question.title.includes('$') ? 'number' : 'text'}
                className="form-control"
                value={answer}
                name={`question${question.questionId}`}
                onChange={(e) => {
                    let val = e.target.value;
                    if (val && question.title && question.title.includes('$') && val.length > 7) {
                        val = val.substring(0, 7);
                    }
                    onAnswerChange(
                        DefaultAnswerIds.TextBoxAnswerId,
                        question.parentQuestionId,
                        question.questionId,
                        val,
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
