<script setup lang="ts">
import { computed } from "vue"

const props = defineProps({
    steps: { type: Number, required: true },
    current: { type: Number, default: 1 },
    labels: { type: Array, default: () => [] }
})

const stepLabels = computed(() => {
    if (props.labels.length < props.steps) {
        return [
            props.labels,
            Array(props.steps - props.labels.length).fill("")
        ]
    }
    return props.labels
})

</script>

<template>
  <div class="stepper">
        <div v-for="n in props.steps"  :key="n" class="stepper__item">
            <div class="stepper__step" :class="{ 'stepper__step--active': n <= props.current }">
                {{ n }}
            </div>
            <div class="stepper__label">
                {{ stepLabels[n - 1] }}
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.stepper {
    display: flex;
    width: 100%;
    gap: 40px;
    text-align: center;
    font-family: var(--font-main);

    &__item {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    &__step {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: #292929;
        border: 2px solid #444;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ccc;
        font-weight: 600;
        transition: background .2s, border-color .2s;

        &--active {
            background: var(--color-secondary);
            border-color: #ffffff;
            color: #fff;
        }
    }

    &__label {
        margin-top: 6px;
        font-size: 0.8rem;
        color: #ccc;
        user-select: none;
        font-family: var(--font-main);
    }
}
</style>
