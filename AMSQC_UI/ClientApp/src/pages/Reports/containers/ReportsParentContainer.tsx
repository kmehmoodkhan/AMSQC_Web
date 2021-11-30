import moment from 'moment';
import React, { useEffect, useLayoutEffect, useMemo, useRef,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { GetReportAnswersData, GetReportData, GetReportFiltersData } from '../../../redux/actions/reportAction';
import { RootState } from '../../../redux/store';
import ReportsParent from '../components/ReportsParent';
import { useHistory } from 'react-router-dom';
import { ReportType } from '../../../common/enum';
import { RESET_REPORT_DATA, RESET_ANSWERS_REDIRECTION } from '../../../redux/constants/reportConstants';
import { exportReport } from '../../../common/excelexport';
import ReportAnswers from '../../ReportAnswers/components/ReportAnswers';
import { QuoteSteps } from '../../../common/enum';
import { showLoader } from '../../../redux/actions/sharedActions';
import { logIn } from '../../../azure/azure-authentication-service';
import { GetQuoteAvailable } from '../../../redux/actions/quoteAction';
import { GetAuditQuoteDetails, UpdateAuditQuoteDetails } from '../../../redux/actions/auditQuoteAction';

import { CLEAR_QUOTE_DATA } from '../../../redux/constants/quoteConstants';
import { SET_ERROR_MESSAGE } from '../../../redux/constants/sharedConstants';
import { CLEAR_SURVEY_DATA } from '../../../redux/constants/surveyConstants';
import { SET_REPORT } from '../../../redux/constants/reportConstants';

import { CLEAR_AUDIT_QUOTE_ID } from '../../../redux/constants/auditQuoteConstant';

export default function ReportsParentContainer() {
    // General Hooks
    const dispatch = useDispatch();
    const history = useHistory();
    let { reportId } = useParams<any>();

    // useState

    const [quoteId, setQuoteId] = useState('');
    const [centerId, setCenterId] = useState(0);
    const [regionId, setRegionId] = useState(0);
    const [userId, setUserId] = useState(0);
    const [auditQuoteId, setAuditQuoteId] = useState('');
    const quoteDetailId = useSelector((state: RootState) => state.auditQuote.quoteDetailId);
   


    const [ignoreDates, setIgnoreDates] = useState(1);
    const [fromDate, setFromDate] = useState<moment.Moment>(moment().clone().startOf('month').hour(12));
    const [toDate, setToDate] = useState<moment.Moment>(moment().clone().endOf('month'));
    const [userClassName, setUserClassName] = useState('col cola');
    const [quoteClassName, setQuoteClassName] = useState('col cola');
    const [regionClassName, setRegionClassName] = useState('col cola');
    const [ignoreClassName, setIgnoreClassName] = useState('col cola');

    const [reportTitle, setReportTitle] = useState('');
    const [showData, setShowData] = useState(false);
    const [isLoadingAnswers, setIsLoadingAnswers] = useState(false);
    const [showAnswers, setShowAnswers] = useState(false);
    const region = useSelector((state: RootState) => state.user.region);
    // useSelector

    const centers = useSelector((state: RootState) => state.report.centers);
    const regions = useSelector((state: RootState) => state.report.regions);
    const users = useSelector((state: RootState) => state.report.users);
    const user = useSelector((state: RootState) => state.user.user);
    const dataRows = useSelector((state: RootState) => state.report.dataRows);
    const loading = useSelector((state: RootState) => state.shared.loading);
    const redirectToAnswers = useSelector((state: RootState) => state.report.redirectToAnswers);
    const reportAnswers = useSelector((state: RootState) => state.report.answers);
    const quoteStep = useSelector((state: RootState) => state.quote.quoteStep);
    const loggedIn = useSelector((state: RootState) => state.user.loggedIn);
    const errorMessage = useSelector((state: RootState) => state.shared.errorMessage);
    const quoteDetails = useSelector((state: RootState) => state.quote.quoteDetails);
    const [hasError, setHasError] = useState(false);
    const tkn = useSelector((state: RootState) => state.user.accessToken);
    const [hasAuditorRole, setAuditorRole] = useState(false);

    //useMemo

    const now = useMemo(() => moment(), []);

    //events

    const onBack = () => {
        setShowAnswers(false);
        dispatch({ type: RESET_ANSWERS_REDIRECTION });
    };

    const onDateFromChange = (date: any) => {
        setFromDate(date.hour(12));
    };

    const onDateToChange = (date: any) => {
        setToDate(date.hour(23));
    };

    const submitFilters = () => {
        dispatch(
            GetReportData(
                centerId,
                regionId,
                userId,
                quoteId ? quoteId : '0',
                ignoreDates == 0 ? true : false,
                fromDate.toDate(),
                toDate.toDate(),
                Number(reportId),
            ),
        );
    };

    const onCMQuoteSubmit = () => {
        
        switch (quoteStep) {
            case QuoteSteps.GetQuoteDetail:
               
                if (auditQuoteId && auditQuoteId.length > 0 && /^\d+$/.test(auditQuoteId)) {
                    dispatch(showLoader());
                    if (!loggedIn) {
                        logIn('loginPopup', () => dispatch(GetAuditQuoteDetails(auditQuoteId)));
                    } else {
                        dispatch(GetAuditQuoteDetails(auditQuoteId));
                    }
                } 
                else {
                    dispatch({ type: SET_ERROR_MESSAGE, errorMessage: 'Please enter valid quote number' });
                }
                break;
            case QuoteSteps.QuoteAvailability:
                dispatch(showLoader());
                dispatch(GetQuoteAvailable(auditQuoteId, region));
                break;
        }
    };

    const onSubmitAuditQuote = () => {
        dispatch(UpdateAuditQuoteDetails(quoteDetailId));
    }

    const checkAuditorRole = () => {
        let base64Url = tkn.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        let parsedData = JSON.parse(jsonPayload);
        let auditorRole = false;
        if (parsedData.roles != null && parsedData.roles.length > 0) {
            auditorRole = (parsedData.roles[0].toLowerCase() === 'auditor');
        }
        console.log('auditorRole', auditorRole);
        setAuditorRole(auditorRole);
    }

    //const onAuditSubmit = () => {
    //    dispatch(
    //        GetReportData(
    //            centerId,
    //            regionId,
    //            userId,
    //            quoteId ? quoteId : '0',
    //            ignoreDates == 0 ? true : false,
    //            fromDate.toDate(),
    //            toDate.toDate(),
    //            Number(reportId),
    //        ),
    //    );
    //}

    const exportExcel = async () => {
        await exportReport(
            reportId,
            dataRows,
            centers.filter((x: any) => x.stateId),
        );
    };

    const getReportAnswers = (quoteDetailId: any) => {
        setIsLoadingAnswers(true);
        dispatch(GetReportAnswersData(quoteDetailId, user.localAccountId, reportId));
    };

    // useEffect

    useEffect(() => {
        setTimeout(() => {
            dispatch({ type: RESET_REPORT_DATA });

            setUserId(0);
            setRegionId(0);
            setCenterId(0);
            setQuoteId('');
            setAuditQuoteId('');
            //setAuditQuoteId('');
            checkAuditorRole();
            setIgnoreDates(1);
            setFromDate(moment().clone().startOf('month').hour(12));
            setToDate(moment().clone().endOf('month'));

            if (!regions || regions.length == 0 || !centers || centers.length == 0 || !users || users.length == 0) {
                dispatch(GetReportFiltersData());
            }
            setShowData(true);
        }, 100);
    }, [reportId]);

    useEffect(() => {
        if (reportId > 0 && reportId <= 8) {
            switch (Number(reportId)) {
                case ReportType.Audit:
                    setUserClassName('col cola');
                    setQuoteClassName('col cola');
                    setRegionClassName('col cola');
                    setIgnoreClassName('col cola');
                    setReportTitle('Audit Summary');
                    break;
                case ReportType.CostOfCar:
                    setUserClassName('col cola');
                    setQuoteClassName('col cola');
                    setRegionClassName('col cola');
                    setIgnoreClassName('col cola');
                    setReportTitle('Cost of CAR');
                    break;
                case ReportType.InitialInspection:
                    setUserClassName('col cola');
                    setQuoteClassName('col cola');
                    setRegionClassName('col cola');
                    setIgnoreClassName('col cola');
                    setReportTitle('Initial Inspection Results');
                    break;
                case ReportType.CMCompliance:
                    setUserClassName('col cola hidden');
                    setQuoteClassName('col cola hidden');
                    setRegionClassName('col cola');
                    setIgnoreClassName('col cola');
                    setReportTitle('CM Compliance');
                    break;
                case ReportType.CMAudit:
                    setUserClassName('col cola hidden');
                    setQuoteClassName('col cola hidden');
                    setRegionClassName('col cola');
                    setIgnoreClassName('col cola');
                    setReportTitle('CM Audit Summary');
                    break;
                case ReportType.Compliance:
                    setUserClassName('col cola hidden');
                    setQuoteClassName('col cola hidden');
                    setRegionClassName('col cola');
                    setIgnoreClassName('col cola');
                    setReportTitle('Compliance');
                    break;
                case ReportType.JobsNotAudited:
                    setUserClassName('col cola hidden');
                    setQuoteClassName('col cola');
                    setRegionClassName('col cola hidden');
                    setIgnoreClassName('col cola hidden');
                    setReportTitle('Jobs Not Audited Report');
                    break;
            }
        } else {
            history.push('/reports-dashboard');
        }
    }, [reportId]);

    useEffect(() => {
        if (redirectToAnswers) {
            setShowAnswers(true);
            setIsLoadingAnswers(false);
        }
    }, [redirectToAnswers]);

    useLayoutEffect(() => {
        setTimeout(() => {
            dispatch({ type: CLEAR_QUOTE_DATA });
            dispatch({ type: CLEAR_AUDIT_QUOTE_ID });
            dispatch({ type: CLEAR_SURVEY_DATA });
            dispatch({ type: SET_REPORT, isReport: true });
            setAuditQuoteId('');
            //setQuoteDetailId(0);
        }, 100);
        //auditQuoteIdRef.current.focus();
    }, []);

    useEffect(() => {
        if (auditQuoteId) setAuditQuoteId(auditQuoteId);
    }, [auditQuoteId]);

    //useEffect(() => {
    //    if (quoteDetailId) setQuoteDetailId(quoteDetailId);
    //}, [quoteDetailId]);

    const auditQuoteIdRef = useRef<any>();

    useEffect(() => {
        if (errorMessage) setHasError(true);
    }, [errorMessage]);

    useEffect(() => {
        if (hasAuditorRole) setAuditorRole(true);
    }, [hasAuditorRole]);

    return (
        <>
            {showData && !showAnswers && (
                <ReportsParent
                    onDateFromChange={onDateFromChange}
                    onDateToChange={onDateToChange}
                    onQuoteChange={(e: any) => {
                        let val = e.target.value;
                        if (val) {
                            val = val.replace(/[^0-9]/g, '');
                            if (val.length > 6) {
                                val = val.substring(0, 6);
                            }
                        }
                        setQuoteId(val);
                    }}
                    onCenterChange={(e: any) => setCenterId(e.target.value)}
                    onIgnoreDateChange={(e: any) => setIgnoreDates(e.target.value)}
                    onRegionChange={(e: any) => setRegionId(e.target.value)}
                    onUserChange={(e: any) => setUserId(e.target.value)}
                    centerId={centerId}
                    centers={centers}
                    ignoreDates={ignoreDates}
                    quoteId={quoteId}
                    regionId={regionId}
                    regions={regions}
                    submitFilters={submitFilters}
                    userId={userId}
                    users={users}
                    dataRows={dataRows}
                    defaultDate={now}
                    reportType={Number(reportId)}
                    userClassName={userClassName}
                    quoteClassName={quoteClassName}
                    regionClassName={regionClassName}
                    reportTitle={reportTitle}
                    loading={loading}
                    exportExcel={exportExcel}
                    ignoreClassName={ignoreClassName}
                    getReportAnswers={getReportAnswers}
                    isLoadingAnswers={isLoadingAnswers}
                    auditQuoteId={auditQuoteId}
                    //onAuditSubmit={onAuditSubmit}
                    onCMQuoteSubmit={onCMQuoteSubmit}
                    onCMQuoteChange={
                        (val: string) => {
                            if (val) {
                                console.log('CM Quote', val);
                                val = val.replace(/[^0-9]/g, '');
                                if (val.length > 6) {
                                    val = val.substring(0, 6);
                                }
                            }
                            setAuditQuoteId(val);
                            if (!val) {
                                dispatch({ type: CLEAR_AUDIT_QUOTE_ID });
                            }
                            if (errorMessage) dispatch({ type: SET_ERROR_MESSAGE, errorMessage: '' });
                        }
                    }
                    auditQuoteIdRef={auditQuoteIdRef}
                    quoteDetails={quoteDetails}
                    hasError={hasError}
                    errorMessage={errorMessage}
                    onSubmitAuditQuote={onSubmitAuditQuote}
                    iaAuditorRole={hasAuditorRole}
                />
            )}
            {showAnswers && <ReportAnswers answers={reportAnswers} onBack={onBack} />}
        </>
    );
}
