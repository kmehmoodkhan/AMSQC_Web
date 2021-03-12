import moment from 'moment';
import React from 'react';
import ReportFilters from './ReportFilters';

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
};
export default function AuditReport({
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
}: Props) {
    return (
        <div className="page ">
            <div className="container-fluid container-lg">
                <div className="row">
                    <div className="col-lg-12 offset-lg-0">
                        <div className="main-title"> Audit Summary </div>
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
                                />
                                <div className="table-responsive">
                                    <table className="table table-sm table-style1 table-striped">
                                        <thead>
                                            <tr>
                                                <th>Quote Number</th>
                                                <th>User</th>
                                                <th>Date Completed</th>
                                                <th className="text-center">Mapping Sheet</th>
                                                <th className="text-center">Category</th>
                                                <th className="text-center">Car Required</th>
                                                <th className="text-center">Sublet</th>
                                                <th className="text-center">Answer</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dataRows &&
                                                dataRows.map((item: any) => {
                                                    return (
                                                        <tr>
                                                            <td> {item.quoteNo} </td>
                                                            <td> {item.fullName} </td>
                                                            <td>
                                                                {' '}
                                                                {moment(item.dateCompleted).format(
                                                                    'DD/MM/YYYY hh:mm:ss a',
                                                                )}{' '}
                                                            </td>
                                                            <td className="text-center">
                                                                {' '}
                                                                <a href={item.mappingSheetUrl} target="_blank">
                                                                    View
                                                                </a>{' '}
                                                            </td>
                                                            <td className="text-center">
                                                                <span
                                                                    className={`category-name  category${item.categoryId}`}
                                                                >
                                                                    {item.categoryId}
                                                                </span>{' '}
                                                            </td>
                                                            <td className="text-center">
                                                                <span className={`${item.isCARAnswered ? 'yes' : ''}`}>
                                                                    {item.isCARAnswered ? 'Yes' : 'No'}
                                                                </span>{' '}
                                                            </td>
                                                            <td className="text-center">
                                                                <span className={`${item.isSublet ? 'yes' : ''}`}>
                                                                    {item.isSublet ? 'Yes' : 'No'}
                                                                </span>{' '}
                                                            </td>
                                                            <td className="text-center">
                                                                {' '}
                                                                <a>View</a>{' '}
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
