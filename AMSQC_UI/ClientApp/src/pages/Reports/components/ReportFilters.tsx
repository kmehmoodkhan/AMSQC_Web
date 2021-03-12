import { DatePicker } from 'antd';
import React from 'react';
import { DownloadOutlined, PrinterOutlined, SearchOutlined } from '@ant-design/icons';

type Props = {
    onDateFromChange: any;
    onDateToChange: any;
    quoteId: any;
    regionId: any;
    centerId: any;
    userId: any;
    ignoreDates: any;
    onRegionChange: any;
    onUserChange: any;
    onCenterChange: any;
    onQuoteChange: any;
    onIgnoreDateChange: any;
    users: any[];
    regions: any[];
    centers: any[];
    submitFilters: any;
    defaultDate: any;
};

export default function ReportFilters({
    onDateFromChange,
    onDateToChange,
    quoteId,
    regionId,
    userId,
    centerId,
    ignoreDates,
    onRegionChange,
    onUserChange,
    onCenterChange,
    onQuoteChange,
    onIgnoreDateChange,
    users,
    regions,
    centers,
    submitFilters,
    defaultDate,
}: Props) {
    return (
        <>
            <div className="filters card-form d-flex flex-column flex-sm-row">
                <div className="card-body flex">
                    <div className="row">
                        <div className=" col cola">
                            <div className="form-group">
                                <label>Quote Number</label>
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    value={quoteId}
                                    onChange={onQuoteChange}
                                />
                            </div>
                        </div>
                        <div className=" col cola">
                            <div className="form-group">
                                <label>Region </label>
                                <select
                                    className="form-control form-control-sm"
                                    onChange={onRegionChange}
                                    value={regionId}
                                >
                                    {centers &&
                                        centers.map((item: any) => {
                                            return (
                                                <option value={item.stateId} key={item.stateId}>
                                                    {item.title}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                        </div>
                        <div className=" col cola">
                            <div className="form-group">
                                <label>Centre</label>
                                <select
                                    className="form-control form-control-sm"
                                    onChange={onCenterChange}
                                    value={centerId}
                                >
                                    {regions &&
                                        regions.map((item: any) => {
                                            return (
                                                <option value={item.regionId} key={item.regionId}>
                                                    {item.title}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                        </div>
                        <div className=" col cola">
                            <div className="form-group">
                                <label>User </label>
                                <select className="form-control form-control-sm" onChange={onUserChange} value={userId}>
                                    {users &&
                                        users.map((item: any) => {
                                            return (
                                                <option value={item.userId} key={item.userId}>
                                                    {item.fullName}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                        </div>
                        <div className=" col cola">
                            <div className="form-group">
                                <label>Date From</label>
                                <DatePicker
                                    onChange={onDateFromChange}
                                    inputReadOnly={true}
                                    className={'form-control form-control-sm'}
                                    format={'MM/DD/YYYY'}
                                    defaultValue={defaultDate.clone().startOf('month')}
                                />
                            </div>
                        </div>
                        <div className=" col cola">
                            <div className="form-group">
                                <label>Date To</label>
                                <DatePicker
                                    onChange={onDateToChange}
                                    inputReadOnly={true}
                                    className={'form-control form-control-sm'}
                                    format={'MM/DD/YYYY'}
                                    defaultValue={defaultDate.clone().endOf('month')}
                                />
                            </div>
                        </div>
                        <div className=" col cola">
                            <div className="form-group">
                                <label>Ignore Dates</label>
                                <select
                                    className="form-control form-control-sm"
                                    onChange={onIgnoreDateChange}
                                    value={ignoreDates}
                                >
                                    <option value={1}>No</option>
                                    <option value={0}>Yes</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="btn-go " onClick={submitFilters}>
                    <SearchOutlined style={{ fontSize: '15px' }} />{' '}
                </button>
            </div>
            <div className="export-buttons">
                <button
                    type="button"
                    className="btn btn-secondary-outline btn-sm"
                    style={{ padding: '6px', marginRight: '6px' }}
                >
                    <DownloadOutlined style={{ fontSize: '15px' }} /> Export
                </button>
                <button type="button" className="btn btn-secondary-outline  btn-sm" style={{ padding: '6px' }}>
                    <PrinterOutlined style={{ fontSize: '15px' }} /> Print
                </button>
            </div>
        </>
    );
}
