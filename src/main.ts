import { createApp } from "vue";
import App from "./App.vue";
import router from "./router.ts";
import "./styles/main.css";
import "./styles/variables.css";
import "./styles/animations.css";
import '@fortawesome/fontawesome-free/css/all.css'
import "@fontsource-variable/roboto-mono";
import "@fontsource-variable/montserrat";

createApp(App).use(router).mount("#app");
