<script setup lang="ts">
import { ref } from "vue"

type Field = {
    label?: string
    placeholder?: string
    width?: string
    disabled?: boolean
    type?: string
}

const props = defineProps<{
    fields: Field[]
    submitLabel?: string
}>()

const emit = defineEmits<{
    (e: "submit", data: Record<string, string>): void
}>()

const formValues = ref<Record<string, string>>({})

const onSubmit = () => {
    emit("submit", { ...formValues.value })
}
</script>

<template>
    <form class="form" @submit.prevent="onSubmit">
        
        <div 
            v-for="(field, index) in props.fields" 
            :key="index"
            class="form__group"
            :style="{ width: field.width ?? '100%' }"
        >
            <label v-if="field.label" class="form__label">
                {{ field.label }}
            </label>

            <input
                class="form__input"
                v-model="formValues[field.label ?? 'field'+index]"
                :placeholder="field.placeholder"
                :disabled="field.disabled"
                :type="field.type ?? 'text'"
            />
        </div>

        <button 
            class="form__button"
            type="submit"
        >
            {{ props.submitLabel ?? "Submit" }}
        </button>
    </form>
</template>

<style lang="scss" scoped>
.form {
    width: 300px;
    display: inline-flex;
    gap: 1rem;
    font-family: var(--font-main);
    font-weight: 600;
    flex-wrap: wrap;
    color-scheme: dark;

    &__group {
        display: flex;
        flex-direction: column;
    }

    &__label {
        margin-bottom: 0.25rem;
        color: #ddd;
        font-size: 0.95rem;
    }

    &__input {
        padding: 0.75rem 1rem;
        background: #1e1e1e;
        border: 1px solid #333;
        border-radius: 6px;
        color: #ccc;
        font-size: 1rem;
        transition: border-color .2s;
        font-family: var(--font-main);
        font-weight: 500;

        &:focus {
            border-color: #3E8760;
            outline: none;
        }

        &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        &::placeholder{
            color: #353535;
        }
    }

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
        margin: 0.5rem 5rem;
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
}
</style>
