<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import BasicButton from "../components/Basic/BasicButton.vue";
import Hero from "../components/blocks/headimage.vue";
import { useLessenStore } from "../stores/lessonStore";

const router = useRouter();
const store = useLessenStore();
store.load(); // ensure we have persisted lessons available

// Form state
const title = ref("New Lesson");
const lessonText = ref(
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus."
);
const taskText = ref("Describe the task here...");
const question = ref("Which option is correct?");
const answersCount = ref(4);

// Answers array used for editing labels and correct flag
const answers = ref<{ label: string; correct: boolean }[]>(
  Array.from({ length: answersCount.value }, (_, i) => ({
    label: String.fromCharCode(65 + i),
    correct: false,
  }))
);

// Header image data URL (optional)
const image = ref<string | undefined>(undefined);

// Keep answers array in sync when answersCount changes
watch(answersCount, (n) => {
  const diff = n - answers.value.length;
  if (diff > 0) {
    for (let i = 0; i < diff; i++) {
      const idx = answers.value.length;
      answers.value.push({ label: `Option ${idx + 1}`, correct: false });
    }
  } else if (diff < 0) {
    answers.value.splice(n);
  }
});

const saving = ref(false);
const message = ref("");


/**
 * Save the lesson data to the store. Coworkers can replace or extend
 * this to call an API or open the new lesson in an editor view.
 */
function saveLesson() {
  saving.value = true;

  // Validate: we need at least one answer label
  const labels = answers.value.map((a) => a.label.trim()).filter(Boolean);
  if (labels.length === 0) {
    message.value = "Please add at least one answer.";
    saving.value = false;
    return;
  }

  const payload = {
    title: title.value,
    lessonText: lessonText.value,
    taskText: taskText.value,
    question: question.value,
    answers: labels,
    answersCount: answers.value.length,
    answerLabels: labels,
    correctIndex: answers.value.findIndex((a) => a.correct),
    image: image.value, // data URL or null
  };

  // Store helper returns the new id
  const id = store.maakLesMetData(payload);

  saving.value = false;
  message.value = `Lesson created (id: ${id}).`;

  // TODO: navigate directly to an editor for the new lesson (if created)
  // router.push(`/lesson/edit/${id}`)
}



function cancel() {
  router.push("/");
}

function addAnswer(){
  answers.value.push({ label: `Option ${answers.value.length + 1}`, correct: false });
}

function removeAnswer(idx:number){
  if(idx>=0 && idx < answers.value.length){
    answers.value.splice(idx,1);
  }
}

function setCorrect(idx:number){
  answers.value.forEach((a,i)=> a.correct = (i === idx));
}

// File input handlers for header image
function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement;
  const file = input.files && input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    image.value = reader.result as string;
  };
  reader.readAsDataURL(file);
}

function clearImage() {
  image.value = undefined;
  const el = document.getElementById('headerImage') as HTMLInputElement | null;
  if (el) el.value = '';
}
</script>

<template>
  <main class="lesson">
      <component :is="Hero" :title="''" :image="image">
        <template #overlay-actions>
          <input
            class="lesson__title-input"
            v-model="title"
            placeholder="Lesson title"
            aria-label="Lesson title"
          />

          <label class="file-btn">
            <input id="headerImage" class="file-input" type="file" accept="image/*" @change="onFileChange" />
            <span>Choose header image</span>
          </label>
          <div class="inline-actions">
            <button v-if="image" class="btn" @click.prevent="clearImage">Remove image</button>
            <button class="btn primary" @click="saveLesson" :disabled="saving">Save</button>
            <button class="btn" @click="cancel">Cancel</button>
          </div>
          <div v-if="image" class="header-thumb"><img :src="image" alt="header preview" /></div>
        </template>
      </component>

      <section class="lesson__content">
        <div class="lesson__block lesson__block--lesson">
          <textarea class="lesson__text-input" v-model="lessonText" rows="3"></textarea>
        </div>

        <div class="lesson__block lesson__block--task">
          <h2 class="lesson__task-title">Task</h2>
          <textarea class="lesson__task-text-input" v-model="taskText" rows="3"></textarea>
        </div>

        <div class="lesson__block lesson__block--question">
          <h2 class="lesson__question-title">Question</h2>
          <input class="lesson__question-input" v-model="question" type="text" />

          <div class="lesson__answers-edit">
            <div v-for="(a, idx) in answers" :key="idx" class="answer-row">
              <input v-model="a.label" type="text" class="answer-input" />
              <label class="correct-label">
                <input type="radio" :name="'correct'" :checked="a.correct" @change.prevent="setCorrect(idx)" />
                Correct
              </label>
              <button class="remove" @click.prevent="removeAnswer(idx)">✕</button>
            </div>
            <div class="answer-actions">
              <button class="btn small" @click.prevent="addAnswer">Add answer</button>
            </div>

            <div class="answers-preview" aria-hidden="true">
              <BasicButton
                v-for="(label, idx) in answers.map(x => x.label)"
                :key="idx"
                :label="label"
                class="lesson__answer"
              />
            </div>
          </div>
        </div>
      </section>

      <p v-if="message" class="info">{{ message }}</p>
    </main>
</template>

<style scoped lang="scss">
/* Reuse LessonComponent layout styles */
$bg: #2e2e2e;
$block-bg: #313131;
$muted: #626262;
$border: #e6e6e6;
$accent: #79c4fa;
$text-color: #fdfdfd;

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
      background: rgba(255, 255, 255, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.25);
      color: #d75e5e;
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
            margin: 0 0 8px 0; font-size: 1rem;
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

/* Local inputs & inline editor tweaks */
.inline-actions { display: flex; gap: 8px; margin-left: auto; }
.btn { padding: 8px 12px; border-radius: 6px; cursor: pointer; }
.btn.primary { background: #79c4fa; border: 1px solid #4aa8ee; color: #fff; }

.lesson__title-input {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 12px;
  width: min(720px, 80%);
  display: block;
  text-align: center;
  font-size: 1.25rem;
  font-weight: 700;
  color: $text-color;
  background: rgba(0,0,0,0.12);
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.12);
  outline: none;
  z-index: 3;
  transition: box-shadow 120ms ease, border-color 120ms ease;
}

.lesson__title-input::placeholder { color: rgba(255,255,255,0.7); }
.lesson__title-input:focus { box-shadow: 0 6px 18px rgba(0,0,0,0.35); border-color: rgba(255,255,255,0.22); }

.file-input { display: none; }
.file-btn { display:inline-flex; align-items:center; gap:8px; padding:6px 8px; border-radius:6px; background: rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.08); color: $text-color; cursor:pointer; margin-left:8px; }
.header-thumb { margin-left:12px; width:48px; height:48px; border-radius:6px; overflow:hidden; border:1px solid rgba(0,0,0,0.08); }
.header-thumb img { width:100%; height:100%; object-fit:cover; display:block; }

.lesson__text-input, .lesson__task-text-input, .lesson__question-input { display: block; width: 100%; margin-top: 6px; padding: 8px; border-radius: 6px; border: 1px solid #ccc; box-sizing: border-box; font: inherit; }

.lesson__answers-edit { margin-top: 12px; }
.answer-row { display: flex; gap: 8px; align-items: center; margin-bottom: 8px; }
.answer-input { flex: 1 1 auto; padding: 6px; border-radius: 6px; border: 1px solid #ccc; }
.correct-label { display: inline-flex; align-items: center; gap: 6px; font-size: 0.9rem; }
.remove { background: transparent; border: none; color: #d75e5e; cursor: pointer; }
.answer-actions { margin-top: 6px; }

.answers-preview { margin-top: 12px; display: grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap: 8px; }
.answers-preview .lesson__answer { background: #fafafa; border: 1px solid #e6e6e6; padding: 10px 12px; border-radius: 6px; }

.btn.small { padding: 6px 8px; font-size: 0.9rem; }
</style>
