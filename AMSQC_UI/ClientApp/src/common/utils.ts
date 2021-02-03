import { QuestionType } from './enum';

export const returnCorrectiveQuestions = () => {
    return [
        {
            questionId: 1,
            title: 'What went wrong?',
            subQuestions: [
                {
                    questionId: 2,
                    title: 'Remove and Replace defect',
                    parentId: 1,
                    answer: '',
                    questionType: QuestionType.Select,
                    options: [{ questionOptionId: 1, title: 'OPTION 1' }],
                },
                {
                    questionId: 3,
                    title: 'Repair and Panel Alignment defect',
                    parentId: 1,
                    answer: '',
                    questionType: QuestionType.Select,
                    options: [{ questionOptionId: 1, title: 'OPTION 1' }],
                },
                {
                    questionId: 4,
                    title: 'Paint defect',
                    parentId: 1,
                    answer: '',
                    questionType: QuestionType.Select,
                    options: [{ questionOptionId: 1, title: 'OPTION 1' }],
                },
                {
                    questionId: 5,
                    title: 'Detailing defect',
                    parentId: 1,
                    answer: '',
                    questionType: QuestionType.Select,
                    options: [{ questionOptionId: 1, title: 'OPTION 1' }],
                },
            ],
        },
        {
            questionId: 6,
            title: 'What was done to fix the problem?',
            subQuestions: [
                {
                    questionId: 7,
                    title: 'Remove and Replace',
                    parentId: 6,
                    answer: '',
                    questionType: QuestionType.Select,
                    options: [{ questionOptionId: 1, title: 'OPTION 1' }],
                },
                {
                    questionId: 8,
                    title: 'Repair and Panel Alignment',
                    parentId: 6,
                    answer: '',
                    questionType: QuestionType.Select,
                    options: [{ questionOptionId: 1, title: 'OPTION 1' }],
                },
                {
                    questionId: 9,
                    title: 'Paint defect',
                    parentId: 6,
                    answer: '',
                    questionType: QuestionType.Select,
                    options: [{ questionOptionId: 1, title: 'OPTION 1' }],
                },
                {
                    questionId: 10,
                    title: 'Detailing defect',
                    parentId: 6,
                    answer: '',
                    questionType: QuestionType.Select,
                    options: [{ questionOptionId: 1, title: 'OPTION 1' }],
                },
            ],
        },
        {
            questionId: 11,
            title: 'What was done to stop the problem from occurring?',
            subQuestions: [
                {
                    questionId: 2,
                    title: 'Remove and Replace defect',
                    parentId: 1,
                    answer: '',
                    questionType: QuestionType.Select,
                    options: [{ questionOptionId: 1, title: 'OPTION 1' }],
                },
                {
                    questionId: 3,
                    title: 'Repair and Panel Alignment defect',
                    parentId: 1,
                    answer: '',
                    questionType: QuestionType.Select,
                    options: [{ questionOptionId: 1, title: 'OPTION 1' }],
                },
                {
                    questionId: 4,
                    title: 'Paint defect',
                    parentId: 1,
                    answer: '',
                    questionType: QuestionType.Select,
                    options: [{ questionOptionId: 1, title: 'OPTION 1' }],
                },
                {
                    questionId: 5,
                    title: 'Detailing defect',
                    parentId: 1,
                    answer: '',
                    questionType: QuestionType.Select,
                    options: [{ questionOptionId: 1, title: 'OPTION 1' }],
                },
            ],
        },
        {
            questionId: 12,
            title: 'Who was responsible for the problem?',
            subQuestions: [
                {
                    questionId: 2,
                    title: 'Responsible',
                    parentId: 1,
                    answer: '',
                    questionType: QuestionType.Select,
                    options: [{ questionOptionId: 1, title: 'OPTION 1' }],
                },
            ],
        },
        {
            questionId: 1,
            title: 'What was the cost of rectifying the problem?',
            subQuestions: [
                {
                    questionId: 2,
                    title: 'Cost$',
                    parentId: 1,
                    answer: '',
                    questionType: QuestionType.TextBox,
                },
            ],
        },
        {
            questionId: 1,
            title: 'Was the problem a potential safety issue?',
            subQuestions: [
                {
                    questionId: 2,
                    title: null,
                    parentId: 1,
                    answer: '',
                    questionType: QuestionType.Radio,
                    options: [
                        { questionOptionId: 1, title: 'YES' },
                        { questionOptionId: 2, title: 'NO' },
                    ],
                },
                {
                    questionId: 3,
                    title: null,
                    parentId: 1,
                    answer: '',
                    questionType: QuestionType.TextBox,
                },
            ],
        },
    ];
};
