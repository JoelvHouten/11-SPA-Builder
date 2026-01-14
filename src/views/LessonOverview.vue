<script setup lang="ts">
import { onMounted } from "vue"
import { useLessenStore } from "@/stores/lessonStore.ts"
import LessonCard from "@/components/LessonCard.vue"
import Modal from "@/components/Medium/MediumModal.vue"
import BaseButton from "@/components/Basic/BasicButton.vue"
import { useRouter } from "vue-router"

const store = useLessenStore()
const router = useRouter()

onMounted(() => {
  store.load()
})

function createLesson() {
  const id = store.maakLes()
  router.push(`/lessons/${id}/edit`)
}

function editLesson(id: string) {
  router.push(`/lessons/${id}/edit`)
}

function viewLesson(id: string) {
  router.push(`/lessons/${id}`)
}
</script>

<template>
  <main class="lesson-overview">
    <header class="lesson-overview__header">
      <h1>Lessons</h1>

      <Modal triggerText="+ New lesson">
        <h3>Create new lesson</h3>

        <BaseButton label="Create lesson" @click="createLesson" />
      </Modal>
    </header>

    <section class="lesson-overview__grid">
      <LessonCard
        v-for="lesson in store.lessen"
        :key="lesson.id"
        :lesson="lesson"
        @view="viewLesson"
        @edit="editLesson"
      />
    </section>
  </main>
</template>

<style scoped>
.lesson-overview {
  padding: 24px;
}

.lesson-overview__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.lesson-overview__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}
</style>