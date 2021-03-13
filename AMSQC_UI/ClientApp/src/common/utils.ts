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

export function dynamicSort(property: any) {
    var sortOrder = 1;
    if (property[0] === '-') {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a: any, b: any) {
        /* next line works with strings and numbers,
         * and you may want to customize it to your needs
         */
        var result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
        return result * sortOrder;
    };
}

export const htmlDecode = (content: any): any => {
    let e = document.createElement('div');
    e.innerHTML = content;
    return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
};

export const getComplianceTDClassName = (compliance: number) => {
    return compliance > 95 ? 'green-td' : 'red-td';
};
