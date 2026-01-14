import { createMemoryHistory, createRouter } from "vue-router";

import ComponentGallery from "./views/ComponentGallery.vue";
import LessonComponent from "./views/LessonComponent.vue";
import LessonDemo from "./views/LessonDemo.vue";
import componentGallery from "@/views/ComponentGallery.vue";

const routes = [{ path: "/", component: LessonDemo },
				{ path: "/lesson", component: componentGallery },];

export const router = createRouter({
	history: createMemoryHistory(),
	routes,
});

export default router;
