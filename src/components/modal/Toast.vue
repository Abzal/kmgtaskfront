<template>
  <div class="toast">
    <transition-group name="fade" tag="div">
      <div v-for="message in messages" :key="message.id" class="box_style" :class="message.type">
        <div class="content">
          <p>{{ message.text }}</p>
          <button @click="removeMessage(message.id)">X</button>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
  import { computed } from 'vue';
  import { useStore } from 'vuex';

  export default {
    setup() {
      const store = useStore();
      const messages = computed(() => store.state.messages);

      const removeMessage = (messageId) => {
        store.commit('removeMessage', messageId);
      };

      return {
        messages,
        removeMessage,
      };
    },
  };
</script>

<style scoped>

  .toast {
    position: fixed;
    top: 20px;
    right: 20px;
    width: 300px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
  }

  .box_style {
    background: #333;
    color: #fff;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-family: 'Roboto', sans-serif;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  .box_style:hover {
    transform: translateY(-2px);
  }

  .success {
    background-color: #28a745;
  }

  .error {
    background-color: #dc3545;
  }
  .info {
    background-color: #827717;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  button {
    background: none;
    border: none;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    padding: 0;
    margin-left: 10px;
    transition: color 0.3s ease;
  }

  button:hover {
    color: #ccc;
  }
</style>