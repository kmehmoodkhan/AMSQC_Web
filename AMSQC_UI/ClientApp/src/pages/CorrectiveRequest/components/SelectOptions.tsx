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
                    onAnswerChange(
                        e.target.value,
                        question.parentQuestionId,
                        question.questionId,
                        e.target.options[e.target.selectedIndex].text,
                    );
                }}
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
        </div>
    );
}
