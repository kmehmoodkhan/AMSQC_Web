import CategoryOneInspectionContainer from '../pages/CategoryOne/containers/CategoryOneInspectionContainer';
import SubletRepairsContainer from '../pages/CategoryOne/containers/SubletRepairsContainer';
import CorrectiveRequestContainer from '../pages/CorrectiveRequest/containers/CorrectiveRequestContainer';
import DamageCategoriesContainer from '../pages/DamageCategories/containers/DamageCategoriesContainer';
import FileUploadContainer from '../pages/FileUpload/Containers/FileUploadContainer';
import HomeContainer from '../pages/Home/containers/HomeContainer';
import ReportAnswersContainer from '../pages/ReportAnswers/containers/ReportAnswersContainer';
import ReportDashboardContainer from '../pages/Reports/containers/ReportDashboardContainer';
import ReportsParentContainer from '../pages/Reports/containers/ReportsParentContainer';
import ScreenLoader from '../pages/Shared/Components/ScreenLoader';
import LogOutContainer from '../pages/Shared/Containers/LogOutContainer';
import SubmissionsPageContainer from '../pages/SubmissionPage/containers/SubmissionsPageContainer';

export const ROUTES = {
    ROOT_URL: '/',
    FILE_UPLOAD_URL: '/file-upload',
    DAMAGE_TYPE: '/damage-type',
    INSPECTION: '/inspection',
    CORRECTIVE_REQUEST: '/corrective-request',
    SUBMIT_DATA: '/submit-data',
    LOG_OUT: '/log-out',
    SUBLET_REPAIR: '/sublet-repair',
    REPORTS_DASHBOARD: '/reports-dashboard',
    REPORTS_PAGE: '/reports/:reportId',
    REPORT_ANSWER_PAGE: '/report-answers',
};

export const COMPONENTS = {
    Home: HomeContainer,
    FileUpload: FileUploadContainer,
    ScreenLoader: ScreenLoader,
    DamageType: DamageCategoriesContainer,
    Inspection: CategoryOneInspectionContainer,
    CorrectiveRequest: CorrectiveRequestContainer,
    SubmitData: SubmissionsPageContainer,
    LogOut: LogOutContainer,
    SubletRepair: SubletRepairsContainer,
    ReportDashboard: ReportDashboardContainer,
    ReportsMain: ReportsParentContainer,
    ReportAnswers: ReportAnswersContainer,
};
