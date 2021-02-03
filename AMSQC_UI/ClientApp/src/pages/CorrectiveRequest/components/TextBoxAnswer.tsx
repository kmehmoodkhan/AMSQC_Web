import React from 'react';

type Props = {
    question: any;
    onAnswerChange: any;
    answer: any;
};
export default function TextBoxAnswer({ answer, question, onAnswerChange }: Props) {
    return (
        <div className="form-group">
            <input
                type="text"
                className="form-control"
                value={answer}
                onChange={(e) => {
                    onAnswerChange(e.target.value, question.questionId);
                }}
            />
        </div>
    );
}
