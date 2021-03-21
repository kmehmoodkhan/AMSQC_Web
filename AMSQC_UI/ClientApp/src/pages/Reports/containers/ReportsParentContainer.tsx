import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { GetReportData, GetReportFiltersData } from '../../../redux/actions/reportAction';
import { RootState } from '../../../redux/store';
import ReportsParent from '../components/ReportsParent';
import { useHistory } from 'react-router-dom';
import { ReportType } from '../../../common/enum';
import { RESET_REPORT_DATA } from '../../../redux/constants/reportConstants';
import { exportReport } from '../../../common/excelexport';

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
    const [ignoreDates, setIgnoreDates] = useState(1);
    const [fromDate, setFromDate] = useState<any>(moment().clone().startOf('month').toDate());
    const [toDate, setToDate] = useState<any>(moment().clone().endOf('month').toDate());
    const [userClassName, setUserClassName] = useState('col cola');
    const [quoteClassName, setQuoteClassName] = useState('col cola');
    const [regionClassName, setRegionClassName] = useState('col cola');
    const [ignoreClassName, setIgnoreClassName] = useState('col cola');

    const [reportTitle, setReportTitle] = useState('');
    const [showData, setShowData] = useState(false);

    // useSelector

    const centers = useSelector((state: RootState) => state.report.centers);
    const regions = useSelector((state: RootState) => state.report.regions);
    const users = useSelector((state: RootState) => state.report.users);
    const dataRows = useSelector((state: RootState) => state.report.dataRows);
    const loading = useSelector((state: RootState) => state.shared.loading);

    //useMemo

    const now = useMemo(() => moment(), []);

    //events
    const onDateFromChange = (date: any) => {
        setFromDate(date);
    };

    const onDateToChange = (date: any) => {
        setToDate(date);
    };

    const submitFilters = () => {
        dispatch(
            GetReportData(
                centerId,
                regionId,
                userId,
                quoteId ? quoteId : '0',
                ignoreDates == 0 ? true : false,
                fromDate,
                toDate,
                Number(reportId),
            ),
        );
    };

    const exportExcel = async () => {
        await exportReport(
            reportId,
            dataRows,
            centers.filter((x: any) => x.stateId),
        );
    };

    // useEffect

    useEffect(() => {
        setTimeout(() => {
            dispatch({ type: RESET_REPORT_DATA });

            setUserId(0);
            setRegionId(0);
            setCenterId(0);
            setQuoteId('');
            setIgnoreDates(1);
            setFromDate(moment().clone().startOf('month').toDate());
            setToDate(moment().clone().endOf('month').toDate());

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

    return (
        <>
            {showData && (
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
                />
            )}
        </>
    );
}
