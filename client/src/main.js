import Vue from "vue";
import App from "./App";
import VueAxios from "vue-axios";
import axios from "axios";
import router from "./router/router";
import 'bootstrap';
import 'jquery';
import 'popper.js';
import './assets/app.scss';

Vue.config.productionTip = false;

const axiosCustom = axios.create({
    baseURL: "http://localhost:3000"
})

Vue.use(VueAxios, axiosCustom);

new Vue({
    el: "#app",
    router,
    render: h => h(App)
});