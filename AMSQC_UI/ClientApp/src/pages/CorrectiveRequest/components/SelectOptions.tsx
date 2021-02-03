import React from 'react';

type Props = {
    options: any[];
    answer: any;
    onAnswerChange: any;
    question: any;
};
export default function SelectOptions({ options, answer, onAnswerChange, question }: Props) {
    return (
        <div className="form-group">
            <select
                className="form-control"
                value={answer}
                onChange={(e) => {
                    onAnswerChange(e.target.value, question.parentId, question.questionId);
                }}
            >
                {options.map((item: any) => {
                    return (
                        <option value={item.questionOptionId} key={item.questionOptionId}>
                            {item.title}
                        </option>
                    );
                })}
            </select>
        </div>
    );
}
