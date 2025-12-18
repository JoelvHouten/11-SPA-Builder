import { ref, shallowRef, computed, onUnmounted } from 'vue'

export function useDraggableList<T>(items: { value: T[] }) {
  const isDragging = ref(false)
  const draggingIndex = ref<number | null>(null)
  const placeholderIndex = ref<number | null>(null)
  const cursorPosition = ref({ x: 0, y: 0 })
  const draggingItem = shallowRef<T | null>(null)

  let rafId: number | null = null

  function startDrag(index: number, clientX: number, clientY: number) {
    draggingIndex.value = index
    placeholderIndex.value = index
    draggingItem.value = items.value[index]
    isDragging.value = true
    cursorPosition.value = { x: clientX, y: clientY }

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', endDrag)
    window.addEventListener('pointercancel', endDrag)
  }

  function onPointerMove(e: PointerEvent) {
    cursorPosition.value = { x: e.clientX, y: e.clientY }

    if (rafId !== null) return

    rafId = requestAnimationFrame(() => {
      rafId = null
      updatePlaceholder()
    })
  }

  function updatePlaceholder() {
    const hovered = document.elementFromPoint(
      cursorPosition.value.x,
      cursorPosition.value.y
    )
    if (!hovered) return

    const wrapper = hovered.closest('[data-drag-index]')
    if (!wrapper) return

    const indexAttr = wrapper.getAttribute('data-drag-index')
    if (indexAttr === null) return

    const newIndex = parseInt(indexAttr, 10)
    if (!isNaN(newIndex) && newIndex !== placeholderIndex.value) {
      placeholderIndex.value = newIndex
    }
  }

  function endDrag() {
    cleanup()

    const result = {
      from: draggingIndex.value,
      to: placeholderIndex.value
    }

    draggingIndex.value = null
    placeholderIndex.value = null
    draggingItem.value = null
    isDragging.value = false

    return result
  }

  function cleanup() {
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
      rafId = null
    }

    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerup', endDrag)
    window.removeEventListener('pointercancel', endDrag)
  }

  onUnmounted(cleanup)

  return {
    isDragging,
    draggingIndex,
    draggingItem,
    placeholderIndex,
    cursorPosition,
    startDrag,
    endDrag
  }
}
