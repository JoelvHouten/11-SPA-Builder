<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  modelValue: string
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>();

// lokale kopie om props niet direct te muteren
const localText = ref(props.modelValue);

// watch om wijzigingen door te geven aan parent/store
watch(localText, (newValue) => {
  emit('update:modelValue', newValue);
});
</script>

<template>
  <div class="lesson__block lesson__block--lesson">
    <textarea
      v-model="localText"
      placeholder="Typ hier je lesinhoud..."
    ></textarea>
  </div>
</template>

<style scoped>
.lesson__block--lesson textarea {
  width: 100%;
  min-height: 120px;
  padding: 12px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #cfcfcf;
  background: #313131;
  color: #fdfdfd;
  resize: vertical;
}
</style>