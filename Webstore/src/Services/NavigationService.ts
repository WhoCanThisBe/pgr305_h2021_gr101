import {PageNavigationInfo} from "../Navigation/SearchNavigationItem";

// This is a workaround for "navigation back to the previous page searched-from"
const NavigationService = (function () {
    const _navigationInfo: PageNavigationInfo = {
        path: "",
        state: {},
    };

    const updateNavInfo = (
        path: PageNavigationInfo["path"],
        state: PageNavigationInfo["state"]
    ) => {
        _navigationInfo.path = path;
        _navigationInfo.state = state;
    };

    const fetchNavInfo = () => _navigationInfo;

    return {
        updateNavInfo,
        fetchNavInfo,
    };
})();

export default NavigationService;
