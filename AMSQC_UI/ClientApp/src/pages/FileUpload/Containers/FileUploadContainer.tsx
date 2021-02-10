import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
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

    const [fileName, setFileName] = useState('');

    const [extensions, setExtensions] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

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
            setErrorMessage('Error! Please select a photo to upload');
        }
    };

    const onContinue = () => {
        history.push('/damage-type');
    };

    const onCancel = () => {
        dispatch(clearQuoteData());
        history.push('/');
    };

    const onFileChange = (event: any) => {
        if (!event || !event.target || !event.target.files || event.target.files.length === 0) {
            return;
        }

        const name = event.target.files[0].name;
        const lastDot = name.lastIndexOf('.');

        const ext = name.substring(lastDot + 1);
        if (!ext.match(/(jpg|jpeg|png|gif|bmp)$/i)) {
            openNotificationWithError('Please select image file', 'File Upload');
            setFileName('');
            event.target.value = null;
            setErrorMessage('Please select image file');
            setFileSelectError(true);
        } else {
            setFileName(name);
            setFileSelectError(false);
            setErrorMessage('');
        }
    };

    //use effect
    useLayoutEffect(() => {
        if (mappingSheetAlreadyUploaded && fileUploadStep === 1) {
            history.push('/damage-type');
        }
    }, [mappingSheetAlreadyUploaded]);

    useEffect(() => {
        setExtensions('.png,.jpeg,.jpg,.bmp,.gif');
    });

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
                    fileName={fileName}
                    onFileChange={onFileChange}
                    extensions={extensions}
                    message={errorMessage}
                />
            )}
            {fileUploadStep === 3 && <FileUploadSuccess onContinue={onContinue} />}
        </>
    );
}
