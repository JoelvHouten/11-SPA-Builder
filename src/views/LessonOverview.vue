<script setup lang="ts">
import { onMounted } from "vue"
import { useLessonStore } from "@/stores/lessonStore"
import LessonCard from "@/components/LessonCard.vue"
import Modal from "@/components/Medium/MediumModal.vue"
import BaseButton from "@/components/Basic/BasicButton.vue"
import { useRouter } from "vue-router"

const store = useLessonStore()
const router = useRouter()

onMounted(() => {
  store.load()
})

function createLesson() {
  const tempId = crypto.randomUUID()
  router.push({ name: 'lesson', params: { id: tempId }, query: { new: '1' } })
}

function openLesson(id: string) {
  router.push({ name: 'lesson', params: { id } })
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
        v-for="lesson in store.lessons"
        :key="lesson.id"
        :lesson="lesson"
        @click="openLesson(lesson.id)"
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
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}
</style>
