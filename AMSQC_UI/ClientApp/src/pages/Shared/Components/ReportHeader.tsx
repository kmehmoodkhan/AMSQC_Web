import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/images/logo.png';
import { ReportType } from '../../../common/enum';

type Props = {
    fullName: string;
    onLogOut: any;
    reportId: any;
};
export default function ReportHeader({ fullName, onLogOut, reportId }: Props) {
    return (
        <nav className="navbar fixed-top  navbar-expand-lg header shadow ">
            <div className="container-fluid">
                <a className="navbar-brand" href="index.html">
                    {' '}
                    <img src={Logo} height="60" />{' '}
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#topmenu">
                    {' '}
                    &#9776;{' '}
                </button>
                <div className="collapse navbar-collapse" id="topmenu">
                    <ul className="navbar-nav mr-auto left-menu">
                        <li className={`nav-item ${reportId == ReportType.Audit ? 'active' : ''}`}>
                            <Link className={'nav-link'} to={'/reports/1'}>
                                {' '}
                                Audit Summary{' '}
                            </Link>
                        </li>
                        <li className={`nav-item ${reportId == ReportType.Compliance ? 'active' : ''}`}>
                            <Link className={'nav-link'} to={'/reports/2'}>
                                Compliance
                            </Link>
                        </li>
                        <li className={`nav-item ${reportId == ReportType.CMAudit ? 'active' : ''}`}>
                            <Link className={'nav-link'} to={'/reports/4'}>
                                CM Audit
                            </Link>
                        </li>
                        <li className={`nav-item ${reportId == ReportType.CMCompliance ? 'active' : ''}`}>
                            <Link className={'nav-link'} to={'/reports/3'}>
                                CM Compliance
                            </Link>
                        </li>
                        <li className={`nav-item ${reportId == ReportType.CSVExport ? 'active' : ''}`}>
                            <Link className={'nav-link'} to={'/reports/8'}>
                                CSV Export
                            </Link>
                        </li>
                        <li className={`nav-item ${reportId == ReportType.CostOfCar ? 'active' : ''}`}>
                            <Link className={'nav-link'} to={'/reports/5'}>
                                Cost of CAR
                            </Link>
                        </li>
                        <li className={`nav-item ${reportId == ReportType.JobsNotAudited ? 'active' : ''}`}>
                            <Link className={'nav-link'} to={'/reports/6'}>
                                Jobs not Audited
                            </Link>
                        </li>
                        <li className={`nav-item ${reportId == ReportType.InitialInspection ? 'active' : ''}`}>
                            <Link className={'nav-link'} to={'/reports/7'}>
                                Initial Inspection{' '}
                            </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto right-menu">
                        <li className="nav-item">
                            <div className="nav-link  site-user">
                                {' '}
                                Welcome <b> {fullName}</b>{' '}
                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link btn btn-info btn-login" onClick={onLogOut}>
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
