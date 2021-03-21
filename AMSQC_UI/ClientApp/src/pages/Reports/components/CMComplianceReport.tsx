import React from 'react';

type Props = {
    dataRows: any[];
};
export default function CMComplianceReport({ dataRows }: Props) {
    return (
        <table className="table table-sm table-style1 table-striped">
            <thead>
                <tr>
                    <th className="text-center">Center</th>
                    <th className="text-center">CM Audit</th>
                    <th className="text-center">Site Audit</th>
                </tr>
            </thead>
            <tbody>
                {dataRows &&
                    dataRows.length > 0 &&
                    dataRows.map((item: any) => {
                        return (
                            <tr>
                                <td className="text-center" style={{ fontWeight: item.isState ? 'bold' : 'normal' }}>
                                    {item.title}
                                </td>
                                <td className={`text-center ${item.cmAuditCount <= 0 ? 'red-td' : 'green-td'}`}>
                                    {item.cmAuditCount}
                                </td>
                                <td className="text-center"> {item.siteAuditCount} </td>
                            </tr>
                        );
                    })}
            </tbody>
        </table>
    );
}
