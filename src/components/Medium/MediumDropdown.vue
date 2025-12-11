<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
    label: { type: String, default: "Selecteer..." },
    options: { type: Array as () => string[], default: () => [] },
    modelValue: { type: String, default: "" }
});

const emit = defineEmits(["update:modelValue"]);
const open = ref(false);

const toggle = () => (open.value = !open.value);

const selectOption = (opt: string) => {
    emit("update:modelValue", opt);
    open.value = false;
    };
</script>

<template>
    <div class="dropdown">
        <button class="dropdown__button" @click="toggle">
            {{ modelValue || label }}
        </button>

        <ul v-if="open" class="dropdown__list">
            <li v-for="opt in options" :key="opt" class="dropdown__item" @click="selectOption(opt)">
                    {{ opt }}
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.dropdown {
    position: relative;
    display: inline-block;

    &__button {
        align-items: center;
        appearance: none;
        border: 0;
        border-radius: 6px;
        box-shadow: rgba(48, 48, 48, 0.4) 0 2px 4px, rgba(45, 45, 45, 0.3) 0 7px 13px -3px, rgba(80, 80, 80, 0.5) 0 -3px 0 inset;
        box-sizing: border-box;
        color: #fff;
        cursor: pointer;
        display: inline-flex;
        font-family: var(--font-main);
        height: 48px;
        justify-content: center;
        line-height: 1;
        list-style: none;
        overflow: hidden;
        padding-left: 16px;
        padding-right: 16px;
        width: 160px;
        margin: 10px 15px 10px 15px;
        position: relative;
        text-align: left;
        text-decoration: none;
        transition: box-shadow .15s, transform .15s;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        white-space: nowrap;
        will-change: box-shadow, transform;
        font-size: 18px;
        font-weight: 500;
        background-image: radial-gradient(100% 100% at 100% 0, #3E8760 0, #2d724d 100%);

        &:hover {
            box-shadow: rgba(48, 48, 48, 0.4) 0 4px 8px, rgba(48, 48, 48, 0.3) 0 7px 13px -3px, #286343 0 -3px 0 inset;
            transform: translateY(-2px);
        }

        &:active {
            box-shadow: #3E8760 0 3px 7px inset;
            transform: translateY(2px);
        }
    }

    &__list {
        position: absolute;
        top: calc(100% + -10px);
        left: 19px;
        background: #3a3a3a;
        border-bottom: 1px solid rgba(77, 77, 77, 0.49);
        border-radius: 6px;
        padding: 0;
        margin: 0;
        list-style: none;
        width: 150px;
        z-index: 999;
        overflow: hidden;
    }

    &__item {
        padding: .5rem .75rem;
        cursor: pointer;
        color: white;
        background: #242424;
        text-transform: uppercase;
        font-size: 0.8rem;
        border-bottom: 1px solid rgba(77, 77, 77, 0.49);
        font-family: var(--font-main);
    }

    &__item:hover {
        background: #356e53;
    }
}
</style>