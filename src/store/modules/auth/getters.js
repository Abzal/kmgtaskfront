import {
    GET_TOKEN_GETTER,
    GET_USER_GETTER,
    IS_USER_IDENTIFIED_GETTER
} from "@/store/storeconstants";

export default {
    [GET_TOKEN_GETTER]: state => {
        return state.token;
    },
    [GET_USER_GETTER]: state => {
        return state.user;
    },
    [IS_USER_IDENTIFIED_GETTER](state){
        return !!state.user;
    }
};