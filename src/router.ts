import { createMemoryHistory, createRouter } from "vue-router";

import ComponentGallery from "./views/ComponentGallery.vue";
import LessonComponent from "./views/LessonComponent.vue";
import LessonCreate from "./views/LessonCreate.vue";
import LessonOverview from "./views/LessonOverview.vue";

const routes = [{ path: "/", component: LessonOverview }, 
				{ path: "/lesson", component: LessonComponent },
			 	{ path: "/lesson/create", component: LessonCreate },
			    { path: "/lessons", component: LessonOverview }
			];

export const router = createRouter({
	history: createMemoryHistory(),
	routes,
});

export default router;
