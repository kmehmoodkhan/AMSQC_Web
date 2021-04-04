import { ReportType } from '../../common/enum';
import { RESET_ANSWERS_REDIRECTION } from '../constants/reportConstants';
import {
    SET_DATA_ROWS,
    SET_FILTERS_DATA,
    SET_REPORT,
    RESET_REPORT_DATA,
    SET_REPORT_ANSWERS,
} from '../constants/reportConstants';

type reportReducerType = {
    regions: any[];
    centers: any[];
    users: any[];
    dataRows: any[];
    isReport: boolean;
    answers: any;
    currentReportType: ReportType;
    redirectToAnswers: boolean;
};

const defaultState: reportReducerType = {
    regions: [],
    centers: [],
    users: [],
    dataRows: [],
    isReport: false,
    answers: null,
    currentReportType: ReportType.None,
    redirectToAnswers: false,
};

const reportReducer = (state = defaultState, action: any): reportReducerType => {
    switch (action.type) {
        case SET_DATA_ROWS:
            return {
                ...state,
                dataRows: action.dataRows,
            };
        case SET_FILTERS_DATA:
            return {
                ...state,
                regions: action.regions,
                centers: action.centers,
                users: action.users,
            };
        case SET_REPORT:
            return {
                ...state,
                isReport: action.isReport,
            };
        case RESET_REPORT_DATA:
            return {
                ...state,
                dataRows: [],
            };
        case SET_REPORT_ANSWERS:
            return {
                ...state,
                answers: action.answers,
                currentReportType: action.currentReportType,
                redirectToAnswers: true,
            };
        case RESET_ANSWERS_REDIRECTION:
            return {
                ...state,
                redirectToAnswers: false,
            };
        default:
            return state;
    }
};

export default reportReducer;
