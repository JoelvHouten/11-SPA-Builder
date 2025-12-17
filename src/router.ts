import { createMemoryHistory, createRouter } from "vue-router";

import ComponentGallery from "./views/ComponentGallery.vue";
import LessonDemo from "@/views/LessonDemo.vue";

const routes = [{ path: "/", component: LessonDemo }];

export const router = createRouter({
	history: createMemoryHistory(),
	routes,
});

export default router;
