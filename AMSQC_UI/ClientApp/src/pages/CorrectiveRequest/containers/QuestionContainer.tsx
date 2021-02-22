import React from 'react';
import { QuestionType } from '../../../common/enum';
import Question from '../components/Question';

type Props = {
    question: any;
    onAnswerChange: any;
    registerFormRef: any;
    errors: any;
    getValue: any;
};

export default function QuestionContainer({ question, onAnswerChange, registerFormRef, errors, getValue }: Props) {
    const hasRadioSibling =
        question.subQuestions.filter((item: any) => item.questionType == QuestionType.Radio).length > 0 &&
        question.subQuestions.length > 1;

    const isRadioNo =
        hasRadioSibling &&
        question.subQuestions.filter(
            (item: any) =>
                item.questionType == QuestionType.Radio && item.answerText && item.answerText.toLowerCase() == 'no',
        ).length > 0;

    return (
        <Question
            onAnswerChange={onAnswerChange}
            question={question}
            key={question.questionId}
            errors={errors}
            registerFormRef={registerFormRef}
            getValue={getValue}
            hasRadioSibling={hasRadioSibling}
            isRadioNo={isRadioNo}
        />
    );
}
