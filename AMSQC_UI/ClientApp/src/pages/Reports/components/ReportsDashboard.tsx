import React from 'react';
import { Link } from 'react-router-dom';
import icon1a from '../../../assets/images/icon1a.svg';
import icon2a from '../../../assets/images/icon2a.svg';
import icon3a from '../../../assets/images/icon3a.svg';
import icon4a from '../../../assets/images/icon4a.svg';
import icon5a from '../../../assets/images/icon5a.svg';
import icon6a from '../../../assets/images/icon6a.svg';
import icon7a from '../../../assets/images/icon7a.svg';
import icon8a from '../../../assets/images/icon8a.svg';

export default function ReportsDashboard() {
    return (
        <div className="page ">
            <div className="container-fluid container-lg">
                <div className="row">
                    <div className="col-lg-12 offset-lg-0">
                        <div className="main-title"> Reports </div>
                        <div className="dashboard-menu3">
                            <div className="row ">
                                <div className="col-lg-3 col-md-3 col-sm-4  col-xs-6 menu-item">
                                    <Link
                                        className="item-link"
                                        style={{ backgroundColor: '#117180' }}
                                        to={'/reports/audit-summary'}
                                    >
                                        <i className="">
                                            {' '}
                                            <img src={icon1a} />{' '}
                                        </i>{' '}
                                        <span className="name"> Audit Summary</span>
                                    </Link>
                                </div>
                                <div className="col-lg-3 col-md-3 col-sm-4  col-xs-6 menu-item">
                                    <a className="item-link" href="#" style={{ backgroundColor: '#1b7f7d' }}>
                                        <i className="">
                                            {' '}
                                            <img src={icon2a} />{' '}
                                        </i>{' '}
                                        <span className="name">Compliance</span>
                                    </a>
                                </div>
                                <div className="col-lg-3 col-md-3 col-sm-4  col-xs-6 menu-item">
                                    <a className="item-link" href="#" style={{ backgroundColor: '#299479' }}>
                                        <i className="">
                                            {' '}
                                            <img src={icon3a} />{' '}
                                        </i>{' '}
                                        <span className="name">CM Audit</span>
                                    </a>
                                </div>
                                <div className="col-lg-3 col-md-3 col-sm-4  col-xs-6 menu-item">
                                    <a className="item-link" href="#" style={{ backgroundColor: '#35a576' }}>
                                        <i className="">
                                            {' '}
                                            <img src={icon4a} />{' '}
                                        </i>{' '}
                                        <span className="name">CM Compliance</span>
                                    </a>
                                </div>
                                <div className="col-lg-3 col-md-3 col-sm-4  col-xs-6 menu-item">
                                    <a className="item-link" href="#" style={{ backgroundColor: '#9eca83' }}>
                                        <i className="">
                                            {' '}
                                            <img src={icon5a} />{' '}
                                        </i>{' '}
                                        <span className="name">CSV Export</span>
                                    </a>
                                </div>
                                <div className="col-lg-3 col-md-3 col-sm-4  col-xs-6 menu-item">
                                    <a className="item-link" href="#" style={{ backgroundColor: '#0f7d63' }}>
                                        <i className="">
                                            {' '}
                                            <img src={icon6a} />{' '}
                                        </i>{' '}
                                        <span className="name">Cost of CAR</span>
                                    </a>
                                </div>
                                <div className="col-lg-3 col-md-3 col-sm-4  col-xs-6 menu-item">
                                    <a className="item-link" href="#" style={{ backgroundColor: '#49d3cc' }}>
                                        <i className="">
                                            {' '}
                                            <img src={icon7a} />{' '}
                                        </i>{' '}
                                        <span className="name">Jobs not Audited</span>
                                    </a>
                                </div>
                                <div className="col-lg-3 col-md-3 col-sm-4  col-xs-6 menu-item">
                                    <a className="item-link" href="#" style={{ backgroundColor: '#6d835c' }}>
                                        <i className="">
                                            {' '}
                                            <img src={icon8a} />{' '}
                                        </i>{' '}
                                        <span className="name">Inspection Results</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
