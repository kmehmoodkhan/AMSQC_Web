import { SurveyType } from '../../common/enum';
import {
    CLEAR_SURVEY_DATA,
    SET_CORRECTIVE_QUESTIONS,
    SET_SURVEY_QUESTIONS,
    SET_SURVEY_SUBMITTED,
} from '../constants/surveyConstants';

type surveyReducerType = {
    surveyType: SurveyType;
    surveyQuestions: any[];
    correctiveQuestions: any[];
    showSublet: boolean;
    surveySubmitted: boolean;
};

const defaultState: surveyReducerType = {
    surveyType: SurveyType.None,
    correctiveQuestions: [],
    surveyQuestions: [],
    showSublet: false,
    surveySubmitted: false,
};

const surveyReducer = (state = defaultState, action: any): surveyReducerType => {
    switch (action.type) {
        case SET_SURVEY_QUESTIONS:
            return {
                ...state,
                surveyType: action.surveyType,
                surveyQuestions: action.surveyQuestions,
            };
        case SET_CORRECTIVE_QUESTIONS:
            return {
                ...state,
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
        default:
            return state;
    }
};

export default surveyReducer;
