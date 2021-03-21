import moment from 'moment';
import React from 'react';

type Props = {
    dataRows: any[];
};
export default function JobsNotAuditedReport({ dataRows }: Props) {
    return (
        <table className="table table-sm table-style1 table-striped">
            <thead>
                <tr>
                    <th className="text-center">Quote Number</th>
                    <th className="text-center">Make</th>
                    <th className="text-center">Vehicle</th>
                    <th className="text-center">Color</th>
                    <th className="text-center">Registration</th>
                    <th className="text-center">Job Complete</th>
                </tr>
            </thead>
            <tbody>
                {dataRows &&
                    dataRows.length > 0 &&
                    dataRows.map((item: any) => {
                        return (
                            <tr>
                                <td className="text-center">{item.quoteNo}</td>
                                <td className="text-center">{item.make}</td>
                                <td className="text-center"> {item.vehicle} </td>
                                <td className="text-center"> {item.color} </td>
                                <td className="text-center"> {item.registration} </td>
                                <td className="text-center"> {moment(item.completionDate).format('DD/MM/YYYY')} </td>
                            </tr>
                        );
                    })}
            </tbody>
        </table>
    );
}
