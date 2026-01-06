import { createMemoryHistory, createRouter } from "vue-router";

import ComponentGallery from "./views/ComponentGallery.vue";
import LessonComponent from "./views/LessonComponent.vue";

const routes = [{ path: "/lol", component: ComponentGallery }, 
				{ path: "/", component: LessonComponent },];

export const router = createRouter({
	history: createMemoryHistory(),
	routes,
});

export default router;
