<template>
  <div class="draggable-grid">
    <div v-if="adminStore.isAdminMode" class="draggable-grid__toggle">
      <button
        class="draggable-grid__edit-btn"
        :class="{ 'draggable-grid__edit-btn--active': editMode }"
        @click="editMode = !editMode"
      >
        {{ editMode ? '✓ Done Reordering' : '↕ Reorder Items' }}
      </button>
    </div>

    <TransitionGroup name="draggable-list" tag="div" class="draggable-grid__items">
      <div
        v-for="index in itemCount"
        :key="index"
        class="draggable-grid__item"
        :class="{
          'draggable-grid__item--dragging': isDragging && draggingIndex === index - 1,
          'draggable-grid__item--placeholder': isDragging && placeholderIndex === index - 1 && index - 1 !== draggingIndex,
          'draggable-grid__item--editable': editMode && !isDragging
        }"
        :data-drag-index="index - 1"
        @pointerdown="editMode ? handlePointerDown(index - 1, $event) : undefined"
      >
        <slot name="item" :index="index - 1" />
      </div>
    </TransitionGroup>

    <Teleport to="body">
      <div
        v-if="isDragging && draggingIndex !== null"
        class="draggable-grid__ghost"
        :style="{
          left: `${cursorPosition.x - offset.x}px`,
          top: `${cursorPosition.y - offset.y}px`,
          width: `${ghostWidth}px`
        }"
      >
        <slot name="ghost" :index="draggingIndex">
          <slot name="item" :index="draggingIndex" />
        </slot>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useDraggableList } from '@/Composables/useDrag.ts'
import { useAdminStore } from '@/stores/adminStore'

const adminStore = useAdminStore()

interface Props {
  itemCount: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'reorder': [payload: { from: number; to: number }]
}>()

const offset = ref({ x: 0, y: 0 })
const ghostWidth = ref(0)
const editMode = ref(false)

// Exit edit mode when admin mode is disabled
watch(() => adminStore.isAdminMode, (isAdmin) => {
  if (!isAdmin && editMode.value) {
    editMode.value = false
  }
})

// Create a dummy array for the composable (it just needs to track count)
const dummyItems = computed(() => ({ value: Array(props.itemCount).fill(null) }))

// Use the composable for drag state management
const drag = useDraggableList(dummyItems)
const {
  isDragging,
  draggingIndex,
  placeholderIndex,
  cursorPosition,
  startDrag,
  endDrag
} = drag

function handlePointerDown(index: number, e: PointerEvent) {
  if (!editMode.value) return

  e.preventDefault()

  const target = e.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()

  offset.value.x = e.clientX - rect.left
  offset.value.y = e.clientY - rect.top
  ghostWidth.value = rect.width

  startDrag(index, e.clientX, e.clientY)

  target.setPointerCapture(e.pointerId)

  const cleanup = () => {
    target.releasePointerCapture(e.pointerId)
    handleDrop()
  }

  target.addEventListener('pointerup', cleanup, { once: true })
  target.addEventListener('pointercancel', cleanup, { once: true })
}

function handleDrop() {
  const result = endDrag()

  // Just emit the indices - don't manipulate any data
  if (!result || result.from === null || result.to === null) return
  if (result.from === result.to) return

  emit('reorder', {
    from: result.from,
    to: result.to
  })
}
</script>

<style scoped lang="scss">
.draggable-grid {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;

  &__toggle {
    width: 100%;
    margin-bottom: 1rem;
    text-align: right;
  }

  &__edit-btn {
    padding: 0.5rem 1rem;
    background: #6c757d;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background: #5a6268;
    }

    &--active {
      background: #198754;

      &:hover {
        background: #157347;
      }
    }
  }

  &__items {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__item {
    touch-action: auto;
    user-select: auto;

    &--editable {
      cursor: grab;
      touch-action: none;
      user-select: none;
      position: relative;
      animation: wiggle 0.3s ease-in-out infinite;

      &:active {
        cursor: grabbing;
      }
    }

    &--dragging {
      opacity: 0;
    }

    &--placeholder {
      opacity: 0.5;
      transform: scale(0.95);
    }
  }

  &__ghost {
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    opacity: 0.9;
    filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2));
  }
}

.draggable-list-move {
  transition: transform 0.3s ease;
}

@keyframes wiggle {
  0%, 100% {
    transform: rotate(-0.5deg);
  }
  50% {
    transform: rotate(0.5deg);
  }
}
</style>
