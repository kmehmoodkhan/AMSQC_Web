import React from 'react';

type Props = {
    dataRows: any;
};
export default function InitialInspectionReport({ dataRows }: Props) {
    return (
        <>
            <div className="compliance-table">
                <table className="table table-sm table-style1 table-striped" style={{ marginBottom: '10px' }}>
                    <thead>
                        <tr>
                            <th className="text-center">Title</th>
                            <th className="text-center">Jobs Audited</th>
                            <th className="text-center">Jobs With CARs</th>
                            <th className="text-center">Performance (%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataRows && dataRows.summaryRow && dataRows.summaryRow.length > 0 && (
                            <tr>
                                <td> {dataRows.summaryRow[0].title} </td>
                                <td> {dataRows.summaryRow[0].jobsAudited} </td>
                                <td> {dataRows.summaryRow[0].jobsWithCARs} </td>
                                <td>{dataRows.summaryRow[0].performance}</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {dataRows && dataRows.stateSummary && (
                    <table className="table table-sm table-style1 table-striped" style={{ marginBottom: '10px' }}>
                        <tbody>
                            {dataRows &&
                                dataRows.stateSummary &&
                                dataRows.stateSummary.map((item: any, index: number) => {
                                    return (
                                        <tr key={index}>
                                            <td> {item.title} </td>
                                            <td> {item.jobsAudited} </td>
                                            <td> {item.jobsWithCARs} </td>
                                            <td>{item.performance}</td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                )}

                {dataRows &&
                    dataRows.stateData &&
                    dataRows.stateData.map((state: any, index: number) => {
                        return (
                            <table className="table table-sm table-style1 table-striped" key={index}>
                                <thead>
                                    <tr>
                                        <th colSpan={4} style={{ textAlign: 'center' }}>
                                            {state.title}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {state &&
                                        state.childList &&
                                        state.childList.map((item: any, index1: number) => {
                                            return (
                                                <tr key={index1}>
                                                    <td> {item.title} </td>
                                                    <td>{item.jobsAudited} </td>
                                                    <td> {item.jobsWithCARs} </td>
                                                    <td>{item.performance}</td>
                                                </tr>
                                            );
                                        })}
                                </tbody>
                            </table>
                        );
                    })}
            </div>
        </>
    );
}
