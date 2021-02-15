import React from 'react';

type Props = {
    options: any;
    answer: any;
    onAnswerChange: any;
    question: any;
    registerFormRef: any;
    errors: any;
};
export default function RadioOptions({ options, answer, onAnswerChange, question, registerFormRef, errors }: Props) {
    const fieldName = `question${question.questionId}`;
    return (
        <div className="name">
            <div className=" options-buttons color1 ">
                {options.map((item: any) => {
                    return (
                        <label className="   " key={item.questionOptionId}>
                            <input
                                type="radio"
                                name={`question${question.questionId}`}
                                checked={answer == item.questionOptionId}
                                onClick={() => {
                                    onAnswerChange(
                                        item.questionOptionId,
                                        question.parentQuestionId,
                                        question.questionId,
                                        item.title,
                                    );
                                }}
                                ref={registerFormRef({ required: true })}
                            />{' '}
                            {item.title}
                        </label>
                    );
                })}
                {errors[fieldName] && (
                    <div className="row alert alert-danger" style={{ paddingBottom: '5px', marginBottom: '5px' }}>
                        This field is required
                    </div>
                )}
            </div>
        </div>
    );
}
