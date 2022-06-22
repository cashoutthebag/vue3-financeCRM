import { createStore } from 'vuex';

import auth from './auth';
import info from './info';
import category from './category';
import record from './record';

export default createStore({
  state: {
    error: null,
  },
  getters: {
    error: (s) => s.error,
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    },
  },
  actions: {
    async fetchCurrency() {
      const key = process.env.VUE_APP_FIXER;

      const myHeaders = new Headers();
      myHeaders.append('apikey', key);

      var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders,
      };

      const res = await fetch(
        'https://api.apilayer.com/fixer/latest?symbols=USD,RUB,EUR&base=EUR',
        requestOptions,
      );
      return res.json();
    },
  },
  modules: {
    auth,
    info,
    category,
    record,
  },
});
