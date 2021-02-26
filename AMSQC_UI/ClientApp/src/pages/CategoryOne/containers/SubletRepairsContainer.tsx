import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { SubletCompletionStatus } from '../../../common/enum';
import { GetCorrectiveQuestions, GetSurveyQuestions } from '../../../redux/actions/surveyAction';
import { SET_GO_NEXT } from '../../../redux/constants/sharedConstants';
import { SHOW_INSPECTION_PAGE } from '../../../redux/constants/surveyConstants';
import { RootState } from '../../../redux/store';
import SubletRepairs from '../components/SubletRepairs';

export default function SubletRepairsContainer() {
    //General hooks
    const location = useLocation<any>();

    const history = useHistory();

    const dispatch = useDispatch();

    // useSelector
    const regionId = useSelector((state: RootState) => state.user.regionId);
    const goToNext = useSelector((state: RootState) => state.shared.goToNext);
    const questions = useSelector((state: RootState) => state.survey.surveyQuestions);
    const [subletCompletion, setSubletCompletion] = useState<any>('');
    const [loading, setLoading] = useState(false);

    // events
    const setSubletCompletedStatus = (subletStatus: SubletCompletionStatus) => {
        dispatch({ type: SHOW_INSPECTION_PAGE, showInspectionPage: true });
        setSubletCompletion(subletStatus);
        setLoading(true);
        dispatch(
            GetCorrectiveQuestions(
                subletStatus == SubletCompletionStatus.No ? true : false,
                location.state.category,
                regionId,
            ),
        );
    };

    // useEffects
    useEffect(() => {
        if (goToNext && questions && questions.length > 0) {
            dispatch({ type: SET_GO_NEXT, goToNext: false });
            history.push({ pathname: '/inspection', state: { category: location.state.category } });
        }
    }, [goToNext, questions]);

    useEffect(() => {
        dispatch(GetSurveyQuestions(location.state.category, regionId));
    }, []);

    return (
        <SubletRepairs
            setSubletCompleted={setSubletCompletedStatus}
            subletCompletion={subletCompletion}
            loading={loading}
        />
    );
}
