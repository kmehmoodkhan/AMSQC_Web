import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetReportData, GetReportFiltersData } from '../../../redux/actions/reportAction';
import { RootState } from '../../../redux/store';
import AuditReport from '../components/AuditReport';

export default function AuditReportContainer() {
    // General Hooks
    const dispatch = useDispatch();

    // useState

    const [quoteId, setQuoteId] = useState('');
    const [centerId, setCenterId] = useState(0);
    const [regionId, setRegionId] = useState(0);
    const [userId, setUserId] = useState(0);
    const [ignoreDates, setIgnoreDates] = useState(1);
    const [fromDate, setFromDate] = useState<any>(new Date());
    const [toDate, setToDate] = useState<any>(new Date());

    // useSelector

    const centers = useSelector((state: RootState) => state.report.centers);
    const regions = useSelector((state: RootState) => state.report.regions);
    const users = useSelector((state: RootState) => state.report.users);
    const dataRows = useSelector((state: RootState) => state.report.dataRows);

    //usememo

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
                1,
            ),
        );
    };

    // useEffect

    useEffect(() => {
        dispatch(GetReportFiltersData());
    }, []);

    return (
        <AuditReport
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
        />
    );
}
