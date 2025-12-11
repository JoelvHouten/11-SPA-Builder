<script setup lang="ts">
import { ref, onMounted } from "vue"

const props = defineProps({
    message: { type: String, required: true },
    type: { type: String, default: "info" },
    timeout: { type: Number, default: 3000 }
})

const visible = ref(true)
const fading = ref(false)

onMounted(() => {
    setTimeout(() => {
        fading.value = true

        setTimeout(() => {
        visible.value = false
        }, 1000)
    }, props.timeout)
})
</script>

<template>
    <div v-if="visible" class="toast" :class="[ `toast--${props.type}`,  fading ? 'toast--fade-out' : '' ]">
        {{ props.message }}
    </div>
</template>

<style scoped lang="scss">
.toast {
    font-family: var(--font-main);
    font-size: 0.9rem;
    padding: 0.75rem 0rem;
    border-radius: 6px;
    font-weight: 500;
    color: #e8e8e8;
    width: 100%;
    margin: 0.25rem;
    opacity: 1;
    transition: opacity 1s ease;
    text-align: center;

    &--info {
        background: #0C5460;
        background: linear-gradient(45deg, rgb(24, 76, 85) 0%, rgb(41, 129, 142) 100%);
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    }

    &--success {
        background: #155724;
        background: linear-gradient(45deg, rgb(32, 96, 46) 0%, rgb(33, 140, 57) 100%);
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    }

    &--warning {
        background: #856404;
        background: linear-gradient(45deg, rgb(130, 105, 33) 0%, rgb(193, 159, 56) 100%);
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    }

    &--error {
        background: #721C24;
        background: linear-gradient(45deg, rgb(98, 28, 28) 0%, rgb(125, 38, 47) 100%);
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    }

    &--fade-out {
        opacity: 0;
    }
}
</style>
