<template>
    <select v-model="selected" @change="selectedData">
        <option v-if="emptyDta" :value="null">{{ emptyDta }}</option>
        <option v-for="field in uniqueData" :key="field.id" :value="field.id">{{ field.name }}</option>
    </select>
</template>

<script>
    import { mapGetters } from "vuex";
    import { GET_SELECTED_MATCH_GETTER } from "@/store/storeconstants";

    export default {
        name: "DropDown",
        props: {
            matchKey: { type: String, required: true },
            payload: { type: Array, default: () => [] },
            emptyDta: { type: String, default: null },
        },
        data() {
            return {
                selected: null,
            };
        },
        watch: {
            selectedMatch: {
                handler(newVal) {
                    if (newVal?.[this.matchKey] !== undefined) {
                        this.selected = newVal[this.matchKey];
                    }else this.selected = null;
                },
                deep: true,
                immediate: true
            }
        },
        computed: {
            ...mapGetters('wells', {
                selectedMatch: GET_SELECTED_MATCH_GETTER,
            }),
            uniqueData() {
                return Array.isArray(this.payload) ? this.payload : [];
            },
        },
        methods: {
            selectedData() {
                this.$emit('choosen', { value: this.selected, key: this.matchKey });
            }
        }
    };
</script>

<style scoped>
    select {
        padding: 10px;
        color: white;
        border-radius: 5px;
        border: none;
        background-color: #394a9e;
    }
</style>
