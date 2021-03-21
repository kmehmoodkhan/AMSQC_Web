import React from 'react';
import { ReportType } from '../../../common/enum';
import AuditReport from '../components/AuditReport';
import ComplianceReport from '../components/ComplianceReport';
import CMComplianceReport from '../components/CMComplianceReport';
import JobsNotAuditedReport from '../components/JobsNotAuditedReport';
import InitialInspectionReport from '../components/InitialInspectionReport';
import CostOfCARReport from '../components/CostOfCARReport';
import CSVExportReport from '../components/CSVExportReport';

type Props = {
    dataRows: any;
    reportType: ReportType;
    states: any[];
};
export default function ReportChildContainer({ reportType, dataRows, states }: Props) {
    return (
        <>
            {reportType === ReportType.Audit && <AuditReport dataRows={dataRows} />}
            {reportType === ReportType.CMAudit && <AuditReport dataRows={dataRows} />}
            {reportType === ReportType.CostOfCar && <CostOfCARReport dataRows={dataRows} states={states} />}
            {reportType === ReportType.Compliance && <ComplianceReport dataRows={dataRows} />}
            {reportType === ReportType.InitialInspection && <InitialInspectionReport dataRows={dataRows} />}
            {reportType === ReportType.CMCompliance && <CMComplianceReport dataRows={dataRows} />}
            {reportType === ReportType.JobsNotAudited && <JobsNotAuditedReport dataRows={dataRows} />}
            {reportType === ReportType.CSVExport && <CSVExportReport dataRows={dataRows} />}
        </>
    );
}
