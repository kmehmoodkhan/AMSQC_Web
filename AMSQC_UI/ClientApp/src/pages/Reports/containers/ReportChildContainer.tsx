import React from 'react';
import { ReportType } from '../../../common/enum';
import AuditReport from '../components/AuditReport';
import ComplianceReport from '../components/ComplianceReport';

type Props = {
    dataRows: any;
    reportType: ReportType;
};
export default function ReportChildContainer({ reportType, dataRows }: Props) {
    return (
        <>
            {reportType === ReportType.Audit && <AuditReport dataRows={dataRows} />}
            {reportType === ReportType.Compliance && <ComplianceReport dataRows={dataRows} />}
        </>
    );
}
