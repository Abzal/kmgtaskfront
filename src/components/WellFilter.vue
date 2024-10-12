<template>
    <div class="form-container">
        <drop-down
                :payload="is_saved"
                @choosen="(id) => setSelectedMatch({'key' : 'is_saved', 'value' : id})"
                :default-value="is_saved[0]"
        />

        <drop-down
                :payload="handbook['fields']"
                empty-dta="Выберите месторождение"
                @choosen="(id) => setSelectedMatch({'key' : 'field_id', 'value' : id})"
        />

        <drop-down
                :payload="handbook['wellTypes']"
                empty-dta="Выберите тип скв"
                @choosen="(id) => setSelectedMatch({'key' : 'well_type_id', 'value' : id})"
        />

        <drop-down
                :payload="handbook['wellStatuses']"
                empty-dta="Выберите состояние"
                @choosen="(id) => setSelectedMatch({'key' : 'well_status_id', 'value' : id})"
        />

        <drop-down-check-box
                :payload="uniqueWellNumbers"
                @checked="value => setSelectedMatch({'key' : 'well_number', 'value' : value})"
        />

        <!-- Show button -->
        <span>
            + Показать
        </span>

        <div class="action-box">
            <span>&times; Отмена</span>
            <span v-if="selectedMatch['is_saved'] === 1">&#10003; Сохранить изменения</span>
            <span v-if="selectedMatch['is_saved'] === 0">&#10003; Сохранить</span>
            <span v-if="selectedMatch['is_saved'] === 1">&times; Удалить</span>
        </div>


    </div>
</template>

<script>
    import {mapGetters, mapMutations} from "vuex";
    import {
        GET_HANDBOOK_GETTER,
        GET_SELECTED_MATCH_GETTER,
        GET_WELLS_GETTER,
        SET_SELECTED_MATCH_MUTATION
    } from "@/store/storeconstants";
    import DropDown from "@/components/DropDown";
    import DropDownCheckBox from "@/components/DropDownCheckBox";

    export default {
        name: "WellFilter",
        components: {DropDownCheckBox, DropDown},
        data() {
            return {
                is_saved: [{id: 1, name: 'сохранено'},{id: 0, name: 'не сохранено'}]
            };
        },
        computed: {
            ...mapGetters('wells', {
                handbook: GET_HANDBOOK_GETTER,
                wells: GET_WELLS_GETTER,
                selectedMatch: GET_SELECTED_MATCH_GETTER
            }),

            uniqueWellNumbers() {
                return [...new Set(this.wells.map(well => well.well_number))]
            }
        },
        methods: {
            ...mapMutations('wells', {
               setSelectedMatch: SET_SELECTED_MATCH_MUTATION
            }),
        },
    }
</script>

<style>
    .form-container {
        display: flex;
        align-items: center;
        gap: 10px;
        background-color: #2f3e85;
        padding: 10px;
    }

    .form-container span {
        padding: 10px;
        color: white;
    }

    .action-box {
        display: flex;
        justify-content: space-between;
    }

    .action-box span {
        cursor: pointer;
    }
</style>