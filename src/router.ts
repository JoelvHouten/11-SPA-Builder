import { createMemoryHistory, createRouter } from "vue-router";

import ComponentGallery from "./views/ComponentGallery.vue";
import LessonComponent from "./views/LessonComponent.vue";
import LessonOverview from "./views/LessonOverview.vue";

const routes = [{ path: "/", component: ComponentGallery },
	            { path: "/lessons", component: LessonOverview }, 
				{ path: "/lesson", component: LessonComponent },];

export const router = createRouter({
	history: createMemoryHistory(),
	routes,
});

export default router;
