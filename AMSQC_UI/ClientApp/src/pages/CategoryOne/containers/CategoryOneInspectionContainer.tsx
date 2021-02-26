import React, { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { SubletCompletionStatus } from '../../../common/enum';
import { SET_CORRECTIVE_QUESTIONS, SET_SURVEY_QUESTIONS } from '../../../redux/constants/surveyConstants';
import { RootState } from '../../../redux/store';
import { openNotificationWithWarning } from '../../Shared/Components/notification';
import CategoryOneInspection from '../components/CategoryOneInspection';

export default function CategoryOneInspectionContainer() {
    //General hooks
    const location = useLocation<any>();

    const history = useHistory();

    const dispatch = useDispatch();

    // useState
    const [numPages, setNumPages] = useState(null);

    const [questionsArray, setQuestionsArray] = useState<any[]>([]);
    const [showPDF, setShowPDF] = useState(false);

    // useSelector
    const quoteNo = useSelector((state: RootState) => state.quote.quoteNo);
    const mappingSheetPath = useSelector((state: RootState) => state.quote.mappingSheetPath);
    const questions = useSelector((state: RootState) => state.survey.surveyQuestions);
    const originalCorrectiveQuestions = useSelector((state: RootState) => state.survey.originalCorrectiveQuestions);
    const subletCompleted = useSelector((state: RootState) => state.survey.showSublet);
    //const region = useSelector((state: RootState) => state.user.region);

    //events
    const onOptionChange = (answer: string, questionId: number, answerText: any) => {
        const updatedQuestions = questionsArray.map((item: any) => {
            if (item.questionId == questionId) {
                item.answer = answer;
                item.answerText = answerText;
            }
            return item;
        });
        setQuestionsArray(updatedQuestions);
    };

    const onNext = () => {
        if (questionsArray.filter((item: any) => !item.answer).length > 0) {
            openNotificationWithWarning('Please attempt all questions!', 'Survey');
        } else {
            if (
                (questionsArray.filter((item: any) => item.answerText.toLowerCase() == 'no').length == 0 &&
                    subletCompleted != SubletCompletionStatus.No) ||
                (questionsArray.filter((item: any) => item.answerText.toLowerCase() == 'no').length == 0 &&
                    questionsArray.filter((item: any) => item.answerText.toLowerCase() == 'not applicable').length >
                        0 &&
                    subletCompleted == SubletCompletionStatus.No)
            ) {
                dispatch({
                    type: SET_SURVEY_QUESTIONS,
                    surveyType: location.state.category,
                    surveyQuestions: questionsArray,
                    showOnlySublet: false,
                    showSublet: subletCompleted,
                });
                history.push('/submit-data');
            } else if (
                questionsArray.filter((item: any) => item.answerText.toLowerCase() == 'no').length == 0 &&
                subletCompleted == SubletCompletionStatus.No
            ) {
                dispatch({
                    type: SET_SURVEY_QUESTIONS,
                    surveyType: location.state.category,
                    surveyQuestions: questionsArray,
                    showOnlySublet: true,
                    showSublet: subletCompleted,
                });
                history.push({
                    pathname: '/corrective-request',
                    state: {
                        subletCompleted: subletCompleted,
                    },
                });
            } else {
                if (questionsArray.filter((item: any) => item.answerText.toLowerCase() != 'no').length > 0) {
                    const noAnswers = questionsArray
                        .filter((item: any) => item.answerText.toLowerCase() == 'no')
                        .map((item: any) => item.questionId.toString());

                    let correctives = [...originalCorrectiveQuestions];

                    originalCorrectiveQuestions.every((item: any, index: number) => {
                        if (index >= 3) {
                            return false;
                        } else {
                            correctives[index].subQuestions = [
                                ...item.subQuestions.filter(
                                    (item1: any) =>
                                        noAnswers.filter(
                                            (item2: any) =>
                                                item1.surveyQuestionId &&
                                                item1.surveyQuestionId.split(',').includes(item2),
                                        ).length > 0,
                                ),
                            ];
                            return true;
                        }
                    });
                    dispatch({
                        type: SET_CORRECTIVE_QUESTIONS,
                        correctiveQuestions: correctives,
                        showSublet: subletCompleted,
                    });
                }
                dispatch({
                    type: SET_SURVEY_QUESTIONS,
                    surveyType: location.state.category,
                    surveyQuestions: questionsArray,
                    showOnlySublet: false,
                    showSublet: subletCompleted,
                });
                history.push({
                    pathname: '/corrective-request',
                    state: {
                        subletCompleted: subletCompleted,
                    },
                });
            }
        }
    };

    const onDocumentLoadSuccess = ({ numPages: nextNumPages }: any) => {
        setNumPages(nextNumPages);
    };

    const onDocumentLoadError = () => {
        setShowPDF(false);
    };

    // //useEffect
    // useEffect(() => {
    //     if (!questions || questions.length == 0) dispatch(GetSurveyQuestions(location.state.category, region));
    // }, []);

    useLayoutEffect(() => {
        setQuestionsArray(questions);
    }, [questions]);

    return (
        <>
            {questionsArray && questionsArray.length > 0 && (
                <CategoryOneInspection
                    onNext={onNext}
                    onOptionChange={onOptionChange}
                    questions={questionsArray}
                    quoteNo={quoteNo}
                    category={location.state.category}
                    showPDF={showPDF}
                    onShowPDF={(val: boolean) => setShowPDF(val)}
                    onDocumentLoadSuccess={onDocumentLoadSuccess}
                    numPages={numPages}
                    onDocumentLoadError={onDocumentLoadError}
                    mappingSheetPath={mappingSheetPath}
                />
            )}
        </>
    );
}
