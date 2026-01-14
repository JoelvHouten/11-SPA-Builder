<template>
  <TransitionGroup name="draggable-list" tag="div" class="draggable-list">
    <div v-if="adminStore.isAdminMode" key="edit-toggle" class="draggable-list__toggle">
      <button
        class="draggable-list__edit-btn"
        :class="{ 'draggable-list__edit-btn--active': editMode }"
        @click="editMode = !editMode"
      >
        {{ editMode ? '✓ Done Reordering' : '↕ Reorder Items' }}
      </button>
    </div>

    <div
      v-for="(item, index) in modelValue"
      :key="getKey(item, index)"
      class="draggable-list__item"
      :class="{
        'draggable-list__item--dragging': isDragging && draggingIndex === index,
        'draggable-list__item--placeholder': isDragging && placeholderIndex === index && index !== draggingIndex,
        'draggable-list__item--editable': editMode && !isDragging
      }"
      :data-drag-index="index"
      @pointerdown="editMode ? handlePointerDown(index, $event) : undefined"
    >
      <slot :item="item" :index="index" />
    </div>

    <Teleport to="body">
      <div
        v-if="isDragging && draggingItem !== undefined"
        class="draggable-list__ghost"
        :style="{
          left: `${cursorPosition.x - offset.x}px`,
          top: `${cursorPosition.y - offset.y}px`,
          width: `${ghostWidth}px`
        }"
      >
        <slot name="ghost" :item="draggingItem">
          <slot :item="draggingItem" :index="draggingIndex" />
        </slot>
      </div>
    </Teleport>
  </TransitionGroup>
</template>

<script setup lang="ts" generic="T">
import { computed, ref, watch } from 'vue'
import { useDraggableList } from '@/Composables/useDrag.ts'
import { useAdminStore } from '@/stores/adminStore'

const adminStore = useAdminStore()

interface Props {
  modelValue: T[]
  itemKey?: (item: T, index: number) => string | number
}

const props = withDefaults(defineProps<Props>(), {
  itemKey: (_, index) => index
})

const emit = defineEmits<{
  'update:modelValue': [value: T[]]
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

const itemsRef = computed(() => props.modelValue)
const drag = useDraggableList(itemsRef)
const {
  isDragging,
  draggingIndex,
  draggingItem,
  placeholderIndex,
  cursorPosition,
  startDrag,
  endDrag
} = drag

function getKey(item: T, index: number) {
  return props.itemKey(item, index)
}

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

  if (!result || result.from === null || result.to === null) return
  if (result.from === result.to) return

  const newArray = [...props.modelValue]
  const [item] = newArray.splice(result.from, 1)
  newArray.splice(result.to, 0, item)

  emit('update:modelValue', newArray)
}
</script>

<style scoped lang="scss">
.draggable-list {
  display: contents;

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

  &-move {
    transition: transform 0.3s ease;
  }
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
