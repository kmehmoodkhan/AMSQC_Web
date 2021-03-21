import { Endpoints } from '../../api/endpoints';
import { HIDE_LOADER, SHOW_LOADER, SHOW_NOTIFICATION } from '../constants/sharedConstants';
import * as actionType from '../constants/reportConstants';
import { axiosGet, axiosPost } from '../../api/apiutils';
import { ReportType } from '../../common/enum';

export const GetReportFiltersData = () => (dispatch: any) => {
    const url = Endpoints.ReportAPI.FiltersData;
    dispatch({ type: SHOW_LOADER });
    axiosGet(url)
        .then((response: any) => {
            const { regions, states, users } = response.data.result;
            dispatch({ type: actionType.SET_FILTERS_DATA, users: users, regions: regions, centers: states });
        })
        .catch((err: any) =>
            dispatch({ type: SHOW_NOTIFICATION, error: { type: 'error', description: err.message, title: 'Error' } }),
        )
        .finally(() => dispatch({ type: HIDE_LOADER }));
};

export const GetReportData = (
    centerId: any,
    regionId: any,
    userId: any,
    quoteNo: any,
    ignoreDates: any,
    fromDate: any,
    toDate: any,
    reportType: any,
) => (dispatch: any) => {
    const url = Endpoints.ReportAPI.ReportAPI;
    dispatch({ type: SHOW_LOADER });
    axiosPost(url, {
        CenterId: parseInt(centerId),
        RegionId: parseInt(regionId),
        UserId: parseInt(userId),
        QuoteNo: parseInt(quoteNo),
        IgnoreDates: ignoreDates,
        FromDate: fromDate,
        EndDate: toDate,
        ReportType: parseInt(reportType),
    })
        .then((response: any) => {
            let { result, regionsData } = response.data.result;
            if (reportType == ReportType.Compliance || reportType == ReportType.InitialInspection) {
                if (regionsData) {
                    result = transFormComplianceReportData(regionsData);
                } else {
                    result = {};
                }
            }
            dispatch({ type: actionType.SET_DATA_ROWS, dataRows: result });
        })
        .catch((err: any) =>
            dispatch({ type: SHOW_NOTIFICATION, error: { type: 'error', description: err.message, title: 'Error' } }),
        )
        .finally(() => dispatch({ type: HIDE_LOADER }));
};

const transFormComplianceReportData = (result: any) => {
    let data: any = {};

    data.summaryRow = result.filter((item: any) => item.isSummary);

    data.stateSummary = result.filter((item: any) => !item.childList && !item.isSummary);

    data.stateData = result.filter((item: any) => item.childList);

    return data;
};
