import { SET_DATA_ROWS, SET_FILTERS_DATA } from '../constants/reportConstants';

type reportReducerType = {
    regions: any[];
    centers: any[];
    users: any[];
    dataRows: any[];
};

const defaultState: reportReducerType = {
    regions: [],
    centers: [],
    users: [],
    dataRows: [],
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
        default:
            return state;
    }
};

export default reportReducer;
