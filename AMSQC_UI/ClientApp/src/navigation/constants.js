import FileUploadContainer from '../pages/FileUpload/Containers/FileUploadContainer';
import HomeContainer from '../pages/Home/containers/HomeContainer';
import ScreenLoader from '../pages/Shared/Components/ScreenLoader';

export const ROUTES = {
    ROOT_URL: '/',
    FILE_UPLOAD_URL: '/file-upload',
};

export const COMPONENTS = {
    Home: HomeContainer,
    FileUpload: FileUploadContainer,
    ScreenLoader: ScreenLoader,
};
