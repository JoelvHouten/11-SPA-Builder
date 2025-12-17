<template>
  <main class="page container py-5">
    <header class="page__header mb-5 text-center">
      <h1 class="page__title">Lesson</h1>
    </header>

    <section class="page__content">
      <div class="row justify-content-center gy-4">
        <div class="col-12 col-sm-11 col-md-9 col-lg-7 col-xl-6">
          <DraggableGrid v-model="items" class="page__grid">
            <template #default="{ item }">
              <div class="page__card">
                <BasicCard
                  :title="item.title"
                  :innerText="item.innerText"
                  :img="item.img"
                />
              </div>
            </template>
          </DraggableGrid>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BasicCard from '@/components/Basic/BasicCard.vue'
import DraggableGrid from '@/components/DraggableGrid/DraggableGrid.vue'

interface Card {
  title: string
  innerText: string
  img?: string
}

const items = ref<Card[]>([
  { title: 'Jane Doe', innerText: 'Back-end Developer' },
  { title: 'John Smith', innerText: 'Front-end Developer' },
  {
    title: 'Emily Chen',
    innerText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam convallis, quam eu sagittis consequat, nisl eros feugiat sapien, quis congue tellus urna ut sem.'
  }
])
</script>

<style scoped lang="scss">
.page {
  &__title {
    margin: 0;
    font-size: 2.25rem;
    font-weight: 600;
  }

  &__grid {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  &__card {
    width: 100%;
    box-sizing: border-box;
    padding: 0 1rem;

    @media (max-width: 767px) {
      padding: 0 0.5rem;
    }
  }
}
</style>
