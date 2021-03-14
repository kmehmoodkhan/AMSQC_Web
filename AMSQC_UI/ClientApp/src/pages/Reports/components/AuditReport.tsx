import moment from 'moment';
import React from 'react';

type Props = {
    dataRows: any[];
};
export default function AuditReport({ dataRows }: Props) {
    return (
        <table className="table table-sm table-style1 table-striped">
            <thead>
                <tr>
                    <th>Quote Number</th>
                    <th>User</th>
                    <th>Date Completed</th>
                    <th className="text-center">Mapping Sheet</th>
                    <th className="text-center">Category</th>
                    <th className="text-center">Car Required</th>
                    <th className="text-center">Sublet</th>
                    <th className="text-center">Answer</th>
                </tr>
            </thead>
            <tbody>
                {dataRows && dataRows.length>0 &&
                    dataRows.map((item: any) => {
                        return (
                            <tr>
                                <td> {item.quoteNo} </td>
                                <td> {item.fullName} </td>
                                <td> {moment(item.dateCompleted).format('DD/MM/YYYY hh:mm:ss a')} </td>
                                <td className="text-center">
                                    {' '}
                                    <a href={item.mappingSheetUrl} target="_blank">
                                        View
                                    </a>{' '}
                                </td>
                                <td className="text-center">
                                    <span className={`category-name  category${item.categoryId}`}>
                                        {item.categoryId}
                                    </span>{' '}
                                </td>
                                <td className="text-center">
                                    <span className={`${item.isCARAnswered ? 'yes' : ''}`}>
                                        {item.isCARAnswered ? 'Yes' : 'No'}
                                    </span>{' '}
                                </td>
                                <td className="text-center">
                                    <span className={`${item.isSublet ? 'yes' : ''}`}>
                                        {item.isSublet ? 'Yes' : 'No'}
                                    </span>{' '}
                                </td>
                                <td className="text-center">
                                    {' '}
                                    <a>View</a>{' '}
                                </td>
                            </tr>
                        );
                    })}
            </tbody>
        </table>
    );
}
