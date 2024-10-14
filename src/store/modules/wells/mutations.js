import {
    SET_HANDBOOK_MUTATION,
    SET_SELECTED_MATCH_MUTATION,
    SET_UPDATED_WELLS_ROW_MUTATION, SET_WELL_NUMBERS_MUTATION,
    SET_WELLS_MUTATION
} from "@/store/storeconstants";

export default {
    [SET_WELLS_MUTATION](state, payload){
        state.wells = payload;
    },

    [SET_HANDBOOK_MUTATION](state, payload){
        state.handbook = payload;
    },

    [SET_WELL_NUMBERS_MUTATION](state, payload){
        state.wellNumbers = payload;
    },

    [SET_UPDATED_WELLS_ROW_MUTATION](state, editedWell = null){
        if(editedWell){
            // Add or update the edited row in array
            const existingIndex = state.updatedWellRows.findIndex(row => row.id === editedWell.id);
            if (existingIndex !== -1) {
                state.updatedWellRows[existingIndex] = editedWell;
            } else {
                state.updatedWellRows.push(editedWell);
            }
        }else state.updatedWellRows = [];
    },

    [SET_SELECTED_MATCH_MUTATION](state, payload = null){
        if(payload)
            state.selectedMatch[payload.key] = payload.value;
        else state.selectedMatch = {'is_saved': 1};
    }

};
