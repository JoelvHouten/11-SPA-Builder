import { createRouter, createWebHistory } from "vue-router"
import LessonOverview from "@/views/LessonOverview.vue"
import LessonComponent from "@/views/LessonComponent.vue"
import LessonCreate from "@/views/LessonCreate.vue"
import ComponentGallery from "@/views/ComponentGallery.vue"
import Home from "@/views/Home.vue"

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/lessons",
    name: "lessons",
    component: LessonOverview
  },
  {
    path: "/lessons/create",
    name: "lesson-create",
    component: LessonCreate
  },
  {
    path: "/lessons/:id",
    name: "lesson",
    component: LessonComponent,
    props: true
  },
  {
    path: "/components",
    name: "components",
    component: ComponentGallery
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
