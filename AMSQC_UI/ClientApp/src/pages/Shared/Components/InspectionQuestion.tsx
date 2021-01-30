import React from 'react';

type Props = {
    question: string;
    onOptionChange: any;
    questionId: number;
    answer: string;
};
export default function InspectionQuestion({ question, questionId, answer, onOptionChange }: Props) {
    return (
        <>
            <tr>
                <td>
                    <div className="name"> {question} </div>
                </td>
                <td>
                    <div className=" options-buttons color1">
                        <label className="">
                            <input
                                type="radio"
                                checked={answer === 'Yes'}
                                onChange={() => onOptionChange('Yes', questionId)}
                            />{' '}
                            Yes
                        </label>
                        <label className="">
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
                        </label>
                    </div>
                </td>
            </tr>
        </>
    );
}
