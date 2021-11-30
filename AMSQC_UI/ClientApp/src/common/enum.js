"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportType = exports.DefaultAnswerIds = exports.SurveyType = exports.QuestionType = exports.SubletCompletionStatus = exports.RequestStatus = exports.QuoteSteps = void 0;
var QuoteSteps;
(function (QuoteSteps) {
    QuoteSteps[QuoteSteps["GetQuoteDetail"] = 1] = "GetQuoteDetail";
    QuoteSteps[QuoteSteps["QuoteAvailability"] = 2] = "QuoteAvailability";
    QuoteSteps[QuoteSteps["SubmitQuote"] = 3] = "SubmitQuote";
})(QuoteSteps = exports.QuoteSteps || (exports.QuoteSteps = {}));
var RequestStatus;
(function (RequestStatus) {
    RequestStatus[RequestStatus["Failure"] = 0] = "Failure";
    RequestStatus[RequestStatus["Success"] = 1] = "Success";
})(RequestStatus = exports.RequestStatus || (exports.RequestStatus = {}));
var SubletCompletionStatus;
(function (SubletCompletionStatus) {
    SubletCompletionStatus[SubletCompletionStatus["Yes"] = 1] = "Yes";
    SubletCompletionStatus[SubletCompletionStatus["No"] = 2] = "No";
    SubletCompletionStatus[SubletCompletionStatus["NA"] = 3] = "NA";
})(SubletCompletionStatus = exports.SubletCompletionStatus || (exports.SubletCompletionStatus = {}));
var QuestionType;
(function (QuestionType) {
    QuestionType[QuestionType["Select"] = 3] = "Select";
    QuestionType[QuestionType["Label"] = 2] = "Label";
    QuestionType[QuestionType["Radio"] = 1] = "Radio";
    QuestionType[QuestionType["TextBox"] = 4] = "TextBox";
    QuestionType[QuestionType["TextArea"] = 5] = "TextArea";
})(QuestionType = exports.QuestionType || (exports.QuestionType = {}));
var SurveyType;
(function (SurveyType) {
    SurveyType[SurveyType["None"] = 0] = "None";
    SurveyType[SurveyType["SurveyType1"] = 1] = "SurveyType1";
    SurveyType[SurveyType["SurveyType2"] = 2] = "SurveyType2";
    SurveyType[SurveyType["SurveyType3"] = 3] = "SurveyType3";
    SurveyType[SurveyType["CorrectiveActionRequest"] = 4] = "CorrectiveActionRequest";
})(SurveyType = exports.SurveyType || (exports.SurveyType = {}));
var DefaultAnswerIds;
(function (DefaultAnswerIds) {
    DefaultAnswerIds[DefaultAnswerIds["None"] = 0] = "None";
    DefaultAnswerIds[DefaultAnswerIds["TextBoxAnswerId"] = -1] = "TextBoxAnswerId";
    DefaultAnswerIds[DefaultAnswerIds["TextAreaAnswerId"] = -2] = "TextAreaAnswerId";
    DefaultAnswerIds[DefaultAnswerIds["OtherAnswerId"] = -3] = "OtherAnswerId";
})(DefaultAnswerIds = exports.DefaultAnswerIds || (exports.DefaultAnswerIds = {}));
var ReportType;
(function (ReportType) {
    ReportType[ReportType["None"] = 0] = "None";
    ReportType[ReportType["Audit"] = 1] = "Audit";
    ReportType[ReportType["Compliance"] = 2] = "Compliance";
    ReportType[ReportType["CMCompliance"] = 3] = "CMCompliance";
    ReportType[ReportType["CMAudit"] = 4] = "CMAudit";
    ReportType[ReportType["CostOfCar"] = 5] = "CostOfCar";
    ReportType[ReportType["JobsNotAudited"] = 6] = "JobsNotAudited";
    ReportType[ReportType["InitialInspection"] = 7] = "InitialInspection";
    ReportType[ReportType["CSVExport"] = 8] = "CSVExport";
})(ReportType = exports.ReportType || (exports.ReportType = {}));
//# sourceMappingURL=enum.js.map