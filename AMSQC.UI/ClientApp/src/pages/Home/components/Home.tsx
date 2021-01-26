import { Button } from 'antd';
import React from 'react';
import MainBanner from '../../../assets/images/main-bg.png';
import CarDetails from './CarDetails';

type Props = {
    onQuoteChange: any;
    quoteId: any;
    onSubmit: any;
    alreadySubmitted: boolean;
    carDetails: any;
    loading: boolean;
};
export default function Home({ onQuoteChange, quoteId, onSubmit, alreadySubmitted, carDetails, loading }: Props) {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-5  col-md-12 col-sm-12 login-section">
                    <div className=" my-auto">
                        <div className="wrapper">
                            <div className="form-group">
                                <label htmlFor="email">Quote number</label>
                                <input
                                    type="text"
                                    id="email"
                                    className="form-control"
                                    value={quoteId}
                                    onChange={(e) => onQuoteChange(e.target.value)}
                                />
                            </div>
                            {alreadySubmitted && (
                                <div className="alert alert-danger">
                                    <strong>Sorry!</strong> A quote has beed already submitted for this Quote Number
                                </div>
                            )}
                            {carDetails && <CarDetails car={carDetails} />}
                            <div className="text-right">
                                <Button
                                    name="login"
                                    className="btn btn-secondary-outline"
                                    value="Submit"
                                    onClick={() => onSubmit()}
                                    loading={loading}
                                    shape="round"
                                    size="large"
                                >
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-7  col-md-12 col-sm-12  px-0 d-none d-lg-block login-bg">
                    <div className="login-image-section">
                        <img src={MainBanner} alt="login image" className="login-img" />
                        <div className="wrapper">
                            <div className="content">
                                <h2>
                                    Welcome to <b> Quality Charter Program</b>
                                </h2>
                                <p>Please provide your Active directory user name and password to get access.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
