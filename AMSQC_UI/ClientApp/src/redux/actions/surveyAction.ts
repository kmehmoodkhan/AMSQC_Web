import { axiosGet, axiosPost } from '../../api/apiutils';
import { Endpoints } from '../../api/endpoints';
import { QuestionType, RequestStatus, SurveyType } from '../../common/enum';
import { SET_SURVEY_QUESTIONS } from '../constants/surveyConstants';
import * as actionType from '../constants/surveyConstants';
import { HIDE_LOADER, SET_GO_NEXT, SHOW_NOTIFICATION } from '../constants/sharedConstants';
import { dynamicSort } from '../../common/utils';
import { showLoader } from './sharedActions';
import { CLEAR_QUOTE_DATA } from '../constants/quoteConstants';

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

export const GetSurveyQuestions = (surveyType: SurveyType, region: any) => (dispatch: any) => {
    const url = Endpoints.SurveyAPI + `?surveyType=${surveyType}&regionId=${region}`;
    axiosGet(url)
        .then((response: any) => {
            if (response.data.status == RequestStatus.Success) {
                let questions = response.data.result.survey.result.questions
                    .map((item: any) => {
                        return {
                            ...item,
                            answer: item.questionOptions.filter((item1: any) => item1.title == 'No')[0]
                                .questionOptionId,
                            answerText: item.questionOptions.filter((item1: any) => item1.title == 'No')[0].title,
                            questionOptions: item.questionOptions
                                ? item.questionOptions.sort(dynamicSort('displayOrder'))
                                : [],
                        };
                    })
                    .sort(dynamicSort('displayOrder'));
                dispatch({
                    type: actionType.SET_SURVEY_QUESTIONS,
                    surveyType: surveyType,
                    surveyQuestions: questions,
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

export const GetCorrectiveQuestions = (showSublet: boolean, parentType: any, region: any) => (dispatch: any) => {
    const url =
        Endpoints.SurveyAPI +
        `?surveyType=${SurveyType.CorrectiveActionRequest}&regionId=${region}&parentType=${parentType}`;
    axiosGet(url)
        .then((response: any) => {
            console.log('Questions Response', response);
            if (response.data.status == RequestStatus.Success && response.data.result.survey.result.questions) {
                let questions = response.data.result.survey.result.questions
                    .filter((item: any) => !item.parentQuestionId && (showSublet || !item.isSubletQuestion))
                    .map((item: any) => {
                        return { ...item, answer: '', answerText: '' };
                    });
                let index = 0;
                questions = questions.map((item: any) => {
                    if (!item.isAdUsers) {
                        item.subQuestions = response.data.result.survey.result.questions
                            .filter((sub: any) => sub.parentQuestionId == item.questionId)
                            .map((sub: any) => {
                                if (sub.questionType == QuestionType.Select) {
                                    if (sub.questionOptions[0].displayOrder) {
                                        sub.questionOptions = sub.questionOptions.sort(dynamicSort('displayOrder'));
                                    } else {
                                        sub.questionOptions = sub.questionOptions.sort(dynamicSort('title'));
                                    }
                                }
                                sub.answer =
                                    sub.questionType == QuestionType.Radio
                                        ? sub.questionOptions.filter((opt: any) => opt.title.toLowerCase() == 'no')
                                              .length > 0
                                            ? sub.questionOptions.filter(
                                                  (opt: any) => opt.title.toLowerCase() == 'no',
                                              )[0].questionOptionId
                                            : ''
                                        : '';
                                sub.answerText =
                                    sub.questionType == QuestionType.Radio
                                        ? sub.questionOptions.filter((opt: any) => opt.title.toLowerCase() == 'no')
                                              .length > 0
                                            ? sub.questionOptions.filter(
                                                  (opt: any) => opt.title.toLowerCase() == 'no',
                                              )[0].title
                                            : ''
                                        : '';
                                sub.isOtherSelected = false;
                                return sub;
                            })
                            .sort(dynamicSort('displayOrder'));
                    } else {
                        item.subQuestions = [];
                        if (response.data.result.survey.result.adUsers) {
                            
                            let question = {
                                questionId: item.questionId,
                                title: null,
                                questionType: QuestionType.Select,
                                parentQuestionId: item.questionId,
                                answer: '',
                                answerText: '',
                                questionOptions: response.data.result.survey.result.adUsers.map((item1: any) => {
                                    return {
                                        questionOptionId: item1.userId,
                                        title: item1.fullName,
                                        questionId: item.questionId,
                                    };
                                }),
                                isOtherSelected: false,
                            };
                            item.subQuestions.push(question);
                        }
                    }
                    if (item.questionType != QuestionType.Label) {
                        item.index = index++;
                    }
                    return item;
                });

                dispatch({
                    type: actionType.SET_CORRECTIVE_QUESTIONS_FROM_API,
                    correctiveQuestions: questions,
                    originalCorrectiveQuestions: questions ? JSON.parse(JSON.stringify(questions)) : [],
                    showSublet: showSublet,
                });
                dispatch({ type: SET_GO_NEXT, goToNext: true });
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
            dispatch({
                type: CLEAR_QUOTE_DATA,
            });
            dispatch({ type: actionType.SET_SURVEY_SUBMITTED });
            dispatch({
                type: SHOW_NOTIFICATION,
                error: {
                    type: RequestStatus.Success == response.data.status ? 'success' : 'error',
                    description: response.data.message,
                    title: 'Survey',
                },
            });
        })
        .catch((err) =>
            dispatch({ type: SHOW_NOTIFICATION, error: { type: 'error', description: err.message, title: 'Error' } }),
        )
        .finally(() => dispatch({ type: HIDE_LOADER }));
};
