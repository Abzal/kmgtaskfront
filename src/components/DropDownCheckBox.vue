<template>
    <!-- Dropdown with Checkboxes -->
    <div>
            <span>
               Выберите скважину
            </span>
        <div class="dropdown-checkbox">
            <custom-button>&#9660;</custom-button>
            <div class="dropdown-checkbox-content">
                <label v-for="well_number in payload" :key="well_number">
                    <input type="checkbox" v-model="selectedWells" :value="well_number">
                    {{well_number}}
                </label>
            </div>
        </div>
    </div>
</template>

<script>
    import CustomButton from "@/components/CustomButton";
    export default {
        name: "DropDownCheckBox",
        props: ['payload'],
        emits: ['checked'],
        data() {
            return {
                selectedWells: [...this.payload]
            }
        },
        watch: {
            selectedWells(val){
                this.$emit('checked', val)
            }
        },
        components: {CustomButton}
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