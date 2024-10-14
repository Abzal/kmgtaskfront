<template>
    <div class="data-form">

        <table class="custom-table">
            <thead>
            <tr>
                <th>Месторождение</th>
                <th>Скважина</th>
                <th>Тип скважины</th>
                <th>Состояние скважины</th>
                <th>Горизонт</th>
                <th>Q жидкости</th>
                <th>Обводненность</th>
                <th>Плотность нефти</th>
                <th>Дебит нефти</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(well, index) in filteredWells" :key="well.id">
                <td>{{ well.field.name }}</td>
                <td>{{ well.well_number }}</td>
                <td>{{ well.well_type.name }}</td>
                <td>{{ well.well_status.name }}</td>
                <td>
                    <EditableSelectField
                            v-if="handbook['horizons']"
                            :options="handbook['horizons']"
                            v-model="well.horizon_id"
                            placeholder=""
                            @saved="saveChanges(index, 'horizon_id')"
                    />
                </td>

                <!-- Q жидкости -->
                <td @click="setEditing(index, 'liquid_flow')" @blur="saveChanges(index, 'liquid_flow')" @keyup.enter="saveChanges(index, 'liquid_flow')">
                    <template v-if="isEditing(index, 'liquid_flow')">
                        <input type="number" v-model="well.liquid_flow" />
                    </template>
                    <template v-else>
                        {{ well.liquid_flow || '' }}
                    </template>
                </td>

                <!-- Обводненность -->
                <td @click="setEditing(index, 'water_cut')" @blur="saveChanges(index, 'water_cut')" @keyup.enter="saveChanges(index, 'water_cut')">
                    <template v-if="isEditing(index, 'water_cut')">
                        <input type="number" v-model="well.water_cut" />
                    </template>
                    <template v-else>
                        {{ well.water_cut || '' }}
                    </template>
                </td>

                <!-- Плотность нефти -->
                <td @click="setEditing(index, 'oil_density')" @blur="saveChanges(index, 'oil_density')" @keyup.enter="saveChanges(index, 'oil_density')">
                    <template v-if="isEditing(index, 'oil_density')">
                        <input type="number" v-model="well.oil_density" />
                    </template>
                    <template v-else>
                        {{ well.oil_density || '' }}
                    </template>
                </td>

                <!-- Дебит нефти -->
                <td>{{ well.oil_rate || '' }}</td>
            </tr>
            </tbody>
        </table>

        <well-chart :payload="filteredWells"/>

    </div>
</template>


<script>
    import { mapGetters, mapMutations } from 'vuex';
    import {
        GET_HANDBOOK_GETTER,
        GET_SELECTED_MATCH_GETTER,
        GET_WELLS_GETTER,
        SET_UPDATED_WELLS_ROW_MUTATION
    } from '@/store/storeconstants';
    import EditableSelectField from "@/components/custom-fields/EditableSelectField";
    import WellChart from "@/components/chart/WellCharts";

    export default {
        components: {WellChart, EditableSelectField},
        data() {
            return {
                editing: {
                    index: null,
                    field: null,
                }
            };
        },
        computed: {
            ...mapGetters('wells', {
                wells: GET_WELLS_GETTER,
                handbook: GET_HANDBOOK_GETTER,
                selectedMatch: GET_SELECTED_MATCH_GETTER
            }),

            filteredWells() {
                if (!Array.isArray(this.wells)) {
                    return [];
                }

                return this.wells.filter((well) => {
                    return Object.keys(this.selectedMatch).every((key) => {
                        const selectedValue = this.selectedMatch[key];
                        const wellValue = well[key];
                        if (Array.isArray(selectedValue)) {
                            return selectedValue.includes(wellValue);
                        } else {
                            return selectedValue !== undefined && selectedValue !== null
                                ? wellValue === selectedValue
                                : true;
                        }
                    });
                });
            },
        },
        methods: {
            ...mapMutations('wells', {
                setUpdatedWellsRow: SET_UPDATED_WELLS_ROW_MUTATION
            }),

            calculateAndRound(well) {
                const coefficient = this.findCoefficientById(well.horizon_id);
                if (coefficient === null) {
                    return 0; // Handle case where coefficient is not found
                }

                const result = well.liquid_flow * (1 - well.water_cut / 100) * well.oil_density * coefficient;
                return Math.ceil(result * 100) / 100; // Rounded to the nearest integer
            },

            findCoefficientById(id) {
                if(!this.handbook['horizons'])
                    return 1;
                const item = this.handbook['horizons'].find(el => el.id === id);
                return item ? item.coefficient : 0; // Return the coefficient or null if not found
            },

            setEditing(index, field) {
                this.editing = { index, field };
            },
            isEditing(index, field) {
                return this.editing.index === index && this.editing.field === field;
            },
            stopEditing() {
                this.editing = { index: null, field: null };
            },
            saveChanges(index, field) {
                this.stopEditing();

                let editedWell = this.filteredWells[index];

                this.filteredWells[index]['oil_rate'] = this.calculateAndRound(this.filteredWells[index])

                this.setUpdatedWellsRow(editedWell);
            },

        },
    };
</script>




<style scoped>
    .data-form {

    }

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
