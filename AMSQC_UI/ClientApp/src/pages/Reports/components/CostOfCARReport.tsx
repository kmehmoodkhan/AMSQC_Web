import moment from 'moment';
import React from 'react';

type Props = {
    dataRows: any;
    states: any[];
};
export default function CostOfCARReport({ dataRows, states }: Props) {
    return (
        <>
            <div className="compliance-table">
                {states && states.length > 0 && (
                    <div>
                        <p style={{ fontSize: '15px', fontWeight: 'bold' }}>States</p>
                        {states
                            .filter((x) => x.stateId)
                            .map((item: any) => {
                                const stateData = dataRows.filter((x: any) => x.stateId == item.stateId);

                                if (stateData.length > 0 && stateData[0].quotesList && stateData[0].quotesList.length > 0) {
                                    return (
                                        <>
                                            <p style={{ color: 'blue', fontSize: '14px', fontWeight: 'bold' }}>
                                                {item.title}
                                            </p>
                                            <table
                                                className="table table-sm table-style1 table-striped"
                                                style={{ marginBottom: '15px' }}
                                            >
                                                <thead>
                                                    <tr>
                                                        <th className="text-center">Quote</th>
                                                        <th className="text-center">Responsible</th>
                                                        <th className="text-center">Date</th>
                                                        <th className="text-center">Site</th>
                                                        <th className="text-center">Answers</th>
                                                        <th className="text-center">Cost</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {stateData[0].quotesList.map((x: any) => (
                                                        <tr>
                                                            <td> {x.quoteNo} </td>
                                                            <td> {x.userResponsible} </td>
                                                            <td>
                                                                {moment(x.completionDate).format(
                                                                    'DD/MM/YYYY hh:mm:ss a',
                                                                )}
                                                            </td>
                                                            <td> {x.site} </td>
                                                            <td> View </td>
                                                            <td> {x.cost} </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </>
                                    );
                                } else {
                                    return (
                                        <>
                                            <p style={{ color: 'blue', fontSize: '14px', fontWeight: 'bold' }}>
                                                {item.title}
                                            </p>
                                            <p style={{ fontSize: '15px' }}>
                                                No Corrective Action Requests to display.
                                            </p>
                                        </>
                                    );
                                }
                            })}
                    </div>
                )}
            </div>
        </>
    );
}
