<template>
    <div>
        <well-filter @fill-selected-match="match => selectedMatch = match"/>
        <well-table :selectedMatch="selectedMatch"/>
    </div>
</template>

<script>
    import WellTable from "@/components/WellTable";
    import {mapActions} from "vuex";
    import {FETCH_HANDBOOK_ACTION, FETCH_WELLS_ACTION} from "@/store/storeconstants";
    import WellFilter from "@/components/WellFilter";
    export default {
        name: "Home",
        components: {WellFilter, WellTable},
        data(){
            return {
                selectedMatch: {}
            }
        },
        methods: {
            ...mapActions('wells', {
                fetchWells: FETCH_WELLS_ACTION,
                fetchHandBook: FETCH_HANDBOOK_ACTION
            }),
        },
        mounted() {
            this.fetchWells();
            this.fetchHandBook();
        },
    }
</script>

<style scoped>

</style>