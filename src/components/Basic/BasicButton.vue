<script setup lang="ts">
import { ref, computed } from "vue"

const props = defineProps({
    label: { type: String, required: true },
    variant: {
        type: String as () => "submit" | "reset",
        default: "submit"
    }
})

const visible = ref(true)

const emit = defineEmits<{ (e: 'click', ev: MouseEvent): void }>();

const buttonClass = computed(() => `button__${props.variant}`)
</script>

<template>
    <transition name="fade">
        <button v-if="visible" :type="props.variant" :class="['button', buttonClass]" v-bind="$attrs" @click="(e) => emit('click', e)">
            {{ props.label }}
        </button>
    </transition>
</template>

<style lang="scss" scoped>
.button {
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

    &__submit {
        background-image: radial-gradient(100% 100% at 100% 0, #5adaff 0, #5468ff 100%);
    }

    &__submit:hover {
        box-shadow: rgba(45, 35, 66, .4) 0 4px 8px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset;
        transform: translateY(-2px);
    }

    &__submit:active {
        box-shadow: #3c4fe0 0 3px 7px inset;
        transform: translateY(2px);
    }

    &__reset {
        background-image: radial-gradient(100% 100% at 100% 0, #ff5a5a 0, #ff5454 100%);
    }

    &__reset:hover {
        box-shadow: rgba(44, 44, 44, 0.4) 0 4px 8px, rgba(48, 48, 48, 0.3) 0 7px 13px -3px, #dc3b3b 0 -3px 0 inset;
        transform: translateY(-2px);
    }

    &__reset:active {
        box-shadow: #e03c3c 0 3px 7px inset;
        transform: translateY(2px);
    }
}
</style>