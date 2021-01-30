import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RequestStatus } from '../../../common/enum';
import { UploadMappingSheet } from '../../../redux/actions/quoteAction';
import { hideLoader, showLoader } from '../../../redux/actions/sharedActions';
import { RootState } from '../../../redux/store';
import { openNotificationWithError } from '../../Shared/Components/notification';
import Confirmations from '../Components/Confirmations';
import FileUpload from '../Components/FileUpload';
import FileUploadSuccess from '../Components/FileUploadSuccess';

export default function FileUploadContainer() {
    //General Hooks
    const dispatch = useDispatch();
    const history = useHistory();

    //useSelector
    const quoteNo = useSelector((state: RootState) => state.quote.quoteNo);

    //use states
    const [fileUploadStep, setFileUploadStep] = useState(1);

    const [selectedNo, setSelectedNo] = useState(false);

    const [fileSelectError, setFileSelectError] = useState(false);

    // refs
    const fileRef = useRef<HTMLInputElement>(null);

    // events
    const onConfirmationAction = (goToFileUpload: boolean) => {
        if (goToFileUpload) {
            setFileUploadStep(2);
        } else {
            setSelectedNo(true);
        }
    };

    const onFileUpload = () => {
        if (fileRef && fileRef.current && fileRef.current.files && fileRef.current.files.length > 0) {
            dispatch(showLoader());
            UploadMappingSheet(fileRef.current.files[0], quoteNo)
                .then((response: any) => {
                    if (response.data.status == RequestStatus.Success) {
                        setFileUploadStep(3);
                    } else {
                        openNotificationWithError(response.data.Message, 'Error');
                    }
                })
                .catch((err) => openNotificationWithError(err, 'Error'))
                .finally(() => dispatch(hideLoader()));
        } else {
            setFileSelectError(true);
        }
    };

    const onContinue = () => {
        history.push('/damage-type');
    };

    return (
        <>
            {fileUploadStep === 1 && (
                <Confirmations selectedNo={selectedNo} onConfirmationAction={onConfirmationAction} />
            )}
            {fileUploadStep === 2 && (
                <FileUpload fileRef={fileRef} fileSelectError={fileSelectError} onFileUpload={onFileUpload} />
            )}
            {fileUploadStep === 3 && <FileUploadSuccess onContinue={onContinue} />}
        </>
    );
}
