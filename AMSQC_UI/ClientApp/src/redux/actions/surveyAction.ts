import { axiosGet, axiosPost } from '../../api/apiutils';
import { Endpoints } from '../../api/endpoints';
import { QuestionType, RequestStatus, SurveyType } from '../../common/enum';
import { SET_SURVEY_QUESTIONS } from '../constants/surveyConstants';
import * as actionType from '../constants/surveyConstants';
import { HIDE_LOADER, SHOW_NOTIFICATION } from '../constants/sharedConstants';
import { dynamicSort } from '../../common/utils';
import { showLoader } from './sharedActions';
import { CLEAR_QUOTE } from '../constants/quoteConstants';

export const setSurveyQuestions = (surveyQuestions: any, surveyType: SurveyType) => (dispatch: any) => {
    dispatch({ type: SET_SURVEY_QUESTIONS, surveyQuestions: surveyQuestions, surveyType: surveyType });
};

export const clearSurveyState = () => (dispatch: any) => {
    dispatch({ type: actionType.CLEAR_SURVEY_DATA });
};

export const saveCorrectiveRequestQuestions = (correctiveQuestions: any[], rectified: boolean, showSublet: boolean) => (
    dispatch: any,
) => {
    dispatch({ type: actionType.SAVE_CORRECTIVE_REQUESTS, correctiveQuestions, rectified, showSublet });
};

export const GetSurveyQuestions = (surveyType: SurveyType, region: string = 'RMA Burmawood') => (dispatch: any) => {
    const url = Endpoints.SurveyAPI + `?surveyType=${surveyType}&region=${region}`;
    axiosGet(url)
        .then((response: any) => {
            if (response.data.status == RequestStatus.Success) {
                dispatch({
                    type: actionType.SET_SURVEY_QUESTIONS,
                    surveyType: surveyType,
                    surveyQuestions: response.data.result.survey.questions.map((item: any) => {
                        return { ...item, answer: '', answerText: '' };
                    }),
                });
            } else {
                dispatch({ type: SHOW_NOTIFICATION, error: { type: 'error' } });
            }
        })
        .catch((err) =>
            dispatch({ type: SHOW_NOTIFICATION, error: { type: 'error', description: err.message, title: 'Error' } }),
        )
        .finally(() => dispatch({ type: HIDE_LOADER }));
};

export const GetCorrectiveQuestions = (showSublet: boolean, region: string = 'RMA Burmawood') => (dispatch: any) => {
    const url = Endpoints.SurveyAPI + `?surveyType=${SurveyType.CorrectiveActionRequest}&region=${region}`;
    axiosGet(url)
        .then((response: any) => {
            if (response.data.status == RequestStatus.Success && response.data.result.survey.questions) {
                let questions = response.data.result.survey.questions
                    .filter((item: any) => !item.parentQuestionId)
                    .map((item: any) => {
                        return { ...item, answer: '', answerText: '' };
                    });
                questions = questions.map((item: any) => {
                    if (!item.isAdUsers) {
                        item.subQuestions = response.data.result.survey.questions
                            .filter((sub: any) => sub.parentQuestionId == item.questionId)
                            .map((sub: any) => {
                                if (sub.questionType == QuestionType.Select) {
                                    if (sub.questionOptions[0].displayOrder) {
                                        sub.questionOptions = sub.questionOptions.sort(dynamicSort('displayOrder'));
                                    } else {
                                        sub.questionOptions = sub.questionOptions.sort(dynamicSort('title'));
                                    }
                                }
                                sub.answer = '';
                                sub.answerText = '';
                                return sub;
                            })
                            .sort(dynamicSort('displayOrder'));
                    } else {
                        item.subQuestions = [];
                        if (response.data.result.survey.adUsers) {
                            let question = {
                                questionId: item.questionId,
                                title: null,
                                questionType: QuestionType.Select,
                                parentQuestionId: item.questionId,
                                answer: '',
                                answerText: '',
                                questionOptions: response.data.result.survey.adUsers.map((item1: any) => {
                                    return {
                                        questionOptionId: item1.userGuid,
                                        title: item1.userName,
                                        questionId: item.questionId,
                                    };
                                }),
                            };
                            item.subQuestions.push(question);
                        }
                    }
                    return item;
                });

                dispatch({
                    type: actionType.SET_CORRECTIVE_QUESTIONS,
                    correctiveQuestions: questions,
                    showSublet: showSublet,
                });
            } else {
                dispatch({ type: SHOW_NOTIFICATION, error: { type: 'error' } });
            }
        })
        .catch((err) =>
            dispatch({ type: SHOW_NOTIFICATION, error: { type: 'error', description: err.message, title: 'Error' } }),
        )
        .finally(() => dispatch({ type: HIDE_LOADER }));
};

export const SubmitSurveyResponses = (
    responses: any[],
    isIssueFixed: any,
    isSubletShown: any,
    surveyType: SurveyType,
) => (dispatch: any) => {
    const url = Endpoints.SurveyAPI;
    dispatch({ type: showLoader });
    axiosPost(url, {
        response: responses,
        isSubletShown: isSubletShown,
        isDefectFixed: isIssueFixed,
        SurveyType: surveyType,
    })
        .then((response: any) => {
            if (response.data.status == RequestStatus.Success) {
                dispatch({
                    type: CLEAR_QUOTE,
                });
                dispatch({ type: actionType.SET_SURVEY_SUBMITTED });
                dispatch({
                    type: SHOW_NOTIFICATION,
                    error: { type: 'success', description: 'Survey submitted successfully', title: 'Survey' },
                });
            } else {
                dispatch({ type: SHOW_NOTIFICATION, error: { type: 'error' } });
            }
        })
        .catch((err) =>
            dispatch({ type: SHOW_NOTIFICATION, error: { type: 'error', description: err.message, title: 'Error' } }),
        )
        .finally(() => dispatch({ type: HIDE_LOADER }));
};
