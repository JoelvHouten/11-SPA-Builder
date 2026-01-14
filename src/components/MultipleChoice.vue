<template>
  <div class="multiple-choice" :class="{ 'multiple-choice--editing': isEditing }">
    <!-- Edit Mode Toggle - Only visible in admin mode -->
    <button
      v-if="adminStore.isAdminMode"
      class="multiple-choice__edit-toggle"
      @click="isEditing = !isEditing"
    >
      {{ isEditing ? '✓ Done' : '✎ Edit' }}
    </button>

    <input
      v-if="isEditing"
      v-model="editableQuestion"
      class="multiple-choice__question-input"
      placeholder="Enter question..."
    />
    <h3 v-else class="multiple-choice__question">{{ editableQuestion }}</h3>

    <div class="multiple-choice__options">
      <div
        v-for="(option, index) in editableOptions"
        :key="index"
        class="multiple-choice__option-wrapper"
      >
        <label
          v-if="!isEditing"
          class="multiple-choice__option"
          :class="{
            'multiple-choice__option--selected': selectedAnswer === index,
            'multiple-choice__option--correct': showResult && index === editableCorrectAnswer,
            'multiple-choice__option--incorrect': showResult && selectedAnswer === index && index !== editableCorrectAnswer
          }"
          @click="selectAnswer(index)"
        >
          <input
            type="radio"
            :name="groupName"
            :value="index"
            :checked="selectedAnswer === index"
            :disabled="showResult"
            class="multiple-choice__input"
          />
          <span class="multiple-choice__radio"></span>
          <span class="multiple-choice__text">{{ option }}</span>
        </label>

        <div v-else class="multiple-choice__option multiple-choice__option--edit">
          <input
            type="radio"
            :name="`${groupName}-edit`"
            :value="index"
            v-model="editableCorrectAnswer"
            class="multiple-choice__correct-radio"
            title="Mark as correct answer"
          />
          <input
            v-model="editableOptions[index]"
            class="multiple-choice__option-input"
            placeholder="Enter option..."
          />
          <button
            class="multiple-choice__remove-btn"
            @click="removeOption(index)"
            :disabled="editableOptions.length <= 2"
            title="Remove option"
          >
            ✕
          </button>
        </div>
      </div>

      <button
        v-if="isEditing"
        class="multiple-choice__add-btn"
        @click="addOption"
      >
        + Add Option
      </button>
    </div>

    <p v-if="isEditing" class="multiple-choice__hint">
      Select the radio button to mark the correct answer
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useAdminStore } from '@/stores/adminStore'

const adminStore = useAdminStore()

const props = withDefaults(defineProps<{
  question: string
  options: string[]
  correctAnswer: number
  groupName?: string
}>(), {
  groupName: 'quiz-group'
})

const emit = defineEmits<{
  'update:question': [value: string]
  'update:correctAnswer': [value: number]
}>()

// Quiz state
const selectedAnswer = ref<number | null>(null)
const showResult = ref(false)

// Edit state
const isEditing = ref(false)
const editableQuestion = ref(props.question)
const editableCorrectAnswer = ref(props.correctAnswer)

// Reference the same array - no spread
const editableOptions = ref(props.options)

const isCorrect = computed(() => selectedAnswer.value === editableCorrectAnswer.value)

function selectAnswer(index: number) {
  if (showResult.value || isEditing.value) return

  selectedAnswer.value = index
  showResult.value = true
}

function addOption() {
  editableOptions.value.push('')
}

function removeOption(index: number) {
  if (editableOptions.value.length <= 2) return

  editableOptions.value.splice(index, 1)

  if (editableCorrectAnswer.value >= editableOptions.value.length) {
    editableCorrectAnswer.value = editableOptions.value.length - 1
  } else if (editableCorrectAnswer.value > index) {
    editableCorrectAnswer.value--
  }
}

// Sync when props change from parent
watch(() => props.question, (newVal) => {
  editableQuestion.value = newVal
})

watch(() => props.correctAnswer, (newVal) => {
  editableCorrectAnswer.value = newVal
})

// When exiting edit mode, emit updates for primitives only
watch(isEditing, (editing, wasEditing) => {
  if (wasEditing && !editing) {
    selectedAnswer.value = null
    showResult.value = false

    // Emit updates for question and correctAnswer
    if (editableQuestion.value !== props.question) {
      emit('update:question', editableQuestion.value)
    }
    if (editableCorrectAnswer.value !== props.correctAnswer) {
      emit('update:correctAnswer', editableCorrectAnswer.value)
    }
    // Array changes are already reflected in parent (same reference)
  }
})

watch(() => adminStore.isAdminMode, (isAdmin) => {
  if (!isAdmin && isEditing.value) {
    isEditing.value = false
  }
})

function reset() {
  selectedAnswer.value = null
  showResult.value = false
}

defineExpose({ reset })
</script>

<style scoped lang="scss">
.multiple-choice {
  max-width: 500px;
  padding: 1.5rem;
  background: var(--color-background, #fff);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  position: relative;

  &--editing {
    border: 2px dashed #6c757d;
  }

  &__edit-toggle {
    position: absolute;
    top: 1rem;
    right: 1rem;
    padding: 0.4rem 0.75rem;
    background: #6c757d;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 0.85rem;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background: #5a6268;
    }

    .multiple-choice--editing & {
      background: #198754;

      &:hover {
        background: #157347;
      }
    }
  }

  &__question {
    margin-bottom: 1.5rem;
    padding-right: 4rem;
    font-size: 1.25rem;
    color: var(--color-text, #333);
  }

  &__question-input {
    width: 100%;
    margin-bottom: 1.5rem;
    padding: 0.75rem;
    padding-right: 4rem;
    font-size: 1.25rem;
    font-weight: bold;
    border: 2px solid #dee2e6;
    border-radius: 8px;
    background: #f8f9fa;

    &:focus {
      outline: none;
      border-color: #0d6efd;
      background: white;
    }
  }

  &__options {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  &__option-wrapper {
    display: flex;
  }

  &__option {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 1.25rem;
    background: #f8f9fa;
    border: 2px solid transparent;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    flex: 1;

    &:hover {
      background: #e9ecef;
      border-color: #dee2e6;
    }

    &--selected {
      background: #e7f1ff;
      border-color: #0d6efd;

      .multiple-choice__radio {
        border-color: #0d6efd;

        &::after {
          transform: translate(-50%, -50%) scale(1);
          background: #0d6efd;
        }
      }
    }

    &--correct {
      background: #d1e7dd;
      border-color: #198754;
      cursor: default;

      &:hover {
        background: #d1e7dd;
        border-color: #198754;
      }

      .multiple-choice__radio {
        border-color: #198754;

        &::after {
          transform: translate(-50%, -50%) scale(1);
          background: #198754;
        }
      }
    }

    &--incorrect {
      background: #f8d7da;
      border-color: #dc3545;
      cursor: default;

      &:hover {
        background: #f8d7da;
        border-color: #dc3545;
      }

      .multiple-choice__radio {
        border-color: #dc3545;

        &::after {
          transform: translate(-50%, -50%) scale(1);
          background: #dc3545;
        }
      }
    }

    &--edit {
      cursor: default;
      background: #fff;
      border: 2px solid #dee2e6;

      &:hover {
        background: #fff;
        border-color: #dee2e6;
      }
    }
  }

  &__input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  &__radio {
    width: 20px;
    height: 20px;
    border: 2px solid #adb5bd;
    border-radius: 50%;
    position: relative;
    flex-shrink: 0;
    transition: all 0.2s ease;

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0);
      width: 10px;
      height: 10px;
      background: #0d6efd;
      border-radius: 50%;
      transition: transform 0.2s ease;
    }
  }

  &__text {
    font-size: 1rem;
    color: var(--color-text, #333);
  }

  &__correct-radio {
    width: 20px;
    height: 20px;
    accent-color: #198754;
    cursor: pointer;
    flex-shrink: 0;
  }

  &__option-input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: #0d6efd;
    }
  }

  &__remove-btn {
    padding: 0.25rem 0.5rem;
    background: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover:not(:disabled) {
      background: #bb2d3b;
    }

    &:disabled {
      background: #dee2e6;
      cursor: not-allowed;
    }
  }

  &__add-btn {
    padding: 0.75rem;
    background: transparent;
    color: #0d6efd;
    border: 2px dashed #0d6efd;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: #e7f1ff;
    }
  }

  &__result {
    margin-top: 1rem;
    padding: 0.75rem;
    border-radius: 8px;
    text-align: center;
    font-weight: 600;

    &--correct {
      background: #d1e7dd;
      color: #0f5132;
    }

    &--incorrect {
      background: #f8d7da;
      color: #842029;
    }
  }

  &__hint {
    margin-top: 1rem;
    padding: 0.5rem;
    background: #fff3cd;
    color: #664d03;
    border-radius: 6px;
    font-size: 0.875rem;
    text-align: center;
  }
}
</style>
