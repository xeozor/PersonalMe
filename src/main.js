import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import firebase from "firebase";

require('firebase/firestore');
require("./assets/cssLibs/fonts.css");

var firebaseConfig = {
  apiKey: "AIzaSyDQ-YM5hxzwQSMUvw8xD58B1N8dO92Lda4",
  authDomain: "personal-me-85064.firebaseapp.com",
  databaseURL: "https://personal-me-85064.firebaseio.com",
  projectId: "personal-me-85064",
  storageBucket: "personal-me-85064.appspot.com",
  messagingSenderId: "980702196349",
  appId: "1:980702196349:web:4117084e552f93abb57714"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.prototype.$firebase = firebase;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

