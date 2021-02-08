import React from 'react';
import { DefaultAnswerIds } from '../../../common/enum';

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
            />
        </div>
    );
}
