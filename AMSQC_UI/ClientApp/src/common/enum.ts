export enum QuoteSteps {
    GetQuoteDetail = 1,
    QuoteAvailability = 2,
    SubmitQuote = 3,
}

export enum RequestStatus {
    Failure = 0,
    Success = 1,
}

export enum SubletCompletionStatus {
    Yes = 1,
    No = 2,
    NA = 3,
}

export enum QuestionType {
    Select = 3,
    Label = 2,
    Radio = 1,
    TextBox = 4,
    TextArea = 5,
}

export enum SurveyType {
    None = 0,
    SurveyType1 = 1,
    SurveyType2 = 2,
    SurveyType3 = 3,
    CorrectiveActionRequest = 4,
}

export enum DefaultAnswerIds {
    None = 0,
    TextBoxAnswerId = -1,
    TextAreaAnswerId = -2,
    OtherAnswerId = -3,
}

export enum ReportType {
    Audit = 1,
    Compliance = 2,
    CMAudit = 3,
    CMCompliance = 4,
    CSVExport = 5,
    CostOfCar = 6,
    JobsNotAudited = 7,
    InitialInspection = 8,
}
