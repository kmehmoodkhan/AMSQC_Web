import React from 'react';
import { QuestionType } from '../../../common/enum';
import RadioOptions from '../components/RadioOptions';
import SelectOptions from '../components/SelectOptions';
import CustomTextArea from '../components/TextArea';
import TextBoxAnswer from '../components/TextBoxAnswer';

type Props = {
    question: any;
    onAnswerChange: any;
    registerFormRef: any;
    errors: any;
    getValue: any;
    isRadioNo: boolean;
    hasRadioSibling: boolean;
};
export default function SubQuestionContainer({
    question,
    onAnswerChange,
    registerFormRef,
    errors,
    getValue,
    hasRadioSibling,
    isRadioNo,
}: Props) {
    return (
        <>
            <tr>
                {question.title && (
                    <td
                        className={`${
                            question.questionType == QuestionType.Select && question.isOtherSelected ? 'no-border' : ''
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
                        question.questionType == QuestionType.Select && question.isOtherSelected ? 'no-border' : ''
                    }`}
                    colSpan={question.title ? 1 : 3}
                >
                    {question.questionType == QuestionType.Select && (
                        <SelectOptions
                            options={question.questionOptions}
                            onAnswerChange={onAnswerChange}
                            question={question}
                            answer={
                                question.isOtherSelected
                                    ? question.questionOptions.filter((item: any) => item.title == 'Other')[0]
                                          .questionOptionId
                                    : question.answer
                            }
                            registerFormRef={registerFormRef}
                            errors={
                                question.isOtherSelected
                                    ? null
                                    : !question.isOtherSelected && question.answer
                                    ? null
                                    : errors
                            }
                            getValue={getValue}
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
                            hasRadioSibling={hasRadioSibling}
                            isRadioNo={isRadioNo}
                        />
                    )}
                </td>
            </tr>
            {question.questionType == QuestionType.Select && question.isOtherSelected && (
                <tr>
                    <td colSpan={3}>
                        <CustomTextArea
                            onAnswerChange={onAnswerChange}
                            question={question}
                            answer={question.answerText}
                            registerFormRef={registerFormRef}
                            errors={errors}
                            getValue={getValue}
                            hasRadioSibling={hasRadioSibling}
                            isRadioNo={isRadioNo}
                        />
                    </td>
                </tr>
            )}
        </>
    );
}
