import axios from "@/services/axios";
import {
    FETCH_HANDBOOK_ACTION,
    FETCH_WELL_NUMBERS_ACTION,
    FETCH_WELLS_ACTION,
    GET_SELECTED_MATCH_GETTER,
    GET_UPDATED_WELLS_ROW_GETTER,
    MULTIPLE_UPDATE_WELLS_ACTION,
    SAVE_WELLS_ACTION,
    SET_HANDBOOK_MUTATION,
    SET_WELL_NUMBERS_MUTATION,
    SET_WELLS_MUTATION, UNSAVE_WELLS_ACTION,
} from "@/store/storeconstants";

export default {

    async [SAVE_WELLS_ACTION](context){
        return axios.patch('/wells/save', {
            well_numbers: [...context.getters[GET_SELECTED_MATCH_GETTER]['well_number']]
        }).then(response => {
            this.commit('addSuccess', response.data?.message);
            return true;
        }).catch(error => {
            this.commit('addError', error.response?.data?.message);
            return false;
        });
    },

    async [UNSAVE_WELLS_ACTION](context){
        return axios.patch('/wells/unsave', {
            well_numbers: [...context.getters[GET_SELECTED_MATCH_GETTER]['well_number']]
        }).then(response => {
            this.commit('addSuccess', response.data?.message);
            return true;
        }).catch(error => {
            this.commit('addError', error.response?.data?.message);
            return false;
        });
    },

    async [MULTIPLE_UPDATE_WELLS_ACTION](context){
        const updatedWells = context.getters[GET_UPDATED_WELLS_ROW_GETTER];
        return axios.put('/wells', {
                    wells: [...updatedWells]
                }).then(response => {
                    this.commit('addSuccess', response.data?.message);
                    return true;
                }).catch(error => {
                    this.commit('addError', error.response?.data?.message);
                    return false;
                });
    },

    async [FETCH_WELLS_ACTION](context) {
        const matches = context.getters[GET_SELECTED_MATCH_GETTER];

        const params = {};

        // Conditionally add parameters based on their existence in matches and non-emptiness
        if (matches.well_number && matches.well_number.length > 0) params.well_number = matches.well_number;  // Ensure well_number is a non-empty array
        else {this.commit('addInfo', 'Выберите скважины'); return;}
        if (matches.field_id) params.field_id = matches.field_id;
        if (matches.is_saved !== undefined && matches.is_saved !== null) params.is_saved = matches.is_saved;  // Checking for boolean or non-null values
        if (matches.well_type_id) params.well_type_id = matches.well_type_id;
        if (matches.well_status_id) params.well_status_id = matches.well_status_id;


        return await axios.get(`wells`, { params })
            .then(response => {
                context.commit(SET_WELLS_MUTATION, response.data);
                return true;
            })
            .catch(error => {
                this.commit('addError', error.response?.data?.message);
                return false;
            });
    },

    async [FETCH_WELL_NUMBERS_ACTION](context){

        return axios.get('/well-numbers', {
                    params: {
                        is_saved: context.getters[GET_SELECTED_MATCH_GETTER]['is_saved']
                    }
            }).then(response => {
                context.commit(SET_WELL_NUMBERS_MUTATION, response.data);
                return true;
            }).catch(error => {
                this.commit('addError', error.response?.data?.message);
                return false;
            });

    },

    async [FETCH_HANDBOOK_ACTION] (context){
        return await axios.get(`handbook`).then(response => {
            context.commit(SET_HANDBOOK_MUTATION, response.data);
            return true;
        }).catch(error => {
            this.commit('addError', error.response?.data?.message);
            return false;
        });
    }
};
