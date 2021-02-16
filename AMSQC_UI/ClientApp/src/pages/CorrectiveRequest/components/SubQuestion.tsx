import React from 'react';
import { DefaultAnswerIds, QuestionType } from '../../../common/enum';
import RadioOptions from './RadioOptions';
import SelectOptions from './SelectOptions';
import CustomTextArea from './TextArea';
import TextBoxAnswer from './TextBoxAnswer';

type Props = {
    question: any;
    onAnswerChange: any;
    registerFormRef: any;
    errors: any;
    getValue: any;
};
export default function SubQuestion({ question, onAnswerChange, registerFormRef, errors, getValue }: Props) {
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
                        <div className={`name ${QuestionType.Label == question.questionType ? 'height-title' : ''}`}>
                            {' '}
                            {question.title}
                        </div>
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
                            registerFormRef={registerFormRef}
                            errors={
                                question.answer == DefaultAnswerIds.OtherAnswerId
                                    ? null
                                    : question.answer != DefaultAnswerIds.OtherAnswerId && question.answer
                                    ? null
                                    : errors
                            }
                        />
                    )}
                    {question.questionType == QuestionType.Radio && (
                        <RadioOptions
                            options={question.questionOptions}
                            onAnswerChange={onAnswerChange}
                            question={question}
                            answer={question.answer}
                            registerFormRef={registerFormRef}
                            errors={errors}
                        />
                    )}
                    {question.questionType == QuestionType.TextBox && (
                        <TextBoxAnswer
                            onAnswerChange={onAnswerChange}
                            question={question}
                            answer={question.answerText}
                            registerFormRef={registerFormRef}
                            errors={errors}
                            getValue={getValue}
                        />
                    )}
                    {question.questionType == QuestionType.TextArea && (
                        <CustomTextArea
                            onAnswerChange={onAnswerChange}
                            question={question}
                            answer={question.answerText}
                            registerFormRef={registerFormRef}
                            errors={errors}
                            getValue={getValue}
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
                            registerFormRef={registerFormRef}
                            errors={errors}
                            getValue={getValue}
                        />
                    </td>
                </tr>
            )}
        </>
    );
}
