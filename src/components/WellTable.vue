<template>
    <div>
        <table class="custom-table">
            <thead>
            <tr>
                <th>
                    Месторождение
                </th>
                <th>
                    Скважина
                </th>
                <th>
                    Тип скважины
                </th>
                <th>
                    Состояние скважины
                </th>
                <th>
                    Горизонт
                </th>
                <th>
                    Q жидкости
                </th>
                <th>
                    Обводненность
                </th>
                <th>
                    Плотность нефти
                </th>
                <th>
                    Дебит нефти
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="well in filteredWells" :key="well.id">
                <td>{{ well.field.name }}</td>
                <td>{{ well.well_number }}</td>
                <td>{{ well.well_type.name }}</td>
                <td>{{ well.well_status.name }}</td>
                <td>{{ well.horizon.name }}</td>
                <td>{{well.liquid_flow || ''}}</td>
                <td>{{well.water_cut || ''}}</td>
                <td>{{well.oil_density || ''}}</td>
                <td>{{well.oil_rate || ''}}</td>
            </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
    import {mapGetters } from 'vuex';
    import {GET_WELLS_GETTER} from '@/store/storeconstants';

    export default {
        props: ['selectedMatch'],
        computed: {
            ...mapGetters('wells', {
                wells: GET_WELLS_GETTER
            }),

            filteredWells() {
                if (!Array.isArray(this.wells)) {
                    return [];
                }

                return this.wells.filter((well) => {
                    // Iterate over all properties in selectedMatch
                    return Object.keys(this.selectedMatch).every((key) => {
                        const selectedValue = this.selectedMatch[key];
                        const wellValue = well[key];

                        // Check if the selected value is an array (e.g., for well_number)
                        if (Array.isArray(selectedValue)) {
                            // For arrays, check if wellValue exists in selectedValue array
                            return selectedValue.includes(wellValue);
                        } else {
                            // Otherwise, compare the values directly
                            return selectedValue ? wellValue === selectedValue : true;
                        }
                    });
                });
            }
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
