import {
    GET_HANDBOOK_GETTER,
    GET_SELECTED_MATCH_GETTER,
    GET_UPDATED_WELLS_ROW_GETTER, GET_WELL_NUMBERS_GETTER,
    GET_WELLS_GETTER
} from "@/store/storeconstants";

export default {
    [GET_WELLS_GETTER]: state => {
        return state.wells;
    },
    [GET_WELL_NUMBERS_GETTER]: state => {
        return state.wellNumbers;
    },
    [GET_HANDBOOK_GETTER]: state => {
        return state.handbook;
    },
    [GET_SELECTED_MATCH_GETTER]: state => {
        return state.selectedMatch;
    },
    [GET_UPDATED_WELLS_ROW_GETTER]: state => {
        return state.updatedWellRows;
    }
};
