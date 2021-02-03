import React, { useEffect, useState } from 'react';
import { returnCorrectiveQuestions } from '../../../common/utils';
import CorrectiveRequest from '../components/CorrectiveRequest';

export default function CorrectiveRequestContainer() {
    // Use State
    const [questions, setQuestions] = useState<any[]>([]);

    //events
    const onAnswerChange = () => {};

    //use effect
    useEffect(() => {
        setQuestions(returnCorrectiveQuestions());
    }, []);

    return <CorrectiveRequest questions={questions} onAnswerChange={onAnswerChange} />;
}
