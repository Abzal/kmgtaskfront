<template>
    <div class="form-container">
        <drop-down
                :payload="is_saved"
                match-key="is_saved"
                @choosen="setSelectedMatch"
        />

        <drop-down
                :payload="handbook['fields']"
                empty-dta="Выберите месторождение"
                match-key="field_id"
                @choosen="setSelectedMatch"
        />

        <drop-down
                :payload="handbook['wellTypes']"
                empty-dta="Выберите тип скв"
                match-key="well_type_id"
                @choosen="setSelectedMatch"
        />

        <drop-down
                :payload="handbook['wellStatuses']"
                empty-dta="Выберите состояние"
                match-key="well_status_id"
                @choosen="setSelectedMatch"
        />

        <drop-down-check-box
                :payload="uniqueWellNumbers"
                :default-value="selectedMatch?.well_number"
                @checked="value => setSelectedMatch({'key' : 'well_number', 'value' : value})"
        />

        <!-- Show button -->


        <div class="action-box">
            <span @click="$emit('load')">
            + Показать
            </span>
            <span @click="$emit('load')" v-if="hasUpdates">&times; Отмена</span>
            <span v-if="isSaved && hasUpdates" @click="$emit('save-changes')">&#10003; Сохранить изменения</span>
            <span v-if="!isSaved && hasSelectedWells" @click="$emit('save')">&#10003; Сохранить</span>
            <span v-if="isSaved && hasSelectedWells" @click="$emit('unsave')">&times; Удалить</span>
        </div>


    </div>
</template>

<script>
    import {mapGetters, mapMutations} from "vuex";
    import {
        GET_HANDBOOK_GETTER,
        GET_SELECTED_MATCH_GETTER, GET_UPDATED_WELLS_ROW_GETTER, GET_WELL_NUMBERS_GETTER,
        GET_WELLS_GETTER,
        SET_SELECTED_MATCH_MUTATION
    } from "@/store/storeconstants";
    import DropDown from "@/components/custom-fields/DropDown";
    import DropDownCheckBox from "@/components/custom-fields/DropDownCheckBox";

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
                selectedMatch: GET_SELECTED_MATCH_GETTER,
                updatedWellRows: GET_UPDATED_WELLS_ROW_GETTER,
                wellNumbers: GET_WELL_NUMBERS_GETTER
            }),

            uniqueWellNumbers() {
                return [...new Set(this.wellNumbers.map(well => well.well_number))];
            },

            isSaved() {
                return this.selectedMatch['is_saved'] === 1;
            },

            hasSelectedWells(){
                return this.selectedMatch['well_number'] && this.selectedMatch['well_number'].length > 0;
            },

            hasUpdates() {
                return this.updatedWellRows.length > 0;
            }
        },
        methods: {
            ...mapMutations('wells', {
               setSelectedMatch: SET_SELECTED_MATCH_MUTATION,
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

    .action-box span:hover {
        color: #c0392b;
    }

</style>