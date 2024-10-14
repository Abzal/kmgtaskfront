<template>
    <div v-if="isLoading" class="loader-overlay">
        <div class="loader"></div>
    </div>
</template>

<script>
    import { computed } from 'vue';
    import { useStore } from 'vuex';

    export default {
        name: "GlobalLoader",
        setup() {
            const store = useStore();
            const isLoading = computed(() => store.getters.isLoading);

            return {
                isLoading,
            };
        },
    };
</script>

<style scoped>
    .loader-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5); /* Dark background */
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999; /* Make sure it's above other content */
    }

    .loader {
        border: 8px solid rgba(0, 0, 0, 0.1);
        border-radius: 50%;
        border-top: 8px solid #fff; /* White spinner */
        width: 60px;
        height: 60px;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>