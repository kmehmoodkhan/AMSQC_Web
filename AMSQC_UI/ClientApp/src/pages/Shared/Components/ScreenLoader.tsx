import { Progress } from 'antd';
import React from 'react';
import Logo from '../../../assets/images/logo-login.png';

export default () => {
    return (
        <div style={{ marginTop: '150px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="mt-5">
                    <img src={Logo} alt="..." style={{ width: '250px' }} />
                </div>
                <div className="mt-3">
                    <Progress
                        strokeColor={{
                            '0%': '#108ee9',
                            '100%': '#87d068',
                        }}
                        percent={99.9}
                    />
                </div>
            </div>
        </div>
    );
};
