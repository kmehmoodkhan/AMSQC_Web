import React, { useRef, useState } from 'react';
import Confirmations from '../Components/Confirmations';
import FileUpload from '../Components/FileUpload';
import FileUploadSuccess from '../Components/FileUploadSuccess';

export default function FileUploadContainer() {
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
            setFileUploadStep(3);
        } else {
            setFileSelectError(true);
        }
    };

    return (
        <>
            {fileUploadStep === 1 && (
                <Confirmations selectedNo={selectedNo} onConfirmationAction={onConfirmationAction} />
            )}
            {fileUploadStep === 2 && (
                <FileUpload fileRef={fileRef} fileSelectError={fileSelectError} onFileUpload={onFileUpload} />
            )}
            {fileUploadStep === 3 && <FileUploadSuccess />}
        </>
    );
}
