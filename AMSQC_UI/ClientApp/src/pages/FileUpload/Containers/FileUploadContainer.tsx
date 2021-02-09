import React, { useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RequestStatus } from '../../../common/enum';
import { clearQuoteData, SetQuoteId, UploadMappingSheet } from '../../../redux/actions/quoteAction';
import { hideLoader, showLoader } from '../../../redux/actions/sharedActions';
import { MAPPING_UPLOAD } from '../../../redux/constants/quoteConstants';
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
    // const quoteNo = useSelector((state: RootState) => state.quote.quoteNo);
    const quote = useSelector((state: RootState) => state.quote.quoteDetails);
    const user = useSelector((state: RootState) => state.user.user);
    const loading = useSelector((state: RootState) => state.shared.loading);
    const mappingSheetAlreadyUploaded = useSelector((state: RootState) => state.quote.mappingSheetUploaded);

    //use states
    const [fileUploadStep, setFileUploadStep] = useState(1);

    const [selectedNo, setSelectedNo] = useState(false);

    const [fileSelectError, setFileSelectError] = useState(false);

    // refs
    const fileRef = useRef<HTMLInputElement>(null);

    // events
    const onConfirmationAction = (goToFileUpload: boolean) => {
        if (goToFileUpload && selectedNo) {
            dispatch(clearQuoteData());
            history.push('/');
        } else if (goToFileUpload && !selectedNo) {
            setFileUploadStep(2);
        } else {
            setSelectedNo(true);
        }
    };

    const onFileUpload = () => {
        if (fileRef && fileRef.current && fileRef.current.files && fileRef.current.files.length > 0) {
            dispatch(showLoader());
            UploadMappingSheet(fileRef.current.files[0], quote, user)
                .then((response: any) => {
                    if (response.data.status == RequestStatus.Success) {
                        setFileUploadStep(3);
                        dispatch(SetQuoteId(response.data.result.quoteId, response.data.result.filePath));
                        dispatch({ type: MAPPING_UPLOAD });
                    } else {
                        openNotificationWithError(response.data.Message, 'Error');
                    }
                })
                .catch((err) => openNotificationWithError(err.message, 'Error'))
                .finally(() => dispatch(hideLoader()));
        } else {
            setFileSelectError(true);
        }
    };

    const onContinue = () => {
        history.push('/damage-type');
    };

    const onCancel = () => {
        dispatch(clearQuoteData());
        history.push('/');
    };

    //use effect
    useLayoutEffect(() => {
        if (mappingSheetAlreadyUploaded && fileUploadStep === 1) {
            history.push('/damage-type');
        }
    }, [mappingSheetAlreadyUploaded]);

    return (
        <>
            {fileUploadStep === 1 && (
                <Confirmations selectedNo={selectedNo} onConfirmationAction={onConfirmationAction} />
            )}
            {fileUploadStep === 2 && (
                <FileUpload
                    fileRef={fileRef}
                    fileSelectError={fileSelectError}
                    onFileUpload={onFileUpload}
                    loading={loading}
                    onCancel={onCancel}
                />
            )}
            {fileUploadStep === 3 && <FileUploadSuccess onContinue={onContinue} />}
        </>
    );
}
