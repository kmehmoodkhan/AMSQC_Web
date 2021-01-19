import React from 'react';
import MainBanner from '../../../assets/images/main-bg.png';

export default function Home() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-5  col-md-12 col-sm-12 login-section">
                    <div className=" my-auto">
                        <div className="wrapper">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="email">Quote number</label>
                                    <input type="text" className="form-control" value="67883 " />
                                </div>
                                <div className="text-right">
                                    <input
                                        name="login"
                                        className="btn btn-secondary-outline   "
                                        type="button"
                                        value="Submit"
                                    />
                                </div>
                            </form>
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