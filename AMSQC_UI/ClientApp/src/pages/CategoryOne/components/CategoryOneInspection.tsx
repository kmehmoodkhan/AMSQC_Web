import React from 'react';
import InspectionQuestion from '../../Shared/Components/InspectionQuestion';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

type Props = {
    questions: any;
    onOptionChange: any;
    quoteNo: any;
    onNext: any;
    category: number;
    showPDF: boolean;
    onShowPDF: any;
    onDocumentLoadSuccess: any;
    numPages: any;
    onDocumentLoadError: any;
    mappingSheetPath: any;
};
export default function CategoryOneInspection({
    quoteNo,
    questions,
    onOptionChange,
    onNext,
    category,
    showPDF,
    onShowPDF,
    onDocumentLoadSuccess,
    numPages,
    onDocumentLoadError,
    mappingSheetPath,
}: Props) {
    return (
        <div className="page">
            <div className="container-fluid">
                <div className="inspection-detail-flex">
                    <div className="block-section">
                        <div className={`inspection-detail category${category}`}>
                            <div className="main-title">
                                Category <span className="category-name">{category}</span> Inspection{' '}
                            </div>
                            <div className="qoute-text ">
                                Quote Number:<b> {quoteNo} </b>
                            </div>
                            <p className="info-text">
                                <a href={mappingSheetPath} target="_blank">
                                    Mapping Sheet
                                </a>
                            </p>
                            <p className="info-text">
                                Have the below stages of the repair process been carried out as per the{' '}
                                <a
                                    href="javascript:"
                                    onClick={() => {
                                        if (!showPDF) {
                                            onShowPDF(true);
                                        }
                                    }}
                                >
                                    {' '}
                                    AMA Quality Inspection Criteria?{' '}
                                </a>
                            </p>
                            <div className="card-pdf" style={{ display: showPDF ? '' : 'none' }}>
                                <div className="card-body-pdf">
                                    <Document
                                        file={'/docs/Gemini-Quality-Charter-Inspection-Criteria.pdf'}
                                        onLoadSuccess={onDocumentLoadSuccess}
                                        onLoadError={onDocumentLoadError}
                                    >
                                        {Array.from(new Array(numPages), (el, index) => (
                                            <Page key={`page_${index + 1}${el}`} pageNumber={index + 1} scale={1.8} />
                                        ))}
                                    </Document>
                                    <div className="buttons">
                                        <button
                                            type="button"
                                            data-toggle="dropdown"
                                            className="btn btn-primary btn-lg btn-wide"
                                            onClick={() => onShowPDF(false)}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="card ">
                                <div className="card-body  ">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <th>Repair Type</th>
                                                <th>Answer</th>
                                            </thead>
                                            <tbody>
                                                {questions.map((item: any) => (
                                                    <InspectionQuestion
                                                        question={item.title}
                                                        questionId={item.questionId}
                                                        answer={item.answer}
                                                        onOptionChange={onOptionChange}
                                                        key={item.questionId}
                                                        options={item.questionOptions}
                                                    />
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div className="buttons">
                                <button
                                    type="button"
                                    data-toggle="dropdown"
                                    className="btn btn-primary btn-lg btn-wide"
                                    onClick={onNext}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
