<template>
  <div class="app-container">
    <Toast />
    <router-view />
  </div>
</template>

<script>
import Toast from "@/components/Toast";
export default {
  name: 'App',
  components: {
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
