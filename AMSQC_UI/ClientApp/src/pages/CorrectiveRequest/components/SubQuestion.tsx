import React from 'react';
import { DefaultAnswerIds, QuestionType } from '../../../common/enum';
import RadioOptions from './RadioOptions';
import SelectOptions from './SelectOptions';
import CustomTextArea from './TextArea';
import TextBoxAnswer from './TextBoxAnswer';

type Props = {
    question: any;
    onAnswerChange: any;
};
export default function SubQuestion({ question, onAnswerChange }: Props) {
    return (
        <>
            <tr>
                {question.title && (
                    <td
                        className={`${
                            question.questionType == QuestionType.Select &&
                            question.answer == DefaultAnswerIds.OtherAnswerId
                                ? 'no-border'
                                : ''
                        }`}
                    >
                        {question.questionType != QuestionType.Label && <div className="name"> {question.title}</div>}
                        {question.questionType == QuestionType.Label && <p> {question.title}</p>}
                    </td>
                )}
                <td
                    className={`${
                        question.questionType == QuestionType.Select &&
                        question.answer == DefaultAnswerIds.OtherAnswerId
                            ? 'no-border'
                            : ''
                    }`}
                >
                    {question.questionType == QuestionType.Select && (
                        <SelectOptions
                            options={question.questionOptions}
                            onAnswerChange={onAnswerChange}
                            question={question}
                            answer={
                                question.answer == DefaultAnswerIds.OtherAnswerId
                                    ? question.questionOptions.filter((item: any) => item.title == 'Other')[0]
                                          .questionOptionId
                                    : question.answer
                            }
                        />
                    )}
                    {question.questionType == QuestionType.Radio && (
                        <RadioOptions
                            options={question.questionOptions}
                            onAnswerChange={onAnswerChange}
                            question={question}
                            answer={question.answer}
                        />
                    )}
                    {question.questionType == QuestionType.TextBox && (
                        <TextBoxAnswer
                            onAnswerChange={onAnswerChange}
                            question={question}
                            answer={question.answerText}
                        />
                    )}
                    {question.questionType == QuestionType.TextArea && (
                        <CustomTextArea
                            onAnswerChange={onAnswerChange}
                            question={question}
                            answer={question.answerText}
                        />
                    )}
                </td>
            </tr>
            {question.questionType == QuestionType.Select && question.answer == DefaultAnswerIds.OtherAnswerId && (
                <tr>
                    <td colSpan={2}>
                        <CustomTextArea
                            onAnswerChange={onAnswerChange}
                            question={question}
                            answer={question.answerText}
                        />
                    </td>
                </tr>
            )}
        </>
    );
}
