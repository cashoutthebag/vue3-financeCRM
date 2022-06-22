import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import messagePlugin from './utils/message.plugin';
import 'materialize-css/dist/js/materialize.min';

import tooltipDirective from '../directives/tooltip.directive';
import Loader from '@/components/app/Loader';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: 'AIzaSyA29rThTZDzr7eMmJbWDOGCsDY_kTFyAe4',
  authDomain: 'ghalumyan-crm.firebaseapp.com',
  projectId: 'ghalumyan-crm',
  storageBucket: 'ghalumyan-crm.appspot.com',
  messagingSenderId: '794691713901',
  appId: '1:794691713901:web:8a494489a9ea98bb24b864',
};

firebase.initializeApp(firebaseConfig);

let firstLaunch = true;

firebase.auth().onAuthStateChanged(() => {
  if (firstLaunch) {
    createApp(App)
      .component('Loader', Loader)
      .use(store)
      .use(router)
      .directive('tooltip', tooltipDirective)
      .use(messagePlugin)
      .mount('#app');
    firstLaunch = false;
  }
});
