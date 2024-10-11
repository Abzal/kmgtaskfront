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
        },
        data() {
            return {
                selected: '',
            };
        },
        computed: {
            uniqueData() {
                // Check if wells is an array before mapping
                if (!Array.isArray(this.payload)) {
                    return []; // or return a default value
                }
                return [...new Set(this.payload.map((dta) => dta))];
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

</style>