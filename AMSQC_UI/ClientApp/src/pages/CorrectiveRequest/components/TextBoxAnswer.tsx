import React, { CSSProperties } from 'react';
import { DefaultAnswerIds } from '../../../common/enum';

type Props = {
    question: any;
    onAnswerChange: any;
    answer: any;
    registerFormRef: any;
    errors: any;
    getValue: any;
};
export default function TextBoxAnswer({ question, onAnswerChange, registerFormRef, errors, getValue }: Props) {
    const fieldName = `question${question.questionId}`;
    const style: CSSProperties = { textAlign: 'right' };
    return (
        <div className="form-group">
            <input
                type={question.title && question.title.includes('$') ? 'number' : 'text'}
                className="form-control"
                value={getValue(fieldName)}
                name={fieldName}
                style={question.title && question.title.includes('$') ? style : {}}
                onChange={() => {
                    let val = getValue(fieldName);
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
