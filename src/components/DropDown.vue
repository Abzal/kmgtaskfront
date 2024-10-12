<template>
    <select v-model="selected" @change="selectedData">
        <option v-if="emptyDta" value="">{{emptyDta}}</option>
        <option v-for="field in uniqueData" :key="field" :value="field">{{ field?.name }}</option>
    </select>
</template>

<script>
    export default {
        name: "DropDown",
        props: {
            payload: {type: Array, default: []},
            emptyDta: {type: String, default: null},
            defaultValue: {type: Object, default: null}
        },
        data() {
            return {
                selected: this.defaultValue || '',
            };
        },
        computed: {
            uniqueData() {
                // Check if wells is an array before mapping
                if (!Array.isArray(this.payload)) {
                    return []; // or return a default value
                }
                const newSet = [...new Set(this.payload.map((dta) => dta))];

                return newSet;
            },
        },
        methods: {
            selectedData(){
                this.$emit('choosen', this.selected.id);
            }
        }
    }
</script>

<style scoped>
    select {
        padding: 10px;
        color: white;
    }

    select {
        border-radius: 5px;
        border: none;
        background-color: #394a9e;
    }

</style>