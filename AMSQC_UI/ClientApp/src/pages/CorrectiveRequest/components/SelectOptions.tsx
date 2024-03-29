import React from 'react';

type Props = {
    options: any[];
    answer: any;
    onAnswerChange: any;
    question: any;
    registerFormRef: any;
    errors: any;
    getValue: any;
};
export default function SelectOptions({ options, onAnswerChange, question, registerFormRef, errors, getValue }: Props) {
    const fieldName = `question${question.questionId}`;
    const val = getValue(fieldName);
    return (
        <div className="form-group">
            <select
                className="form-control"
                value={val}
                name={fieldName}
                id={fieldName}
                onChange={(e) => {
                    onAnswerChange(
                        getValue(fieldName),
                        question.parentQuestionId,
                        question.questionId,
                        e.target.options[e.target.selectedIndex].text,
                        question.questionType,
                    );
                }}
                ref={registerFormRef({ required: true })}
            >
                <option value="">[Please Select]</option>
                {options.map((item: any) => {
                    return (
                        <option value={item.questionOptionId} key={item.questionOptionId}>
                            {item.title}
                        </option>
                    );
                })}
            </select>
            {errors && errors[fieldName] && (
                <div className="row alert alert-danger" style={{ paddingBottom: '5px', marginBottom: '5px' }}>
                    This field is required
                </div>
            )}
        </div>
    );
}
