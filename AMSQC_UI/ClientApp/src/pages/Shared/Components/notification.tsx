import { notification } from 'antd';

export const openNotificationWithSuccess = (description: any, title: any) => {
    notification['success']({
        message: title,
        description: description,
        style: {
            top: '75px',
        },
    });
};

export const openNotificationWithError = (
    description: any = 'Some error occurred while processing your request',
    title: any = 'error',
) => {
    notification['error']({
        message: title,
        description: description,
        style: {
            top: '75px',
        },
    });
};

export const openNotificationWithWarning = (
    description: any = 'Some error occurred while processing your request',
    title: any = 'error',
) => {
    notification['warning']({
        message: title,
        description: description,
        style: {
            top: '75px',
        },
    });
};

export const openNotificationWithInfo = (description: any, title: any) => {
    notification['info']({
        message: title,
        description: description,
        style: {
            top: '75px',
        },
    });
};
