import { Button } from 'antd';
import React from 'react';
import MainBanner from '../../../assets/images/main-bg.png';
import QuoteDetails from './CarDetails';

type Props = {
    onQuoteChange: any;
    quoteId: any;
    onSubmit: any;
    quoteDetails: any;
    loading: boolean;
    onBlur: any;
    hasError: any;
    errorMessage: String;
    quoteRef: any;
};
export default function Home({
    onQuoteChange,
    quoteId,
    onSubmit,
    quoteDetails,
    loading,
    onBlur,
    hasError,
    errorMessage,
    quoteRef,
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
                                        Welcome to
                                    </h2>
                                    <h3> Quality Charter</h3>
                                    <p>Please provide your Active directory user name and password to get access.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5  col-md-12 col-sm-12 login-section">
                        <div className=" my-auto">
                            <div className="wrapper">
                                <div className="form-group">
                                    <label htmlFor="email">Quote number</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={quoteId}
                                        onBlur={onBlur}
                                        onChange={(e) => onQuoteChange(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                onSubmit();
                                            }
                                        }}
                                        ref={quoteRef}
                                    />
                                </div>
                                {hasError && <div className="alert alert-danger">{errorMessage}</div>}
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
