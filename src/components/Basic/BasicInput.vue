<script setup lang="ts">
import { ref, computed } from "vue"

const props = defineProps({
    label: { type: String, required: true },
    variant: { type: String as () => "date" | "time" | "range" }
})

const visible = ref(true)

const inputClass = computed(() => `input__${props.variant}`) 
</script>

<template>
    <transition name="fade">
        <div>
            <div class="input__label"> {{ label }} </div>
            <input v-if="visible" :type="props.variant" :class="['input', inputClass]">
        </div>
    </transition>
</template>

<style lang="scss" scoped>
.input__label {
    font-family: var(--font-main);
    font-size: var(--body);
    font-weight: 500;
    color: white;
}

.input {
    min-width: 280px;
    height: 35px;
    font-family: var(--font-main);
    font-size: var(--body);
    margin-block: 0.5rem;
    font-weight: 500;
    background: #292929;
    color-scheme: dark;
    padding: 2px 7px 2px 7px;
    border-radius: 5px;

    &__range {
        accent-color: var(--color-secondary);
        border: 2px solid grey;
        height: 8px;
        border-radius: 5px;
        appearance: none;
    }

    &__range::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 25px;
        height: 25px;
        background: #41B883;
        background: radial-gradient(circle, rgba(53, 73, 94, 1) 40%, rgba(65, 184, 131, 1) 50%);
        border-radius: 50%;
        cursor: pointer;
        margin-top: 0px;
        box-shadow: rgba(0, 0, 0, 0.15) 0px 14px 28px, rgba(0, 0, 0, 0.12) 0px 10px 10px;
    }
}
</style>