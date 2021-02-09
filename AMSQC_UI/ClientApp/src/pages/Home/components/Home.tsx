import { Button } from 'antd';
import React from 'react';
import MainBanner from '../../../assets/images/main-bg.png';
import QuoteDetails from './CarDetails';
import Logo from '../../../assets/images/logo-login.png';

type Props = {
    onQuoteChange: any;
    quoteId: any;
    onSubmit: any;
    alreadySubmitted: boolean;
    quoteDetails: any;
    loading: boolean;
    onBlur: any;
};
export default function Home({
    onQuoteChange,
    quoteId,
    onSubmit,
    alreadySubmitted,
    quoteDetails,
    loading,
    onBlur,
}: Props) {
    return (
        <>
            <div className="container-fluid ">
                <div className="row login-page">
                    <div className="col-lg-7  col-md-12 col-sm-12  px-0  login-bg">
                        <div className="login-image-section">
                            <img src={MainBanner} alt="login image" className="login-img" />
                            <div className="wrapper">
                                <div className="content">
                                    <h2>
                                        Welcome to <img src={Logo} className="logo" />
                                    </h2>
                                    <h3> Quality Charter Program</h3>
                                    <p>Please provide your Active directory user name and password to get access.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5  col-md-12 col-sm-12 login-section">
                        <div className=" my-auto">
                            <div className="wrapper">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="email">Quote number</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={quoteId}
                                            onBlur={onBlur}
                                            onChange={(e) => onQuoteChange(e.target.value)}
                                        />
                                    </div>
                                    {alreadySubmitted && (
                                        <div className="alert alert-danger">
                                            <strong>Sorry!</strong> A quote has beed already submitted for this Quote
                                            Number
                                        </div>
                                    )}
                                    {quoteDetails && <QuoteDetails car={quoteDetails} />}
                                    <div className="text-right">
                                        {' '}
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
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
