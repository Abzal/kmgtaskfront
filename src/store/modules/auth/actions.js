import {
    LOGIN_ACTION, LOGOUT_ACTION,
    SET_TOKEN_MUTATION,
    SET_USER_MUTATION,
} from "@/store/storeconstants";
import axios from "@/services/axios";

export default {

    async [LOGIN_ACTION] (context, payload) {
        let postData = {
            email: payload.email,
            password: payload.password,
        }
        return await axios.post('login',postData).then(response => {

            context.commit(SET_TOKEN_MUTATION, response.data.token);
            context.commit(SET_USER_MUTATION, response.data.user);
            axios.defaults.headers.common = {'Authorization': `Bearer ${response.data.token}`};
            this.commit('addSuccess', response.data.token);
            return true;
        }).catch(error => {
            console.log(error)
            this.commit('addError', error.response?.data?.message);
            return false;
        });
    },

    async [LOGOUT_ACTION] (context) {
        context.commit(SET_TOKEN_MUTATION, null);
        context.commit(SET_USER_MUTATION, null);
        axios.defaults.headers.common = {'Authorization': null};
        return true;
    }

};