import CategoryOneInspectionContainer from '../pages/CategoryOne/containers/CategoryOneInspectionContainer';
import CorrectiveRequestContainer from '../pages/CorrectiveRequest/containers/CorrectiveRequestContainer';
import DamageCategoriesContainer from '../pages/DamageCategories/containers/DamageCategoriesContainer';
import FileUploadContainer from '../pages/FileUpload/Containers/FileUploadContainer';
import HomeContainer from '../pages/Home/containers/HomeContainer';
import ScreenLoader from '../pages/Shared/Components/ScreenLoader';

export const ROUTES = {
    ROOT_URL: '/',
    FILE_UPLOAD_URL: '/file-upload',
    DAMAGE_TYPE: '/damage-type',
    INSPECTION: '/inspection',
    CORRECTIVE_REQUEST: '/corrective-request',
};

export const COMPONENTS = {
    Home: HomeContainer,
    FileUpload: FileUploadContainer,
    ScreenLoader: ScreenLoader,
    DamageType: DamageCategoriesContainer,
    Inspection: CategoryOneInspectionContainer,
    CorrectiveRequest: CorrectiveRequestContainer,
};
