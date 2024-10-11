import { createStore } from 'vuex'
import wells from './modules/wells'

export default createStore({
  state: {
    messages: [],
  },
  getters: {},
  mutations: {
    addError(state, message) {
      this.commit('addMessage', { message: message, type: 'error' });
    },

    addSuccess(state, message = 'Succeed!') {
      this.commit('addMessage', { message: message, type: 'success' });
    },

    addInfo(state, message = 'Information!') {
      this.commit('addMessage', { message: message, type: 'info' });
    },

    addMessage(state, payload) {
      const id = Date.now();

      state.messages.push({ id, type: payload.type, text: payload.message });
      setTimeout(() => {
        this.commit('removeMessage', id);
      }, 5000); // Clear the message after 5 seconds
    },

    removeMessage(state, messageId) {
      state.messages = state.messages.filter(msg => msg.id !== messageId);
    },
  },
  actions: {},
  modules: {
    wells
  }
})
