import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router.ts";

import "./styles/main.css";
import "./styles/variables.css";
import "./styles/animations.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fontsource-variable/roboto-mono";
import "@fontsource-variable/montserrat";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

App.use(createPinia());

createApp(App).use(router).mount("#app");
