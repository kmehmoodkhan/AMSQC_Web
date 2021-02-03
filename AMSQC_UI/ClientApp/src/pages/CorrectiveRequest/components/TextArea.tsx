import React from 'react';

type Props = {
    onAnswerChange: any;
    answer: any;
    question: any;
};
export default function CustomTextArea({ onAnswerChange, answer, question }: Props) {
    return (
        <div className="form-group">
            <textarea
                rows={3}
                className="form-control"
                value={answer}
                onChange={(e) => {
                    onAnswerChange(e.target.value, question.questionId);
                }}
            />
        </div>
    );
}
