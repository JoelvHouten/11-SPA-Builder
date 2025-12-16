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

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.mount("#app");

createApp(App).use(router).mount("#app");
