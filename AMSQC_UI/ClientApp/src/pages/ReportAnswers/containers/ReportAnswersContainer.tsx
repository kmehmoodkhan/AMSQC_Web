import React from 'react';
import ReportAnswers from '../components/ReportAnswers';
import { useHistory } from 'react-router-dom';
import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';

export default function ReportAnswersContainer() {
    // General Hooks
    const history = useHistory();

    // useSelectors

    const reportAnswers = useSelector((state: RootState) => state.report.answers);
    const currentReportType = useSelector((state: RootState) => state.report.currentReportType);

    // events

    const onBack = () => {
        history.push('/reports/' + currentReportType);
    };

    return <ReportAnswers answers={reportAnswers} onBack={onBack} />;
}
