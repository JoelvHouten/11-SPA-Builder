<script setup lang="ts">
import { computed } from "vue";
import defaultImg from "../../assets/images/default.png";

const props = defineProps({
  title: { type: String, default: "Lesson Title" },
  // image can be a full data URL (starting with "data:") or a base64 payload.
  // If null, we fall back to the default image.
  image: { type: String, default: null },
  height: { type: String, default: "220px" },
});

// No internal emit — edit control is provided by the parent via a named slot.
const imageSrc = computed(() => {
  const img = props.image as string | null;
  if (!img) return defaultImg;
  if (img.startsWith("data:") || img.startsWith("http") || img.startsWith("/")) return img;
  // Treat a raw base64 payload as a PNG
  return `data:image/png;base64,${img}`;
});

const heroStyle = computed(() => ({
  height: props.height,
  backgroundImage: `url("${imageSrc.value}")`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
}));
</script>

<template>
  <section class="lesson__hero" :style="heroStyle">
    <div class="lesson__hero-overlay">
      <h1 class="lesson__title">{{ title }}</h1>
      <slot name="overlay-actions"></slot>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.lesson__hero {
  display: flex;
  align-items: flex-end;
  position: relative;

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
    color: #fdfdfd;
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

    i {
      font-size: 0.9rem;
    }
  }
}
</style>