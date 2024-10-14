<template>
    <header class="app-header">
        <h3>HOME</h3>
        <button @click="logout" class="logout-button">Выход ({{user?.email}})</button>
    </header>
    <div>
        <well-filter @load="load" @save-changes="saveChanges" @save="save" @unsave="unsave"/>
        <well-table />
    </div>
</template>

<script>
    import WellTable from "@/components/WellTable";
    import {mapActions, mapGetters, mapMutations} from "vuex";
    import {
        FETCH_HANDBOOK_ACTION, FETCH_WELL_NUMBERS_ACTION,
        FETCH_WELLS_ACTION, GET_SELECTED_MATCH_GETTER,
        GET_USER_GETTER,
        LOGOUT_ACTION, MULTIPLE_UPDATE_WELLS_ACTION, SAVE_WELLS_ACTION, SET_SELECTED_MATCH_MUTATION,
        SET_UPDATED_WELLS_ROW_MUTATION, SET_WELLS_MUTATION, UNSAVE_WELLS_ACTION
    } from "@/store/storeconstants";
    import WellFilter from "@/components/WellFilter";
    export default {
        name: "Home",
        components: {WellFilter, WellTable},

        computed: {
            ...mapGetters('auth', {
                user: GET_USER_GETTER
            }),
            ...mapGetters('wells', {
                selectedMatch: GET_SELECTED_MATCH_GETTER
            }),
        },
        watch: {
            'selectedMatch.is_saved': {
                handler(newValue) {
                    this.fetchWellNumbers().then(res => {
                        if(res){
                            this.setSelectedMatch();
                            this.setSelectedMatch({key: 'is_saved', value: newValue});
                            this.setWells([]);
                        }
                    });

                },
            }
        },
        methods: {
            ...mapActions('wells', {
                fetchWells: FETCH_WELLS_ACTION,
                fetchHandBook: FETCH_HANDBOOK_ACTION,
                fetchWellNumbers: FETCH_WELL_NUMBERS_ACTION,
                multipleUpdate: MULTIPLE_UPDATE_WELLS_ACTION,
                saveWells: SAVE_WELLS_ACTION,
                unsaveWells: UNSAVE_WELLS_ACTION
            }),
            ...mapMutations('wells', {
                setUpdatedWellRows: SET_UPDATED_WELLS_ROW_MUTATION,
                setSelectedMatch: SET_SELECTED_MATCH_MUTATION,
                setWells: SET_WELLS_MUTATION
            }),
            ...mapActions('auth', {
               logoutAction: LOGOUT_ACTION
            }),
            logout() {
                this.logoutAction().then(res => {
                    if (res)
                        this.$router.push({name: 'login'}); // Redirect to login page after logout
                })
            },
            load(){
                this.fetchWells();
                this.setUpdatedWellRows();
            },
            saveChanges(){
                this.multipleUpdate().then(res => {
                    if(res)
                        this.load();
                })
            },
            save(){
                this.multipleUpdate().then(res => {
                    if(res)
                        this.saveWells().then(res => {
                            if(res){
                                this.fetchWellNumbers();
                                this.load();
                            }
                        });
                })
            },
            unsave(){
                this.unsaveWells().then(res => {
                    if(res){
                        this.fetchWellNumbers();
                        this.load();
                    }
                });
            }
        },
        mounted() {
            this.fetchWellNumbers();
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