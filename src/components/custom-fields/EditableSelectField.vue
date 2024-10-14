<template>
    <div @click.stop="enableEditing" tabindex="0">
        <template v-if="isEditing">
            <select v-model="localValue" @change="saveEdit" @blur="saveEdit" ref="selectField">
                <option v-for="option in options" :key="option.id" :value="option.id">
                    {{ option.name }}
                </option>
            </select>
        </template>
        <template v-else>
            <span>{{ displayValue }}</span>
        </template>
    </div>
</template>

<script>
    export default {
        name: 'EditableSelectField',
        props: {
            modelValue: {
                type: [String, Number],
                required: true,
            },
            options: {
                type: Array,
                required: true,
            },
            placeholder: {
                type: String,
                default: '',
            },
        },
        data() {
            return {
                isEditing: false,
                localValue: this.modelValue,
            };
        },
        computed: {
            displayValue() {
                const selectedOption = this.options.find(option => option.id === this.localValue);
                return selectedOption ? selectedOption.name : this.placeholder;
            },
        },
        methods: {
            enableEditing() {
                this.isEditing = true;
                this.$nextTick(() => {
                    this.$refs.selectField.focus();
                });
            },
            saveEdit() {
                this.isEditing = false;
                this.$emit('update:modelValue', this.localValue);
                this.$emit('saved', this.localValue);
            },
        },
        watch: {
            modelValue(newVal) {
                this.localValue = newVal;
            },
        },
    };
</script>

<style scoped>
    div {
        cursor: pointer;
        outline: none;
    }

    select {
        width: 100%;
        border: 1px solid #ddd;
        padding: 4px;
    }
</style>
