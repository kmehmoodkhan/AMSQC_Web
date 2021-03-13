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
import * as Excel from 'exceljs';
import * as FileSaver from 'file-saver';

const blobType: string = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

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
        debugger;
        if (Number(reportId) == ReportType.Audit && dataRows && dataRows.length > 0) {
            const workbook = new Excel.Workbook();
            const worksheet = workbook.addWorksheet('Audit Summary');

            worksheet.columns = [
                { header: 'Quote Number', key: 'quoteNo', width: 20 },
                { header: 'User', key: 'fullName', width: 15 },
                { header: 'Date Completed', key: 'dateCompleted', width: 30 },
                { header: 'Category', key: 'categoryId', width: 15 },
                { header: 'CAR Required', key: 'isCARAnswered', width: 15 },
                { header: 'Sublet', key: 'isSublet', width: 15 },
            ];
            dataRows.forEach((item: any) => {
                let row = {
                    quoteNo: item.quoteNo,
                    fullName: item.fullName,
                    dateCompleted: moment(item.dateCompleted).format('DD/MM/YYYY hh:mm:ss a'),
                    categoryId: item.categoryId,
                    isCARAnswered: item.isCARAnswered ? 'Yes' : 'No',
                    isSublet: item.isSublet ? 'Yes' : 'No',
                };
                worksheet.addRow(row);
            });
            worksheet.duplicateRow(1, 1, true);
            worksheet.getRow(1).values = ['Audit Summary'];
            worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
                row.eachCell(function (cell) {
                    cell.font = {
                        name: 'Arial',
                        family: 2,
                        bold: false,
                        size: 10,
                    };
                    cell.alignment = {
                        vertical: 'middle',
                        horizontal: 'left',
                    };
                    if (rowNumber <= 2) {
                        row.height = 20;
                        cell.font = {
                            bold: true,
                            size: 13,
                        };
                    }
                });
            });
            workbook.xlsx.writeBuffer().then((data) => {
                const blob = new Blob([data], { type: blobType });
                FileSaver.saveAs(blob, 'Audit-Report-' + moment().format('YYYY-MM-DD-hhmmss') + '.xlsx');
            });
        }
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
                    setReportTitle('Audit Summary');
                    break;
                case ReportType.Compliance:
                    setUserClassName('col cola hidden');
                    setQuoteClassName('col cola hidden');
                    setReportTitle('Compliance');
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
                    reportTitle={reportTitle}
                    loading={loading}
                    exportExcel={exportExcel}
                />
            )}
        </>
    );
}
