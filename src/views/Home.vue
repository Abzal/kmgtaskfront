<template>
    <header class="app-header">
        <h3>HOME</h3>
        <button @click="logout" class="logout-button">Выход ({{user?.email}})</button>
    </header>
    <div>
        <well-filter />
        <well-table />
    </div>
</template>

<script>
    import WellTable from "@/components/WellTable";
    import {mapActions, mapGetters} from "vuex";
    import {FETCH_HANDBOOK_ACTION, FETCH_WELLS_ACTION, GET_USER_GETTER, LOGOUT_ACTION} from "@/store/storeconstants";
    import WellFilter from "@/components/WellFilter";
    export default {
        name: "Home",
        components: {WellFilter, WellTable},

        computed: {
            ...mapGetters('auth', {
                user: GET_USER_GETTER
            }),
        },
        methods: {
            ...mapActions('wells', {
                fetchWells: FETCH_WELLS_ACTION,
                fetchHandBook: FETCH_HANDBOOK_ACTION
            }),
            ...mapActions('auth', {
               logoutAction: LOGOUT_ACTION
            }),
            logout() {
                this.logoutAction().then(res => {
                    if (res)
                        this.$router.push({name: 'login'}); // Redirect to login page after logout
                })
            }
        },
        mounted() {
            this.fetchWells();
            this.fetchHandBook();
        },
    }
</script>

<style scoped>
    .app-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px;
        background-color: #2c3e50;
        color: white;
    }

    .logout-button {
        background-color: #e74c3c;
        color: white;
        border: none;
        padding: 8px 16px;
        cursor: pointer;
        border-radius: 4px;
        font-size: 14px;
    }

    .logout-button:hover {
        background-color: #c0392b;
    }
</style>