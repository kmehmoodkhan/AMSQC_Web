import { SurveyType } from '../../common/enum';
import {
    CLEAR_SURVEY_DATA,
    SAVE_CORRECTIVE_REQUESTS,
    SET_CORRECTIVE_QUESTIONS,
    SET_CORRECTIVE_QUESTIONS_FROM_API,
    SET_SURVEY_QUESTIONS,
    SET_SURVEY_SUBMITTED,
    SHOW_INSPECTION_PAGE,
} from '../constants/surveyConstants';

type surveyReducerType = {
    surveyType: SurveyType;
    surveyQuestions: any[];
    correctiveQuestions: any[];
    showSublet: boolean;
    surveySubmitted: boolean;
    rectified: boolean;
    showOnlySublet: boolean;
    originalCorrectiveQuestions: any[];
    showInspectionPage: boolean;
};

const defaultState: surveyReducerType = {
    surveyType: SurveyType.None,
    correctiveQuestions: [],
    originalCorrectiveQuestions: [],
    surveyQuestions: [],
    showSublet: false,
    surveySubmitted: false,
    rectified: true,
    showOnlySublet: false,
    showInspectionPage: false,
};

const surveyReducer = (state = defaultState, action: any): surveyReducerType => {
    switch (action.type) {
        case SET_SURVEY_QUESTIONS:
            return {
                ...state,
                surveyType: action.surveyType,
                surveyQuestions: action.surveyQuestions,
                showOnlySublet: action.showOnlySublet ? true : false,
                showSublet: action.showSublet ? true : false,
            };
        case SET_CORRECTIVE_QUESTIONS:
            return {
                ...state,
                correctiveQuestions: action.correctiveQuestions,
                showSublet: action.showSublet,
            };
        case SET_CORRECTIVE_QUESTIONS_FROM_API:
            return {
                ...state,
                correctiveQuestions: action.correctiveQuestions,
                showSublet: action.showSublet,
                originalCorrectiveQuestions: action.originalCorrectiveQuestions,
            };
        case SAVE_CORRECTIVE_REQUESTS:
            return {
                ...state,
                rectified: action.rectified,
                correctiveQuestions: action.correctiveQuestions,
                showSublet: action.showSublet,
            };
        case SET_SURVEY_SUBMITTED:
            return {
                ...state,
                surveySubmitted: true,
            };
        case CLEAR_SURVEY_DATA:
            return { ...defaultState };
        case SHOW_INSPECTION_PAGE: {
            return { ...state, showInspectionPage: action.showInspectionPage };
        }
        default:
            return state;
    }
};

export default surveyReducer;
