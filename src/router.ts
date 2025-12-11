import { createMemoryHistory, createRouter } from "vue-router";

import ComponentGallery from "./views/ComponentGallery.vue";

const routes = [{ path: "/", component: ComponentGallery }];

export const router = createRouter({
	history: createMemoryHistory(),
	routes,
});

export default router;
