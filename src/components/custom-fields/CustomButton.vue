<template>
    <button>
        <slot/>
    </button>
</template>

<script>
    export default {
        name: "CustomButton"
    }
</script>

<style scoped>
    button {
        padding: 10px;
        color: white;
    }

    button {
        border-radius: 5px;
        border: none;
        background-color: #394a9e;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 5px;
    }

    button:hover {
        background-color: #5063c8;
    }
</style>