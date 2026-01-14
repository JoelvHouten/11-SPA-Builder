<script setup lang="ts">
import Modal from '@/components/Medium/MediumModal.vue'
import BaseButton from '@/components/Basic/BasicButton.vue'

const emit = defineEmits<{
  (e: 'add', type: 'text' | 'image' | 'question'): void
}>()
</script>

<template>
  <Modal triggerText="+ Add block">
    <h3>Add a block</h3>

    <BaseButton
      label="Text block"
      @click="emit('add', 'text')"
    />

    <BaseButton
      label="Image block"
      @click="emit('add', 'image')"
    />

    <BaseButton
      label="Question block"
      @click="emit('add', 'question')"
    />
  </Modal>
</template>