import CategoryOneInspectionContainer from '../pages/CategoryOne/containers/CategoryOneInspectionContainer';
import SubletRepairsContainer from '../pages/CategoryOne/containers/SubletRepairsContainer';
import CorrectiveRequestContainer from '../pages/CorrectiveRequest/containers/CorrectiveRequestContainer';
import DamageCategoriesContainer from '../pages/DamageCategories/containers/DamageCategoriesContainer';
import FileUploadContainer from '../pages/FileUpload/Containers/FileUploadContainer';
import HomeContainer from '../pages/Home/containers/HomeContainer';
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
    LOG_OUT: '/log-out/:accountid',
    SUBLET_REPAIR: '/sublet-repair',
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
};
