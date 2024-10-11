<template>
    <div>
        <h1>Таблица Скважин</h1>
        <table class="custom-table">
            <thead>
            <tr>
                <th>
                    <drop-down
                            :payload="[{id: 1, name: 'сохранено'},{id: 0, name: 'не сохранено'}]"
                            @choosen="(id) => fillSelectedMatch('is_saved', id)"
                    />
                </th>
                <th>
                    <drop-down
                            :payload="handbook['fields']"
                            empty-dta="Выберите месторождение"
                            @choosen="(id) => fillSelectedMatch('field_id', id)"
                    />
                </th>
                <th>
                    Скважина
                </th>
                <th>
                    <drop-down
                            :payload="handbook['wellTypes']"
                            empty-dta="Выберите тип скв"
                    />
                </th>
                <th>
                    <drop-down :payload="handbook['wellStatuses']" empty-dta="Выберите состояние"></drop-down>
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="well in filteredWells" :key="well.id">
                <td></td>
                <td>{{ well.field.name }}</td>
                <td>{{ well.well_number }}</td>
                <td>{{ well.well_type }}</td>
                <td>{{ well.status }}</td>
            </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import {
        FETCH_HANDBOOK_ACTION,
        FETCH_WELLS_ACTION,
        GET_HANDBOOK_GETTER,
        GET_WELLS_GETTER
    } from '@/store/storeconstants';
    import DropDown from "@/components/DropDown";

    export default {
        components: {DropDown},
        data() {
            return {
                selectedMatch: {},
            };
        },
        computed: {
            ...mapGetters('wells', {
                wells: GET_WELLS_GETTER,
                handbook: GET_HANDBOOK_GETTER
            }),

            filteredWells() {
                if (!Array.isArray(this.wells)) {
                    return [];
                }
                return this.wells.filter((well) => {
                    // Iterate over all properties in selectedMatch
                    return Object.keys(this.selectedMatch).every((key) => {
                        // If the key exists in both well and selectedMatch, compare their values
                        return this.selectedMatch[key] ? well[key] === this.selectedMatch[key] : true;
                    });
                });
            },
        },

        methods: {
            ...mapActions('wells', {
                fetchWells: FETCH_WELLS_ACTION,
                fetchHandBook: FETCH_HANDBOOK_ACTION
            }),

            fillSelectedMatch(key, value){
                    this.selectedMatch[key] = value;
            }
        },
        mounted() {
            this.fetchWells();
            this.fetchHandBook();
        },
    };
</script>

<style scoped>
    .custom-table {
        width: 100%;
        border-collapse: collapse;
    }

    .custom-table th,
    .custom-table td {
        padding: 8px 16px;
        border: 1px solid #ddd;
        text-align: left;
    }

    .custom-table th {
        background-color: #f5f5f5;
        cursor: pointer;
    }

    .custom-table th:hover {
        background-color: #e0e0e0;
    }

    .custom-table tr:nth-child(even) {
        background-color: #f9f9f9;
    }

    .custom-table tr:hover {
        background-color: #e0e0e0;
    }

</style>
