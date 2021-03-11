import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/images/logo.png';

type Props = {
    fullName: string;
    onLogOut: any;
};
export default function ReportHeader({ fullName, onLogOut }: Props) {
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
                        <li className="nav-item active">
                            <Link className={'nav-link'} to={'/reports/audit-summary'}>
                                {' '}
                                Audit Summary{' '}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Compliance
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                CM Audit
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                CM Compliance
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                CSV Export
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Cost of CAR
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Jobs not Audited
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Initial Inspection{' '}
                            </a>
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
