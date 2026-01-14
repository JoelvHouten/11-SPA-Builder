import { createMemoryHistory, createRouter } from "vue-router";

import ComponentGallery from "./views/ComponentGallery.vue";
import LessonComponent from "./views/LessonComponent.vue";
import LessonDemo from "./views/LessonDemo.vue";
import LessonOverview from "./views/LessonOverview.vue";

const routes = [{ path: "/", component: LessonComponent },
				{ path: "/lesson", component: LessonComponent },
			    { path: "/lessons", component: LessonOverview },];

export const router = createRouter({
	history: createMemoryHistory(),
	routes,
});

export default router;
