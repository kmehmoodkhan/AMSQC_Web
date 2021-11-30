import React from 'react';
import ReportFilters from './ReportFilters';
import { ReportType } from '../../../common/enum';
import ReportChildContainer from '../containers/ReportChildContainer';
import { Skeleton } from 'antd';
import QuoteDetails from '../../Home/components/CarDetails';


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
    getReportAnswers: any;
    isLoadingAnswers: boolean;
    auditQuoteId: any;
    //onAuditSubmit: any;
    onCMQuoteChange: any;
    onCMQuoteSubmit: any;
    auditQuoteIdRef: any;
    quoteDetails: any;
    hasError: any;
    errorMessage: String;
    onSubmitAuditQuote: any;
    iaAuditorRole: any;
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
    getReportAnswers,
    isLoadingAnswers,
    auditQuoteId,
    //onAuditSubmit
    onCMQuoteChange,
    onCMQuoteSubmit,
    auditQuoteIdRef,
    quoteDetails,
    hasError,
    errorMessage,
    onSubmitAuditQuote,
    iaAuditorRole
}: Props) {

    return (
        <div className="page ">
            <div className="container-fluid container-lg">
                <div className="row">
                    <div className="col-lg-12 offset-lg-0">
                        <div className="main-title"> {reportTitle} </div>
                        {iaAuditorRole && reportType === ReportType.Audit && <div className="row">
                            <div className="col-md-4 mx-auto">
                                <div id="accordion" className="collapse-box2">
                                    <div className="card">
                                        <div className="card-header" data-toggle="collapse" data-target="#collapseOne">
                                            Click here to commence a CM Audit <i className="icon"></i>
                                        </div>
                                        <div id="collapseOne" className="collapse show" data-parent="#accordion">
                                            <div className="card-body">
                                                <form>
                                                    <div className="form-group">
                                                        <label htmlFor="email">Quote number</label>
                                                        <div className="input-group input-button ">
                                                            <input type="text" className="form-control" value={auditQuoteId} ref={auditQuoteIdRef} onChange={(e) => onCMQuoteChange(e.target.value)} />
                                                            <div className="input-group-append">
                                                                <button className="btn btn-secondary-outline" onClick={() => onCMQuoteSubmit()} type="button">Details</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                                {hasError && <div className="alert alert-danger">{errorMessage}</div>}
                                                <div className="text-center">
                                                    {quoteDetails
                                                        && <QuoteDetails car={quoteDetails} />
                                                    }
                                                    {
                                                        quoteDetails &&
                                                        <button className="btn btn-secondary-outline" onClick={() => onSubmitAuditQuote()} type="button">Submit</button>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        }
                        
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
                                            getReportAnswers={getReportAnswers}
                                            isLoadingAnswers={isLoadingAnswers}
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
