import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/images/logo.png';

type Props = {
    fullName: string;
    company: string;
    onLogOut: any;
};
export default function LoggedInHeader({ fullName, company, onLogOut }: Props) {
    return (
        <nav className="navbar fixed-top  navbar-expand-lg header shadow ">
            <div className="container-fluid">
                <Link className="navbar-brand" to={'/'}>
                    <img src={Logo} height="60" alt="Loading..." />
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#topmenu">
                    {' '}
                    &#9776;{' '}
                </button>
                <div className="collapse navbar-collapse" id="topmenu">
                    <ul className="navbar-nav ml-auto right-menu">
                        <li className="nav-item">
                            <div className="nav-link  site-user">
                                {' '}
                                Welcome <b> {fullName}</b>, your site is<b> {company} </b>{' '}
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
