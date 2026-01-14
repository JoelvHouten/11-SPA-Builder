<script setup lang="ts">
import { ref, computed } from "vue";
import BasicButton from "../components/Basic/BasicButton.vue";
import Hero from "../components/blocks/headimage.vue";
import DraggableGrid from "@/components/DraggableGrid/DraggableGrid.vue";
import BasicCard from "@/components/Basic/BasicCard.vue";

interface Card {
  title: string
  innerText: string
  img?: string
}

const items = ref<Card[]>([
  { title: 'Les titel', innerText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam convallis, quam eu sagittis consequat, nisl eros feugiat sapien, quis congue tellus urna ut sem.'},
  { title: 'JEP', innerText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam convallis, quam eu sagittis consequat, nisl eros feugiat sapien, quis congue tellus urna ut sem.'},
  {
    title: 'Ja nog een',
    innerText: 'According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don\'t care what humans think is impossible. Yellow, black. Yellow, black. Yellow, black. Yellow, black. Ooh, black and yellow! Let\'s shake it up a little. Barry! Breakfast is ready! Coming! Hang on a second. Hello? - Barry? - Adam? - Can you believe this is happening? - I can\'t. I\'ll pick you up. Looking sharp. Use the stairs. Your father paid good money for those. Sorry. I\'m excited. Here\'s the graduate. We\'re very proud of you, son. A perfect report card, all B\'s. Very proud. Ma! I got a thing going here. - You got lint on your fuzz. - Ow! That\'s me! - Wave to us! We\'ll be in row 118,000. - Bye! Barry, I told you, stop flying in the house! - Hey, Adam. - Hey, Barry. - Is that fuzz gel? - A little. Special day, graduation. Never thought I\'d make it. Three days grade school, three days high school. Those were awkward. Three days college. I\'m glad I took a day and hitchhiked around the hive. You did come back different. - Hi, Barry. - Artie, growing a mustache? Looks good. - Hear about Frankie? - Yeah. - You going to the funeral? - No, I\'m not going. Everybody knows, sting someone, you die. Don\'t waste it on a squirrel. Such a hothead. I guess he could have just gotten out of the way. I love this incorporating an amusement park into our day. That\'s why we don\'t need vacations. Boy, quite a bit of pomp... under the circumstances. - Well, Adam, today we are men. - We are! - Bee-men. - Amen! Hallelujah!'
  }
])

const props = defineProps({
  title: { type: String, default: "Lesson Title" },
  lessonText: {
    type: String,
    default:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
  },
  taskText: {
    type: String,
    default:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor.",
  },
  question: { type: String, default: "Which option is correct?" },
  answersCount: { type: Number, default: 4 },
});

const emit = defineEmits<{
  (e: 'edit'): void;
  (e: 'answer', payload: { index: number; label: string }): void;
}>();
const selected = ref<number | null>(null);

const labels = computed(() =>
  Array.from({ length: props.answersCount }, (_, i) => String.fromCharCode(65 + i))
);

function onEdit() {
  emit("edit");
}

function selectAnswer(idx: number) {
  selected.value = idx;
  const label = labels.value[idx];
  if (label !== undefined) {
    emit("answer", { index: idx, label });
  }
}
</script>

<template>
  <main class="lesson">
    <!-- Hero block (image + title) -->
    <component :is="Hero" :title="title">
      <template #overlay-actions>
        <button class="lesson__edit-btn" @click="onEdit" aria-label="Edit lesson">
          <i class="fa fa-edit" aria-hidden="true"></i>
        </button>
      </template>
    </component>

    <section class="lesson__content">
      <div class="lesson__block lesson__block--lesson">
        <p class="lesson__text">{{ lessonText }}</p>
      </div>

      <div class="lesson__block lesson__block--task">
        <h2 class="lesson__task-title">Task</h2>
        <p class="lesson__task-text">{{ taskText }}</p>
      </div>

      <div class="page__wrapper">
        <DraggableGrid v-model="items" class="page__grid">
          <template #default="{ item }">
            <BasicCard
              :title="item.title"
              :innerText="item.innerText"
              :img="item.img"
            />
          </template>
        </DraggableGrid>
      </div>
<!--      <div class="lesson__block lesson__block&#45;&#45;question">-->
<!--        <h2 class="lesson__question-title">Question</h2>-->
<!--        <p class="lesson__question-body">{{ question }}</p>-->
<!--        <div class="lesson__answers" role="list">-->
<!--          <BasicButton-->
<!--            v-for="(label, idx) in labels"-->
<!--            :key="idx"-->
<!--            :label="label"-->
<!--            class="lesson__answer"-->
<!--            :class="{ 'lesson__answer&#45;&#45;selected': selected === idx }"-->
<!--            @click="selectAnswer(idx)"-->
<!--            role="listitem"-->
<!--            :aria-pressed="selected === idx"-->
<!--          />-->
<!--        </div>-->
<!--      </div>-->
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

.page__title {
  margin: 0;
  font-size: 2.25rem;
  font-weight: 600;
}

.page__wrapper {
  display: flex;
  justify-content: center;
}

.page__grid {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  max-width: 50rem;
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
</style>
