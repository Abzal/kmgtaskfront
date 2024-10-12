<template>
    <div class="form-container">
        <drop-down
                :payload="[{id: 1, name: 'сохранено'},{id: 0, name: 'не сохранено'}]"
                empty-dta="Все"
                @choosen="(id) => fillSelectedMatch('is_saved', id)"
        />

        <drop-down
                :payload="handbook['fields']"
                empty-dta="Выберите месторождение"
                @choosen="(id) => fillSelectedMatch('field_id', id)"
        />

        <drop-down
                :payload="handbook['wellTypes']"
                empty-dta="Выберите тип скв"
                @choosen="(id) => fillSelectedMatch('well_type_id', id)"
        />

        <drop-down
                :payload="handbook['wellStatuses']"
                empty-dta="Выберите состояние"
                @choosen="(id) => fillSelectedMatch('well_status_id', id)"
        />

        <drop-down-check-box
                :payload="uniqueWellNumbers"
                @checked="value => fillSelectedMatch('well_number', value)"
        />

        <!-- Show button -->
        <span onclick="showData()">
            + Показать
        </span>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import {GET_HANDBOOK_GETTER, GET_WELLS_GETTER} from "@/store/storeconstants";
    import DropDown from "@/components/DropDown";
    import DropDownCheckBox from "@/components/DropDownCheckBox";

    export default {
        name: "WellFilter",
        components: {DropDownCheckBox, DropDown},
        emits: ['fill-selected-match'],
        data() {
            return {
                selectedMatch: {},
            };
        },
        computed: {
            ...mapGetters('wells', {
                handbook: GET_HANDBOOK_GETTER,
                wells: GET_WELLS_GETTER
            }),

            uniqueWellNumbers() {
                return [...new Set(this.wells.map(well => well.well_number))]
            }
        },
        methods: {
            fillSelectedMatch(key, value){
                this.selectedMatch[key] = value;
                this.$emit('fill-selected-match',this.selectedMatch);
            }
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
</style>