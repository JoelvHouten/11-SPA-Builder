import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { useLessonStore } from '@/stores/lessonStore'

import "./styles/main.css";
import "./styles/variables.css";
import "./styles/animations.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fontsource-variable/roboto-mono";
import "@fontsource-variable/montserrat";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

const lessonStore = useLessonStore();
lessonStore.load();

app.mount("#app");
