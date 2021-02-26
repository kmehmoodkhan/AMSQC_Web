import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { DefaultAnswerIds, QuestionType } from '../../../common/enum';
import { saveCorrectiveRequestQuestions } from '../../../redux/actions/surveyAction';
import { RootState } from '../../../redux/store';
import CorrectiveRequest from '../components/CorrectiveRequest';

export default function CorrectiveRequestContainer() {
    // general hooks
    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation<any>();
    const { register, handleSubmit, errors, getValues } = useForm();

    // use selector
    const questions = useSelector((state: RootState) => state.survey.correctiveQuestions);
    const showOnlySublet = useSelector((state: RootState) => state.survey.showOnlySublet);

    // Use State
    const [questionsArray, setQuestionsArray] = useState<any[]>([]);
    const [rectified, setRectified] = useState(false);

    //events
    const onAnswerChange = (answer: any, parentId: any, questionId: any, answerText: any, questionType: any = '') => {
        if (!answer && answerText == '[Please Select]') {
            answerText = '';
        }
        if (
            answer &&
            (answerText == 'Other' || answer == DefaultAnswerIds.OtherAnswerId) &&
            questionType == QuestionType.Select
        ) {
            if (answer != DefaultAnswerIds.OtherAnswerId) {
                answerText = '';
            }
            answer = DefaultAnswerIds.OtherAnswerId;
        }
        let updatedQuestions = [...questionsArray];
        updatedQuestions = updatedQuestions.map((item: any) => {
            if (item.questionId == parentId) {
                item.subQuestions = item.subQuestions.map((item1: any) => {
                    if (item1.questionId == questionId) {
                        item1.answer = answer;
                        item1.answerText = answerText;
                    }
                    return item1;
                });
            }
            return item;
        });
        setQuestionsArray(updatedQuestions);
    };

    const submitResponses = (rectified: boolean) => {
        setRectified(rectified);
    };

    const onSubmit = () => {
        questionsArray.every((item: any) => {
            if (
                item.subQuestions.filter(
                    (item1: any) => (!item1.answer || !item1.answerText) && item1.questionType != QuestionType.Label,
                ).length > 0
            ) {
                return false;
            }
            return true;
        });
        //if (allQuestionsAttempted) {
        dispatch(saveCorrectiveRequestQuestions(questionsArray, rectified, location.state.subletCompleted));
        history.push('/submit-data');
        //}
        // } else {
        //     dispatch({
        //         type: SHOW_NOTIFICATION,
        //         error: {
        //             type: 'warning',
        //             description: 'Please attempt all questions before submitting',
        //             title: 'Survey',
        //         },
        //     });
        // }
    };

    // useEffects
    useEffect(() => {
        setQuestionsArray(questions);
    }, [questions]);

    return (
        <form name="crform" ref={register} onSubmit={handleSubmit(onSubmit)}>
            <CorrectiveRequest
                showSublet={location.state.subletCompleted}
                questions={questionsArray}
                onAnswerChange={onAnswerChange}
                submitResponses={submitResponses}
                registerFormRef={register}
                errors={errors}
                getValue={getValues}
                showOnlySublet={showOnlySublet}
            />
        </form>
    );
}
