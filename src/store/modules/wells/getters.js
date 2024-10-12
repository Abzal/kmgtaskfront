import {GET_HANDBOOK_GETTER, GET_SELECTED_MATCH_GETTER, GET_WELLS_GETTER} from "@/store/storeconstants";

export default {
    [GET_WELLS_GETTER]: state => {
        return state.wells;
    },
    [GET_HANDBOOK_GETTER]: state => {
        return state.handbook;
    },
    [GET_SELECTED_MATCH_GETTER]: state => {
        return state.selectedMatch;
    }
};
