import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";
export default {
    namespaced: true,
    state() {
        return{
            token: null,
            user: null
        }
    },
    mutations,
    getters,
    actions
}