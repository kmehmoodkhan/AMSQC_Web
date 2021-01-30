import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SubletCompletionStatus } from '../../../common/enum';
import { RootState } from '../../../redux/store';
import { openNotificationWithWarning } from '../../Shared/Components/notification';
import CategoryOneInspection from '../components/CategoryOneInspection';
import SubletRepairs from '../components/SubletRepairs';

export default function CategoryOneInspectionContainer() {
    // useState
    const [questions, setQuestions] = useState<any[]>([]);

    const [showInspectionPage, setShowInspectionPage] = useState(false);

    const [subletCompleted, setSubletCompleted] = useState<any>(null);

    // useSelector
    const quoteNo = useSelector((state: RootState) => state.quote.quoteNo);

    //events
    const onOptionChange = (answer: string, questionId: number) => {
        const updatedQuestions = questions.map((item) => {
            if (item.questionId == questionId) {
                item.answer = answer;
            }
            return item;
        });
        setQuestions(updatedQuestions);
    };

    const onNext = () => {
        if (questions.filter((item) => item.answer === '').length > 0) {
            openNotificationWithWarning('Please answer all questions!', 'Warning');
        }
    };

    const setSubletCompletedStatus = (subletStatus: SubletCompletionStatus) => {
        setSubletCompleted(subletStatus);
        setShowInspectionPage(true);
        console.log(subletCompleted);
    };

    //useEffect
    useEffect(() => {
        setQuestions([
            { question: 'Remove and Replace', questionId: 1, answer: '' },
            { question: 'Repair and Panel Alignment', questionId: 2, answer: '' },
            { question: 'Paint', questionId: 3, answer: '' },
            { question: 'Detailing', questionId: 4, answer: '' },
        ]);
    }, []);

    return (
        <>
            {showInspectionPage && (
                <CategoryOneInspection
                    onNext={onNext}
                    onOptionChange={onOptionChange}
                    questions={questions}
                    quoteNo={quoteNo}
                />
            )}
            {!showInspectionPage && <SubletRepairs setSubletCompleted={setSubletCompletedStatus} />}
        </>
    );
}
