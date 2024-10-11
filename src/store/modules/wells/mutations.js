import {SET_HANDBOOK_MUTATION, SET_WELLS_MUTATION} from "@/store/storeconstants";

export default {
    [SET_WELLS_MUTATION](state, payload){
        state.wells = payload;
    },

    [SET_HANDBOOK_MUTATION](state, payload){
        state.handbook = payload;
    }
};
