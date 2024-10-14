<template>
  <div class="app-container">
    <global-loader/>
    <Toast />
    <router-view />
  </div>
</template>

<script>
import Toast from "@/components/modal/Toast";
import GlobalLoader from "@/components/GlobalLoading";
export default {
  name: 'App',
  components: {
    GlobalLoader,
    Toast
  }
}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh; /* Ensures the container takes at least the full viewport height */
  }

  router-view {
    flex: 1; /* Takes up remaining space */
  }
</style>
