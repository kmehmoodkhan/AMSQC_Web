import moment from 'moment';
import React from 'react';

type Props = {
    dataRows: any[];
};
export default function CSVExportReport({ dataRows }: Props) {
    return (
        <table className="table table-sm table-style1 table-striped">
            <thead>
                <tr>
                    <th className="text-center">Quote Number</th>
                    <th className="text-center">Claim Number</th>
                    <th className="text-center">Rego Number</th>
                    <th className="text-center">Vehicle Make</th>
                    <th className="text-center">Vehicle Model</th>
                    <th className="text-center">User</th>
                    <th className="text-center">Date Completed</th>
                    <th className="text-center">Date Audited</th>
                    <th className="text-center">Category Of Severity</th>
                    <th className="text-center">Remove & Replace</th>
                    <th className="text-center">Alignment Issue</th>
                    <th className="text-center">Damage Parts Missed</th>
                    <th className="text-center">Quoted Parts Not Fitted</th>
                    <th className="text-center">Electrical Issue</th>
                    <th className="text-center">Incorrectly Fitted</th>
                    <th className="text-center">Other</th>
                    <th className="text-center">Repairs & Panel</th>
                    <th className="text-center">Damage Missed</th>
                    <th className="text-center">Other</th>
                    <th className="text-center">Poor Alignment</th>
                    <th className="text-center">Repair Not Acceptable</th>
                    <th className="text-center">Paint</th>
                    <th className="text-center">Blemish</th>
                    <th className="text-center">Blend</th>
                    <th className="text-center">Gloss Levels</th>
                    <th className="text-center">Paint Color Match</th>
                    <th className="text-center">Texture Finish</th>
                    <th className="text-center">Detailing</th>
                    <th className="text-center">Marks Visible</th>
                    <th className="text-center">Exterior Not Clean</th>
                    <th className="text-center">Interior Not Clean</th>
                    <th className="text-center">Other</th>
                    <th className="text-center">Welding/Bonding</th>
                    <th className="text-center">Sealer,Adhesive or Foam</th>
                    <th className="text-center">Road Test</th>
                    <th className="text-center">Under Carriage Inspection</th>
                </tr>
            </thead>
            <tbody>
                {dataRows &&
                    dataRows.length > 0 &&
                    dataRows.map((item: any) => {
                        return (
                            <tr>
                                <td className="text-center">{item.quoteNo}</td>
                                <td className="text-center">{item.claimNo}</td>
                                <td className="text-center">{item.registration}</td>
                                <td className="text-center">{item.make}</td>
                                <td className="text-center">{item.model}</td>
                                <td className="text-center">{item.user}</td>
                                <td className="text-center">
                                    {item.completionDate ? moment(item.completionDate).format('DD/MM/YYYY') : ''}
                                </td>
                                <td className="text-center">
                                    {item.auditDate ? moment(item.auditDate).format('DD/MM/YYYY') : ''}
                                </td>
                                <td className="text-center">{item.severityCategory}</td>
                                <td className="text-center">{item.removeReplace}</td>
                                <td className="text-center">{item.alignmentIssue}</td>
                                <td className="text-center">{item.damagePartsMissed}</td>
                                <td className="text-center">{item.quotedPartsNotFitted}</td>
                                <td className="text-center">{item.electricalIssue}</td>
                                <td className="text-center">{item.incorrectlyFitted}</td>
                                <td className="text-center">{item.other}</td>
                                <td className="text-center">{item.repairsPanel}</td>
                                <td className="text-center">{item.damageMissed}</td>
                                <td className="text-center">{item.other1}</td>
                                <td className="text-center">{item.poorAlignment}</td>
                                <td className="text-center">{item.repairNotAcceptable}</td>
                                <td className="text-center">{item.paint}</td>
                                <td className="text-center">{item.blemish}</td>
                                <td className="text-center">{item.blend}</td>
                                <td className="text-center">{item.glossLevels}</td>
                                <td className="text-center">{item.paintColourMatch}</td>
                                <td className="text-center">{item.textureFinish}</td>
                                <td className="text-center">{item.detailing}</td>
                                <td className="text-center">{item.marksVisible}</td>
                                <td className="text-center">{item.exteriorNotClean}</td>
                                <td className="text-center">{item.interiorNotClean}</td>
                                <td className="text-center">{item.other2}</td>
                                <td className="text-center">{item.weldingBonding}</td>
                                <td className="text-center">{item.sealerAdhesiveFoam}</td>
                                <td className="text-center">{item.roadTest}</td>
                                <td className="text-center">{item.underCarriageInspection}</td>
                            </tr>
                        );
                    })}
            </tbody>
        </table>
    );
}
