import React from 'react';

type Props = {
    question: string;
    onOptionChange: any;
    questionId: number;
    answer: string;
    options: any;
};
export default function InspectionQuestion({ question, questionId, answer, onOptionChange, options }: Props) {
    return (
        <>
            <tr>
                <td>
                    <div className="name"> {question} </div>
                </td>
                <td>
                    <div className=" options-buttons color1">
                        {options.map((item: any) => {
                            return (
                                <label className="">
                                    <input
                                        type="radio"
                                        checked={answer === item.questionOptionId}
                                        onChange={() => onOptionChange(item.questionOptionId, questionId, item.title)}
                                    />{' '}
                                    {item.title}
                                </label>
                            );
                        })}
                        {/* <label className="">
                            <input
                                type="radio"
                                checked={answer === 'No'}
                                onChange={() => onOptionChange('No', questionId)}
                            />{' '}
                            No
                        </label>
                        <label className="">
                            <input
                                type="radio"
                                checked={answer === 'N/A'}
                                onChange={() => onOptionChange('N/A', questionId)}
                            />{' '}
                            Not Applicable
                        </label> */}
                    </div>
                </td>
            </tr>
        </>
    );
}
