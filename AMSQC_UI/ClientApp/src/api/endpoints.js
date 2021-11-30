"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Endpoints = void 0;
exports.Endpoints = {
    QuoteAPI: {
        SubmitQuote: 'api/quote',
        UploadMappingSheet: 'api/quote',
        QuoteAvailable: 'api/quote/isAvailable',
        AuditQuote: 'api/Quote/AuditQuote',
    },
    SurveyAPI: 'api/Survey',
    ReportAPI: {
        FiltersData: 'api/report/parameters',
        ReportAPI: 'api/report',
        ReportAnswersAPI: 'api/report/SurveyAnswers',
        AuditQuote: 'api/report/AuditQuote'
    },
};
//# sourceMappingURL=endpoints.js.map