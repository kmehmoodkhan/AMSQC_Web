import React from 'react';
import { QuestionType } from '../../../common/enum';
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
        <tr>
            {question.title && (
                <td>
                    <div className="name"> {question.title}</div>
                </td>
            )}
            <td>
                {question.questionType == QuestionType.Select && (
                    <SelectOptions
                        options={question.options}
                        onAnswerChange={onAnswerChange}
                        question={question}
                        answer={question.answer}
                    />
                )}
                {question.questionType == QuestionType.Radio && (
                    <RadioOptions
                        options={question.options}
                        onAnswerChange={onAnswerChange}
                        question={question}
                        answer={question.answer}
                    />
                )}
                {question.questionType == QuestionType.TextBox && (
                    <TextBoxAnswer onAnswerChange={onAnswerChange} question={question} answer={question.answer} />
                )}
                {question.questionType == QuestionType.TextArea && (
                    <CustomTextArea onAnswerChange={onAnswerChange} question={question} answer={question.answer} />
                )}
            </td>
        </tr>
    );
}
