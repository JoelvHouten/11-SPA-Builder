import { createMemoryHistory, createRouter } from "vue-router";

import ComponentGallery from "./views/ComponentGallery.vue";
import LessonComponent from "./views/LessonComponent.vue";
import LessonDemo from "./views/LessonDemo.vue";

const routes = [{ path: "/", component: LessonDemo },
				{ path: "/lesson", component: LessonComponent },];

export const router = createRouter({
	history: createMemoryHistory(),
	routes,
});

export default router;
