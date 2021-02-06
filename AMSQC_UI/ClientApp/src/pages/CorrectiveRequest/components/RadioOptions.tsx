import React from 'react';

type Props = {
    options: any;
    answer: any;
    onAnswerChange: any;
    question: any;
};
export default function RadioOptions({ options, answer, onAnswerChange, question }: Props) {
    return (
        <div className="name">
            <div className=" options-buttons color1 ">
                {options.map((item: any) => {
                    return (
                        <label className="   " key={item.questionOptionId}>
                            <input
                                type="radio"
                                checked={answer == item.questionOptionId}
                                onClick={() => {
                                    onAnswerChange(
                                        item.questionOptionId,
                                        question.parentQuestionId,
                                        question.questionId,
                                        item.title,
                                    );
                                }}
                            />{' '}
                            {item.title}
                        </label>
                    );
                })}
            </div>
        </div>
    );
}
