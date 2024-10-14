<template>
    <!-- Dropdown with Checkboxes -->
    <div>
        <span>Выберите скважину</span>
        <div class="dropdown-checkbox">
            <custom-button>&#9660;</custom-button>
            <div class="dropdown-checkbox-content">
                <label v-for="well_number in payload" :key="well_number">
                    <input
                            type="checkbox"
                            :value="well_number"
                            :checked="selectedWells.includes(well_number)"
                            @change="handleCheckboxChange(well_number)"
                            :disabled="!selectedWells.includes(well_number) && selectedWells.length >= 5"
                    >
                    {{ well_number }}
                </label>
            </div>
        </div>
    </div>
</template>

<script>
    import CustomButton from "@/components/custom-fields/CustomButton";

    export default {
        name: "DropDownCheckBox",
        props: ['payload'],
        emits: ['checked'],
        data() {
            return {
                selectedWells: []
            }
        },
        watch: {
            payload: {
                handler(newPayload) {
                    this.selectedWells = [];
                    this.$emit('checked', this.selectedWells);
                },
                deep: true
            }
        },
        methods: {
            handleCheckboxChange(well_number) {
                if (this.selectedWells.includes(well_number)) {
                    this.selectedWells = this.selectedWells.filter(well => well !== well_number);
                }
                else if (this.selectedWells.length < 5) {
                    this.selectedWells.push(well_number);
                }

                this.$emit('checked', this.selectedWells);
            }
        },

        components: { CustomButton }
    }
</script>

<style scoped>
    .dropdown-checkbox {
        position: relative;
        display: inline-block;
    }

    .dropdown-checkbox-content {
        display: none;
        position: absolute;
        background-color: #394a9e;
        min-width: 160px;
        box-shadow: 0px 8px 16px rgba(0,0,0,0.2);
        z-index: 1;
        padding: 10px;
        color: white;
    }

    .dropdown-checkbox-content label {
        display: block;
        padding: 5px 0;
    }

    .dropdown-checkbox-content input[type="checkbox"] {
        margin-right: 10px;
    }

    .dropdown-checkbox:hover .dropdown-checkbox-content {
        display: block;
    }
</style>
