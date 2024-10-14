import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";
export default {
    namespaced: true,
    state() {
        return{
           wells: [],
           updatedWellRows: [],
           handbook: [],
           wellNumbers: [],
           selectedMatch: {'is_saved': 1}
        }
    },
    mutations,
    getters,
    actions
}
