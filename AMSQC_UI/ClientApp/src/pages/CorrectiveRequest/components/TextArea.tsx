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
                rows={1}
                className="form-control"
                value={answer}
                onChange={(e) => {
                    onAnswerChange('', question.parentQuestionId, question.questionId, e.target.value);
                }}
            />
        </div>
    );
}
