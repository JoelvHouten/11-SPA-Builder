import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import "./styles/main.css";
import "./styles/variables.css";
import "./styles/animations.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fontsource-variable/roboto-mono";
import "@fontsource-variable/montserrat";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
