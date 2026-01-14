<script setup lang="ts">
import { useLessenStore } from "../stores/lessonStore";
import LessonCard from "../components/LessonCard.vue";

const store = useLessenStore();
store.load(); // haal opgeslagen lessen op

// eventueel filteren of sorteren van lessen kan hier
</script>

<template>
  <main class="lesson-overview">
    <h1>Lessons</h1>
    <div class="lesson-grid">
      <LessonCard
        v-for="lesson in store.lessen"
        :key="lesson.id"
        :lesson="lesson"
      />
    </div>
  </main>
</template>

<style scoped>
.lesson-overview {
  max-width: 900px;
  margin: 0 auto;
  padding: 16px;
}

.lesson-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}
</style>