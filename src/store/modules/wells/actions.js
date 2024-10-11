import axios from "@/services/axios";
import {
    FETCH_HANDBOOK_ACTION,
    FETCH_WELLS_ACTION,
    SET_HANDBOOK_MUTATION,
    SET_WELLS_MUTATION
} from "@/store/storeconstants";

export default {
    async [FETCH_WELLS_ACTION] (context){
        return await axios.get(`wells`).then(response => {
            context.commit(SET_WELLS_MUTATION, response.data);
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
