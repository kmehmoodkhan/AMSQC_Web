import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { DefaultAnswerIds, QuestionType } from '../../../common/enum';
import { SubmitSurveyResponses } from '../../../redux/actions/surveyAction';
import { RootState } from '../../../redux/store';
import SubmissionsPage from '../components/SubmissionsPage';

export default function SubmissionsPageContainer() {
    // general hooks
    const history = useHistory();
    const dispatch = useDispatch();

    // use selector
    const loading = useSelector((state: RootState) => state.shared.loading);
    const correctiveQuestions = useSelector((state: RootState) => state.survey.correctiveQuestions);
    const surveyQuestions = useSelector((state: RootState) => state.survey.surveyQuestions);
    const user = useSelector((state: RootState) => state.user.user);
    const quoteId = useSelector((state: RootState) => state.quote.quoteId);
    const surveySubmitted = useSelector((state: RootState) => state.survey.surveySubmitted);
    const surveyType = useSelector((state: RootState) => state.survey.surveyType);
    const rectified = useSelector((state: RootState) => state.survey.rectified);
    const showSublet = useSelector((state: RootState) => state.survey.showSublet);

    //events
    const onSubmitSurvey = () => {
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
        correctiveQuestions.every((item: any) => {
            let response = {
                UserGuid: user.localAccountId,
                QuoteId: quoteId,
                QuestionId: item.questionId,
                Answers: '',
                AnswerIds: '',
                IsSubletQuestion: item.isSubletQuestion,
            };
            response.Answers = item.subQuestions
                .filter((item1: any) => item1.questionType != QuestionType.Label && item1.answerText)
                .map((item1: any) => item1.answerText)
                .join('@@');
            response.AnswerIds = item.subQuestions
                .filter((item1: any) => item1.questionType != QuestionType.Label && item1.answer)
                .map((item1: any) => {
                    return item1.isOtherSelected ? DefaultAnswerIds.OtherAnswerId : item1.answer;
                })
                .join('@@');
            responses.push(response);

            return true;
        });
        dispatch(SubmitSurveyResponses(responses, rectified, showSublet, surveyType));
    };

    //use effect
    useEffect(() => {
        if (surveySubmitted) {
            history.push('/');
        }
    }, [surveySubmitted]);

    return <SubmissionsPage onSubmitSurvey={onSubmitSurvey} loading={loading} isRectified={rectified} />;
}
