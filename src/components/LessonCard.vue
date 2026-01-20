🧱 LessonCard.vue
<script setup lang="ts">
import BaseButton from "@/components/Basic/BasicButton.vue"

defineProps<{
  lesson: {
    id: string
    title: string
    blocks: unknown[]
  }
}>()

const emit = defineEmits<{
  view: [id: string]
  edit: [id: string]
}>()
</script>

<template>
  <article class="lesson-card">
    <h3>{{ lesson.title }}</h3>
    <p>{{ lesson.blocks.length }} blocks</p>

    <div class="lesson-card__actions">
      <BaseButton label="View" @click="emit('view', lesson.id)" />
      <BaseButton label="Edit" @click="emit('edit', lesson.id)" />
    </div>
  </article>
</template>

<style scoped>
.lesson-card {
  background: #ffffff;
  padding: 16px;
  border-radius: 8px;
}

.lesson-card__actions {
  display: flex;
  gap: 8px;
}
</style>
