import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { SubletCompletionStatus } from '../../../common/enum';
import { GetCorrectiveQuestions, GetSurveyQuestions } from '../../../redux/actions/surveyAction';
import { SET_SURVEY_QUESTIONS } from '../../../redux/constants/surveyConstants';
import { RootState } from '../../../redux/store';
import { openNotificationWithWarning } from '../../Shared/Components/notification';
import CategoryOneInspection from '../components/CategoryOneInspection';
import SubletRepairs from '../components/SubletRepairs';

export default function CategoryOneInspectionContainer() {
    //General hooks
    const location = useLocation<any>();

    const history = useHistory();

    const dispatch = useDispatch();

    // useState
    const [showInspectionPage, setShowInspectionPage] = useState(location.state.category == 1 ? false : true);

    const [subletCompleted, setSubletCompleted] = useState<any>(null);

    const [questionsArray, setQuestionsArray] = useState<any[]>([]);

    // useSelector
    const quoteNo = useSelector((state: RootState) => state.quote.quoteNo);

    const questions = useSelector((state: RootState) => state.survey.surveyQuestions);

    //events
    const onOptionChange = (answer: string, questionId: number, answerText: any) => {
        const updatedQuestions = questionsArray.map((item: any) => {
            if (item.questionId == questionId) {
                item.answer = answer;
                item.answerText = answerText;
            }
            return item;
        });
        setQuestionsArray(updatedQuestions);
    };

    const onNext = () => {
        if (questionsArray.filter((item: any) => !item.answer).length > 0) {
            openNotificationWithWarning('Please attempt all questions!', 'Survey');
        } else {
            dispatch({
                type: SET_SURVEY_QUESTIONS,
                surveyType: location.state.category,
                surveyQuestions: questionsArray,
            });
            history.push({
                pathname: '/corrective-request',
                state: {
                    subletCompleted,
                },
            });
        }
    };

    const setSubletCompletedStatus = (subletStatus: SubletCompletionStatus) => {
        setSubletCompleted(subletStatus);
        setShowInspectionPage(true);
    };

    //useEffect
    useEffect(() => {
        dispatch(GetSurveyQuestions(location.state.category));
        dispatch(GetCorrectiveQuestions(subletCompleted == SubletCompletionStatus.No ? true : false));
    }, []);

    useEffect(() => {
        setQuestionsArray(questions);
    }, [questions]);

    return (
        <>
            {showInspectionPage && questions && (
                <CategoryOneInspection
                    onNext={onNext}
                    onOptionChange={onOptionChange}
                    questions={questionsArray}
                    quoteNo={quoteNo}
                    category={location.state.category}
                />
            )}
            {!showInspectionPage && <SubletRepairs setSubletCompleted={setSubletCompletedStatus} />}
        </>
    );
}
