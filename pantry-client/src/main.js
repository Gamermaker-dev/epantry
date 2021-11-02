import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import Buefy from "buefy";
import "../node_modules/animate.css/animate.min.css";
import "./css/main.css";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";

// import services for provider
import CookieService from "./services/Cookie";
import ModelService from "./services/Model";
import SecurityService from "./services/Security";

// init each service
var cookieService = new CookieService();
var userService = new ModelService('user', 'users');
var securityService = new SecurityService(cookieService, userService);

axios.defaults.baseURL = 'http://localhost:8000/api';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(Buefy);

new Vue({
  provide: {
    cookieService: cookieService,
    userService: userService,
    securityService: securityService,
  },
  router,
  render: (h) => h(App),
}).$mount("#app");
