import { SET_DATA_ROWS, SET_FILTERS_DATA, SET_REPORT, RESET_REPORT_DATA } from '../constants/reportConstants';

type reportReducerType = {
    regions: any[];
    centers: any[];
    users: any[];
    dataRows: any[];
    isReport: boolean;
};

const defaultState: reportReducerType = {
    regions: [],
    centers: [],
    users: [],
    dataRows: [],
    isReport: false,
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
        default:
            return state;
    }
};

export default reportReducer;
