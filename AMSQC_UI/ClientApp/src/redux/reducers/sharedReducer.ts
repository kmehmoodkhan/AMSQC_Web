type sharedReducerType = {
    loading: boolean;
};

const defaultState: sharedReducerType = {
    loading: false,
};

const sharedReducer = (state = defaultState, action: any): sharedReducerType => {
    switch (action.type) {
        case 'SHOW_LOADER':
            return {
                loading: true,
            };
        case 'HIDE_LOADER':
            return {
                loading: false,
            };
        default:
            return state;
    }
};

export default sharedReducer;
