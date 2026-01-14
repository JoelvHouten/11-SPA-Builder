import { createRouter, createWebHistory } from "vue-router";
import LessonOverview from "@/views/LessonOverview.vue";
import LessonComponent from "@/views/LessonComponent.vue";
import ComponentGallery from "@/views/ComponentGallery.vue";

const routes = [
  // {
  //   path: "/",
  //   name: "overview",
  //   component: LessonOverview,
  // },
  {
    path: "/",
    name: "overview",
    component: LessonOverview,
  },
  {
    path: "/lessons/:id",
    name: "lesson",
    component: LessonComponent,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
