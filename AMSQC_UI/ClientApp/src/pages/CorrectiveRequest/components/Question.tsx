import React from 'react';
import SubQuestion from './SubQuestion';

type Props = {
    question: any;
    onAnswerChange: any;
};
export default function Question({ question, onAnswerChange }: Props) {
    console.log(question);
    return (
        <div className="card">
            <div className="card-header">{question.title} </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table ">
                        <tbody>
                            {question.subQuestions.map((item: any) => (
                                <SubQuestion key={item.questionId} question={item} onAnswerChange={onAnswerChange} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
