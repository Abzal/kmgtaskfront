import {SET_TOKEN_MUTATION, SET_USER_MUTATION} from "@/store/storeconstants";

export default {
    [SET_USER_MUTATION](state, payload){
        state.user = payload;
        //sessionStorage.setItem('user', payload);
    },
    [SET_TOKEN_MUTATION](state, payload){
        state.token = payload;
        //sessionStorage.setItem('token', payload);
    }
};