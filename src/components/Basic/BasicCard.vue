<script setup lang="ts">
interface Props {
  title?: string
  innerText?: string
  img?: string
}

defineProps<Props>()
</script>

<template>
  <transition name="fade">
    <article class="basic-card">
      <img
        v-if="img"
        :src="img"
        :alt="title || ''"
        class="basic-card__img"
      />

      <div class="basic-card__body">
        <h3
          v-if="title"
          id="card-title"
          class="basic-card__title"
        >
          <b>{{ title }}</b>
        </h3>

        <p v-if="innerText" class="basic-card__text">
          {{ innerText }}
        </p>

        <slot />
      </div>
    </article>
  </transition>
</template>


<style lang="scss" scoped>
.basic-card {
  width: 100%;
  box-sizing: border-box;
  background: #c6c6c6;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.15s ease;
  font-family: var(--font-main, system-ui, -apple-system, "Segoe UI", Roboto);

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.18);
  }

  &__img {
    display: block;
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  &__body {
    padding: 0.75rem 1rem;
    font-weight: 500;
  }

  &__title {
    margin: 0 0 0.5rem 0;
    font-size: 1.05rem;
  }

  &__text {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.45;
    color: #222;
  }
}
</style>
