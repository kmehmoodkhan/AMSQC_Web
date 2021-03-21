import { ReportType } from './enum';
import * as Excel from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';

const blobType: string = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

export const exportReport = async (reportId: ReportType, dataRows: any, states: any[]) => {
    if (
        (Number(reportId) == ReportType.Audit || Number(reportId) == ReportType.CMAudit) &&
        dataRows &&
        dataRows.length > 0
    ) {
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet(
            Number(reportId) == ReportType.Audit ? 'Audit Summary' : 'CM Audit Summary',
        );

        worksheet.columns = [
            { header: 'Quote Number', key: 'quoteNo', width: 25 },
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
        worksheet.getRow(1).values = [Number(reportId) == ReportType.Audit ? 'Audit Summary' : 'CM Audit Summary'];
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
            FileSaver.saveAs(
                blob,
                (Number(reportId) == ReportType.Audit ? 'Audit-Report-' : 'CM-Audit-Report-') +
                    moment().format('YYYY-MM-DD-hhmmss') +
                    '.xlsx',
            );
        });
    } else if (
        (Number(reportId) == ReportType.Compliance || Number(reportId) == ReportType.InitialInspection) &&
        dataRows &&
        dataRows.summaryRow
    ) {
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet(
            Number(reportId) == ReportType.Compliance ? 'Compliance Summary' : 'Initial Inspection Results',
        );
        let headersIndexes = [{ index: 1, isState: false }];
        let headerTitles = [
            Number(reportId) == ReportType.Compliance ? 'Compliance Summary' : 'Initial Inspection Results',
        ];
        let nextHeaderIndex = 3;
        worksheet.columns = [
            { header: '', key: 'title', width: 30 },
            {
                header: Number(reportId) == ReportType.Compliance ? 'Jobs Completed' : 'Jobs Audited',
                key: Number(reportId) == ReportType.Compliance ? 'jobsCompleted' : 'jobsAudited',
                width: 20,
            },
            {
                header: Number(reportId) == ReportType.Compliance ? 'Jobs Audited' : 'Jobs With CARs',
                key: Number(reportId) == ReportType.Compliance ? 'jobsAudited' : 'jobsWithCARs',
                width: 20,
            },
            {
                header: Number(reportId) == ReportType.Compliance ? 'Compliance' : 'Performance',
                key: Number(reportId) == ReportType.Compliance ? 'compliance' : 'performance',
                width: 25,
            },
        ];
        dataRows.summaryRow.forEach((item: any) => {
            let row;
            if (Number(reportId) == ReportType.Compliance) {
                row = {
                    title: item.title,
                    jobsCompleted: item.jobsCompleted,
                    jobsAudited: item.jobsAudited,
                    compliance: item.compliance,
                };
            } else {
                row = {
                    title: item.title,
                    jobsAudited: item.jobsAudited,
                    jobsWithCARs: item.jobsWithCARs,
                    performance: item.performance,
                };
            }
            nextHeaderIndex++;
            worksheet.addRow(row);
        });

        headersIndexes.push({ index: nextHeaderIndex, isState: false });
        headerTitles.push('');

        if (dataRows.stateSummary && dataRows.stateSummary.length > 0) {
            dataRows.stateSummary.map((item: any) => {
                let row;
                if (Number(reportId) == ReportType.Compliance) {
                    row = {
                        title: item.title,
                        jobsCompleted: item.jobsCompleted,
                        jobsAudited: item.jobsAudited,
                        compliance: item.compliance,
                    };
                } else {
                    row = {
                        title: item.title,
                        jobsAudited: item.jobsAudited,
                        jobsWithCARs: item.jobsWithCARs,
                        performance: item.performance,
                    };
                }
                nextHeaderIndex++;
                worksheet.addRow(row);
            });
        } else {
            nextHeaderIndex++;
        }

        if (dataRows.stateData && dataRows.stateData.length > 0) {
            dataRows.stateData.map((item: any) => {
                if (item.childList && item.childList.length > 0) {
                    headersIndexes.push({ index: nextHeaderIndex + headersIndexes.length - 1, isState: true });
                    headerTitles.push(item.title);

                    item.childList.map((child: any) => {
                        let row;
                        if (Number(reportId) == ReportType.Compliance) {
                            row = {
                                title: child.title,
                                jobsCompleted: child.jobsCompleted,
                                jobsAudited: child.jobsAudited,
                                compliance: child.compliance,
                            };
                        } else {
                            row = {
                                title: child.title,
                                jobsAudited: child.jobsAudited,
                                jobsWithCARs: child.jobsWithCARs,
                                performance: child.performance,
                            };
                        }

                        nextHeaderIndex++;
                        worksheet.addRow(row);
                    });
                }
            });
        }

        headersIndexes.forEach((element: any, index: number) => {
            worksheet.insertRow(element.index, '');
            if (element.isState) {
                worksheet.mergeCells('A' + element.index, 'D' + element.index);
                worksheet.getCell('A' + element.index).value = headerTitles[index];
                // worksheet.getCell('A' + element.index).alignment = {
                //     vertical: 'middle',
                //     horizontal: 'center',
                // };
                // worksheet.getCell('A' + element.index).font = {
                //     bold: true,
                //     size: 13,
                // };
                // worksheet.getRow(element.index).height = 20;
            } else {
                worksheet.getRow(element.index).values = [headerTitles[index]];
            }
        });

        worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
            row.eachCell(function (cell, cellNumber) {
                cell.font = {
                    name: 'Arial',
                    family: 2,
                    bold: false,
                    size: 10,
                };
                const rowHeader = headersIndexes.filter((item: any) => item.index == rowNumber);

                if (rowHeader.length > 0 && rowHeader[0].isState) {
                    cell.alignment = {
                        vertical: 'middle',
                        horizontal: 'center',
                    };
                } else {
                    cell.alignment = {
                        vertical: 'middle',
                        horizontal: 'left',
                    };
                }

                if (rowNumber <= 2 || rowHeader.length > 0) {
                    row.height = 20;
                    cell.font = {
                        bold: true,
                        size: 13,
                    };
                } else {
                    if (cellNumber == 4) {
                        const value: any = cell.value;
                        if (value < 95 && Number(reportId) == ReportType.Compliance) {
                            cell.fill = {
                                type: 'pattern',
                                pattern: 'solid',
                                fgColor: {
                                    argb: 'FF0000',
                                },
                            };
                        } else if (Number(reportId) == ReportType.Compliance) {
                            cell.fill = {
                                type: 'pattern',
                                pattern: 'solid',
                                fgColor: {
                                    argb: '00FF00',
                                },
                            };
                        }
                    }
                }
            });
        });
        workbook.xlsx.writeBuffer().then((data) => {
            const blob = new Blob([data], { type: blobType });
            FileSaver.saveAs(
                blob,
                Number(reportId) == ReportType.Compliance
                    ? 'Compliance-Report-'
                    : 'Initial-Inspection-Result-' + moment().format('YYYY-MM-DD-hhmmss') + '.xlsx',
            );
        });
    } else if (Number(reportId) == ReportType.CMCompliance && dataRows && dataRows.length > 0) {
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet('CM Compliance Summary');

        worksheet.columns = [
            { header: 'Center', key: 'center', width: 20 },
            { header: 'CM Audit', key: 'cmAuditCount', width: 20 },
            { header: 'Site Audit', key: 'siteAuditCount', width: 20 },
        ];
        dataRows.forEach((item: any) => {
            let row = {
                center: item.center,
                cmAuditCount: item.cmAuditCount,
                siteAuditCount: item.siteAuditCount,
            };
            worksheet.addRow(row);
        });
        worksheet.duplicateRow(1, 1, true);
        worksheet.getRow(1).values = ['CM Compliance Summary'];
        worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
            row.eachCell(function (cell, cellNumber) {
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
                if (rowNumber > 2 && cellNumber == 1 && dataRows[rowNumber - 1].isState) {
                    row.height = 20;
                    cell.font = {
                        bold: true,
                        size: 13,
                    };
                }
                const value: any = cell.value;
                if (rowNumber > 2 && cellNumber == 2 && value <= 0) {
                    cell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: {
                            argb: 'FF0000',
                        },
                    };
                } else if (rowNumber > 2 && cellNumber == 2 && value > 0) {
                    cell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: {
                            argb: '00FF00',
                        },
                    };
                }
            });
        });
        workbook.xlsx.writeBuffer().then((data) => {
            const blob = new Blob([data], { type: blobType });
            FileSaver.saveAs(blob, 'CM-Compliance-Report-' + moment().format('YYYY-MM-DD-hhmmss') + '.xlsx');
        });
    } else if (Number(reportId) == ReportType.JobsNotAudited && dataRows && dataRows.length > 0) {
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet('Jobs Not Audited Summary');

        worksheet.columns = [
            { header: 'Quote Number', key: 'quoteNo', width: 30 },
            { header: 'Make', key: 'make', width: 20 },
            { header: 'Vehicle', key: 'vehicle', width: 20 },
            { header: 'Color', key: 'color', width: 20 },
            { header: 'Registration', key: 'registration', width: 20 },
            { header: 'Job Complete', key: 'completionDate', width: 20 },
        ];
        dataRows.forEach((item: any) => {
            let row = {
                quoteNo: item.quoteNo,
                make: item.make,
                vehicle: item.vehicle,
                color: item.color,
                registration: item.registration,
                completionDate: moment(item.completionDate).format('DD/MM/YYYY'),
            };
            worksheet.addRow(row);
        });
        worksheet.duplicateRow(1, 1, true);
        worksheet.getRow(1).values = ['Job Not Audited Summary'];
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
            FileSaver.saveAs(blob, 'Jobs-Not-Audited-Report-' + moment().format('YYYY-MM-DD-hhmmss') + '.xlsx');
        });
    } else if (
        Number(reportId) == ReportType.CostOfCar &&
        dataRows &&
        dataRows.length > 0 &&
        states &&
        states.length > 0
    ) {
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet('Cost of CAR');
        let headersIndexes = [{ index: 1, isTitle: true, isTotal: false, isHeader: false }];
        let headerTitles = ['Cost of CAR'];
        let nextHeaderIndex = 3;
        worksheet.columns = [
            { header: 'Quote', key: 'quoteNo', width: 40 },
            { header: 'Responsible', key: 'userResponsible', width: 30 },
            { header: 'Date', key: 'completionDate', width: 30 },
            { header: 'Site', key: 'site', width: 30 },
            { header: 'Cost', key: 'cost', width: 30 },
        ];

        states.forEach((item: any, index: any) => {
            const stateData = dataRows.filter((x: any) => x.stateId == item.stateId);

            headersIndexes.push({
                index: nextHeaderIndex,
                isTitle: true,
                isTotal: false,
                isHeader: false,
            });
            headerTitles.push(item.title);
            nextHeaderIndex++;
            if (stateData.length > 0 && stateData[0].quotesList && stateData[0].quotesList.length > 0) {
                headersIndexes.push({ index: nextHeaderIndex, isTitle: false, isTotal: false, isHeader: true });
                headerTitles.push('');
                nextHeaderIndex++;
                let totalCost = 0;
                stateData[0].quotesList.forEach((x: any) => {
                    let row = {
                        quoteNo: x.quoteNo,
                        userResponsible: x.userResponsible,
                        completionDate: moment(x.completionDate).format('DD/MM/YYYY'),
                        site: x.site,
                        cost: '$' + x.cost,
                    };
                    totalCost += x.cost;
                    nextHeaderIndex++;
                    worksheet.addRow(row);
                });
                headersIndexes.push({ index: nextHeaderIndex, isTitle: false, isTotal: true, isHeader: false });
                headerTitles.push('$' + totalCost);
                nextHeaderIndex++;
            } else {
                headersIndexes.push({ index: nextHeaderIndex, isTitle: false, isTotal: false, isHeader: false });
                headerTitles.push('No Corrective Action Requests to display.');
                nextHeaderIndex++;
            }
        });

        headersIndexes.forEach((element: any, index: number) => {
            worksheet.insertRow(element.index, '');
            if (element.isTotal) {
                worksheet.mergeCells('A' + element.index, 'D' + element.index);
                worksheet.getCell('A' + element.index).value = 'Total';
                worksheet.getCell('E' + element.index).value = headerTitles[index];
            } else if (element.isHeader) {
                worksheet.getCell('A' + element.index).value = 'Quote';
                worksheet.getCell('B' + element.index).value = 'Responsible';
                worksheet.getCell('C' + element.index).value = 'Date';
                worksheet.getCell('D' + element.index).value = 'Site';
                worksheet.getCell('E' + element.index).value = 'Cost';
            } else if (!element.isTitle && !element.isTotal && !element.isHeader) {
                worksheet.mergeCells('A' + element.index, 'E' + element.index);
                worksheet.getCell('A' + element.index).value = headerTitles[index];
            } else {
                worksheet.getRow(element.index).values = [headerTitles[index]];
            }
        });

        worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
            row.eachCell(function (cell) {
                cell.font = {
                    name: 'Arial',
                    family: 2,
                    bold: false,
                    size: 10,
                };
                const rowHeader = headersIndexes.filter((item: any) => item.index == rowNumber);

                cell.alignment = {
                    vertical: 'middle',
                    horizontal: 'left',
                };

                if (
                    rowNumber <= 2 ||
                    (rowHeader.length > 0 && (rowHeader[0].isHeader || rowHeader[0].isTitle || rowHeader[0].isTotal))
                ) {
                    row.height = 20;
                    cell.font = {
                        bold: true,
                        size: 13,
                    };
                }
            });
        });

        worksheet.spliceRows(2, 1, ['', '', '', '', '']);
        workbook.xlsx.writeBuffer().then((data) => {
            const blob = new Blob([data], { type: blobType });
            FileSaver.saveAs(blob, 'Cost-of-CAR-Report-' + moment().format('YYYY-MM-DD-hhmmss') + '.xlsx');
        });
    } else if (Number(reportId) == ReportType.CSVExport && dataRows && dataRows.length > 0) {
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet('CSV Export');

        worksheet.columns = [
            { header: 'Quote Number', key: 'quoteNo', width: 20 },
            { header: 'Claim Number', key: 'claimNo', width: 20 },
            { header: 'Rego Number', key: 'registration', width: 20 },
            { header: 'Vehicle Make', key: 'make', width: 20 },
            { header: 'Vehicle Model', key: 'model', width: 20 },
            { header: 'User', key: 'user', width: 20 },
            { header: 'Date Completed', key: 'completionDate', width: 20 },
            { header: 'Date Audited', key: 'auditDate', width: 20 },
            { header: 'Category Of Severity', key: 'severityCategory', width: 20 },
            { header: 'Remove & Replace', key: 'removeReplace', width: 20 },
            { header: 'Alignment Issue', key: 'alignmentIssue', width: 20 },
            { header: 'Damage Parts Missed', key: 'damagePartsMissed', width: 20 },
            { header: 'Quoted Parts Not Fitted', key: 'quotedPartsNotFitted', width: 20 },
            { header: 'Electrical Issue', key: 'electricalIssue', width: 20 },
            { header: 'Incorrectly Fitted', key: 'incorrectlyFitted', width: 20 },
            { header: 'Other', key: 'other', width: 20 },
            { header: 'Repairs & Panel', key: 'repairsPanel', width: 20 },
            { header: 'Damage Missed', key: 'damageMissed', width: 20 },
            { header: 'Other', key: 'other1', width: 20 },
            { header: 'Poor Alignment', key: 'poorAlignment', width: 20 },
            { header: 'Repair Not Acceptable', key: 'repairNotAcceptable', width: 20 },
            { header: 'Paint', key: 'paint', width: 20 },
            { header: 'Blemish', key: 'blemish', width: 20 },
            { header: 'Blend', key: 'blend', width: 20 },
            { header: 'Gloss Levels', key: 'glossLevels', width: 20 },
            { header: 'Paint Color Match', key: 'paintColourMatch', width: 20 },
            { header: 'Texture Finish', key: 'textureFinish', width: 20 },
            { header: 'Detailing', key: 'detailing', width: 20 },
            { header: 'Marks Visible', key: 'marksVisible', width: 20 },
            { header: 'Exterior Not Clean', key: 'exteriorNotClean', width: 20 },
            { header: 'Interior Not Clean', key: 'interiorNotClean', width: 20 },
            { header: 'Other', key: 'other2', width: 20 },
            { header: 'Welding/Bonding', key: 'weldingBonding', width: 20 },
            { header: 'Sealer,Adhesive or Foam', key: 'sealerAdhesiveFoam', width: 20 },
            { header: 'Road Test', key: 'roadTest', width: 20 },
            { header: 'Under Carriage Inspection', key: 'underCarriageInspection', width: 20 },
        ];
        dataRows.forEach((item: any) => {
            let row = {
                quoteNo: item.quoteNo,
                claimNo: item.claimNo,
                registration: item.registration,
                make: item.make,
                model: item.model,
                user: item.user,
                completionDate: item.completionDate ? moment(item.completionDate).format('DD/MM/YYYY') : '',
                auditDate: item.auditDate ? moment(item.auditDate).format('DD/MM/YYYY') : '',
                severityCategory: item.severityCategory,
                removeReplace: item.removeReplace,
                alignmentIssue: item.alignmentIssue,
                damagePartsMissed: item.damagePartsMissed,
                quotedPartsNotFitted: item.quotedPartsNotFitted,
                electricalIssue: item.electricalIssue,
                incorrectlyFitted: item.incorrectlyFitted,
                other: item.other,
                repairsPanel: item.repairsPanel,
                damageMissed: item.damageMissed,
                other1: item.other1,
                poorAlignment: item.poorAlignment,
                repairNotAcceptable: item.repairNotAcceptable,
                paint: item.paint,
                blemish: item.blemish,
                blend: item.blend,
                glossLevels: item.glossLevels,
                paintColorMatch: item.paintColourMatch,
                textureFinish: item.textureFinish,
                detailing: item.detailing,
                marksVisible: item.marksVisible,
                exteriorNotClean: item.exteriorNotClean,
                interiorNotClean: item.interiorNotClean,
                other2: item.other2,
                weldingBonding: item.weldingBonding,
                sealerAdhesiveFoam: item.sealerAdhesiveFoam,
                roadTest: item.roadTest,
                underCarriageInspection: item.underCarriageInspection,
            };
            worksheet.addRow(row);
        });
        worksheet.duplicateRow(1, 1, true);
        worksheet.getRow(1).values = ['CSV Export'];
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
            FileSaver.saveAs(blob, 'CSV-Export-Report-' + moment().format('YYYY-MM-DD-hhmmss') + '.xlsx');
        });
    }
};
