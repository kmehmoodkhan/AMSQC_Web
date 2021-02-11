import React from 'react';
import { DefaultAnswerIds } from '../../../common/enum';

type Props = {
    question: any;
    onAnswerChange: any;
    answer: any;
};
export default function TextBoxAnswer({ answer, question, onAnswerChange }: Props) {
    return (
        <div className="form-group">
            <input
                type={question.title && question.title.includes('$') ? 'number' : 'text'}
                className="form-control"
                value={answer}
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
            />
        </div>
    );
}
