import {
    SET_HANDBOOK_MUTATION,
    SET_SELECTED_MATCH_MUTATION,
    SET_UPDATED_WELLS_ROW_MUTATION,
    SET_WELLS_MUTATION
} from "@/store/storeconstants";

export default {
    [SET_WELLS_MUTATION](state, payload){
        state.wells = payload;
    },

    [SET_HANDBOOK_MUTATION](state, payload){
        state.handbook = payload;
    },

    [SET_UPDATED_WELLS_ROW_MUTATION](state, editedWell){
        // Add or update the edited row in array
        const existingIndex = state.updatedWellRows.findIndex(row => row.id === editedWell.id);
        if (existingIndex !== -1) {
            state.updatedWellRows[existingIndex] = editedWell;
        } else {
            state.updatedWellRows.push(editedWell);
        }
    },

    [SET_SELECTED_MATCH_MUTATION](state, payload){
        state.selectedMatch[payload.key] = payload.value;
    }

};
