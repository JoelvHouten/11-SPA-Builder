<script setup lang="ts">
import { reactive, computed, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import Hero from "../components/blocks/headimage.vue"
import DraggableGrid from "@/components/DraggableGrid/DraggableGrid.vue"
import BasicCard from "@/components/Basic/BasicCard.vue"
import MultipleChoice from "@/components/MultipleChoice.vue"
import { useAdminStore } from '@/stores/adminStore'
import { useLessonStore, Lesson } from '@/stores/lessonStore'

const lessonStore = useLessonStore()
const adminStore = useAdminStore()
const route = useRoute()
const router = useRouter()

const lessonId = String(route.params.id ?? '')
const isNewDraft = route.query.new === '1'

onMounted(() => lessonStore.load())

const local = reactive<Lesson>({
  id: lessonId || crypto.randomUUID(),
  title: 'Untitled lesson',
  blocks: []
})

// initialize local draft
function initLocal() {
  const existing = lessonStore.getLessonById(lessonId)
  if (existing && !isNewDraft) {
    Object.assign(local, JSON.parse(JSON.stringify(existing)))
  }
}
initLocal()

const blocks = computed(() => local.blocks)
const lessonTitle = computed(() => local.title)

function addTextBlock() {
  local.blocks.push({
    id: crypto.randomUUID(),
    title: 'New block',
    text: 'Edit me'
  })
}

function removeBlock(index: number) {
  local.blocks.splice(index, 1)
}

function updateBlockText(index: number, text: string) {
  const b = local.blocks[index]
  if (!b) return
  b.text = text
}

function handleReorder({ from, to }: { from: number; to: number }) {
  if (from === to) return
  const newBlocks = [...local.blocks]
  const [moved] = newBlocks.splice(from, 1)
  if (!moved) return
  newBlocks.splice(to, 0, moved)
  local.blocks = newBlocks
}

function saveLesson() {
  lessonStore.saveLesson(JSON.parse(JSON.stringify(local)))
  // alert("Lesson saved!")
}
</script>

<template>
  <main class="lesson">
    <component :is="Hero" :title="lessonTitle">
      <template #overlay-actions>
        <button
          class="admin-toggle lesson__edit-btn"
          :class="{ 'admin-toggle--active': adminStore.isAdminMode }"
          @click="adminStore.toggleAdminMode()"
        >
          <i class="fa fa-edit"></i>
          {{ adminStore.isAdminMode ? 'Admin' : 'Admin' }}
        </button>

        <button
          v-if="adminStore.isAdminMode"
          @click="saveLesson"
          style="margin-left:12px; background:#0d6efd; color:white; border:none; padding:0.5rem 1rem; border-radius:6px; cursor:pointer;"
        >
          Save Lesson
        </button>
      </template>
    </component>

    <section class="lesson__content">
      <p>Admin mode: {{ adminStore.isAdminMode }}</p>

      <div class="page__wrapper">
        <DraggableGrid
          :item-count="blocks.length"
          :item-keys="blocks.map(b => b.id)"
          @reorder="handleReorder"
          class="page__grid"
        >
          <template #item="{ index }">
            <BasicCard
              :key="blocks[index].id"
              :title="blocks[index].title"
            >
              <div v-if="adminStore.isAdminMode">
          <textarea
            v-model="blocks[index].text"
            rows="3"
            style="width:100%; margin-bottom:8px;"
          />
                <button @click="removeBlock(index)">Delete</button>
              </div>
              <div v-else>
                <p>{{ blocks[index].text }}</p>
              </div>

              <MultipleChoice
                v-if="blocks[index].multipleChoice"
                v-model:question="blocks[index].multipleChoice.question"
                :options="blocks[index].multipleChoice.options"
                v-model:correct-answer="blocks[index].multipleChoice.correctAnswerIndex"
              />
            </BasicCard>
          </template>
        </DraggableGrid>

        <!-- Add Block button -->
        <div
          v-if="adminStore.isAdminMode"
          class="add-block-wrapper"
        >
          <div class="add-block" @click="addTextBlock">
            +
          </div>
        </div>
      </div>

    </section>
  </main>
</template>


<style lang="scss" scoped>
$bg: #2e2e2e;
$block-bg: #313131;
$muted: #626262;
$border: #e6e6e6;
$accent: #79c4fa;
$text-color: #fdfdfd;

.page__wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.page__grid {
  width: 100%;
  max-width: 50rem;
}

.admin-toggle {
  margin-top: 1rem;
  padding: 0.5rem 1.25rem;
  color: #d75e5e;
  background: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #d5d5d5;
  }

  &--active {
    background: #198754;
    color: white;


    &:hover {
      background: #157347;
    }
  }
}
.add-block-wrapper {
  margin-top: 12px;
  width: 100%;
  max-width: 50rem;
}

.add-block {
  // reuse card style
  background: $block-bg;
  border: 1px solid $border;
  border-radius: 8px;
  width: 100%;
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #ffffff;
  cursor: pointer;
  border: 2px dashed #a6a6a6;
  text-align: center;
  user-select: none;
  transition: background 0.2s;

  &:hover {
    background: rgba(66, 66, 66, 0.84);
  }
}



.lesson {
  display: block;
  background: $bg;
  color: $text-color;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;

  &__hero {
    height: 220px;
    display: flex;
    align-items: flex-end;
    position: relative;
    background-color: $accent;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;

    &-overlay {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 12px 16px;
      background: linear-gradient(transparent, rgba(0, 0, 0, 0.45));
      box-sizing: border-box;
    }

    & .lesson__title {
      color: $text-color;
      font-weight: 600;
      margin: 0;
      text-align: center;
      font-size: 1.25rem;
      flex: 1 1 auto;
    }

    & .lesson__edit-btn {
      margin-left: auto;
      border: 1px solid rgba(255, 255, 255, 0.25);
      padding: 6px 10px;
      border-radius: 6px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;

      i { font-size: 0.9rem; }
    }
  }

  &__content {
    padding: 16px;
    max-width: 900px;
    margin: 0 auto;
    display: grid;
    gap: 12px;
  }

  &__block {
    background: $block-bg;
    border: 1px solid $border;
    padding: 16px;
    border-radius: 8px;

    &--lesson {
      .lesson__text {
        color: $text-color;
        margin: 0;
      }
    }

    &--task {
      background: #545353;

      .lesson__task-title {
        margin: 0 0 8px 0;
        font-size: 1rem;
      }

      .lesson__task-text {
        margin: 0;
        color: $text-color;
      }
    }

    &--question {
      .lesson__question-title {
        margin: 0 0 8px 0;
        font-size: 1rem;
      }

      .lesson__question-body {
        margin: 0 0 12px 0;
        color: $text-color;
      }

      .lesson__answers {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
        gap: 8px;
      }

      .lesson__answer {
        background: #fafafa;
        border: 1px solid $border;
        padding: 10px 12px;
        border-radius: 6px;
        cursor: pointer;
        text-align: center;
        font-weight: 600;
        color: #454545;

        &--selected {
          background: #9186d9;
          border-color: #cfcfcf;
        }
      }
    }
  }
}
</style>
