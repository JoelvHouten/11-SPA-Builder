import { createMemoryHistory, createRouter } from "vue-router";

import ComponentGallery from "./views/ComponentGallery.vue";
import LessonComponent from "./views/LessonComponent.vue";

const routes = [{ path: "/", component: ComponentGallery }, 
				{ path: "/lesson", component: LessonComponent },];

export const router = createRouter({
	history: createMemoryHistory(),
	routes,
});

export default router;
