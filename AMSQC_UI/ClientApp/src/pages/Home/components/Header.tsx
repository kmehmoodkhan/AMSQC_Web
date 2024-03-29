import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/images/logo.png';

export default function Header({ onReportLogin }: any) {
    return (
        <nav className="navbar fixed-top  navbar-expand-lg login-header header  ">
            <div className="container-fluid">
                <Link className="navbar-brand" to={'/'}>
                    <img src={Logo} height="60" />
                </Link>
                <div>
                    <ul className="navbar-nav ml-auto ">
                        <li className="nav-item">
                            <a className="nav-link btn btn-secondary btn-reporting" onClick={onReportLogin}>
                                Reporting Login
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
