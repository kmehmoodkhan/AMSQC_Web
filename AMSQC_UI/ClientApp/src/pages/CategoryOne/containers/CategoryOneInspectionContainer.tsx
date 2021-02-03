import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { SubletCompletionStatus } from '../../../common/enum';
import { RootState } from '../../../redux/store';
import { openNotificationWithWarning } from '../../Shared/Components/notification';
import CategoryOneInspection from '../components/CategoryOneInspection';
import SubletRepairs from '../components/SubletRepairs';

export default function CategoryOneInspectionContainer() {
    //General hooks
    const location = useLocation<any>();
    const history = useHistory();

    // useState
    const [questions, setQuestions] = useState<any[]>([]);

    const [showInspectionPage, setShowInspectionPage] = useState(location.state.category == 1 ? false : true);

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
        } else {
            history.push('/corrective-request');
        }
    };

    const setSubletCompletedStatus = (subletStatus: SubletCompletionStatus) => {
        setSubletCompleted(subletStatus);
        setShowInspectionPage(true);
        console.log(subletCompleted);
    };

    //useEffect
    useEffect(() => {
        let questionsList = [];
        questionsList.push({ question: 'Remove and Replace', questionId: 1, answer: '' });
        questionsList.push({ question: 'Repairs and Panel Alignment', questionId: 2, answer: '' });
        if (location.state.category == 1) {
            questionsList.push({ question: 'Painting', questionId: 3, answer: '' });
            questionsList.push({ question: 'Detailing', questionId: 4, answer: '' });
        } else if (location.state.category == 2) {
            questionsList.push({ question: 'Welding/Bonding', questionId: 3, answer: '' });
            questionsList.push({ question: 'Sealer, Adhesive or Foam', questionId: 4, answer: '' });
            questionsList.push({ question: 'Painting', questionId: 5, answer: '' });
            questionsList.push({ question: 'Detailing', questionId: 6, answer: '' });
        } else {
            questionsList.push({ question: 'Welding/Bonding', questionId: 3, answer: '' });
            questionsList.push({ question: 'Paint', questionId: 4, answer: '' });
            questionsList.push({ question: 'Road Test', questionId: 5, answer: '' });
            questionsList.push({ question: 'Under Carriage Inspection', questionId: 6, answer: '' });
            questionsList.push({ question: 'Detailing', questionId: 7, answer: '' });
        }
        setQuestions(questionsList);
    }, []);

    return (
        <>
            {showInspectionPage && (
                <CategoryOneInspection
                    onNext={onNext}
                    onOptionChange={onOptionChange}
                    questions={questions}
                    quoteNo={quoteNo}
                    category={location.state.category}
                />
            )}
            {!showInspectionPage && <SubletRepairs setSubletCompleted={setSubletCompletedStatus} />}
        </>
    );
}
