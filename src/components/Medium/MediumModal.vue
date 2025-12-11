<script setup lang="ts">
import { ref } from "vue"

const props = defineProps<{
    triggerText?: string
}>()

const isOpen = ref(false)

const open = () => (isOpen.value = true)
const close = () => (isOpen.value = false)
</script>

<template>
    <button class="modal__button" @click="open">
        {{ props.triggerText ?? 'Open Modal' }}
    </button>

    <div v-if="isOpen" class="modal__container" @click.self="close">
        <div class="modal__window">
        <slot />

        <button class="modal__button" @click="close">Sluiten</button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.modal__container {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99999;
    background: transparent;
}

.modal__window {
    font-family: var(--font-main);
    color: white;
    background: rgba(53, 73, 94, 0.30);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(149, 149, 149, 0.07);
    padding: 1.5rem;
    width: 90%;
    max-width: 300px;
    border-radius: 10px;
    box-shadow: 0 10px 35px rgba(0, 0, 0, 0.3);
    text-align: center;
    font-weight: 500;
}

.modal__button{
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
	background-image: radial-gradient(100% 100% at 100% 0, #ffce5a 0, #ffd754 100%);

    &:hover {
        box-shadow: rgba(49, 49, 49, 0.4) 0 4px 8px, rgba(48, 48, 48, 0.3) 0 7px 13px -3px, #c5a94f 0 -3px 0 inset;
        transform: translateY(-2px);
    }

    &:active {
        box-shadow: #e0d03c 0 3px 7px inset;
        transform: translateY(2px);
    }
}
</style>
