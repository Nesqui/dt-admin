// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'bootstrap-css-only/css/bootstrap.min.css';
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbvue/build/css/mdb.css';
import Vue from 'vue';
import App from './App';
import router from './router';
import firebase from "firebase"
import moment from 'moment'
Vue.use(require('vue-moment'));
Vue.use(BootstrapVue)

const firebaseConfig = {
  apiKey: "AIzaSyB6R86X9dYMXAx_gKcpT98yfAO2u3M1nfE",
  authDomain: "dreamteam-558b3.firebaseapp.com",
  databaseURL: "https://dreamteam-558b3.firebaseio.com",
  projectId: "dreamteam-558b3",
  storageBucket: "dreamteam-558b3.appspot.com",
  messagingSenderId: "19687556720",
  appId: "1:19687556720:web:fd961d7e0481215d"
};
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
