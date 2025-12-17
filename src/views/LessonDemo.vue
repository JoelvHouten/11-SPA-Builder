<template>
  <main class="page">
    <header class="page__header">
      <div class="page__title">
        <img class="page__title--logo" src="../assets/images/vue-logo.png" />
        <h1 class="page__title--text">Component Library</h1>
      </div>
    </header>
    <div>
      <VueDraggable ref="el" v-model="list">
        <div v-for="item in list" :key="item.id">
          {{ item.name }}
        </div>
      </VueDraggable>
    </div>
  </main>
</template>

<script setup lang="ts">
const list = ref([
  {
    name: 'Joao',
    id: 1
  },
  {
    name: 'Jean',
    id: 2
  },
  {
    name: 'Johanna',
    id: 3
  },
  {
    name: 'Juan',
    id: 4
  }
])
</script>

<style scoped lang="scss">

</style>
