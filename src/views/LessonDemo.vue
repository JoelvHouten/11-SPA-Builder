<template>
  <main class="container py-5">
    <header class="mb-5 text-center">
      <h1 class="page__title">Lesson</h1>
    </header>

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
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BasicCard from '@/components/Basic/BasicCard.vue'
import DraggableGrid from '@/components/DraggableGrid/DraggableGrid.vue'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

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
</script>

<style scoped lang="scss">
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
</style>
