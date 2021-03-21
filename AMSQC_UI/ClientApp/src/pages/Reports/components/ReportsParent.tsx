import React from 'react';
import ReportFilters from './ReportFilters';
import { ReportType } from '../../../common/enum';
import ReportChildContainer from '../containers/ReportChildContainer';
import { Skeleton } from 'antd';

type Props = {
    onDateFromChange: any;
    onDateToChange: any;
    quoteId: any;
    regionId: any;
    centerId: any;
    userId: any;
    ignoreDates: any;
    onRegionChange: any;
    onUserChange: any;
    onCenterChange: any;
    onQuoteChange: any;
    onIgnoreDateChange: any;
    users: any[];
    regions: any[];
    centers: any[];
    submitFilters: any;
    dataRows: any[];
    defaultDate: any;
    reportType: ReportType;
    userClassName: string;
    quoteClassName: string;
    reportTitle: string;
    loading: boolean;
    exportExcel: any;
    regionClassName: string;
    ignoreClassName: string;
};

export default function ReportsParent({
    onDateFromChange,
    onDateToChange,
    quoteId,
    regionId,
    userId,
    centerId,
    ignoreDates,
    onRegionChange,
    onUserChange,
    onCenterChange,
    onQuoteChange,
    onIgnoreDateChange,
    users,
    regions,
    centers,
    submitFilters,
    dataRows,
    defaultDate,
    reportType,
    userClassName,
    quoteClassName,
    reportTitle,
    loading,
    exportExcel,
    regionClassName,
    ignoreClassName,
}: Props) {
    return (
        <div className="page ">
            <div className="container-fluid container-lg">
                <div className="row">
                    <div className="col-lg-12 offset-lg-0">
                        <div className="main-title"> {reportTitle} </div>
                        <br /> <br />
                        <div className="reports-table">
                            <div className="wrapper">
                                <ReportFilters
                                    centerId={centerId}
                                    centers={centers}
                                    ignoreDates={ignoreDates}
                                    onCenterChange={onCenterChange}
                                    onDateFromChange={onDateFromChange}
                                    onDateToChange={onDateToChange}
                                    onIgnoreDateChange={onIgnoreDateChange}
                                    onQuoteChange={onQuoteChange}
                                    onRegionChange={onRegionChange}
                                    onUserChange={onUserChange}
                                    quoteId={quoteId}
                                    regionId={regionId}
                                    regions={regions}
                                    userId={userId}
                                    users={users}
                                    submitFilters={submitFilters}
                                    defaultDate={defaultDate}
                                    reportType={reportType}
                                    userClassName={userClassName}
                                    quoteClassName={quoteClassName}
                                    loading={loading}
                                    exportExcel={exportExcel}
                                    regionClassName={regionClassName}
                                    ignoreClassName={ignoreClassName}
                                />
                                <div className="table-responsive">
                                    <Skeleton loading={loading}>
                                        <ReportChildContainer
                                            dataRows={dataRows}
                                            reportType={reportType}
                                            states={centers}
                                        />
                                    </Skeleton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
