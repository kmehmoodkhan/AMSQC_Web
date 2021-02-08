import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { DefaultAnswerIds, QuestionType } from '../../../common/enum';
import { SubmitSurveyResponses } from '../../../redux/actions/surveyAction';
import { SHOW_NOTIFICATION } from '../../../redux/constants/sharedConstants';
import { RootState } from '../../../redux/store';
import CorrectiveRequest from '../components/CorrectiveRequest';

export default function CorrectiveRequestContainer() {
    // general hooks
    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation<any>();

    // use selector
    const questions = useSelector((state: RootState) => state.survey.correctiveQuestions);
    const surveyQuestions = useSelector((state: RootState) => state.survey.surveyQuestions);
    const user = useSelector((state: RootState) => state.user.user);
    const quoteId = useSelector((state: RootState) => state.quote.quoteId);
    const surveySubmitted = useSelector((state: RootState) => state.survey.surveySubmitted);
    const surveyType = useSelector((state: RootState) => state.survey.surveyType);

    // Use State
    const [questionsArray, setQuestionsArray] = useState<any[]>([]);

    //events
    const onAnswerChange = (answer: any, parentId: any, questionId: any, answerText: any, questionType: any = '') => {
        debugger;
        if (!answer && answerText == '[Please Select]') {
            return;
        }
        if (
            answer &&
            (answerText == 'Other' || answer == DefaultAnswerIds.OtherAnswerId) &&
            questionType == QuestionType.Select
        ) {
            if (answer != DefaultAnswerIds.OtherAnswerId) {
                answerText = '';
            }
            answer = DefaultAnswerIds.OtherAnswerId;
        }
        let updatedQuestions = [...questionsArray];
        updatedQuestions = updatedQuestions.map((item: any) => {
            if (item.questionId == parentId) {
                item.subQuestions = item.subQuestions.map((item1: any) => {
                    if (item1.questionId == questionId) {
                        item1.answer = answer;
                        item1.answerText = answerText;
                    }
                    return item1;
                });
            }
            return item;
        });
        setQuestionsArray(updatedQuestions);
    };

    const submitResponses = (rectified: boolean) => {
        let allQuestionsAttempted = true;
        let responses: any[] = [];
        surveyQuestions.every((item: any) => {
            let response = {
                UserGuid: user.localAccountId,
                QuoteId: quoteId,
                QuestionId: item.questionId,
                Answers: item.answerText,
                AnswerIds: item.answer.toString(),
                IsSubletQuestion: false,
            };
            responses.push(response);
            return true;
        });
        questionsArray.every((item: any) => {
            if (
                item.subQuestions.filter(
                    (item1: any) => (!item1.answer || !item1.answerText) && item1.questionType != QuestionType.Label,
                ).length > 0
            ) {
                allQuestionsAttempted = false;
                return false;
            }
            let response = {
                UserGuid: user.localAccountId,
                QuoteId: quoteId,
                QuestionId: item.questionId,
                Answers: '',
                AnswerIds: '',
                IsSubletQuestion: item.isSubletQuestion,
            };
            response.Answers = item.subQuestions
                .filter((item1: any) => item1.questionType != QuestionType.Label)
                .map((item1: any) => item1.answerText)
                .join('@@');
            response.AnswerIds = item.subQuestions
                .filter((item1: any) => item1.questionType != QuestionType.Label)
                .map((item1: any) => item1.answer)
                .join('@@');
            responses.push(response);

            return true;
        });
        if (allQuestionsAttempted) {
            dispatch(SubmitSurveyResponses(responses, rectified, location.state.subletCompleted, surveyType));
        } else {
            dispatch({
                type: SHOW_NOTIFICATION,
                error: {
                    type: 'warning',
                    description: 'Please attempt all questions before submitting',
                    title: 'Survey',
                },
            });
        }
    };

    // useEffects
    useEffect(() => {
        setQuestionsArray(questions);
    }, [questions]);

    useEffect(() => {
        if (surveySubmitted) {
            history.push('/');
        }
    }, [surveySubmitted]);

    return (
        <CorrectiveRequest
            showSublet={location.state.subletCompleted}
            questions={questionsArray}
            onAnswerChange={onAnswerChange}
            submitResponses={submitResponses}
        />
    );
}
